import { SiGithub } from "@icons-pack/react-simple-icons";

import { cn } from "@/lib/utils";

const USERNAME = "darksteal9796";
const REVALIDATE_SECONDS = 3600;
const GRID_WEEKS = 7;
const DAYS_PER_WEEK = 7;

type LatestCommit = {
  message: string;
  repo: string;
  date: string;
};

type Day = { date: string; count: number };

type Contributions = {
  total: number;
  weeks: Day[][]; // last GRID_WEEKS weeks, each padded to 7 days (Sun→Sat)
};

type GhEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  // Unauthenticated `/events/public` strips `payload.commits`, but keeps
  // `payload.head` (SHA of the tip). Authenticated requests include commits.
  payload: {
    head?: string;
    commits?: { sha: string; message: string }[];
  };
};

type GhCommit = {
  sha: string;
  commit: {
    message: string;
    author?: { date?: string };
  };
};

type GhContributionDay = { date: string; contributionCount: number };
type GhContributionWeek = { contributionDays: GhContributionDay[] };
type GhGraphQlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: GhContributionWeek[];
        };
      };
    };
  };
};

function restHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchLatestCommit(): Promise<LatestCommit | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=30`,
      {
        headers: restHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) return null;
    const events = (await res.json()) as GhEvent[];
    const push = events.find((e) => e.type === "PushEvent");
    if (!push) return null;

    // Prefer the commit array when present (authenticated requests);
    // otherwise fetch the head commit directly from the repo.
    const embedded = push.payload.commits?.at(-1);
    if (embedded) {
      return {
        message: embedded.message.split("\n")[0],
        repo: push.repo.name,
        date: push.created_at,
      };
    }

    const sha = push.payload.head;
    if (!sha) return null;
    const commitRes = await fetch(
      `https://api.github.com/repos/${push.repo.name}/commits/${sha}`,
      {
        headers: restHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!commitRes.ok) return null;
    const commit = (await commitRes.json()) as GhCommit;
    return {
      message: commit.commit.message.split("\n")[0],
      repo: push.repo.name,
      date: commit.commit.author?.date ?? push.created_at,
    };
  } catch {
    return null;
  }
}

async function fetchContributions(): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const query = `query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: USERNAME } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as GhGraphQlResponse;
    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    // Take the last N weeks and pad each to a 7-slot Sun→Sat array.
    const recent = cal.weeks.slice(-GRID_WEEKS);
    const padded: Day[][] = recent.map((week) => {
      const slots: Day[] = Array.from({ length: DAYS_PER_WEEK }, () => ({
        date: "",
        count: 0,
      }));
      for (const d of week.contributionDays) {
        const dow = new Date(`${d.date}T00:00:00Z`).getUTCDay();
        slots[dow] = { date: d.date, count: d.contributionCount };
      }
      return slots;
    });
    return { total: cal.totalContributions, weeks: padded };
  } catch {
    return null;
  }
}

function intensityClass(count: number): string {
  if (count === 0) return "bg-muted";
  if (count < 3) return "bg-primary/25";
  if (count < 6) return "bg-primary/55";
  if (count < 10) return "bg-primary/80";
  return "bg-primary";
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function emptyGrid(): Day[][] {
  return Array.from({ length: GRID_WEEKS }, () =>
    Array.from({ length: DAYS_PER_WEEK }, () => ({ date: "", count: 0 })),
  );
}

export async function GithubTile() {
  const [commit, contribs] = await Promise.all([
    fetchLatestCommit(),
    fetchContributions(),
  ]);
  const weeks = contribs?.weeks ?? emptyGrid();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <SiGithub className="size-3.5 text-muted-foreground" />
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          GitHub
        </h2>
      </div>

      <div
        aria-hidden
        className="mt-4 flex gap-1"
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                className={cn("size-2.5 rounded-[3px]", intensityClass(day.count))}
                title={day.date ? `${day.date}: ${day.count}` : undefined}
              />
            ))}
          </div>
        ))}
      </div>

      {contribs ? (
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {contribs.total.toLocaleString()}
          </span>{" "}
          contributions this year
        </p>
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">
          Set GITHUB_TOKEN in .env.local to load contributions.
        </p>
      )}

      {commit && (
        <div className="mt-auto border-t border-border/50 pt-3 text-xs">
          <p className="line-clamp-1 font-medium text-foreground">
            {commit.message}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
            <span className="truncate font-mono">{commit.repo}</span>
            <span aria-hidden>·</span>
            <time dateTime={commit.date}>{formatRelative(commit.date)}</time>
          </p>
        </div>
      )}
    </div>
  );
}

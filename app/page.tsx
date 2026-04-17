import { ContactTile } from "@/components/tiles/ContactTile";
import { ExperienceTile } from "@/components/tiles/ExperienceTile";
import { GithubTile } from "@/components/tiles/GithubTile";
import { HeroTile } from "@/components/tiles/HeroTile";
import { LocationTile } from "@/components/tiles/LocationTile";
import { NowTile } from "@/components/tiles/NowTile";
import { ProjectCard } from "@/components/tiles/ProjectCard";
import { ResumeTile } from "@/components/tiles/ResumeTile";
import { StackTile } from "@/components/tiles/StackTile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { BentoTile } from "@/components/ui/BentoTile";
import { getAllCaseStudies } from "@/lib/case-studies";

const FEATURED_SLUGS = ["autonomous-revenue-engine", "ai-best-buddy"];

export default async function Home() {
  const all = await getAllCaseStudies();
  const featured = FEATURED_SLUGS.map((slug) =>
    all.find((s) => s.frontmatter.slug === slug),
  ).filter((s): s is (typeof all)[number] => Boolean(s));

  return (
    <main className="min-h-screen px-6 py-8 lg:px-8 lg:py-12">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
        <header className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            gautamjoshi.dev
          </p>
          <ThemeToggle />
        </header>

        <HeroTile />

        <section
          id="projects"
          aria-label="Featured projects"
          className="scroll-mt-24"
        >
          <BentoGrid className="px-0">
            {featured.map((study) => (
              <BentoTile key={study.frontmatter.slug} size="md">
                <ProjectCard frontmatter={study.frontmatter} />
              </BentoTile>
            ))}
          </BentoGrid>
        </section>

        <ExperienceTile />

        <BentoGrid className="px-0">
          <BentoTile size="sm">
            <NowTile />
          </BentoTile>
          <BentoTile size="md" id="stack" className="scroll-mt-24">
            <StackTile />
          </BentoTile>
          <BentoTile size="sm">
            <LocationTile />
          </BentoTile>
          <BentoTile size="sm">
            <GithubTile />
          </BentoTile>
          <BentoTile size="sm">
            <ResumeTile />
          </BentoTile>
          <BentoTile size="md" id="contact" className="scroll-mt-24">
            <ContactTile />
          </BentoTile>
        </BentoGrid>
      </div>
    </main>
  );
}

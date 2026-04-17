"use client";

import {
  SiGreensock,
  SiLangchain,
  SiN8n,
  SiPostgresql,
  SiPython,
  SiReact,
} from "@icons-pack/react-simple-icons";
import { Cloud, Phone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type StackItem = {
  name: string;
  blurb: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// Simple Icons dropped AWS + Twilio from its registry (brand guideline removals),
// so those two fall back to lucide's closest-concept icon.
const ITEMS: StackItem[] = [
  { name: "Python", blurb: "Primary backend language.", Icon: SiPython },
  { name: "React", blurb: "UI framework for the frontend.", Icon: SiReact },
  { name: "AWS", blurb: "Lambda, Kinesis, CloudWatch.", Icon: Cloud },
  {
    name: "LangChain",
    blurb: "LLM orchestration and agent plumbing.",
    Icon: SiLangchain,
  },
  {
    name: "Postgres",
    blurb: "Primary relational database.",
    Icon: SiPostgresql,
  },
  { name: "Twilio", blurb: "Voice + SMS infrastructure.", Icon: Phone },
  { name: "n8n", blurb: "Workflow orchestration.", Icon: SiN8n },
  { name: "GSAP", blurb: "Scroll-driven motion choreography.", Icon: SiGreensock },
];

export function StackTile() {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Stack
      </h2>
      <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {ITEMS.map(({ name, blurb, Icon }) => (
          <li key={name}>
            <Tooltip>
              <TooltipTrigger
                aria-label={name}
                className="flex aspect-square w-full items-center justify-center rounded-lg border border-transparent bg-muted/30 text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="size-6" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{blurb}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}

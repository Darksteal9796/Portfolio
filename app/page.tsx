import { HeroTile } from "@/components/tiles/HeroTile";
import { LocationTile } from "@/components/tiles/LocationTile";
import { NowTile } from "@/components/tiles/NowTile";
import { ResumeTile } from "@/components/tiles/ResumeTile";
import { StackTile } from "@/components/tiles/StackTile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { BentoTile } from "@/components/ui/BentoTile";

export default function Home() {
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

        <BentoGrid className="px-0">
          <BentoTile size="sm">
            <NowTile />
          </BentoTile>
          <BentoTile size="md">
            <StackTile />
          </BentoTile>
          <BentoTile size="sm">
            <LocationTile />
          </BentoTile>
          <BentoTile size="sm">
            <ResumeTile />
          </BentoTile>
        </BentoGrid>

        {/* Placeholder anchor for the hero's primary CTA until P7 lands. */}
        <div id="projects" className="scroll-mt-24" />
      </div>
    </main>
  );
}

import { ThemeToggle } from "@/components/ThemeToggle";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { BentoTile, type BentoTileSize } from "@/components/ui/BentoTile";

// The four sizes don't tile cleanly into 12 columns with one of each, so the
// demo duplicates sm to keep row 1 full and shows lg + xl below.
// Desktop layout: [sm md sm] · [lg (8/12)] · [xl].
const tiles: Array<{ size: BentoTileSize; span: number }> = [
  { size: "sm", span: 3 },
  { size: "md", span: 6 },
  { size: "sm", span: 3 },
  { size: "lg", span: 8 },
  { size: "xl", span: 12 },
];

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-background py-16 text-foreground">
      <header className="mx-auto mb-12 flex max-w-[1280px] items-center justify-between px-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Design system
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            BentoGrid primitives
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <BentoGrid>
        {tiles.map((tile, i) => (
          <BentoTile key={i} size={tile.size}>
            <div className="flex h-32 items-center justify-center font-mono text-sm">
              <span className="text-muted-foreground">
                <span className="text-foreground">{tile.size}</span>
                {" · col-span-"}
                {tile.span}
              </span>
            </div>
          </BentoTile>
        ))}
      </BentoGrid>
    </main>
  );
}

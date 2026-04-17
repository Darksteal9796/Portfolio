import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type BentoTileSize = "sm" | "md" | "lg" | "xl";

// Mobile grid is 1 col → every tile defaults to full-width.
// Tablet (md) is 6 cols → sm=3 (half), md/lg/xl clamp to 6 (full).
// Desktop (lg) is 12 cols → full size prop applies.
const sizeClasses: Record<BentoTileSize, string> = {
  sm: "md:col-span-3",
  md: "md:col-span-6",
  lg: "md:col-span-6 lg:col-span-8",
  xl: "md:col-span-6 lg:col-span-12",
};

export type BentoTileProps = HTMLAttributes<HTMLDivElement> & {
  size?: BentoTileSize;
};

export function BentoTile({
  size = "sm",
  className,
  ...props
}: BentoTileProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-6 transition hover:ring-2 hover:ring-accent/30",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

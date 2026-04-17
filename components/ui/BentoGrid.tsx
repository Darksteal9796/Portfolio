import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type BentoGridProps = HTMLAttributes<HTMLDivElement>;

export function BentoGrid({ className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-6 md:grid-cols-6 md:gap-7 lg:grid-cols-12 lg:gap-8",
        className,
      )}
      {...props}
    />
  );
}

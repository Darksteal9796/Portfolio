"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { useMediaQuery } from "@/lib/hooks";

// R3F is only imported when we're actually going to render it — dynamic import
// with ssr:false keeps three.js out of the main bundle and off the server.
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false, loading: () => null },
);

export function HeroBackground() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const showParticles = !reduceMotion && isDesktop;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(124, 58, 237, 0.28), transparent 65%)",
        }}
      />
      {showParticles && (
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            <ParticleField />
          </div>
        </Suspense>
      )}
    </div>
  );
}

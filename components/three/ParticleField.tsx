"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Points } from "three";

const PARTICLE_COUNT = 2000;
const FIELD_SIZE = 8;

// Positions are generated once at module load and shared across mounts.
// Kept at module scope so react-hooks/purity doesn't flag Math.random inside
// the component body.
const POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * FIELD_SIZE;
    arr[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SIZE;
    arr[i * 3 + 2] = (Math.random() - 0.5) * FIELD_SIZE;
  }
  return arr;
})();

function Particles() {
  const ref = useRef<Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    // Steady idle drift from elapsed time + cursor-driven offset. Both are
    // set (not accumulated) so rotation stays stable when the cursor is idle.
    ref.current.rotation.x = state.pointer.y * 0.08;
    ref.current.rotation.y =
      state.clock.elapsedTime * 0.02 + state.pointer.x * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7C3AED"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <Particles />
    </Canvas>
  );
}

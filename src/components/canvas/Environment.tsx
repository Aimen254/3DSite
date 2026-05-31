// src/components/canvas/Environment.tsx
"use client";

import { Environment as DreiEnvironment } from "@react-three/drei";

export default function Environment() {
  return (
    <>
      <ambientLight intensity={0.4} />

      {/* Key light — cool lavender from top right */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={2.2}
        color="#C7DBF7"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fill light — purple from left */}
      <directionalLight
        position={[-4, 2, -2]}
        intensity={1.0}
        color="#7570BC"
      />

      {/* Rim light — rose from behind */}
      <directionalLight
        position={[0, -3, -5]}
        intensity={1.0}
        color="#C59594"
      />

      <DreiEnvironment preset="city" environmentIntensity={0.5} />
    </>
  );
}

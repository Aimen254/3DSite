// src/components/canvas/Environment.tsx
"use client";

import { Environment as DreiEnvironment } from "@react-three/drei";

export default function Environment() {
  return (
    <>
      {/* Ambient base light */}
      <ambientLight intensity={0.3} />

      {/* Key light — warm from top right */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={2.5}
        color="#fff5e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fill light — cool from left */}
      <directionalLight
        position={[-4, 2, -2]}
        intensity={0.8}
        color="#a0c4ff"
      />

      {/* Rim light — from behind */}
      <directionalLight
        position={[0, -3, -5]}
        intensity={1.2}
        color="#ffffff"
      />

      {/* HDRI environment for reflections */}
      <DreiEnvironment preset="city" environmentIntensity={0.6} />
    </>
  );
}
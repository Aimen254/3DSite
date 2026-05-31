// src/components/canvas/Scene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import CoasterModel from "./CoasterModel";
import Environment from "./Environment";
import Particles from "./Particles";
import PostFX from "./PostFX";

interface Props {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

function LoadingFallback() {
  return null; // Canvas stays black while loading
}

export default function Scene({ mouseX, mouseY, scrollProgress }: Props) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: 4, // ACESFilmic
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 2]} // Limit pixel ratio for performance
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Environment />
        <CoasterModel
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollProgress}
        />
        <Particles />
        <PostFX />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
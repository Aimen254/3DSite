// src/components/canvas/Scene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import Environment        from "./Environment";
import Particles          from "./Particles";
import PostFX             from "./PostFX";
import CoasterModel       from "./CoasterModel";
import GlassJar           from "./GlassJar";
import SectionBackgrounds from "./SectionBackgrounds";

interface Props {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

export default function Scene({ mouseX, mouseY, scrollProgress }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias:           true,
        alpha:               true,
        powerPreference:     "high-performance",
        toneMapping:         4,
        toneMappingExposure: 1.3,
      }}
      dpr={[1, 2]}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Suspense fallback={null}>

        {/* ── Lighting & environment ─────── */}
        <Environment />

        {/* ── Ambient particles (always) ─── */}
        <Particles />

        {/* ── Hero background object ──────── */}
        {/* Metallic rings + distort sphere  */}
        <CoasterModel
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollProgress}
        />

        {/* ── Hero foreground popup product── */}
        {/* Glass cream jar — scrolls to      */}
        {/* features section then pins right  */}
        {/* <GlassJar
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollProgress}
        /> */}

        {/* ── Per-section backgrounds ─────── */}
        {/* Stats / Testimonials / Pricing /  */}
        {/* Footer each get unique 3D object  */}
        <SectionBackgrounds
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollProgress}
        />

        {/* ── Post-processing ─────────────── */}
        <PostFX />

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
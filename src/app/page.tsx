// src/app/page.tsx
"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useMousePosition }  from "@/hooks/useMousePosition";
import { useScrollProgress } from "@/hooks/useScrollProgress";

import LoadingScreen  from "@/components/ui/LoadingScreen";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor   from "@/components/ui/CustomCursor";
import Navbar         from "@/components/ui/Navbar";
import Hero           from "@/components/sections/Hero";
import Features       from "@/components/sections/Features";
import Stats          from "@/components/sections/Stats";
import Testimonials   from "@/components/sections/Testimonials";
import Pricing        from "@/components/sections/Pricing";
import Footer         from "@/components/sections/Footer";

// Disable SSR for WebGL canvas
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const mouse          = useMousePosition();
  const scrollProgress = useScrollProgress();

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* ── Loading screen ─────────────────── */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {/* ── Everything below fades in after load ── */}
      <div style={{
        opacity:    loaded ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}>
        {/* Scroll progress line */}
        <ScrollProgress />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Fixed 3D canvas */}
        <Scene
          mouseX={mouse.x}
          mouseY={mouse.y}
          scrollProgress={scrollProgress}
        />

        {/* Fixed navbar */}
        <Navbar />

        {/* Page content */}
        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <Features />
          <Stats />
          <Testimonials />
          <Pricing />
        </main>

        <Footer />
      </div>
    </>
  );
}
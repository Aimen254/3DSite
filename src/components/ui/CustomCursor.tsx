// src/components/ui/CustomCursor.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });
    };

    // Ring lerps behind — runs every frame
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      gsap.set(ring, { x: ringX - 20, y: ringY - 20 });
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Scale up on hoverable elements
    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.4, duration: 0.3 });
      gsap.to(dot,  { scale: 0,   duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot,  { scale: 1, duration: 0.3 });
    };

    // Attach to all interactive elements
    const addHover = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", onMove);

    // Small delay so elements are mounted
    const timer = setTimeout(addHover, 500);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "#ffffff",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.6)",
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
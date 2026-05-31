// src/components/ui/ScrollProgress.tsx
"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        height: "1.5px",
        zIndex: 9990,
        background: "rgba(255,255,255,0.06)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, rgba(200,184,154,0.8), rgba(255,255,255,0.6))",
          transformOrigin: "left",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
}
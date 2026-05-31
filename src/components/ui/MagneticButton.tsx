// src/components/ui/MagneticButton.tsx
"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  onClick,
  variant = "primary",
  style,
}: Props) {
  const btnRef   = useRef<HTMLButtonElement>(null);
  const textRef  = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn  = btnRef.current;
    if (!btn) return;

    const rect   = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.35;
    const dy = (e.clientY - centerY) * 0.35;

    gsap.to(btn,      { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    gsap.to(textRef.current, { x: dx * 0.5, y: dy * 0.5, duration: 0.4 });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current,  { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    gsap.to(textRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const isPrimary = variant === "primary";

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 32px",
        borderRadius: "100px",
        border: isPrimary ? "none" : "1px solid rgba(117,112,188,0.35)",
        background: isPrimary ? "linear-gradient(135deg, #7570BC 0%, #C59594 100%)" : "transparent",
        color: isPrimary ? "#ffffff" : "#C7DBF7",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.02em",
        fontFamily: "inherit",
        overflow: "hidden",
        transition: "background 0.3s",
        willChange: "transform",
        ...style,
      }}
    >
      <span ref={textRef} style={{ position: "relative", zIndex: 1 }}>
        {children}
      </span>
    </button>
  );
}
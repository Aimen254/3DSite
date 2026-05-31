// src/components/ui/LoadingScreen.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const panelTopRef  = useRef<HTMLDivElement>(null);
  const panelBotRef  = useRef<HTMLDivElement>(null);
  const countRef     = useRef<HTMLSpanElement>(null);
  const barFillRef   = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo entrance
    tl.from([logoRef.current, labelRef.current], {
      y: 20, opacity: 0, duration: 0.7,
      ease: "power3.out", stagger: 0.1,
    }, 0.2);

    // Count 0 → 100
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: function () {
        const v = Math.floor(this.targets()[0].val);
        if (countRef.current)  countRef.current.textContent  = String(v);
        if (barFillRef.current) barFillRef.current.style.transform =
          `scaleX(${v / 100})`;
      },
    }, 0.4);

    // Split-panel exit: top slides up, bottom slides down
    tl.to(panelTopRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power3.inOut",
    }, 3.0);
    tl.to(panelBotRef.current, {
      yPercent: 100,
      duration: 1,
      ease: "power3.inOut",
      onComplete,
    }, 3.0);
  }, [onComplete]);

  const shared: React.CSSProperties = {
    position: "absolute",
    left: 0, right: 0,
    background: "#000000",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        pointerEvents: "none",
      }}
    >
      {/* Top panel */}
      <div
        ref={panelTopRef}
        style={{ ...shared, top: 0, height: "50vh", alignItems: "flex-end",
          paddingBottom: "40px" }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            ref={logoRef}
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            oryzo
          </div>
          <p
            ref={labelRef}
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            AI FOR RICE FARMERS
          </p>
        </div>
      </div>

      {/* Bottom panel */}
      <div
        ref={panelBotRef}
        style={{ ...shared, bottom: 0, height: "50vh",
          alignItems: "flex-start", paddingTop: "40px" }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          width: "min(320px, 80vw)",
        }}>
          {/* Progress bar */}
          <div style={{
            width: "100%", height: "1px",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}>
            <div
              ref={barFillRef}
              style={{
                height: "100%",
                background: "rgba(255,255,255,0.7)",
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />
          </div>

          {/* Counter */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}>
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.2)",
            }}>
              LOADING
            </span>
            <span
              ref={countRef}
              style={{
                fontSize: "11px",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.4)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
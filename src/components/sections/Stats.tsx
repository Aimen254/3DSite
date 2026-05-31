// src/components/sections/Stats.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATS = [
  { value: 2400,  suffix: "+",  label: "Farms using Oryzo"     },
  { value: 94,    suffix: "%",  label: "Yield prediction accuracy" },
  { value: 1.2,   suffix: "M", label: "Hectares monitored"     },
  { value: 38,    suffix: "%",  label: "Average yield increase" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = STATS[i].value;
      const isDecimal = target % 1 !== 0;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.from({ val: 0 }, {
            val: target,
            duration: 2,
            delay: i * 0.15,
            ease: "power2.out",
            onUpdate: function () {
              if (el) {
                el.textContent = isDecimal
                  ? this.targets()[0].val.toFixed(1)
                  : Math.floor(this.targets()[0].val).toLocaleString();
              }
            },
          });
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 1,
        padding: "120px max(40px, 6vw)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Label */}
      <p style={{
        textAlign: "center",
        fontSize: "11px",
        letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.25)",
        marginBottom: "64px",
      }}>
        TRUSTED BY FARMERS WORLDWIDE
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "48px",
        maxWidth: "960px",
        margin: "0 auto",
        textAlign: "center",
      }}>
        {STATS.map((stat, i) => (
          <div key={i}>
            <div style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              lineHeight: 1,
              marginBottom: "12px",
            }}>
              <span
                ref={(el) => { numRefs.current[i] = el; }}
              >
                0
              </span>
              <span>{stat.suffix}</span>
            </div>
            <p style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.02em",
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
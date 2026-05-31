// src/components/ui/TextReveal.tsx
"use client";

import { useEffect, useRef } from "react";
import type {
  ElementType,
  CSSProperties,
  ComponentType,
  HTMLAttributes,
  RefAttributes,
} from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

interface Props {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  scrollTrigger?: boolean;
  duration?: number;
}

export default function TextReveal({
  children,
  as: Tag = "h1",
  className,
  style,
  delay = 0,
  scrollTrigger = false,
  duration = 0.8,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = children.split(" ");
    el.innerHTML = words
      .map(
        (word) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em">
            <span class="word-inner" style="display:inline-block;transform:translateY(110%)">${word}</span>
           </span>`
      )
      .join("");

    const inners = el.querySelectorAll<HTMLElement>(".word-inner");

    const animProps = {
      y: 0,
      opacity: 1,
      duration,
      ease: "power3.out",
      stagger: 0.06,
      delay,
    };

    if (scrollTrigger) {
      gsap.to(inners, {
        ...animProps,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(inners, animProps);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, delay, scrollTrigger, duration]);

  const Component = Tag as ComponentType<
    HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>
  >;

  return (
    <Component ref={containerRef} className={className} style={style}>
      {children}
    </Component>
  );
}
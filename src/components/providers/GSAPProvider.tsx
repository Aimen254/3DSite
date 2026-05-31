// src/components/providers/GSAPProvider.tsx
"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Refresh ScrollTrigger after fonts/images load
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      // Kill all triggers on unmount (important in dev hot reload)
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
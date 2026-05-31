// src/components/canvas/PostFX.tsx
"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostFX() {
  return (
    <EffectComposer>
      {/* Soft bloom glow around bright areas */}
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* Subtle depth blur on edges */}
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />

      {/* Dark vignette around edges */}
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
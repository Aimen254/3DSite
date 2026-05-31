// src/components/canvas/GlassBottle.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

// ── Scroll zone boundaries ─────────────────────
// Adjust these if bottle appears at wrong time
const S = {
  HERO_END:     0.08,  // hero section ends
  MOVE_END:     0.15,  // bottle reaches features position
  FEATURES_END: 0.42,  // features section ends
  FADE_END:     0.54,  // bottle completely gone
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function GlassBottle({ mouseX, mouseY, scrollProgress }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const sp       = scrollProgress;

  // ── Compute target transform ──────────────────
  let tx = 1.6, ty = 0.1, tz = 0.6, ts = 1.0;

  if (sp < S.HERO_END) {
    // Hero: bottle sits right-of-center
    tx = 1.6; ty = 0.1; tz = 0.6; ts = 1.0;

  } else if (sp < S.MOVE_END) {
    // Transition: slides right into features container
    const p = (sp - S.HERO_END) / (S.MOVE_END - S.HERO_END);
    tx = lerp(1.6, 2.5, p);
    ty = lerp(0.1, 0.0, p);
    tz = lerp(0.6, 0.0, p);
    ts = lerp(1.0, 0.88, p);

  } else if (sp < S.FEATURES_END) {
    // Features: pinned right — stays still while text changes
    tx = 2.5; ty = 0.0; tz = 0.0; ts = 0.88;

  } else if (sp < S.FADE_END) {
    // Exit: drifts away and shrinks
    const p = (sp - S.FEATURES_END) / (S.FADE_END - S.FEATURES_END);
    tx = lerp(2.5, 5.0, p);
    ty = lerp(0.0, -2.0, p);
    tz = lerp(0.0, -2.0, p);
    ts = lerp(0.88, 0.0, p);

  } else {
    ts = 0;
  }

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;

    // Smooth lerp to targets
    g.position.x = THREE.MathUtils.lerp(g.position.x, tx,  0.055);
    g.position.y = THREE.MathUtils.lerp(g.position.y, ty,  0.055);
    g.position.z = THREE.MathUtils.lerp(g.position.z, tz,  0.055);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x,  ts,  0.055));

    // Mouse tilt
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouseY * 0.28, 0.04);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.25 + mouseX * 0.38, 0.04);
  });

  // Glass material shared props
  const glassMat = {
    color:              "#d0ecd0" as const,
    transmission:       0.97,
    roughness:          0.03,
    ior:                1.52,
    chromaticAberration:0.025,
    samples:            4,
    backside:           true as const,
    envMapIntensity:    2,
  };

  return (
    <group ref={groupRef} position={[1.6, 0.1, 0.6]}>
      <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.35}>

        {/* ── Metal screw cap ─────────────────── */}
        <mesh position={[0, 1.13, 0]}>
          <cylinderGeometry args={[0.180, 0.190, 0.16, 32]} />
          <meshStandardMaterial color="#111111" metalness={0.95} roughness={0.08} />
        </mesh>

        {/* Cap knurl ring */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.198, 0.194, 0.05, 32]} />
          <meshStandardMaterial color="#777777" metalness={1.0} roughness={0.0} />
        </mesh>

        {/* ── Neck ─────────────────────────────── */}
        <mesh position={[0, 0.80, 0]}>
          <cylinderGeometry args={[0.170, 0.215, 0.36, 32]} />
          <MeshTransmissionMaterial {...glassMat} thickness={0.15} />
        </mesh>

        {/* ── Shoulder ─────────────────────────── */}
        <mesh position={[0, 0.50, 0]}>
          <cylinderGeometry args={[0.345, 0.215, 0.22, 32]} />
          <MeshTransmissionMaterial {...glassMat} thickness={0.20} />
        </mesh>

        {/* ── Main body ────────────────────────── */}
        <mesh position={[0, -0.24, 0]}>
          <cylinderGeometry args={[0.345, 0.362, 1.44, 32]} />
          <MeshTransmissionMaterial {...glassMat} thickness={0.26} />
        </mesh>

        {/* ── Base (thicker glass) ─────────────── */}
        <mesh position={[0, -0.97, 0]}>
          <cylinderGeometry args={[0.362, 0.340, 0.07, 32]} />
          <MeshTransmissionMaterial {...glassMat} thickness={0.55} />
        </mesh>

        {/* ── Rice contents ─────────────────────── */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.285, 0.300, 1.08, 16]} />
          <meshStandardMaterial
            color="#f0e8d8"
            roughness={0.96}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Rice surface (flat top) */}
        <mesh position={[0, 0.40, 0]}>
          <cylinderGeometry args={[0.284, 0.284, 0.012, 16]} />
          <meshStandardMaterial color="#e8dfc8" roughness={1.0} />
        </mesh>

        {/* ── Frosted label band ────────────────── */}
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.348, 0.348, 0.68, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.055}
            roughness={0.7}
          />
        </mesh>

        {/* ── Rim glow (bottom edge highlight) ─── */}
        <mesh position={[0, -0.97, 0]}>
          <torusGeometry args={[0.355, 0.008, 8, 64]} />
          <meshStandardMaterial
            color="#c8e8c0"
            emissive="#88cc80"
            emissiveIntensity={0.4}
            transparent
            opacity={0.5}
          />
        </mesh>

      </Float>
    </group>
  );
}
// src/components/canvas/Particles.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { particleVertexShader, particleFragmentShader } from "@/shaders";

const COUNT = 300;

// Computed once at module load — keeps Math.random() out of render
const _positions = new Float32Array(COUNT * 3);
const _scales    = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const radius = 2.2 + Math.pow(Math.random(), 0.6) * 3.2;
  const theta  = Math.random() * Math.PI * 2;
  const phi    = Math.acos(2 * Math.random() - 1);
  _positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
  _positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
  _positions[i * 3 + 2] = radius * Math.cos(phi);
  _scales[i] = 0.3 + Math.random() * 1.4;
}

export default function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(_positions, 3));
    geo.setAttribute("aScale",   new THREE.BufferAttribute(_scales,    1));

    const mat = new THREE.ShaderMaterial({
      vertexShader:   particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 28 },
      },
      transparent:  true,
      depthWrite:   false,
      blending:     THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial)
        .uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}
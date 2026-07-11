"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ParticleProps {
  isStructured: boolean;
}

function ParticleMorph({ isStructured }: ParticleProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 3000;

  const [rawPositions, gridPositions] = useMemo(() => {
    const raw = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);
    const gridSize = Math.ceil(Math.cbrt(count));
    const spacing = 0.6;
    const offset = (gridSize * spacing) / 2;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 4;
      raw[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      raw[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      raw[i * 3 + 2] = r * Math.cos(phi);

      const x = (i % gridSize) * spacing - offset;
      const y = (Math.floor(i / gridSize) % gridSize) * spacing - offset;
      const z = Math.floor(i / (gridSize * gridSize)) * spacing - offset;
      grid[i * 3] = x;
      grid[i * 3 + 1] = y;
      grid[i * 3 + 2] = z;
    }

    return [raw, grid];
  }, []);

  const currentPositions = useMemo(() => new Float32Array(rawPositions), [rawPositions]);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const positions = geometry.attributes.position.array as Float32Array;

    const targetProgress = isStructured ? 1 : 0;
    progress.current += (targetProgress - progress.current) * (delta * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = THREE.MathUtils.lerp(rawPositions[i], gridPositions[i], progress.current);
    }

    geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={isStructured ? "#60A5FA" : "#A1A1AA"}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function DataParticlesCanvas() {
  const [isStructured, setIsStructured] = useState(false);

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center">
      <div className="absolute top-6 z-10 flex gap-4">
        <button
          onClick={() => setIsStructured((value) => !value)}
          className="rounded-full border border-blue-500/30 bg-zinc-950/80 px-5 py-2.5 text-sm font-semibold text-zinc-100 shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-xl transition-all hover:border-blue-400 hover:bg-zinc-900 hover:text-white"
        >
          <span className="mr-2 inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
          {isStructured ? "State: Structured Grid" : "State: Raw Data Chaos"} · Morph
        </button>
      </div>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} className="w-full h-full cursor-grab">
        <ambientLight intensity={0.5} />
        <ParticleMorph isStructured={isStructured} />
        <OrbitControls enableZoom={false} autoRotate={!isStructured} autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

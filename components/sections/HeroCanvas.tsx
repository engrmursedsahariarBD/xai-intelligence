'use client';

import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 3200;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

type ParticleFieldProps = {
  progress: number;
  hovering: boolean;
  reducedMotion: boolean;
};

function ParticleField({ progress, hovering, reducedMotion }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const { chaotic, structured, colors } = useMemo(() => {
    const chaotic = new Float32Array(COUNT * 3);
    const structured = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const size = Math.ceil(Math.cbrt(COUNT));
    const step = 0.42;
    const offset = (size * step) / 2;
    const color = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const r = 3 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      chaotic[i3] = r * Math.sin(phi) * Math.cos(theta);
      chaotic[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      chaotic[i3 + 2] = r * Math.cos(phi);

      const x = i % size;
      const y = Math.floor(i / size) % size;
      const z = Math.floor(i / (size * size));
      structured[i3] = x * step - offset;
      structured[i3 + 1] = y * step - offset;
      structured[i3 + 2] = z * step - offset;

      const shade = 0.55 + Math.random() * 0.45;
      color.setRGB(shade, shade, shade);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { chaotic, structured, colors };
  }, []);

  const live = useMemo(() => new Float32Array(COUNT * 3), []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const p = pointsRef.current;
    if (!p) return;
    const positions = p.geometry.attributes.position.array as Float32Array;
    const t = state.clock.getElapsedTime();

    const target = Math.min(1, Math.max(0, progress * 2.4)) + (hovering ? 0.15 : 0);
    const currentLerp = (p.userData.lerp || 0) as number;
    const v = THREE.MathUtils.lerp(currentLerp, Math.min(1, target), delta * 2.4);
    p.userData.lerp = v;

    p.rotation.y = t * 0.04 + progress * Math.PI * 0.6;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const noise = (1 - v) * 0.12;
      positions[i3] = THREE.MathUtils.lerp(chaotic[i3], structured[i3], v) + Math.sin(t * 2 + i) * noise;
      positions[i3 + 1] = THREE.MathUtils.lerp(chaotic[i3 + 1], structured[i3 + 1], v) + Math.cos(t * 1.6 + i) * noise;
      positions[i3 + 2] = THREE.MathUtils.lerp(chaotic[i3 + 2], structured[i3 + 2], v) + Math.sin(t * 1.8 + i) * noise;
    }
    p.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={live}
          itemSize={3}
          args={[live, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        args={[
          {
            size: 0.032,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          },
        ]}
      />
    </points>
  );
}

function canCreateWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function HeroCanvas({ progress = 0 }: { progress?: number }) {
  const [hovering, setHovering] = useState(false);
  const [supported, setSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setSupported(canCreateWebGL());
    setReducedMotion(prefersReducedMotion());
  }, []);

  if (!supported) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1.5px)] bg-[length:28px_28px]"
        style={{ opacity: 0.4 + progress * 0.3 }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onError={() => setSupported(false)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <ParticleField progress={progress} hovering={hovering} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

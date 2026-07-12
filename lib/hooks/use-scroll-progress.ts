'use client';

import { useEffect, useRef, useState, MutableRefObject } from 'react';

function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

export function useScrollProgress(): [MutableRefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Avoid noisy re-renders when the value changes very slightly
  const lastValueRef = useRef<number>(-1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = getReducedMotion();

    // In reduced motion mode, keep updates coarser (still preserves layout/feel).
    const epsilon = prefersReducedMotion ? 0.03 : 0.007;

    let frame: number | null = null;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const total = rect.height + viewportHeight;

      // Guard against weird layout edge cases
      if (total <= 0) return;

      const scrolled = viewportHeight - rect.top;
      const value = Math.min(1, Math.max(0, scrolled / total));

      if (Math.abs(value - lastValueRef.current) >= epsilon) {
        lastValueRef.current = value;
        setProgress(value);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        measure();
        frame = null;
      });
    };

    // Initial measurement
    measure();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return [ref, progress];
}

'use client';

import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import { useScrollProgress } from '@/lib/hooks/use-scroll-progress';
import { EASE } from '@/lib/easing';

export default function HeroSection() {
  const [ref, progress] = useScrollProgress();

  return (
    <section
      id="top"
      ref={ref}
      className="min-h-[100svh] flex flex-col justify-center relative overflow-hidden pt-[72px]"
    >
      <HeroCanvas progress={progress} />

      {/* Eyecache overlays (no layout impact) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* base depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/20 to-bg" />
        {/* vignette */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_35%,rgba(0,0,0,0.55)_80%)]" />
        {/* subtle light sweep */}
        <div className="absolute inset-0 opacity-60 [background:linear-gradient(110deg,transparent_0%,rgba(96,165,250,0.10)_30%,transparent_60%)] blur-[0.5px]" />
        {/* edge fade */}
        <div className="absolute -left-20 -right-20 top-0 h-[180px] [background:linear-gradient(to_bottom,rgba(255,255,255,0.10),transparent)]" />
      </div>

      <div className="container relative z-[2]">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.reveal }}
        >
          Xai Engine
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE.reveal }}
          className="text-[clamp(44px,8vw,92px)] font-medium tracking-[-0.03em] leading-[0.98] mt-5 max-w-[900px]"
        >
          Data becomes intelligence.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: EASE.reveal }}
          className="font-mono mt-[26px] text-[17px] text-text-muted max-w-[520px] leading-[1.7]"
        >
          Raw, chaotic signals — resolved into structured, actionable insight.
          The infrastructure for autonomous decision-making.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-mono absolute bottom-10 left-6 text-xs text-text-faint flex flex-col items-center gap-3 z-[2]"
      >
        <span style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
        <span className="w-px h-10 bg-gradient-to-b from-text-faint to-transparent" />
      </motion.div>
    </section>
  );
}

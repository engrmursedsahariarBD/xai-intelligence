"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DataParticlesCanvas = dynamic(() => import("../canvas/DataParticles"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-24 pb-16 px-6 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_45%),linear-gradient(135deg,#020202_0%,#09090b_45%,#111827_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.12),transparent_24%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.12),transparent_20%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[320px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-4xl z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800/80 bg-zinc-900/60 text-xs text-zinc-300 backdrop-blur-sm mb-6 shadow-[0_0_30px_rgba(59,130,246,0.08)]">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l1.4 4.3L18 9l-4.6 1.7L12 15l-1.4-4.3L6 9l4.6-1.7L12 3z" /></svg>
          <span>Next-Generation Intelligence Workspace</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-tight drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          Turn raw chaos into <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            structured intelligence.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 font-light leading-8">
          Xai autonomously ingests fragmented data pipelines, computes semantic models, and deploys real-time actionable insights without friction.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium text-sm transition-all hover:bg-zinc-200 shadow-[0_0_24px_rgba(255,255,255,0.16)]">
            Explore Workspace <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
          </button>
          <button className="px-6 py-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-300 font-medium text-sm transition-all hover:bg-zinc-800/50 hover:border-zinc-700">
            View Architecture
          </button>
        </div>
      </motion.div>

      <div className="w-full max-w-6xl mt-8 z-10">
        <DataParticlesCanvas />
      </div>
    </section>
  );
}

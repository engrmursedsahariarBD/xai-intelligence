"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    step: "01",
    title: "Ingest Data",
    description: "Connect millions of unstructured data streams, logs, and user telemetries with zero-config connectors.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M4 7h16" /><path d="M7 3v4" /><path d="M17 3v4" /><rect x="4" y="7" width="16" height="12" rx="2" /></svg>
    ),
    color: "from-blue-500/20 to-transparent",
    border: "border-blue-500/30",
  },
  {
    step: "02",
    title: "Analyze with AI",
    description: "Our proprietary neural engine maps relational hierarchies and identifies anomaly patterns in milliseconds.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
    ),
    color: "from-indigo-500/20 to-transparent",
    border: "border-indigo-500/30",
  },
  {
    step: "03",
    title: "Generate Insight",
    description: "Transform complex neural weights into deterministic, executive-ready predictive automations.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M4 19h16" /><path d="M7 15l3-3 2 2 5-6" /></svg>
    ),
    color: "from-purple-500/20 to-transparent",
    border: "border-purple-500/30",
  },
];

export default function InsightFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-zinc-950 text-white relative z-10 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-3">System Choreography</h2>
          <p className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
            Three stages to deterministic clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                ref={(el) => {
                  if (el) cardsRef.current[idx] = el;
                }}
                className={`relative p-8 rounded-2xl bg-gradient-to-b ${stage.color} bg-zinc-900/40 border ${stage.border} backdrop-blur-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-zinc-500 hover:shadow-2xl hover:shadow-blue-500/10 group`}
              >
                <div className="absolute top-0 right-0 p-8 text-6xl font-black text-zinc-800/40 select-none group-hover:text-zinc-700/40 transition-colors">
                  {stage.step}
                </div>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{stage.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">{stage.description}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                  <span>Latency: &lt; 12ms</span>
                  <span className="text-blue-400 font-medium">Active Pipeline &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

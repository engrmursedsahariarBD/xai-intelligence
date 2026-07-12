'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { EASE, GSAP_EASE } from '@/lib/easing';

// Fix: our GSAP_EASE.standard is a string for GSAP, but Framer Motion's
// transition expects an array/function for `ease`.



type Stage = {
  title: string;
  description: string;
  metrics: string[];
};

const STAGES: Stage[] = [
  {
    title: 'Ingest data',
    description:
      'Connect disparate, unstructured streams — events, documents, telemetry — into one unified graph. No schema config required.',
    metrics: ['1.2M events/s', 'Zero-schema onboarding'],
  },
  {
    title: 'Analyze with AI',
    description:
      'Models identify patterns, anomalies, and correlations across the graph in real time — well below the threshold of human perception.',
    metrics: ['Sub-10ms inference', '96%+ confidence'],
  },
  {
    title: 'Generate insight',
    description:
      'Raw analysis resolves into a specific, actionable directive — ready for a person to review or for Xai to act on autonomously.',
    metrics: ['Continuous delivery', 'Deterministic output'],
  },
];

function FlowStage({
  index,
  title,
  description,
  metrics,
  active,
}: {
  index: number;
  title: string;
  description: string;
  metrics: string[];
  active: boolean;
}) {
  return (
    <div
      data-stage-index={index}
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: 48,
      }}
    >
      <motion.div
        animate={{ opacity: active ? 1 : 0.32 }}
        transition={{ duration: 0.5 }}
      >

        <span
          className="mono"
          style={{
            fontSize: 12,
            border: '1px solid var(--border-strong)',
            borderRadius: 999,
            padding: '4px 12px',
            display: 'inline-block',
          }}
        >
          Stage 0{index + 1}
        </span>

        <h3
          style={{
            fontSize: 'clamp(26px, 3.4vw, 38px)',
            fontWeight: 560,
            letterSpacing: '-0.02em',
            marginTop: 18,
          }}
        >
          {title}
        </h3>

        <p
          className="mono"
          style={{
            marginTop: 14,
            maxWidth: 420,
            color: 'var(--text-muted)',
            fontSize: 14.5,
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>

        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
          {metrics.map((m) => (
            <span
              key={m}
              className="mono"
              style={{
                fontSize: 12,
                padding: '7px 12px',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--text-muted)',
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function getBarState(index: number, count: number) {
  if (index === 0) {
    // Ingest: chaotic heights, slight rotation, staggered opacity.
    return {
      height: () => 20 + Math.random() * 120,
      opacity: () => 0.25 + Math.random() * 0.6,
      rotation: () => (Math.random() - 0.5) * 12,
      borderRadius: 4,
      background: 'rgba(255,255,255,0.3)',
    };
  }
  if (index === 1) {
    // Analyze: aligned, pulsing, uniform.
    return {
      height: 100,
      opacity: 0.75,
      rotation: 0,
      borderRadius: 3,
      background: '#ffffff',
    };
  }
  // Insight: condensed into a single confident shape.
  return {
    height: (i: number) => (i === Math.floor(count / 2) ? 140 : 20),
    opacity: 1,
    rotation: 0,
    borderRadius: 100,
    background: '#ffffff',
  };
}

export default function InsightFlow() {
  const containerRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ScrollTrigger: any;
    const triggers: any[] = [];
    let cancelled = false;

    (async () => {
      const mod = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      ScrollTrigger = mod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !visualRef.current) return;

      const pin = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top+=72',
        end: 'bottom bottom',
        pin: visualRef.current,
        pinSpacing: false,
      });
      triggers.push(pin);

      stageRefs.current.forEach((stage, i) => {
        if (!stage) return;
        const trig = ScrollTrigger.create({
          trigger: stage,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
        triggers.push(trig);
      });
    })();

    return () => {
      cancelled = true;
      triggers.forEach((t) => t?.kill?.());
    };
  }, []);

  useEffect(() => {
    const bars = barRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!bars.length) return;

    // Make sure the indicator spans the whole pinned panel height.
    // We keep the same "look" (heights/opacity/shape) but scale within the panel.
    const panel = visualRef.current;
    const panelHeight = panel?.clientHeight ?? 400;

    const state = getBarState(activeIndex, bars.length);
    const toVars: Record<string, any> = { duration: 0.8, ease: GSAP_EASE.standard, stagger: { amount: 0.15, from: 'center' } };

    for (const [k, v] of Object.entries(state)) {
      if (typeof v === 'function') {
        // bars' base height is controlled via px for full-height coverage
        if (k === 'height') {
          toVars.height = (i: number) => {
            const base = v(i);
            // Normalize to a percentage of the panel height; keep original relative feel.
            // base values were ~20..140; map 20->6% and 140->36% (empirical look).
            const min = 20;
            const max = 140;
            const t = Math.max(0, Math.min(1, (base - min) / (max - min)));
            return Math.round((0.06 + t * 0.30) * panelHeight);
          };
        } else {
          toVars[k] = v;
        }
      } else {
        toVars[k] = v;
      }
    }

    gsap.to(bars, toVars);
  }, [activeIndex]);

  return (
    <section id="flow" className="section" ref={containerRef as any} style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHeading
          index={2}
          eyebrow="Interactive Insight Flow"
          title="From noise to a single, clear signal."
          subtitle="Three stages, one continuous transformation — scroll to see how Xai moves from raw ingestion to a generated insight."
        />
      </div>

      <div className="container" style={{ marginTop: 40 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
          }}
          className="flow-grid grid-cols-1 md:grid-cols-2"
        >
          <div>
            {STAGES.map((stage, i) => (
              <div
                key={stage.title}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
              >
                <FlowStage index={i} active={activeIndex === i} {...stage} />
              </div>
            ))}
          </div>

          {/* Make the indicator span the full pinned panel height (not a fixed 140px). */}
          <div ref={visualRef} className="relative" style={{ height: '70vh' }}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--panel)',
              }}
            >
              {/* Bars wrapper fills the full panel height; GSAP animates each bar height within it. */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  height: '100%',
                  padding: '18px 0',
                }}
              >
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    style={{
                      width: 8,
                      height: 40,
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.25)',
                      display: 'inline-block',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


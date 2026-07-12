'use client';

import { motion } from 'framer-motion';
import SmartGlobe from './SmartGlobe';
import SectionHeading from '@/components/ui/SectionHeading';
import { useScrollProgress } from '@/lib/hooks/use-scroll-progress';
import { EASE } from '@/lib/easing';

export default function SignatureInteraction() {
  const [ref, progress] = useScrollProgress();

  return (
    <section
      id="signature"
      ref={ref}
      className="section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <SmartGlobe progress={progress} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 30%, var(--bg) 88%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeading index={4} eyebrow="Signature interaction" title="The Insight Core." align="center" />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE.reveal as any }}
          className="mono"
          style={{
            textAlign: 'center',
            marginTop: 18,
            color: 'var(--text-muted)',
            fontSize: 14,
          }}
        >
          Autonomous. Self-organizing. Move your cursor to disrupt its state.
        </motion.p>
      </div>
    </section>
  );
}


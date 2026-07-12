'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/easing';
import { cn } from '@/lib/utils'; // I will need to create this file as well.

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  index?: number;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  index,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'text-center mx-auto max-w-[640px]'
      )}
    >
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: EASE.reveal }}
      >
        {index ? `${index} / ` : ''}
        {eyebrow}
      </motion.span>

      <motion.h2
        className="text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.02em] mt-4 leading-[1.1]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: 0.05, ease: EASE.reveal }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="font-mono mt-4 text-text-muted text-[15px] leading-[1.6]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE.reveal }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

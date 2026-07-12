/**
 * Shared timing curves used across Framer Motion + GSAP so the whole
 * experience feels like it belongs to one hand. Values are the same
 * cubic-bezier control points expressed in each library's expected format.
 */

// Framer Motion (accepts a 4-number cubic-bezier array)
export const EASE = {
  // Confident, decisive settle — used for hero/headline entrances.
  reveal: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Soft deceleration — used for hover/focus micro-interactions.
  soft: [0.22, 1, 0.36, 1] as [number, number, number, number],
  // Symmetric ease for state transitions (tab switches, card swaps).
  standard: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

// GSAP (accepts named eases / cubic-bezier strings)
export const GSAP_EASE = {
  reveal: 'power3.out',
  soft: 'power2.out',
  standard: 'power3.inOut',
};

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
};

# Production Readiness Checklist (Xai Intelligence)

- [x] Audit & harden Next.js production configuration (`next.config.ts`)
- [x] Improve global SEO + social metadata and safer viewport defaults (`app/layout.tsx`)
- [x] Add animation safety: `prefers-reduced-motion` support without breaking design
- [ ] Performance hardening:
  - [x] Improve scroll-progress hook to reduce re-renders / smoother updates
  - [ ] Reduce GPU load in Three/Fiber: cap DPR, throttle updates, pause when offscreen
  - [ ] Remove per-frame allocations / expensive loops where possible
  - [ ] Fix non-deterministic render behavior (avoid Math.random during render)
- [ ] Animation “low motion mode” toggles (preserve look)
- [ ] Verify build + lint
- [ ] Run `next build` and check no runtime errors

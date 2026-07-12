"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#flow", label: "Insight Flow" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#signature", label: "Insight Core" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(8, 9, 11, 0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="container flex h-[72px] items-center justify-between">
        <a href="#top" className="mono flex items-center gap-2 text-[14px] tracking-[-0.01em]">
          <span className="inline-block h-2 w-2 rounded-full bg-white" />
          Xai
        </a>

        <nav className="nav-links hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="mono text-[13px] text-text-muted">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#signature"
          className="mono rounded-full border border-border-strong px-4 py-2 text-[12px]"
        >
          Experience it
        </a>
      </div>

      <style jsx>{`
        @media (max-width: 720px) {
          .nav-links {
            display: none !important;
          }
        }
      `}</style>
    </motion.header>
  );
}

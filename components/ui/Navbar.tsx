"use client";

import Link from "next/link";

const navItems = [
  { href: "#hero", label: "Hero" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#workspace", label: "Workspace" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-[0_0_40px_rgba(59,130,246,0.12)] backdrop-blur-xl">
        <Link href="#hero" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-white uppercase">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-base font-bold text-white">
            X
          </span>
          Xai Workspace
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-zinc-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <a
          href="#workspace"
          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/20"
        >
          Open View
        </a>
      </nav>
    </header>
  );
}

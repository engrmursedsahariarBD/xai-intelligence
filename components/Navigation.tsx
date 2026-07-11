"use client";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter">
          Xai<span className="text-blue-500">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm">
          <a href="#features" className="hover:text-blue-400 transition">
            Features
          </a>
          <a href="#dashboard" className="hover:text-blue-400 transition">
            Dashboard
          </a>
          <a href="#contact" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}
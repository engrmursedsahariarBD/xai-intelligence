"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function WowMoment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Experience the Power
          </h2>
          <p className="text-xl text-gray-400">
            Watch data transform in real-time
          </p>
        </motion.div>

        {/* Interactive Geometry Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative w-full h-96 md:h-screen rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-blue-900/20 via-black to-blue-900/20 flex items-center justify-center group cursor-none"
        >
          {/* Background Grid */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 1000 1000"
          >
            <defs>
              <pattern
                id="grid"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 100 0 L 0 0 0 100"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="1000" height="1000" fill="url(#grid)" />
          </svg>

          {/* Central Morphing Geometry */}
          <motion.div
            animate={
              isHovering
                ? {
                    scale: 1.2,
                    rotate: 180,
                  }
                : {
                    scale: 1,
                    rotate: 0,
                  }
            }
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute w-48 h-48 md:w-80 md:h-80"
          >
            {/* Outer Ring */}
            <motion.div
              animate={{
                rotate: isHovering ? 360 : 0,
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-blue-500/50 rounded-full"
            />

            {/* Inner Rotating Elements */}
            {[0, 120, 240].map((angle) => (
              <motion.div
                key={angle}
                animate={{
                  rotate: isHovering ? -360 : 0,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{
                  transformOrigin: "center",
                }}
              >
                <div
                  className="absolute w-4 h-4 bg-blue-400 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateX(60px)`,
                  }}
                />
              </motion.div>
            ))}

            {/* Center Pulse */}
            <motion.div
              animate={{
                scale: isHovering ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isHovering ? Infinity : 0,
              }}
              className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full shadow-lg shadow-blue-600/50"
            />
          </motion.div>

          {/* Cursor Glow Effect */}
          {isHovering && (
            <motion.div
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{ type: "spring", damping: 5, mass: 0.1 }}
              className="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
            />
          )}

          {/* Info Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none"
          >
            <p className="text-gray-400 text-sm">
              {isHovering ? "✨ Hover to see transformation" : "👆 Hover over the geometry"}
            </p>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-lg text-gray-300">
            This interaction demonstrates Xai's ability to transform and reorganize data in
            real-time, responding to user intent and creating a sense of intelligent,
            responsive systems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
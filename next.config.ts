import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production hardening (safe defaults; should not impact design)
  reactStrictMode: true,

  // Cache static assets aggressively (Next handles hashed filenames safely)
  headers: async () => {
    return [
      {
        // Next.js serves static assets from this prefix
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Optimize image delivery if any images are added later
  images: {
    // Keep defaults unless you use external images.
    // Use remotePatterns only when needed.
    // domains: [],
  },

  // Keep trailingSlash default (false) to avoid route changes.
  trailingSlash: false,

  // Optional gzip/brotli are enabled by Next in production builds.
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Cookie-based auth and locale need request-time rendering.
  cacheComponents: false,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

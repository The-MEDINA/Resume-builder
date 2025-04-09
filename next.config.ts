import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
};

// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: "standalone",
};

export default nextConfig;

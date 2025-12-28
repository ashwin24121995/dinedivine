import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure environment variables are only accessed at runtime
  // This prevents build-time errors when env vars are not available
  experimental: {
    // Enable server actions
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  // Disable static optimization for pages that use environment variables
  // This ensures they are rendered at runtime
  output: "standalone",
};

export default nextConfig;

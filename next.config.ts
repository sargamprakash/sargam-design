import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

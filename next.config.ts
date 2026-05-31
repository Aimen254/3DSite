// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Fix the lockfile root warning
    root: path.resolve(__dirname),

    // GLSL shader support for Turbopack
    rules: {
      "*.{glsl,vert,frag}": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Smaller, more practical sizes for travel/project galleries.
    deviceSizes: [400, 640, 768, 1024, 1280, 1600],
    imageSizes: [256, 384, 512],
    // Cache optimised variants for a year on Vercel's edge.
    minimumCacheTTL: 31_536_000,
    formats: ["image/avif", "image/webp"],
  },

  // Polling-based file watching avoids macOS EMFILE errors on dev.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.next/**", "**/.git/**"],
      };
    }
    return config;
  },
};

module.exports = nextConfig;

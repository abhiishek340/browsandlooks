import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80, 90],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2400],
  },
  poweredByHeader: false,
  devIndicators: false,
};

export default nextConfig;

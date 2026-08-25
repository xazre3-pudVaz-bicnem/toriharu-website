import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // このリポジトリ単体をルートとして扱う（親ディレクトリの lockfile を拾わせない）
  turbopack: { root: path.resolve(process.cwd()) },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [96, 128, 200, 256, 320, 384],
  },
};

export default nextConfig;

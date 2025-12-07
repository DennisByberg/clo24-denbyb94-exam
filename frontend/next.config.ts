import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // NextAuth requires server-side rendering - static export disabled
  // Standalone output for Azure App Service deployment
  output: 'standalone',

  // Proxy /api requests to backend in production to avoid cross-site cookie issues
  // Excludes /api/auth/* which is handled by NextAuth locally
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*', // Keep NextAuth routes local
      },
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`, // Proxy all other /api to backend
      },
    ];
  },

  // Configure Next.js Image component to allow images from Azure Blob Storage
  // Defines allowed external image sources using remotePatterns
  // Without this configuration, Next.js blocks external images for security
  // Allows images from acegroupstorage.blob.core.windows.net/restaurant-images/**
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'acegroupstorage.blob.core.windows.net',
        pathname: '/restaurant-images/**',
      },
    ],
  },
};

export default nextConfig;

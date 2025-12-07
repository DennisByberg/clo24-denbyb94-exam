import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // NextAuth requires server-side rendering - static export disabled
  // Standalone output for Azure App Service deployment
  output: 'standalone',
  
  // Proxy /api requests to backend in production to avoid cross-site cookie issues
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/:path*',
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

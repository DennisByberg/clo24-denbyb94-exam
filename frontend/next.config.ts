import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
  // Proxy API requests to FastAPI backend in development
  // Rewrites /api/* requests to http://localhost:8000/api/*
  // This allows frontend (port 3000) to communicate with backend (port 8000)
  // without CORS issues during local development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;

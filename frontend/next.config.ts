import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // NextAuth requires server-side rendering - static export disabled
  // Standalone output for Azure App Service deployment
  output: 'standalone',
  
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

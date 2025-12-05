import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static export for Azure Static Web Apps deployment
  // Generates static HTML files at build time (no server-side rendering)
  output: 'export',
  // Configure Next.js Image component to allow images from Azure Blob Storage
  // Defines allowed external image sources using remotePatterns
  // Without this configuration, Next.js blocks external images for security
  // Allows images from acegroupstorage.blob.core.windows.net/restaurant-images/**
  images: {
    unoptimized: true, // Required for static export (no image optimization server)
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

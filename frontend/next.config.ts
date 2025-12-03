import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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

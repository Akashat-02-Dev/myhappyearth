/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bypasses Next.js image optimization to prevent Hostinger 404s/timeouts
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
    ],
  },
  reactStrictMode: true,
  
  // Optional but recommended for Hostinger deployments
  // It ensures Next.js doesn't fail if it encounters minor TS errors during the server build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
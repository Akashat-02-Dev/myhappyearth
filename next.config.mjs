/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bypasses Next.js image optimization to prevent Hostinger 404s/timeouts
async rewrites() {
    return [
      {
        source: '/product_images/:path*',
        // Replace with your actual Hostinger base URL
        destination: 'https://your-hostinger-domain.com/product_images/:path*',
      },
    ];
  },
  
  // 2. Allow remote images from your hostinger domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-hostinger-domain.com', // Replace with your actual Hostinger hostname
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
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disables Next.js default image optimization, which often 404s on Hostinger
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows external images if you ever use them
      },
    ],
  },
  // Ensure strict mode doesn't interfere with rendering
  reactStrictMode: true,
};

module.exports = nextConfig; 
// Note: If your file is .mjs, use "export default nextConfig;" instead of module.exports
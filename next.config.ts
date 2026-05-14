import type { NextConfig } from 'next';

// Build the config without strictly attaching it to NextConfig right away
const config = {
  // NEW: Allows external image URLs (like Unsplash, Shopify, etc.) to load in the Next.js <Image> component
  images: {
    formats: ['image/avif', 'image/webp'], // Forces AVIF first!
    qualities: [75, 100],
    remotePatterns: [
{
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // FIX: Added the Unsplash 'plus' subdomain
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      }
    ],
    dangerouslyAllowSVG: true, // Allows SVGs to be used with the <Image> component, but be cautious of untrusted sources
  },

  // 1. Silences the specific Turbopack warning in your terminal
  turbopack: {},

  // 2. Tells the new Turbopack engine how to load SVGs
  experimental: {
    turbo: true,
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // 3. Keeps Webpack as a fallback for production builds
  webpack(config: any) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    );

    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, 
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] }, 
          use: ['@svgr/webpack'],
        }
      );

      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

// Force TypeScript to accept our custom config by casting it!
export default config as unknown as NextConfig;
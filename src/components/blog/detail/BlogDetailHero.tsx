// src/components/blog/detail/BlogDetailHero.tsx
import React from 'react';
import Image from 'next/image';

// Safety function to prevent Next.js from crashing on bad URLs
const getSafeImageSrc = (src: string | undefined | null, fallback: string) => {
  if (!src || typeof src !== 'string' || src.trim() === '') return fallback;
  
  const cleanSrc = src.trim();
  
  if (cleanSrc.startsWith('/')) return cleanSrc;
  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
    try {
      new URL(cleanSrc); 
      return cleanSrc;
    } catch (e) {
      return fallback;
    }
  }
  return fallback;
};

export default function BlogDetailHero({ image, title }: { image: string, title: string }) {
  const safeImage = getSafeImageSrc(image, '/images/blog/blog-hero.jpeg');

  return (
    <div className="w-full relative aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-lg bg-gray-200">
      <Image src={safeImage} alt={title || "Blog Hero Image"} fill className="object-cover" priority />
    </div>
  );
}
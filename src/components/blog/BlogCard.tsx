// src/components/blog/BlogCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  category: string;
  image: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  date: string;
  readTime: string;
}

const getBadgeColor = (category: string) => {
  switch (category) {
    case 'Sustainability Tips': return 'bg-[#9CA988]';
    default: return 'bg-[#74876F]';
  }
};

// THE FIX: A safety function to prevent Next.js from crashing on bad URLs
const getSafeImageSrc = (src: string | undefined | null, fallback: string) => {
  if (!src || typeof src !== 'string' || src.trim() === '') return fallback;
  
  const cleanSrc = src.trim();
  
  // 1. If it's a relative path inside your public folder, it MUST start with '/'
  if (cleanSrc.startsWith('/')) return cleanSrc;
  
  // 2. If it's an absolute web URL, ensure it is fully constructed
  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
    try {
      new URL(cleanSrc); // Test if it's a valid URL
      return cleanSrc;
    } catch (e) {
      return fallback;
    }
  }
  
  // 3. If they typed something like "www.image.com" (missing https://) or random text, use fallback
  return fallback;
};


export default function BlogCard({
  slug,
  category,
  image,
  title,
  description,
  authorName,
  authorImage,
  date,
  readTime,
}: BlogCardProps) {
  const badgeColor = getBadgeColor(category);

  // Run the incoming images through our safety check
  const safeHeroImage = getSafeImageSrc(image, '/images/blog/blog-hero.jpeg');
  const safeAuthorImage = getSafeImageSrc(authorImage, '/images/hero-woman.jpeg'); // Or whatever default author image you have

  return (
    <Link 
      href={`/impact/${slug}`} 
      className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#F3F4F1] flex flex-col transform hover:scale-[1.02] transition-transform duration-300 block"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <Image 
          src={safeHeroImage} 
          alt={title || "Blog post"} 
          fill 
          className="w-full h-full object-cover" 
        />
        <div className={`absolute top-6 left-6 px-4 py-1.5 ${badgeColor} rounded-full text-white text-xs font-semibold font-sans tracking-wide z-10`}>
          {category}
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col gap-4">
        <h3 className="text-xl md:text-2xl font-sans font-bold text-[#2E473D] leading-tight group-hover:text-[#4B6658] transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-[#2E473D] text-opacity-70 flex-grow leading-relaxed font-sans line-clamp-3">
          {description}
        </p>
      </div>

      <div className="px-8 pb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-gray-100 overflow-hidden relative bg-gray-200">
          <Image 
            src={safeAuthorImage} 
            alt={authorName || "Author"} 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans">
            <span className="text-[#9CA3AF]">By</span> <span className="font-bold text-[#4B6658]">{authorName}</span>
          </p>
          <p className="text-xs text-[#9CA3AF] font-sans">
            {date} &bull; {readTime}
          </p>
        </div>
      </div>
    </Link>
  );
}
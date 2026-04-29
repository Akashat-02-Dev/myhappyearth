// src/components/blog/detail/RelatedArticleCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedArticleCardProps {
  image: string;
  title: string;
  authorName: string;
  date: string;
}

const getSafeImageSrc = (src: string | undefined | null, fallback: string) => {
  if (!src || typeof src !== 'string' || src.trim() === '') return fallback;
  const cleanSrc = src.trim();
  if (cleanSrc.startsWith('/')) return cleanSrc;
  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
    try { new URL(cleanSrc); return cleanSrc; } catch (e) { return fallback; }
  }
  return fallback;
};

export default function RelatedArticleCard({
  image,
  title,
  authorName,
  date,
}: RelatedArticleCardProps) {
  
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)+/g, '');   

  const safeImage = getSafeImageSrc(image, '/images/blog/blog-hero.jpeg');

  return (
    <Link 
      href={`/impact/${slug}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col gap-4 transform hover:scale-[1.02] transition-transform duration-300 block"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={safeImage}
          alt={title || "Related article"}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-[#9CA988] rounded-full text-white text-[10px] font-semibold font-sans z-10">
          Green Living
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h4 className="text-base font-sans font-bold text-[#2E473D] leading-tight">
          {title}
        </h4>
        <div className="text-xs font-sans">
          <span className="text-[#9CA3AF]">By</span>{' '}
          <span className="text-[#2E473D]">{authorName}</span>
          <span className="text-[#9CA3AF]"> &bull; {date}</span>
        </div>
      </div>
    </Link>
  );
}   
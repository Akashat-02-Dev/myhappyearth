// src/components/blog/detail/RelatedArticleCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link

interface RelatedArticleCardProps {
  image: string;
  title: string;
  authorName: string;
  date: string;
}

export default function RelatedArticleCard({
  image,
  title,
  authorName,
  date,
}: RelatedArticleCardProps) {
  
  // Generate a URL-friendly slug from the title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)+/g, '');   

  return (
    <Link 
      href={`/blog/${slug}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col gap-4 transform hover:scale-[1.02] transition-transform duration-300 block"
    >
      {/* Image & Badge Wrapper */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-[#9CA988] rounded-full text-white text-[10px] font-semibold font-sans z-10">
          Green Living
        </div>
      </div>

      {/* Content Area */}
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
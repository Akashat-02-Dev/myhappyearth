"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCategory } from '@/data/productsCategoriesData';

interface RichCategoryCardProps {
  category: ProductCategory;
  theme?: "light" | "dark";
}

export default function RichCategoryCard({ category, theme = "light" }: RichCategoryCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const isDark = theme === "dark";

  return (
    <Link 
      href={category.href}
      className={`group relative flex flex-col h-full overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
        isDark 
          ? "bg-[#344E41] border-white/10 shadow-lg text-[#FAF3DD]" 
          : "bg-white border-[#344E41]/10 shadow-md text-[#344E41]"
      }`}
    >
      {/* Top Image Section */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
        {!imageFailed ? (
          <Image 
            src={category.image}
            alt={category.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#A3B18A]/40 flex items-center justify-center">
            <span className="text-[#344E41]/50 font-bold uppercase tracking-widest text-sm">Image Coming Soon</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 md:p-8">
        
        {/* Industry / Subtitle Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
            isDark ? "bg-[#A3B18A] text-[#344E41]" : "bg-[#A3B18A]/20 text-[#588157]"
          }`}>
            {category.industry || category.subtitle}
          </span>
        </div>

        <h3 className="text-2xl font-serif font-extrabold mb-2 leading-tight">
          {category.title}
        </h3>
        
        <p className={`text-sm md:text-base font-medium leading-relaxed mb-4 flex-grow ${
          isDark ? "text-[#FAF3DD]/80" : "text-[#344E41]/80"
        }`}>
          {category.description}
        </p>

        {/* Optional: "What's Inside" for B2B */}
        {category.contents && (
          <div className={`mt-auto pt-4 border-t text-xs font-medium leading-relaxed ${
            isDark ? "border-white/10 text-[#FAF3DD]/60" : "border-black/5 text-[#344E41]/60"
          }`}>
            <strong className={isDark ? "text-white" : "text-[#344E41]"}></strong> {category.contents}
          </div>
        )}
      </div>
    </Link>
  );
}
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id?: string | number; 
    name: string;
    description: string;
    price: string | number;
    imageUrl?: string | string[]; 
    badge?: string;
    material?: string;
    materials?: string[];
  };
  currentPath?: string;
}

export default function ProductCard({ product, currentPath }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  // Safely extract the primary image
  const rawImageUrl = Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl;
  const fallbackImage = "https://placehold.co/600x600/FAF3DD/344E41?text=No+Image";

  // --- BULLETPROOF URL FORMATTER ---
  const getSafeUrl = (url: string | undefined) => {
    if (!url || url.trim() === '') return fallbackImage;
    let formattedUrl = url.trim();
    
    if (!formattedUrl.startsWith('http') && !formattedUrl.startsWith('/')) {
      formattedUrl = '/' + formattedUrl;
    }
    
    try {
      // Prevents double-encoding while safely encoding spaces and special characters
      return encodeURI(decodeURI(formattedUrl));
    } catch (e) {
      // Fallback if decodeURI fails due to a malformed string
      return formattedUrl.replace(/ /g, '%20');
    }
  };

  const safeImageUrl = getSafeUrl(rawImageUrl);
  const displayUrl = imageFailed ? fallbackImage : safeImageUrl;

  const materialsList = product.materials?.length 
    ? product.materials 
    : product.material 
      ? [product.material] 
      : [];

  const enquiryType = currentPath === 'commercial' ? 'Business' : 'Individual';

  return (
    <div className="bg-[#344E41] p-5 md:p-6 rounded-[2rem] shadow-lg flex flex-col gap-5 relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full border border-black/5">
      
      <Link href={`/productDetails/${product.id}`} className="flex flex-col gap-5 flex-grow cursor-pointer outline-none">
        
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-[#FAF3DD]/5">
          <Image 
            src={displayUrl} 
            alt={product.name || 'Product'} 
            fill
            unoptimized // CRITICAL for Hostinger
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setImageFailed(true)}
          />
          
          {product.badge && product.badge.trim() !== '' && (
            <div className="absolute top-4 right-4 bg-[#A3B18A] text-[#344E41] px-4 py-1.5 rounded-full font-bold text-[10px] md:text-xs tracking-wider shadow-md z-10 uppercase backdrop-blur-md">
              {product.badge}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow gap-2 px-1">
          <h3 className="font-serif font-bold text-xl md:text-2xl text-[#FAF3DD] leading-tight group-hover:text-[#A3B18A] transition-colors duration-300">
            {product.name}
          </h3>
          
          <p className="text-sm font-sans font-medium text-[#FAF3DD]/70 flex-grow leading-relaxed line-clamp-2">
            {product.description}
          </p>
          
          {materialsList.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {materialsList.slice(0, 3).map((mat, idx) => (
                <span 
                  key={idx} 
                  className="bg-[#A3B18A]/10 border border-[#A3B18A]/20 text-[#A3B18A] text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg whitespace-nowrap"
                >
                  {mat}
                </span>
              ))}
              {materialsList.length > 3 && (
                <span className="text-[#A3B18A] text-[10px] md:text-xs font-bold pl-1">
                  +{materialsList.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      <div className="mt-auto pt-4 w-full border-t border-[#FAF3DD]/10">
        <Link href={`/enquiry?product=${encodeURIComponent(product.name || 'Product')}&type=${enquiryType}`} className="block w-full outline-none">
          <button className="w-full bg-[#FAF3DD] text-[#344E41] px-6 py-3.5 md:py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 active:scale-[0.98] group-hover:bg-[#A3B18A] shadow-sm group-hover:shadow-md">
            Enquire Now
          </button>
        </Link>
      </div>
    </div>
  );
}
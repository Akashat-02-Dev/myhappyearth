// src/components/shop/ProductCard.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id?: string | number; 
    name: string;
    description: string;
    price: string | number;
    rating: number;
    imageUrl?: string | string[]; 
    badge?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const rawImageUrl = Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl;
  
  const safeImageUrl = rawImageUrl && rawImageUrl.trim() !== '' 
    ? rawImageUrl 
    : '/images/blog/beach-sunset.jpg'; 

  const displayUrl = imageFailed ? '/images/blog/beach-sunset.jpg' : safeImageUrl;

  return (
    <div className="bg-earth-forest p-6 rounded-[2rem] shadow-xl flex flex-col gap-5 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full border border-earth-light/5">
      
      <Link href={`/productDetails/${product.id}`} className="flex flex-col gap-5 flex-grow cursor-pointer">
        
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-earth-light/5">
          <Image 
            src={displayUrl} 
            alt={product.name || 'Product'} 
            fill
            // Removed unoptimized={true} so Next.js can shrink the image payloads!
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => {
              console.warn(`Failed to load image for: ${product.name}`);
              setImageFailed(true);
            }}
          />
          
          {product.badge && product.badge.trim() !== '' && (
            <div className="absolute top-4 right-4 bg-[#A3B18A] text-[#344E41] px-4 py-1.5 rounded-full font-bold text-xs tracking-wide shadow-md z-10 uppercase">
              {product.badge}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow gap-1.5 px-2">
          <h3 className="font-bold text-xl text-earth-light leading-tight group-hover:text-[#A3B18A] transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm font-medium text-earth-light/70 flex-grow leading-relaxed mb-2 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span 
                key={i} 
                className={`text-lg ${i < (product.rating || 0) ? 'text-[#A3B18A]' : 'text-earth-light/20'}`}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-3 mt-auto pt-2">
        <Link href={`/enquiry?product=${encodeURIComponent(product.name || 'Product')}`} className="flex-grow block">
          <button className="w-full bg-earth-light text-earth-forest px-6 py-3.5 rounded-2xl font-bold text-base hover:bg-white hover:shadow-lg transition-all duration-300 active:scale-[0.97]">
            Enquire
          </button>
        </Link>
        
        <button className="p-3.5 bg-earth-light/10 rounded-2xl text-earth-light hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 active:scale-[0.97] flex-shrink-0">
          <Heart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
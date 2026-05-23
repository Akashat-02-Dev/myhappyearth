// src/components/CategoryCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Premium Unsplash images for your categories.
const CATEGORY_IMAGES: Record<string, string> = {
  "Sustainable Bags": "https://plus.unsplash.com/premium_photo-1672977345139-54ca2d1db475?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Compostable Products": "https://images.unsplash.com/photo-1602925607562-7c8055e642bd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Biodegradable Products": "https://images.unsplash.com/photo-1635719917567-d9aa1a454ee4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Table Products": "https://images.unsplash.com/photo-1723934603562-9a99eeb6bb23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Natura Dine": "https://images.unsplash.com/photo-1708893490503-7aeeb38f638e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Zero Waste": "https://images.unsplash.com/photo-1633878353628-5fc8b983325c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Eco-Serve": "https://images.unsplash.com/photo-1648587456176-4969b0124b12?q=80&w=1259&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Recycled Plastic": "https://images.unsplash.com/photo-1683777072528-1caf12cb1e37?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

interface CategoryCardProps {
  title: string;
}

export default function CategoryCard({ title }: CategoryCardProps) {
  // State to track if the Next.js image fails to load
  const [imageFailed, setImageFailed] = useState(false);

  if (!title) return null;

  // Get the target image or an empty string if not found
  const targetImage = CATEGORY_IMAGES[title] || "";

  return (
    <Link 
      href={`/products/shop?category=${encodeURIComponent(title)}`} 
      className="relative block group w-full aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#FAF3DD] border border-[#A3B18A]/20"
    >
      
      {/* RENDER IMAGE OR CSS FALLBACK */}
      {!imageFailed && targetImage ? (
        <Image 
          src={targetImage}
          alt={`${title} category`}
          fill
          className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          // If the image fails (e.g., config error or network drop), switch to the CSS fallback
          onError={() => setImageFailed(true)}
        />
      ) : (
        // PURE CSS FALLBACK: No external domains required! 
        // Uses your professional professional gradient (Earth Sage to Earth Deep)
        <div className="absolute inset-0 bg-gradient-to-br from-[#A3B18A] to-[#344E41] transform group-hover:scale-110 transition-transform duration-700 ease-in-out flex items-center justify-center">
          {/* Subtle decorative leaf/texture element can go here if desired */}
          <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
      )}

      {/* DARK OVERLAY for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70 group-hover:via-black/20 group-hover:to-black/80 transition-colors duration-500"></div>

      {/* TEXT LABEL OVERLAY */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-center">
        <h3 className="font-sans font-bold text-center text-lg md:text-xl lg:text-2xl text-white drop-shadow-lg transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 tracking-wide">
          {title}
        </h3>
      </div>

    </Link>
  );
}
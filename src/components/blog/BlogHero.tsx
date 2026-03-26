import React from 'react';
import Image from 'next/image';

export default function BlogHero() {
  return (
    <div className="relative w-full h-[75vh] min-h-[950px] lg:h-[75vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <Image
        src="/images/blog/blog-hero.jpeg" // Place your downloaded image in public/images/blog/
        alt="Woman writing sustainably at a desk"
        fill
        className="object-cover object-center"
        priority
      />
      
      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-black/20 to-black/50"></div>
      
      {/* Text Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col gap-6 pt-16">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif italic text-white drop-shadow-xl leading-tight tracking-wide">
          Stories That Inspire<br className="hidden md:block" /> Change
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/95 drop-shadow-md font-medium tracking-wide">
          Insights, tips and stories about living sustainably in Australia
        </p>
      </div>

    </div>
  );
}
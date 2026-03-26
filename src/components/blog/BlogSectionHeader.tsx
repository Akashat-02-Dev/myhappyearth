// src/components/blog/BlogSectionHeader.tsx
import React from 'react';
import Image from 'next/image';

// Green leaf icon placeholder, or use the actual icon as an image/SVG
const LeafIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0C9 0 9 7.02944 5.92641 10.103C2.85282 13.1766 0 13.1766 0 13.1766M9 0C9 0 13.1766 2.85282 13.1766 5.92641C13.1766 9 13.1766 11.8528 10.103 14.9264C7.02944 18 0 18 0 18M0 18L9 9M9 0C9 0 15 0 18 3C21 6 21 12 21 12" stroke="#2E473D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function BlogSectionHeader() {
  return (
    <div className="flex flex-col items-center justify-center mb-16 text-center">
      
      {/* Logo Group */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold font-serif text-[#2E473D]">🌿 My Happy Earth</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2E473D] max-w-4xl">
        Edtiroal is Blog Blog
      </h1>
    </div>
  );
}
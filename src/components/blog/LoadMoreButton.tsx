// src/components/blog/LoadMoreButton.tsx
import React from 'react';

// Right arrow icon SVG
const ArrowIcon = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 1L19 7L13 13M1 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function LoadMoreButton() {
  return (
    <div className="mt-16 text-center">
      <button className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border-2 border-[#2E473D] text-[#2E473D] rounded-full text-base font-sans font-semibold hover:bg-[#2E473D] hover:text-white transition-colors duration-300">
        Load More Articles
        <ArrowIcon />
      </button>
    </div>
  );
}
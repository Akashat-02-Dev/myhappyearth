"use client";

import React, { useState } from 'react';

// Defining the exact colors from your design mockup
const categories = [
  { name: 'All', bg: 'bg-[#B4CFA6]' },               // Light Sage Green
  { name: 'Sustainability Tips', bg: 'bg-[#9C5A3C]' }, // Rust Brown
  { name: 'Product Guides', bg: 'bg-[#CD8B5A]' },      // Warm Orange/Tan
  { name: 'News', bg: 'bg-[#D6CBB7]', text: 'text-gray-800' }, // Beige (dark text for contrast)
  { name: 'Australian Living', bg: 'bg-[#768453]' },   // Olive Green
  { name: 'Business', bg: 'bg-[#B85C42]' },            // Terracotta
];

export default function CategoryFilterBar() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    // The background color matches the warm khaki/tan from the image
    <div className="w-full bg-[#CFC5A5] py-8 px-4 md:px-8 shadow-inner">
      <div className="max-w-6xl mx-auto flex items-center justify-center flex-wrap gap-4 md:gap-6">
        
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`
              ${category.bg} 
              ${category.text || 'text-white'}
              ${activeCategory === category.name ? 'ring-4 ring-white/40 scale-105' : 'hover:scale-105'}
              px-6 py-2.5 rounded-xl font-semibold text-sm md:text-base 
              transition-all duration-300 shadow-md active:scale-95
            `}
          >
            {category.name}
          </button>
        ))}

      </div>
    </div>
  );
}
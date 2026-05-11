"use client";

import React, { useState } from 'react';

// Blending the buttons perfectly with your Earth theme variables
const categories = [
  { name: 'All', bg: 'bg-[#344E41]', text: 'text-[#FAF3DD]' },                 // Earth Deep
  { name: 'Sustainability Tips', bg: 'bg-[#3A5A40]', text: 'text-[#FAF3DD]' },   // Earth Forest
  { name: 'Product Guides', bg: 'bg-[#588157]', text: 'text-[#FAF3DD]' },        // Earth Leaf
  { name: 'News', bg: 'bg-[#FAF3DD]', text: 'text-[#344E41]' },                  // Earth Light (Dark text for legibility)
  { name: 'Australian Living', bg: 'bg-[#A3B18A]', text: 'text-[#344E41]' },     // Earth Sage (Dark text for legibility)
  { name: 'Business', bg: 'bg-[#3A5A40]', text: 'text-[#FAF3DD]' },              // Earth Forest
];

export default function CategoryFilterBar() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    // The background color matches the warm khaki/tan exactly as requested
    <div className="w-full bg-[#CFC5A5] py-8 px-4 md:px-8 shadow-inner">
      <div className="max-w-6xl mx-auto flex items-center justify-center flex-wrap gap-4 md:gap-6">
        
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`
              ${category.bg} 
              ${category.text}
              ${activeCategory === category.name 
                ? 'ring-4 ring-[#344E41]/30 scale-105 opacity-100' // Uses Earth Deep with opacity for the active ring
                : 'hover:scale-105 opacity-85 hover:opacity-100'   // Slight opacity fade for inactive items
              }
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
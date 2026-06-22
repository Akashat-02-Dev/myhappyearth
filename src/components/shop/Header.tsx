"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  availableCategories?: string[]; 
}

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  availableCategories 
}: HeaderProps) {
  
  // Uses the dynamically filtered categories from ShopContent based on the active Path
  // Falls back to a safe default if the data is still loading
  const categories = availableCategories && availableCategories.length > 0 
    ? availableCategories 
    : ['All'];

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* SEARCH BAR */}
      <div className="relative w-full max-w-3xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 md:w-6 md:h-6" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search sustainable products, materials, or bundles..."
          className="w-full bg-white border border-gray-200 pl-14 md:pl-16 pr-6 py-3.5 md:py-4 rounded-full font-medium text-base md:text-lg text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#6F9B69] focus:border-[#6F9B69] transition duration-200 outline-none shadow-sm"
        />
      </div>

      {/* CATEGORY PILLS (Scrollable on Mobile) */}
      <div className="relative w-full overflow-hidden">
        {/* Tailwind trick: 
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] 
          hides the scrollbar across all browsers while keeping swipe-to-scroll active.
        */}
        <div className="flex overflow-x-auto pb-4 -mb-4 snap-x gap-3 md:gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-1 px-1">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            
            return (
              <button 
                key={category} 
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 snap-start px-6 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 border ${
                  isActive 
                    ? 'bg-[#6F9B69] border-[#6F9B69] text-white shadow-md transform scale-[1.02]' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#6F9B69] hover:text-[#6F9B69] hover:bg-[#6F9B69]/5 hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
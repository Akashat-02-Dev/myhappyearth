// src/components/products/ProductsCategoriesSection.tsx
"use client";

import React from 'react';
import { personalCategories, commercialCategories } from '@/data/productsCategoriesData';
import RichCategoryCard from './RichCategoryCard';

export default function ProductsCategoriesSection() {
  // Combine both paths into a single array, assigning their respective themes
  const allCategories = [
    ...personalCategories.map(cat => ({ ...cat, theme: "light" as const })),
    ...commercialCategories.map(cat => ({ ...cat, theme: "dark" as const }))
  ];

  return (
    <section 
      id="product-grid" 
      className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-earth-light flex flex-col items-center justify-center relative z-20"
    >
      
      {/* MAIN SECTION HEADLINES */}
      <div className="text-center mb-16 md:mb-20">
        <span className="font-sans font-bold text-earth-deep opacity-60 tracking-widest uppercase text-sm mb-3 block">
          Curated For Change
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-earth-deep mb-4 leading-tight drop-shadow-sm">
          Shop by Category
        </h2>
        <div className="h-1.5 w-28 bg-earth-sage mx-auto rounded-full mt-4"></div>
      </div>

      {/* THE CATEGORY GRID CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[90rem] mx-auto">
        
        {/* MAP OVER COMBINED DATA AND RENDER RICH CARDS */}
        {allCategories.map((category) => (
          <RichCategoryCard 
            key={category.id} 
            category={category} 
            theme={category.theme} 
          />
        ))}
        
      </div>
    </section>
  );
}
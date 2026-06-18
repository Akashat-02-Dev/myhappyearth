// src/app/products/personal/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RichCategoryCard from '@/components/products/RichCategoryCard';
import { personalCategories } from '@/data/productsCategoriesData';
import { ArrowLeft } from 'lucide-react'; // Added icon

export default function PersonalShopPage() {
  const router = useRouter(); // Initialize router for back navigation

  return (
    <main className="relative w-full bg-[#FAF3DD] min-h-screen flex flex-col">
      <div className="absolute top-0 w-full z-50">
        <Navbar invert={true} /> 
      </div>

      {/* Back Button Section */}
      <div className="pt-32 px-6 md:px-12 lg:px-24 w-full max-w-[1400px] mx-auto z-10 relative">
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors duration-300 text-[#588157] hover:text-[#344E41] group outline-none"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" /> Back
        </button>
      </div>

      {/* Hero Header */}
      <div className="pt-8 pb-16 px-6 md:px-12 lg:px-24 text-center">
        <span className="text-[#588157] font-bold tracking-widest uppercase text-sm mb-4 block">
          Path 1: Everyday Earth
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-[#344E41] mb-6 drop-shadow-md">
          Personal Shop
        </h1>
        <p className="text-lg md:text-xl text-[#344E41]/80 max-w-2xl mx-auto font-medium leading-relaxed">
          Small swaps for your daily life. Curated for individuals and sustainable homes.
        </p>
      </div>

      {/* Grid */}
      <div className="flex-grow px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalCategories.map((cat) => (
            <RichCategoryCard key={cat.id} category={cat} theme="light" />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
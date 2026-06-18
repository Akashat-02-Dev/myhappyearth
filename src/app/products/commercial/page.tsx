// src/app/products/commercial/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RichCategoryCard from '@/components/products/RichCategoryCard';
import { commercialCategories } from '@/data/productsCategoriesData';
import { ArrowLeft } from 'lucide-react'; // Added icon

export default function CommercialShopPage() {
  const router = useRouter(); // Initialize router for back navigation

  return (
    <main className="relative w-full bg-[#344E41] min-h-screen flex flex-col">
      <div className="absolute top-0 w-full z-50">
        <Navbar invert={true} isLockedDark={true} /> 
      </div>

      {/* Back Button Section */}
      <div className="pt-32 px-6 md:px-12 lg:px-24 w-full max-w-[1400px] mx-auto z-10 relative">
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors duration-300 text-[#A3B18A] hover:text-[#FAF3DD] group outline-none"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" /> Back
        </button>
      </div>

      {/* Hero Header */}
      <div className="pt-8 pb-16 px-6 md:px-12 lg:px-24 text-center">
        <span className="text-[#A3B18A] font-bold tracking-widest uppercase text-sm mb-4 block">
          Path 2: Earth at Scale
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-[#FAF3DD] mb-6 drop-shadow-md">
          Commercial Bundles
        </h1>
        <p className="text-lg md:text-xl text-[#FAF3DD]/80 max-w-2xl mx-auto font-medium leading-relaxed">
          Sustainability for your whole operation. Ready-to-order commercial bundles meticulously designed for your industry.
        </p>
      </div>

      {/* Grid */}
      <div className="flex-grow px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commercialCategories.map((cat) => (
            <RichCategoryCard key={cat.id} category={cat} theme="dark" />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
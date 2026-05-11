// src/components/CategoryCarousel.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryCard from './CategoryCard';

const CATEGORIES = [
  "Sustainable Bags", 
  "Compostable Products", 
  "Biodegradable Products", 
  "Table Products", 
  "Natura Dine", 
  "Zero Waste", 
  "EcoServe", 
  "Recycled Plastic"
];

export default function CategoryCarousel() {
  const [items, setItems] = useState(CATEGORIES);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  // --- APPLE-STYLE ANIMATION PHYSICS ---
  // Using a custom spring-like ease-out curve for that premium, fluid snap
  const springEase = 'cubic-bezier(0.25, 1, 0.5, 1)';
  const animationDuration = 700; 

  const handleNext = useCallback(() => {
    if (isAnimating || !cardRef.current) return;
    setIsAnimating(true);
    
    const cardWidth = cardRef.current.offsetWidth;
    const gap = 24; // 24px matches Tailwind's gap-6
    
    setTransitionEnabled(true);
    setOffset(-(cardWidth + gap));

    setTimeout(() => {
      setTransitionEnabled(false);
      setItems(prev => [...prev.slice(1), prev[0]]); 
      setOffset(0);
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    }, animationDuration); 
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating || !cardRef.current) return;
    setIsAnimating(true);

    const cardWidth = cardRef.current.offsetWidth;
    const gap = 24; 

    setTransitionEnabled(false);
    setItems(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setOffset(-(cardWidth + gap));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setOffset(0);
        setTimeout(() => setIsAnimating(false), animationDuration);
      });
    });
  }, [isAnimating]);

  useEffect(() => {
    if (isHovered) return; 
    const timer = setInterval(handleNext, 5000); // Slightly longer pause for a calmer reading pace
    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  return (
    <section className="relative w-full py-20 md:py-32 bg-[#FAF3DD] overflow-hidden">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-12 lg:px-24 mb-12 md:mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#344E41] tracking-tight mb-4">
            Shop by Category
          </h2>
          <p className="text-[#588157] text-lg md:text-xl font-medium tracking-wide">
            Explore our curated sustainable collections.
          </p>
        </div>

        {/* Glassmorphic Navigation Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={handlePrev}
            disabled={isAnimating}
            className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/40 backdrop-blur-md border border-[#063c60]/10 text-[#063c60] hover:border-transparent hover:text-white transition-all duration-500 ease-out shadow-sm hover:shadow-[0_8px_30px_rgba(236,105,23,0.3)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            aria-label="Previous categories"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#063c60] to-[#ec6917] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ChevronLeft className="w-6 h-6 relative z-10 transform group-hover:-translate-x-0.5 transition-transform duration-300" strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={isAnimating}
            className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/40 backdrop-blur-md border border-[#063c60]/10 text-[#063c60] hover:border-transparent hover:text-white transition-all duration-500 ease-out shadow-sm hover:shadow-[0_8px_30px_rgba(236,105,23,0.3)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            aria-label="Next categories"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#063c60] to-[#ec6917] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ChevronRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Interactive Carousel Container */}
      <div 
        className="relative w-full px-6 md:px-12 lg:px-24"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)} 
        onTouchEnd={() => setIsHovered(false)}
      >
        <div 
          className="flex gap-6 w-full"
          style={{ 
            transform: `translateX(${offset}px)`,
            transition: transitionEnabled ? `transform ${animationDuration}ms ${springEase}` : 'none'
          }}
        >
          {items.map((category, index) => (
            <div 
              key={category} 
              ref={index === 0 ? cardRef : null}
              // Enhanced responsive widths. Exactly 4 on desktop, 3 on large tablets, 2 on small tablets, 1.2 on mobile.
              className="flex-shrink-0 w-[80vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              <CategoryCard title={category} />
            </div>
          ))}
        </div>
        
        {/* Soft edge masks for depth */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#FAF3DD] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#FAF3DD] to-transparent z-10 pointer-events-none"></div>
      </div>
      
    </section>
  );
}
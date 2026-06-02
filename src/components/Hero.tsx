// src/components/Hero.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define the array of slides containing both the background image and its specific tagline
const heroSlides = [
  {
    image: "/hero-bg.png",
    tagline: "Passing down traditions, not pollution. Clean coastlines. Zero waste"
  },
  {
    image: "/hero-bg-2.jpg", // Add this to your public folder
    tagline: "This is what we are fighting to protect"
  },
  {
    image: "/hero-bg-3.png",
    tagline: "Their home is beautiful. We are making it unlivable."
  },
  {
    image: "/hero-bg-4.png", // Add this to your public folder
    tagline: "What if the choices you made today saved the oceans tomorrow?"
  }
];

export default function Hero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Effect to handle the auto-sliding logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      // Move to the next image, loop back to 0 if at the end
      setCurrentBgIndex((prevIndex) => 
        prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Changes image every 5 seconds (5000ms)

    // Cleanup interval on unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-16 md:pb-24 overflow-hidden">
      
      {/* Background Image Carousel Container */}
      {/* We map through the images and render them all stacked on top of each other.
          Only the one matching currentBgIndex gets opacity-100, the rest are opacity-0.
          Tailwind handles the smooth fade transition. 
      */}
      {heroSlides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center brightness-[0.6] saturate-[0.9] transition-opacity duration-1000 ease-in-out ${
            index === currentBgIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }} 
        >
          {/* Only render the dark overlay on the active image to avoid stacking overlays */}
          {index === currentBgIndex && (
            <div className="absolute inset-0 bg-earth-deep/20 transition-opacity duration-1000"></div>
          )}
        </div>
      ))}

      {/* Main Content Container (z-10 ensures it stays above the fading backgrounds) */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 md:pl-12 md:pr-6 lg:pl-24 lg:pr-8 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-8 h-full">
        
        {/* Left Column (Main Brand Text) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[45%] xl:w-[40%] pt-8 md:pt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-earth-light leading-tight mb-4 drop-shadow-lg">
            My Happy <br className="hidden sm:block" /> Earth
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-sans text-earth-sage mb-8 drop-shadow-md md:pr-6">
            Australia's Home of Sustainable Living
          </p>
          <Link href="/products/shop">
            <button className="bg-earth-light text-earth-forest px-8 py-3 rounded-full font-semibold hover:bg-white transition duration-300 shadow-xl hover:-translate-y-1">
              Explore Products
            </button>
          </Link>
          
          {/* Carousel Indicators (Little dots showing which image is active) */}
          <div className="flex gap-2 mt-8 md:mt-12">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBgIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentBgIndex === idx ? 'bg-earth-light w-8' : 'bg-earth-light/40 hover:bg-earth-light/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Right Column (Dynamic Cross-fading Taglines) */}
        <div className="w-full md:w-[50%] lg:w-[55%] xl:w-[50%] md:ml-auto p-6 sm:p-8 flex items-center justify-center md:justify-end h-[200px] md:h-auto relative">
          
          {/* We map through the taglines to cross-fade them perfectly in sync with the backgrounds */}
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute right-6 md:right-8 transition-all duration-1000 ease-in-out flex flex-col items-center md:items-end text-center md:text-right ${
                index === currentBgIndex 
                  ? 'opacity-100 translate-y-0 blur-none' 
                  : 'opacity-0 translate-y-4 blur-sm pointer-events-none'
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white drop-shadow-2xl leading-snug max-w-lg italic font-medium">
                "{slide.tagline}"
              </h2>
            </div>
          ))}
          
        </div>

      </div>
    </section>
  );
}
// src/components/Hero.tsx
"use client";

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
      {/* Centered vertically, aligned to the left horizontally */}
      <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 flex items-center h-full">
        
        {/* Left Column (Dynamic Cross-fading Taglines inheriting original title styling) */}
        <div className="relative w-full md:w-[55%] lg:w-[45%] xl:w-[35%] h-[200px] md:h-[300px] flex items-center">
          
          {/* We map through the taglines to cross-fade them perfectly in sync with the backgrounds */}
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-x-0 transition-all duration-1000 ease-in-out flex flex-col items-center md:items-start text-center md:text-left ${
                index === currentBgIndex 
                  ? 'opacity-100 translate-y-0 blur-none' 
                  : 'opacity-0 translate-y-4 blur-sm pointer-events-none'
              }`}
            >
              {/* Inherited the exact font classes from the original "My Happy Earth" title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-earth-light leading-tight drop-shadow-lg">
                {slide.tagline}
              </h2>
            </div>
          ))}
          
        </div>

      </div>
    </section>
  );
}
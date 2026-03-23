"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define the array of background images
const bgImages = [
  "/hero-bg.jpg",
  "/hero-bg-2.jpg", // Add this to your public folder
  "/hero-bg-3.jpg"  // Add this to your public folder
];

const heroProducts = [
  {
    image: "/products/bamboo-kitchenware.jpg", 
    title: "Bamboo Essentials",
    color: "#D0DBCF" 
  },
  {
    image: "/products/hydrate-bottles.jpg", 
    title: "Hydrate Responsibly",
    color: "#D1C9B9" 
  },
  {
    image: "/products/organic-living.jpg", 
    title: "Organic Living",
    color: "#E2DCD3"
  }
];

function ProductCategoryItem({ image, title, color }: { image: string, title: string, color: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div 
        className="w-full aspect-[4/3] rounded-[1.5rem] bg-center bg-cover border border-earth-forest/10 mb-4 md:mb-5" 
        style={{ 
          backgroundColor: color, 
          backgroundImage: `url(${image})`, 
        }}
      >
        {/* Placeholder text hidden */}
      </div>
      <p className="text-lg md:text-xl font-serif font-bold text-earth-forest tracking-tight leading-tight px-1">
        {title}
      </p>
    </div>
  );
}

export default function Hero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Effect to handle the auto-sliding logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      // Move to the next image, loop back to 0 if at the end
      setCurrentBgIndex((prevIndex) => 
        prevIndex === bgImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Changes image every 5 seconds (5000ms)

    // Cleanup interval on unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-16 md:pb-24">
      
      {/* Background Image Carousel Container */}
      {/* We map through the images and render them all stacked on top of each other.
          Only the one matching currentBgIndex gets opacity-100, the rest are opacity-0.
          Tailwind handles the smooth fade transition. 
      */}
      {bgImages.map((bgSrc, index) => (
        <div 
          key={bgSrc}
          className={`absolute inset-0 bg-cover bg-center brightness-[0.6] saturate-[0.9] transition-opacity duration-1000 ease-in-out ${
            index === currentBgIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${bgSrc})` }} 
        >
          {/* Only render the dark overlay on the active image to avoid stacking overlays */}
          {index === currentBgIndex && (
            <div className="absolute inset-0 bg-earth-deep/20 transition-opacity duration-1000"></div>
          )}
        </div>
      ))}

      {/* Main Content Container (z-10 ensures it stays above the fading backgrounds) */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 md:pl-12 md:pr-6 lg:pl-24 lg:pr-8 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Column (Text) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[40%] xl:w-[35%] pt-8 md:pt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-earth-light leading-tight mb-4 drop-shadow-lg">
            My Happy <br className="hidden sm:block" /> Earth
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-sans text-earth-sage mb-8 drop-shadow-md md:pr-6">
            Australia's Home of Sustainable Living
          </p>
          <Link href="/shop">
            <button className="bg-earth-light text-earth-forest px-8 py-3 rounded-full font-semibold hover:bg-white transition duration-300 shadow-xl hover:-translate-y-1">
              Explore Products
            </button>
          </Link>
          
          {/* Optional: Carousel Indicators (Little dots showing which image is active) */}
          <div className="flex gap-2 mt-8 md:mt-12">
            {bgImages.map((_, idx) => (
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

        {/* Right Column (Products) */}
        <div className="w-full md:w-[55%] lg:w-[60%] xl:w-[62%] md:ml-auto p-6 sm:p-8 bg-earth-light rounded-[2rem] md:rounded-[3rem] shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {heroProducts.map((product, index) => (
              <ProductCategoryItem 
                key={index} 
                image={product.image} 
                title={product.title} 
                color={product.color}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
// src/components/Hero.tsx
"use client";
import { useState, useEffect } from 'react';

const heroSlides = [
  { image: "/hero-bg.png" },
  { image: "/hero-bg-2.jpg" },
  { image: "/hero-bg-3.png" },
  { image: "/hero-bg-4.png" }
];

export default function Hero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background Image Carousel Container */}
      {heroSlides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center brightness-[0.5] transition-opacity duration-1000 ease-in-out ${
            index === currentBgIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }} 
        >
          {index === currentBgIndex && (
            <div className="absolute inset-0 bg-earth-deep/30 transition-opacity duration-1000"></div>
          )}
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 flex items-center h-full">
        <div className="relative w-full md:w-[75%] lg:w-[65%] xl:w-[55%] flex flex-col items-center md:items-start text-center md:text-left text-earth-light gap-8">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight drop-shadow-lg">
            What if the choices you made today saved the oceans tomorrow?
          </h1>
          
          <p className="text-lg md:text-xl font-sans font-medium text-earth-light/90 drop-shadow-md leading-relaxed max-w-2xl">
            We're building a movement of everyday people refusing to be part of the plastic problem. One small swap at a time, we're cleaning coastlines, restoring forests, and proving that another way of living is possible.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-earth-sage text-earth-deep px-8 py-4 rounded-full font-bold text-lg hover:bg-earth-light transition-colors shadow-lg hover:shadow-xl">
              Join the Movement
            </button>
            <button className="w-full sm:w-auto bg-transparent border-2 border-earth-light text-earth-light px-8 py-4 rounded-full font-bold text-lg hover:bg-earth-light/10 transition-colors shadow-lg">
              Explore Sustainable Solutions
            </button>
          </div>

          {/* Hero Stat Strip */}
          <div className="mt-6 md:mt-10 pt-6 border-t border-earth-light/20 flex flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold tracking-widest uppercase text-earth-light/90">
            <span>3,500+ people taking action</span>
            <span className="hidden sm:inline">·</span>
            <span>50,000 trees planted</span>
            <span className="hidden sm:inline">·</span>
            <span>800kg plastic diverted</span>
          </div>

        </div>
      </div>
    </section>
  );
}
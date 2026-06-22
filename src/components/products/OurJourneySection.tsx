"use client";

import React from 'react';
import JourneyCtaPanel from './JourneyCtaPanel';
import Image from 'next/image';

// You can move this data back to a data file later, 
// but keeping it here makes the new "Paths" concept easy to manage.
const journeyPaths = [
  {
    id: "path-1",
    icon: "🌱",
    title: "Everyday Earth",
    subtitle: "Small swaps for your daily life",
    buttonText: "Explore Personal Shop",
    linkUrl: "/products/personal", // Update with your actual route
    imageUrl: "https://images.unsplash.com/photo-1679466230930-4c53a8f0a699?q=80&w=1224&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with an actual B2C image
    theme: "light" as const,
  },
  {
    id: "path-2",
    icon: "🌏",
    title: "Earth at Scale",
    subtitle: "Sustainability for your whole operation",
    buttonText: "Explore Commercial Shop",
    linkUrl: "/products/commercial", // Update with your actual route
    imageUrl: "https://plus.unsplash.com/premium_photo-1737180621286-c2250ccce178?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with an actual B2B image
    theme: "dark" as const,
  }
];

export default function OurJourneySection() {
  return (
    <section 
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-fixed bg-[#FAF3DD]"
      style={{ backgroundImage: "url('/images/journey-bg.jpg')" }}
    >
      {/* Background Overlay for readability if using a background image */}
      <div className="absolute inset-0 bg-[#FAF3DD]/50 backdrop-blur-sm"></div>

      <div className="container relative mx-auto px-4 max-w-[1200px] z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[#A3B18A] font-bold tracking-widest uppercase text-sm mb-3">Choose Your Experience</span>
          <div className="flex items-center gap-3 text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-[#344E41] group cursor-pointer drop-shadow-sm">
                <Image
                  src="/logo.png"
                  alt="My Happy Earth Logo"
                  width={400} // High resolution source width to prevent any blur
                  height={100} // High resolution source height
                  quality={100}
                  priority 
                  className="w-auto h-20 object-contain" // Tailwind 'h-20' class applied here
                /> 
            <span className="group-hover:text-[#A3B18A] transition-colors duration-300">My Happy Earth</span>
          </div>
          <p className="font-sans font-medium text-lg md:text-xl text-[#344E41]/70 mt-4 max-w-2xl">
            Whether you are making sustainable choices for your home, or outfitting an entire enterprise, we have a path for you.
          </p>
        </div>

        {/* PATH PANELS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {journeyPaths.map((panel) => (
            <JourneyCtaPanel 
              key={panel.id}
              {...panel}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
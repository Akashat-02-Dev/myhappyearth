// src/components/impact/TimelineSection.tsx
"use client";
import React from 'react';

// We bypass the old impactData.ts timeline array and use this highly relevant lifecycle data
const circularSteps = [
  {
    step: "01",
    title: "Ethically Sourced",
    description: "We harvest materials like bamboo, jute, and organic cotton from renewable resources, ensuring native ecosystems are protected and never depleted.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a8.995 8.995 0 0 1-6-8c2.5 0 5 1.5 6 8zm0 0c1-6 3.5-8 6-8a8.995 8.995 0 0 1-6 8z" />
      </svg>
    )
  },
  {
    step: "02",
    title: "Mindful Manufacturing",
    description: "Our products are crafted in facilities that prioritize fair wages, safe working conditions, and minimal water and energy consumption.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.485-7.071l-1.414 1.414M6.929 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.929 6.343L5.515 4.929M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    )
  },
  {
    step: "03",
    title: "Zero-Waste Delivery",
    description: "Every order is packed in 100% plastic-free, home-compostable packaging and shipped using carbon-neutral freight methods.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12M7.5 4.21l4.5 2.6 4.5-2.6" />
      </svg>
    )
  },
  {
    step: "04",
    title: "Return to Earth",
    description: "Designed for a true circular economy. When a product reaches the end of its life, it safely biodegrades, leaving no trace behind.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
      </svg>
    )
  }
];

export default function TimelineSection() {
  return (
    <section className="w-full bg-earth-light py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left Column: Sticky Header Section */}
          <div className="lg:w-5/12 flex flex-col items-start lg:sticky lg:top-40 h-fit z-20">
            <div className="bg-earth-sage/10 px-4 py-2 rounded-full border border-earth-sage/20 mb-6">
              <span className="font-sans font-bold text-earth-forest tracking-widest uppercase text-xs md:text-sm">
                How We Do It
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-earth-deep leading-[1.15] mb-6">
              The Eco-Friendly<br/> Journey.
            </h2>
            
            <p className="text-lg md:text-xl text-earth-deep/70 font-medium leading-relaxed mb-8">
              Sustainability isn't just an end goal; it's woven into every single step of our process. From the soil, back to the soil.
            </p>
            
            <div className="hidden lg:block w-20 h-1 bg-earth-sage/50 rounded-full mt-4"></div>
          </div>

          {/* Right Column: Flowing Cards */}
          <div className="lg:w-7/12 flex flex-col gap-8 md:gap-10 relative">
            
            {/* Subtle visual connector line for desktop */}
            <div className="hidden md:block absolute left-[3.25rem] top-12 bottom-12 w-px bg-gradient-to-b from-earth-sage/10 via-earth-sage/40 to-earth-sage/10 z-0"></div>

            {circularSteps.map((item, index) => (
              <div 
                key={index} 
                className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-earth-deep/5 group hover:-translate-y-1"
              >
                
                {/* Step Indicator & Icon */}
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-earth-light text-earth-forest group-hover:bg-earth-forest group-hover:text-white transition-colors duration-500 shadow-inner relative overflow-hidden">
                  <span className="absolute -bottom-2 -right-1 text-5xl md:text-6xl font-extrabold text-earth-deep/5 group-hover:text-white/10 transition-colors duration-500 pointer-events-none select-none">
                    {item.step}
                  </span>
                  <div className="relative z-10 [&>svg]:w-7 [&>svg]:h-7 md:[&>svg]:w-8 md:[&>svg]:h-8 transition-transform duration-500 group-hover:scale-110">
                    {item.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col justify-center">
                  <span className="text-earth-sage font-bold font-sans tracking-widest text-xs md:text-sm uppercase mb-2">
                    Step {item.step}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-earth-deep mb-3 group-hover:text-earth-forest transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-base md:text-lg text-earth-deep/70 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
                
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
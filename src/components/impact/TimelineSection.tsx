// src/components/impact/TimelineSection.tsx
import React from 'react';

// We bypass the old impactData.ts timeline array and use this highly relevant lifecycle data
const circularSteps = [
  {
    step: "01",
    title: "Ethically Sourced",
    description: "We harvest materials like bamboo, jute, and organic cotton from renewable resources, ensuring native ecosystems are protected and never depleted.",
    icon: (
      <svg className="w-8 h-8 text-earth-forest" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a8.995 8.995 0 0 1-6-8c2.5 0 5 1.5 6 8zm0 0c1-6 3.5-8 6-8a8.995 8.995 0 0 1-6 8z" />
      </svg>
    )
  },
  {
    step: "02",
    title: "Mindful Manufacturing",
    description: "Our products are crafted in facilities that prioritize fair wages, safe working conditions, and minimal water and energy consumption.",
    icon: (
      <svg className="w-8 h-8 text-earth-forest" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.485-7.071l-1.414 1.414M6.929 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.929 6.343L5.515 4.929M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    )
  },
  {
    step: "03",
    title: "Zero-Waste Delivery",
    description: "Every order is packed in 100% plastic-free, home-compostable packaging and shipped using carbon-neutral freight methods.",
    icon: (
      <svg className="w-8 h-8 text-earth-forest" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12M7.5 4.21l4.5 2.6 4.5-2.6" />
      </svg>
    )
  },
  {
    step: "04",
    title: "Return to Earth",
    description: "Designed for a true circular economy. When a product reaches the end of its life, it safely biodegrades, leaving no trace behind.",
    icon: (
      <svg className="w-8 h-8 text-earth-forest" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
      </svg>
    )
  }
];

export default function TimelineSection() {
  return (
    <section className="w-full bg-earth-light py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="font-sans font-bold text-earth-sage tracking-widest uppercase text-sm mb-4 block">
            How We Do It
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-earth-deep leading-tight">
            The EcoFriendly Journey
          </h2>
          <p className="mt-6 text-lg md:text-xl text-earth-deep/70 max-w-2xl mx-auto font-medium leading-relaxed">
            Sustainability isn't just an end goal; it's woven into every single step of our process. From the soil, back to the soil.
          </p>
        </div>

        <div className="relative w-full">
          {/* Central Vertical Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-earth-sage/40 md:-translate-x-1/2 rounded-full"></div>

          <div className="flex flex-col gap-16 md:gap-24">
            {circularSteps.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row items-start md:items-center w-full group ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Central Node / Icon */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-earth-light border-2 border-earth-forest shadow-lg z-10 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>

                  {/* Empty space for the other half of the grid on desktop */}
                  <div className="hidden md:block md:w-1/2"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-20 lg:pr-28 text-left md:text-right' : 'md:pl-20 lg:pl-28 text-left'}`}>
                    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-earth-forest/5 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500">
                      <span className="font-serif font-bold text-earth-sage text-2xl mb-2 block">
                        {item.step}.
                      </span>
                      <h3 className="text-2xl md:text-3xl font-sans font-bold text-earth-deep mb-4">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-earth-deep/80 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
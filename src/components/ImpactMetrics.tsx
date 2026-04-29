"use client";

import { FC, JSX } from 'react';

interface Metric {
  id: number;
  number: string;
  label: string;
  icon: JSX.Element;
}

const metricsData: Metric[] = [
  {
    id: 1,
    number: "500+",
    label: "Products Recycled",
    icon: (
      <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    )
  },
  {
    id: 2,
    number: "1,200+",
    label: "Trees Planted",
    icon: (
      <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    )
  },
  {
    id: 3,
    number: "800kg",
    label: "Plastic Diverted",
    icon: (
      <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0m-16-6c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0" />
      </svg>
    )
  },
  {
    id: 4,
    number: "3,500+",
    label: "Happy Customers",
    icon: (
      <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  }
];

const ImpactMetrics: FC = () => {
  // We only need to double the array once for a CSS marquee to loop perfectly
  const extendedMetrics = [...metricsData, ...metricsData];

  return (
    <section className="w-full bg-[#588157] text-[#FAF3DD] py-12 overflow-hidden flex items-center border-y border-[#FAF3DD]/10">
      
      {/* Injecting custom CSS styles for the smooth marquee effect. 
        It shifts the entire container exactly 50% to the left, which perfectly aligns 
        the duplicate set with the original set before instantly looping back to 0. 
      */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite; /* Adjust 25s to change speed */
        }
        /* Pauses the animation so users can read the text when hovering */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-marquee">
        {extendedMetrics.map((metric, index) => (
          <div
            key={index}
            // Use vw units to ensure the items are exactly 1 screen wide on mobile, 
            // and exactly 1/3 of the screen wide on desktop to match your original layout
            className="w-[100vw] md:w-[33.333vw] flex-shrink-0 flex items-center justify-center gap-2 md:gap-4 px-2 md:px-8 cursor-default"
          >
            <div className="opacity-90 flex items-center justify-center">
              {metric.icon}
            </div>
            
            <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-2 text-center xl:text-left">
              <span className="font-sans font-extrabold text-xl md:text-3xl lg:text-4xl tracking-tight">
                {metric.number}
              </span>
              <span className="font-sans font-medium text-[10px] md:text-xs lg:text-sm tracking-widest uppercase opacity-90 whitespace-nowrap">
                {metric.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactMetrics;
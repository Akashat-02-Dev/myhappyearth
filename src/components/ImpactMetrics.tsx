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
    number: "2500+",
    label: "Products Recycled",
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    )
  },
  {
    id: 2,
    number: "50000+",
    label: "Trees Planted",
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    )
  },
  {
    id: 3,
    number: "800kg",
    label: "Plastic Diverted",
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0m-16-6c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0" />
      </svg>
    )
  },
  {
    id: 4,
    number: "3,500+",
    label: "Happy Customers",
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  }
];

const ImpactMetrics: FC = () => {
  // Duplicating the array ensures the infinite scroll has enough content to loop seamlessly
  const extendedMetrics = [...metricsData, ...metricsData];

  return (
    <section className="w-full bg-[#FAF3DD] text-[#588157] py-5 md:py-6 overflow-hidden flex items-center border-y border-[#FAF3DD]/10">
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          /* Slightly increased animation time for smoother reading */
          animation: marquee 30s linear infinite; 
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-marquee">
        {extendedMetrics.map((metric, index) => (
          <div
            key={index}
            // Fix: Removed hardcoded vw widths. Used dynamic spacing with px-8 and px-16 instead.
            className="flex-shrink-0 flex items-center justify-center gap-3 md:gap-5 px-8 sm:px-12 md:px-16 cursor-default"
          >
            <div className="opacity-90 flex items-center justify-center shrink-0">
              {metric.icon}
            </div>
            
            <div className="flex flex-row items-baseline gap-2 md:gap-3 text-left">
              <span className="font-sans font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none">
                {metric.number}
              </span>
              {/* Fix: Corrected invalid Tailwind classes (text-m -> text-sm, m:text-base -> sm:text-base) */}
              <span className="font-sans font-bold text-sm sm:text-base md:text-xl lg:text-2xl tracking-widest uppercase opacity-90 whitespace-nowrap leading-none">
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
"use client";

import Image from 'next/image';

const metricsData = [
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

export default function ImpactMetrics() {
  return (
    <section className="w-full bg-[#588157] text-[#FAF3DD] py-12 overflow-hidden flex items-center border-y border-[#FAF3DD]/10">
      
      <style suppressHydrationWarning>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex w-max animate-infinite-scroll items-center hover:cursor-default">
        
        {[1, 2, 3, 4].map((setIndex) => (
          <div key={setIndex} className="flex items-center justify-around w-max">
            {metricsData.map((metric) => (
              <div 
                key={`${setIndex}-${metric.id}`} 
                className="flex items-center gap-4 px-12 md:px-20"
              >
                <div className="opacity-90 flex items-center justify-center">
                  {metric.icon}
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-extrabold text-3xl md:text-4xl tracking-tight">
                    {metric.number}
                  </span>
                  <span className="font-sans font-medium text-xs md:text-sm tracking-widest uppercase opacity-90 whitespace-nowrap">
                    {metric.label}
                  </span>
                </div>
                
                <div className="w-1.5 h-1.5 rounded-full bg-[#FAF3DD]/30 ml-12 md:ml-20 hidden md:block"></div>
              </div>
            ))}
          </div>
        ))}
        
      </div>
    </section>
  );
}
"use client";

import { timelineData } from '@/data/impactData';

export default function TimelineSection() {
  return (
    <div className="w-full bg-earth-light text-earth-deep py-20 md:py-32 border-t-4 md:border-t-8 border-earth-sage/20 relative z-10 overflow-hidden">
      <div className="max-w-[100rem] mx-auto">
        
        {/* --- DESKTOP TIMELINE (Horizontal) --- */}
        <div className="hidden lg:block w-full overflow-x-auto pb-12 hide-scrollbar">
          <div className="flex items-center justify-between relative min-w-[1000px] px-12 md:px-24">
            
            <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1 bg-earth-forest z-0"></div>

            {timelineData.map((node, index) => (
              <div key={`desktop-${index}`} className="relative z-10 flex flex-col items-center group cursor-default hover:-translate-y-2 transition-transform duration-300">
                
                <div className="h-28 flex flex-col justify-end pb-4 text-center">
                  {node.align === 'top' && (
                    <>
                      <h4 className="font-sans font-extrabold text-3xl text-earth-forest mb-1">{node.year}</h4>
                      {node.title && <h5 className="font-sans font-bold text-sm text-earth-deep">{node.title}</h5>}
                      {node.desc && <p className="font-sans text-xs text-earth-deep/80 mt-1 max-w-[140px] leading-snug">{node.desc}</p>}
                    </>
                  )}
                </div>

                <div className="w-20 h-20 rounded-full border-4 border-earth-forest bg-earth-light flex items-center justify-center text-earth-forest shadow-md">
                  {node.icon}
                </div>

                <div className="h-28 flex flex-col justify-start pt-4 text-center">
                  {node.align === 'bottom' && (
                    <>
                      <h4 className="font-sans font-extrabold text-3xl text-earth-forest mb-1">{node.year}</h4>
                      {node.title && <h5 className="font-sans font-bold text-sm text-earth-deep">{node.title}</h5>}
                      {node.desc && <p className="font-sans text-xs text-earth-deep/80 mt-1 max-w-[140px] leading-snug">{node.desc}</p>}
                    </>
                  )}
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* --- MOBILE TIMELINE (Vertical, Left-Aligned) --- */}
        <div className="block lg:hidden px-6 sm:px-12 py-8 relative w-full">
          <div className="absolute left-[3.25rem] sm:left-[4.75rem] top-8 bottom-8 w-1 bg-earth-forest z-0"></div>
          
          <div className="flex flex-col gap-10 relative z-10">
            {timelineData.map((node, index) => (
              <div key={`mobile-${index}`} className="flex items-start gap-6 sm:gap-8 w-full group">
                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border-4 border-earth-forest bg-earth-light flex items-center justify-center text-earth-forest shadow-md relative z-10 transition-transform duration-300 group-hover:scale-105">
                  <div className="[&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8 flex items-center justify-center">
                     {node.icon}
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col pt-1 sm:pt-3">
                  <h4 className="font-sans font-extrabold text-2xl sm:text-3xl text-earth-forest mb-1">{node.year}</h4>
                  {node.title && <h5 className="font-sans font-bold text-base sm:text-lg text-earth-deep">{node.title}</h5>}
                  {node.desc && <p className="font-sans text-sm sm:text-base text-earth-deep/80 mt-1 max-w-[280px] leading-relaxed">{node.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
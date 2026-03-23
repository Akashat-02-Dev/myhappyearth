import { timelineData } from '@/data/impactData';

export default function TimelineSection() {
  return (
    <div className="w-full bg-earth-light text-earth-deep py-32 border-t-8 border-earth-sage/20 relative z-10">
      <div className="max-w-[100rem] mx-auto">
        
        <div className="w-full overflow-x-auto pb-12 hide-scrollbar">
          <div className="flex items-center justify-between relative min-w-[1000px] px-12 md:px-24">
            
            {/* Center Connecting Line */}
            <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1 bg-earth-forest z-0"></div>

            {/* Render Nodes */}
            {timelineData.map((node, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center group cursor-default hover:-translate-y-2 transition-transform duration-300">
                
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

      </div>
    </div>
  );
}
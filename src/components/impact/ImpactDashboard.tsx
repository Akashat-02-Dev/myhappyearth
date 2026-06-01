// src/components/impact/ImpactDashboard.tsx
import { impactFeatures } from '@/data/impactData';

interface ImpactDashboardProps {
  isStoryOpen: boolean; 
  onCloseStory: () => void;
}

export default function ImpactDashboard({ isStoryOpen, onCloseStory }: ImpactDashboardProps) {
  return (
    <div className="w-full pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center relative min-h-screen">
      
      {/* Mobile: Positioned inline above the title. Desktop: Positioned absolutely. */}
      <div className="w-full max-w-[85rem] flex justify-start mb-8 md:absolute md:top-24 md:left-12 md:mb-0">
        <button 
          onClick={onCloseStory}
          className="flex items-center gap-2 text-earth-sage hover:text-white font-sans font-semibold transition-colors z-50 cursor-pointer"
        >
          <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Top
        </button>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-center leading-tight mb-12 md:mb-20 drop-shadow-lg max-w-4xl text-earth-light">
        Every Purchase Plants a Tree.<br className="hidden md:block" />
        <span className="md:hidden"> </span>Every Product Saves the Planet.
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12 w-full max-w-[85rem] mb-20 md:mb-32">
        {impactFeatures.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center text-earth-light group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-earth-light text-earth-deep flex items-center justify-center mb-4 md:mb-6 shadow-xl group-hover:scale-105 transition-transform duration-300">
              {/* Ensures the nested SVG properly scales down on smaller devices */}
              <div className="[&>svg]:w-10 [&>svg]:h-10 md:[&>svg]:w-12 md:[&>svg]:h-12 flex items-center justify-center">
                {feature.icon}
              </div>
            </div>
            <h3 className="font-sans font-bold text-sm sm:text-base md:text-lg xl:text-xl whitespace-pre-line leading-snug px-2">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center mt-auto text-earth-light px-2 sm:px-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold mb-6 md:mb-8 text-center drop-shadow-md">
          Together we've diverted 800kg of plastic this year
        </h3>
        
        <div className="w-full h-10 md:h-14 bg-earth-forest rounded-full p-1 shadow-inner relative overflow-hidden border border-earth-leaf/30">
          <div 
            className="h-full bg-gradient-to-r from-earth-leaf to-earth-sage rounded-full flex items-center justify-end px-4 md:px-6 transition-all duration-[1500ms] ease-out shadow-md" 
            style={{ width: isStoryOpen ? '85%' : '0%' }}
          >
            <span className={`font-sans font-bold text-xs sm:text-sm md:text-base text-earth-deep tracking-wide transition-opacity duration-500 delay-[500ms] ${isStoryOpen ? 'opacity-100' : 'opacity-0'}`}>
              800kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
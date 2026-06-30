// src/components/impact/ImpactDashboard.tsx
"use client";
import { impactFeatures } from '@/data/impactData';

interface ImpactDashboardProps {
  isStoryOpen: boolean; 
  onCloseStory: () => void;
}

export default function ImpactDashboard({ isStoryOpen, onCloseStory }: ImpactDashboardProps) {
  return (
    <div className="w-full pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center relative min-h-screen">
      
      {/* Back to Top Button */}
      <div className="w-full max-w-[85rem] flex justify-start mb-8 md:absolute md:top-24 md:left-12 md:mb-0">
        <button 
          onClick={onCloseStory}
          className="flex items-center gap-2 text-earth-sage hover:text-white font-sans font-semibold transition-colors duration-300 ease-out z-50 cursor-pointer"
        >
          <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Top
        </button>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-center leading-tight mb-16 drop-shadow-lg max-w-4xl text-earth-light tracking-tight">
        Every Purchase Plants a Tree.
        <br className="hidden md:block" />
        Every Product Saves the Planet.
      </h2>

      {/* Feature Icons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-8 gap-y-10 md:gap-y-12 w-full max-w-[85rem] mb-24">
        {impactFeatures.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center text-earth-light group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-earth-light/10 backdrop-blur-md border border-white/10 text-earth-light flex items-center justify-center mb-4 md:mb-6 shadow-xl group-hover:scale-105 group-hover:bg-earth-light group-hover:text-earth-deep transition-all duration-500 ease-out">
              <div className="[&>svg]:w-8 [&>svg]:h-8 md:[&>svg]:w-12 md:[&>svg]:h-12 flex items-center justify-center">
                {feature.icon}
              </div>
            </div>
            <h3 className="font-sans font-bold text-sm sm:text-base md:text-lg xl:text-xl whitespace-pre-line leading-snug px-2">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>

      {/* 2025 Impact Stats Grid */}
      <div className="w-full max-w-[85rem] flex flex-col items-center mt-auto text-earth-light px-2 sm:px-4">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold mb-10 text-center tracking-tight">
          Our 2025 Impact <span className="text-earth-sage font-medium block md:inline text-lg md:text-3xl">(Independently Verified)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8">
          {[
            { number: "5,200+ kg", label: "Plastic diverted from landfill" },
            { number: "50,000+", label: "Trees planted with our partners" },
            { number: "3,500+", label: "Australian businesses supplied" },
            { number: "12+ tonnes", label: "CO2 emissions offset" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center shadow-lg hover:-translate-y-1 transition-transform duration-500 ease-out">
              <h4 className="text-3xl md:text-4xl font-extrabold text-earth-sage mb-3">{stat.number}</h4>
              <p className="text-sm md:text-base font-medium text-earth-light/90 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="text-xs md:text-sm text-earth-light/60 font-medium tracking-wide uppercase">
          Methodology: Verified, 2025 Sustainability Report
        </p>
      </div>
    </div>
  );
}
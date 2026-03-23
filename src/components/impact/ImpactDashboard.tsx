import { impactFeatures } from '@/data/impactData';

interface ImpactDashboardProps {
  isStoryOpen: boolean; // We will use this to trigger the progress bar animation!
  onCloseStory: () => void;
}

export default function ImpactDashboard({ isStoryOpen, onCloseStory }: ImpactDashboardProps) {
  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center relative min-h-screen">
      
      <button 
        onClick={onCloseStory}
        className="absolute top-12 md:top-24 left-6 md:left-12 flex items-center gap-2 text-earth-sage hover:text-white font-sans font-semibold transition-colors z-50 cursor-pointer"
      >
        <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Top
      </button>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-center leading-tight mb-20 mt-12 md:mt-0 drop-shadow-lg max-w-4xl text-earth-light">
        Every Purchase Plants a Tree.<br />
        Every Product Saves the Planet.
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 w-full max-w-[85rem] mb-32">
        {impactFeatures.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center text-earth-light">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-earth-light text-earth-deep flex items-center justify-center mb-6 shadow-xl hover:scale-105 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="font-sans font-bold text-lg md:text-xl whitespace-pre-line leading-snug">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center mt-auto text-earth-light">
        <h3 className="text-2xl md:text-3xl font-sans font-bold mb-8 text-center drop-shadow-md">
          Together we've diverted 800kg of plastic this year
        </h3>
        
        <div className="w-full h-12 md:h-14 bg-earth-forest rounded-full p-1 shadow-inner relative overflow-hidden border border-earth-leaf/30">
          <div 
            className="h-full bg-gradient-to-r from-earth-leaf to-earth-sage rounded-full flex items-center justify-end px-6 transition-all duration-[1500ms] ease-out shadow-md" 
            style={{ width: isStoryOpen ? '85%' : '0%' }}
          >
            <span className={`font-sans font-bold text-earth-deep tracking-wide transition-opacity duration-500 delay-[500ms] ${isStoryOpen ? 'opacity-100' : 'opacity-0'}`}>
              800kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
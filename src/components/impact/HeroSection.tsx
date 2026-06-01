// src/components/impact/HeroSection.tsx
import Image from 'next/image';

interface HeroSectionProps {
  onOpenStory: () => void;
}

export default function HeroSection({ onOpenStory }: HeroSectionProps) {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row bg-earth-light z-10">
      
      {/* Mobile: takes 50vh to ensure it stays in frame. Desktop: fills its half naturally */}
      <div className="relative w-full h-[50vh] md:h-auto md:flex-1">
        <Image
          src="/images/hero-woman.jpeg" 
          alt="My Happy Earth founder"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 md:flex-1 px-8 py-16 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-[480px]">
          <h1 className="font-sans font-extrabold text-5xl md:text-6xl text-earth-deep leading-tight mb-6 md:mb-8 mt-4 md:mt-0">
            OUR<br /> STORY
          </h1>
          <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-earth-deep/80 leading-relaxed mb-8 md:mb-12">
            Born from a love for Australia and a frustration with plastic waste, My Happy Earth is a promise for a cleaner, greener tomorrow.
          </p>
          
          <button 
            onClick={onOpenStory}
            className="inline-block cursor-pointer bg-earth-forest text-earth-light px-8 md:px-10 py-3.5 md:py-4 rounded-full font-sans font-semibold text-base md:text-lg hover:bg-earth-deep transition-all duration-300 shadow-xl hover:-translate-y-1"
          >
            Read Our Full Story
          </button>
        </div>
      </div>
    </section>
  );
}
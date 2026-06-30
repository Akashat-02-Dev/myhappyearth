// src/components/impact/HeroSection.tsx
"use client";
import Image from 'next/image';

interface HeroSectionProps {
  onOpenStory: () => void;
}

export default function HeroSection({ onOpenStory }: HeroSectionProps) {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row bg-earth-light z-10">
      <div className="relative w-full h-[50vh] md:h-screen md:w-1/2">
        <Image
          src="/images/hero-woman.jpeg" 
          alt="My Happy Earth founder"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen px-8 py-16 md:px-12 lg:px-24 flex flex-col items-start justify-center text-left bg-earth-light">
        <div className="max-w-[520px]">
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-earth-deep leading-tight mb-6 tracking-tight">
            We're on a mission to make sustainable the default — not the exception.
          </h1>
          <p className="font-sans font-medium text-base sm:text-lg text-earth-deep/80 leading-relaxed mb-10">
            Founded in 2023 by Arijit Maity, My Happy Earth started with one frustration: the gap between eco-marketing and eco-reality. Three years later, we've supplied 3,500+ businesses and households with packaging and products that meet the claims on the label.
          </p>
          
          <button 
            onClick={onOpenStory}
            className="inline-block cursor-pointer bg-earth-forest text-earth-light px-8 py-4 rounded-full font-sans font-semibold text-base transition-all duration-500 ease-out shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-earth-deep"
          >
            Explore Our Impact
          </button>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { journeyPanels } from '@/data/OurJourneyData';
import JourneyCtaPanel from './JourneyCtaPanel';

export default function OurJourneySection() {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-fixed"
    style={{ backgroundImage: "url('/images/journey-bg.jpg')" }}
    >
      <div className="container mx-auto px-6 max-w-[1200px]">
        
        {/* HEADER SECTION: Centered Logo and Tagline */}
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <div className="text-earth-light flex items-center gap-2 text-3xl md:text-4xl font-sans group cursor-pointer drop-shadow-sm">
            <span className="text-earth-light group-hover:rotate-12 transition-transform duration-300">🌿</span> 
            <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold group-hover:text-earth-green-deep/70 transition-colors duration-300">My Happy Earth</span>
          </div>
          <p className="font-serif font-medium text-lg md:text-xl lg:text-2xl text-earth-light mt-2">For Individuals and Businesses</p>
        </div>

        {/* SPLIT CTA PANELS */}
        {/* Uses a grid that stacks on mobile and splits into two perfect halves on larger screens */}
        <div className="grid grid-cols-1 bg-earth-light md:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-2xl">
          
          {journeyPanels.map((panel, index) => (
            <JourneyCtaPanel 
              key={index}
              bgColor={panel.bgColor}
              imageUrl={panel.imageUrl}
              textOverlay={panel.title}
              buttonText={panel.buttonText}
              buttonStyle={panel.buttonStyle}
              isOutlined={panel.isOutlined}
              linkUrl={panel.linkUrl}
            />
          ))}

        </div>
        
      </div>
    </section>
  );
}
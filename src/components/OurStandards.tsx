// src/components/OurStandards.tsx
export default function OurStandards() {
  const standards = [
    {
      title: "Nothing Harmful, Ever",
      subtitle: "(100% Eco-Friendly Materials)",
      description: "If it can't be made from sustainable, natural, and renewable resources, it doesn't belong in your home or on this planet. Full stop.",
      icon: (
        <svg className="w-14 h-14 text-earth-forest mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M7 3.34V5a3 3 0 0 0 3 3 2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
          <path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
          <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
        </svg>
      )
    },
    {
      title: "Built Locally, Impacting Globally",
      subtitle: "(Proudly Australian Owned)",
      description: "Designed, sourced, and made right here in Australia - because change should start close to home, then ripple outward.",
      icon: (
        <svg className="w-14 h-14 text-earth-forest mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    },
    {
      title: "Zero Plastic, Full Stop",
      subtitle: "(Plastic-Free Packaging)",
      description: "We don't just reduce plastic packaging. We eliminate it. Compostable, recyclable, and never part of the problem.",
      icon: (
        <svg className="w-14 h-14 text-earth-forest mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22.08V12" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.21l4.5 2.6 4.5-2.6" />
        </svg>
      )
    },
    {
      title: "Designed to Return to Earth",
      subtitle: "(Made for Life, Not Landfills)",
      description: "Everyday items shouldn't outlive us by 500 years. Everything here is designed to do its job - then break down and go back where it came from.",
      icon: (
        <svg className="w-14 h-14 text-earth-forest mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 21v-8" />
          <path d="M12 13a8.995 8.995 0 0 1-6-8c2.5 0 5 1.5 6 8Z" />
          <path d="M12 13c1-6 3.5-8 6-8a8.995 8.995 0 0 1-6 8Z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-y border-earth-deep/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-earth-sage tracking-widest uppercase mb-4">
            What We Stand For
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-earth-deep max-w-3xl mx-auto leading-tight">
            These aren't features. They're non-negotiables.
          </h3>
          <p className="mt-6 text-lg text-earth-deep/80 max-w-2xl mx-auto">
            Every product that earns a place here has to meet all of them - or it doesn't get in.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((standard, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 bg-earth-light/30 rounded-3xl border border-earth-forest/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {standard.icon}
              <h4 className="text-lg font-bold text-earth-deep leading-tight mt-2">
                {standard.title}
              </h4>
              <h5 className="text-xs font-bold text-earth-sage uppercase tracking-wider mb-4 mt-1">
                {standard.subtitle}
              </h5>
              <p className="text-earth-deep/80 text-sm leading-relaxed">
                {standard.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
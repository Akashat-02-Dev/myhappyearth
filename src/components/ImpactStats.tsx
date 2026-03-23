// components/WhyChooseUs.tsx

export default function WhyChooseUs() {
  const features = [
    {
      title: "100% Eco-Friendly Materials",
      description: "Our products are made from sustainable, natural, and renewable resources",
      // Leaf with a drop icon
      icon: (
        <svg className="w-16 h-16 text-earth-forest mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.14 3.47c-2.3-1.61-5.61-1.33-8.13.43-2.52 1.76-4.14 4.88-3.79 8.24.12 1.15.54 2.22 1.15 3.12l-3.08 3.08a1 1 0 1 0 1.42 1.42l3.08-3.08c1.38 1 3.12 1.42 4.9 1.11 3.32-.58 5.89-3.07 6.78-6.32.88-3.25-.13-6.52-2.33-8zm-2.02 9.08c-.68 2.21-2.5 3.9-4.73 4.29-1.28.22-2.53-.08-3.56-.75a1 1 0 0 0-.58-.17 1 1 0 0 0-.71.29l-1.39 1.39c-.31-.56-.54-1.17-.65-1.81-.24-2.3.83-4.43 2.53-5.62 1.7-1.19 3.9-1.39 5.43-.32a1 1 0 0 0 1.39-.18 1 1 0 0 0-.18-1.39c-2.3-1.61-5.61-1.33-8.13.43a7.43 7.43 0 0 0-2.38 4.6l-1.3 1.3a2.99 2.99 0 0 1-.22-4.13l.06-.06c.86-1.16 2.06-2.06 3.42-2.6.43-.17.9-.3 1.39-.37 2.12-.34 4.31.25 5.91 1.71 1.6 1.45 2.37 3.59 2 5.68zM19 18.5a2.5 2.5 0 0 1-5 0c0-1.5 2.5-4.5 2.5-4.5s2.5 3 2.5 4.5z"/>
        </svg>
      )
    },
    {
      title: "Proudly Australian Owned",
      description: "Designed, sourced, and produced right here in Australia",
      // Map of Australia (Simplified approximation for clean rendering)
      icon: (
        <svg className="w-16 h-16 text-earth-forest mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm3.07-4.55l-.65.65C12.59 13.93 12 14.5 12 16h-2v-1c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          {/* Replacing the inner shape with a heart to match your design */}
          <path d="M12 13.5l-1.45-1.32C8.4 10.28 7 9.01 7 7.5 7 6.12 8.12 5 9.5 5c.81 0 1.58.39 2.04 1.01h.92C12.92 5.39 13.69 5 14.5 5 15.88 5 17 6.12 17 7.5c0 1.51-1.4 2.78-3.55 4.68L12 13.5z" fill="#DAD7CD" /> 
        </svg>
      )
    },
    {
      title: "Plastic-Free Packaging",
      description: "Compostable and recyclable packaging for a healthier planet",
      // Open box with recycle icon
      icon: (
        <svg className="w-16 h-16 text-earth-forest mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22.08V12" />
          {/* Subtle inner lines representing flaps */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.21l4.5 2.6 4.5-2.6" />
        </svg>
      )
    },
    {
      title: "Circular Economy Certified",
      description: "Committed to reducing waste and regenerating natural systems",
      // Circular economy arrows
      icon: (
        <svg className="w-16 h-16 text-earth-forest mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.95 8.65l-2.07-1.19a8.03 8.03 0 0 0-4.38-1.38v-2a10.02 10.02 0 0 1 5.48 1.72l1.62-.94a.5.5 0 0 1 .75.43v4.61a.5.5 0 0 1-.5.5H16.2a.5.5 0 0 1-.43-.75l1.43-.82a6.03 6.03 0 0 0-3.3-1.04v-2c1.7 0 3.33.56 4.67 1.55l1.38-.8zm-8.85 9.27c-1.7 0-3.33-.56-4.67-1.55l-1.38.8l2.07 1.19a8.03 8.03 0 0 0 4.38 1.38v2a10.02 10.02 0 0 1-5.48-1.72l-1.62.94a.5.5 0 0 1-.75-.43v-4.61a.5.5 0 0 1 .5-.5H8.8a.5.5 0 0 1 .43.75l-1.43.82a6.03 6.03 0 0 0 3.3 1.04v2zM4.05 15.35l2.07 1.19A8.02 8.02 0 0 1 7.5 12h2a10.02 10.02 0 0 0-1.72 5.48l.94 1.62a.5.5 0 0 0-.43.75H3.68a.5.5 0 0 0-.5-.5v-4.61a.5.5 0 0 0 .75-.43l.82 1.43A6.03 6.03 0 0 1 5.5 12h-2c0 1.7.56 3.33 1.55 4.67z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 px-12 bg-earth-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-sans font-bold text-center text-earth-forest mb-12 uppercase tracking-wide">
          Why Choose Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 border border-earth-forest/20 rounded-[2rem] bg-white/40 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-earth-forest mb-4 leading-tight px-2">
                {feature.title}
              </h3>
              <p className="text-earth-deep/80 text-sm leading-relaxed px-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// components/WhyChooseUs.tsx

export default function WhyChooseUs() {
  const features = [
    {
      title: "100% Eco-Friendly Materials",
      description: "Our products are made from sustainable, natural, and renewable resources",
      // Leaf with a drop icon
      icon: (
<svg 
  className="w-16 h-16 text-earth-forest mb-6" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="1.5" 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  viewBox="0 0 24 24"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M7 3.34V5a3 3 0 0 0 3 3 2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
  <path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
  <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
</svg>
      )
    },
    {
      title: "Proudly Australian Owned",
      description: "Designed, sourced, and produced right here in Australia",
      // Map of Australia (Simplified approximation for clean rendering)
      icon: (
<svg 
  className="w-16 h-16 text-earth-forest mb-6" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="1.5" 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  viewBox="0 0 24 24"
>
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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
      title: "Made for Life, Not Landfills",
      description: "We believe everyday items shouldn't outlive us. Everything we sell is designed to do its job, then return safely to the earth.",
      // Circular economy arrows
      icon: (
<svg 
  className="w-16 h-16 text-earth-forest mb-6" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="1.5" 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  viewBox="0 0 24 24"
>
  <path d="M12 21v-8" />
  <path d="M12 13a8.995 8.995 0 0 1-6-8c2.5 0 5 1.5 6 8Z" />
  <path d="M12 13c1-6 3.5-8 6-8a8.995 8.995 0 0 1-6 8Z" />
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
// src/components/ImpactStats.tsx
export default function ImpactStats() {
  const stats = [
    {
      number: "2,500+",
      title: "Products Recycled",
      description: "Items rescued from the waste cycle and given a second life - because \"throwaway\" should never have meant \"forever.\""
    },
    {
      number: "50,000+",
      title: "Trees Planted",
      description: "Roots in the ground, carbon in the trunk, shade for the next generation. Reforestation is repair - and we're not stopping."
    },
    {
      number: "800 kg",
      title: "Plastic Diverted",
      description: "Nearly a tonne of plastic that will never reach a coastline, a river, or a turtle's stomach. Every gram replaced was a gram refused."
    },
    // {
    //   number: "3,500+",
    //   title: "People Who Took Action",
    //   description: "Not customers. Not transactions. People who looked at the problem and chose to be part of the solution."
    // },
    {
      number: "150+",
      title: "Businesses Who Partnered With Us",
      description: "Companies who chose to be part of the solution."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAF3DD] relative border-t border-earth-deep/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center text-earth-deep mb-4 leading-tight max-w-3xl">
          This is what happens when thousands of us refuse to look away.
        </h2>
        <div className="w-24 h-1 bg-earth-sage mb-16 rounded-full"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 w-full">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 bg-white/60 rounded-3xl shadow-sm border border-earth-forest/10 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-4xl font-extrabold text-earth-forest mb-2">
                {stat.number}
              </h3>
              <h4 className="text-xl font-bold text-earth-deep mb-4 uppercase tracking-wide">
                {stat.title}
              </h4>
              <p className="text-earth-deep/80 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <button className="bg-earth-deep text-earth-light px-10 py-4 rounded-full font-bold text-lg hover:bg-earth-forest transition-all duration-300 shadow-xl">
          See the Full Impact Report
        </button>
      </div>
    </section>
  );
}
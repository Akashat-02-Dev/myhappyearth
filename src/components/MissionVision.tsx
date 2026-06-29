// src/components/MissionVision.tsx
export default function MissionVision() {
  return (
    <section className="relative w-full flex flex-col md:flex-row min-h-[600px] lg:min-h-[70vh]">
      
      {/* LEFT SIDE: OUR MISSION */}
      <div 
        className="relative w-full md:w-1/2 flex items-center justify-center p-12 lg:p-24 bg-cover bg-center min-h-[400px] md:min-h-full rounded-t-3xl md:rounded-t-none md:rounded-l-3xl overflow-hidden"
        style={{ backgroundImage: "url('/mission-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 transition-colors duration-500 hover:bg-black/50"></div>
        
        <div className="relative z-10 text-center text-white max-w-md">
          <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 tracking-wider uppercase drop-shadow-md">
            Our Mission
          </h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed drop-shadow-md font-medium text-white/95">
            <p>We started My Happy Earth because we couldn't stand by and watch.</p>
            <p>The plastic choking our rivers. The waste piling up in places it was never meant to reach. The slow, quiet damage done by things we use once and throw away - as if "away" were a real place.</p>
            <p>We knew there had to be another way. So we built one.</p>
            <p>Every product we curate is a refusal - a refusal to accept that pollution is just the cost of modern life. It's our answer to the frustration of watching the planet suffer while we're told there's no alternative.</p>
            <p>There is an alternative. You're looking at it.</p>
            <p className="font-bold text-earth-sage text-xl mt-4">You're not just shopping here. You're choosing a side.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: OUR VISION */}
      <div 
        className="relative w-full md:w-1/2 flex items-center justify-center p-12 lg:p-24 bg-cover bg-center min-h-[400px] md:min-h-full rounded-b-3xl md:rounded-bl-none md:rounded-tr-3xl overflow-hidden"
        style={{ backgroundImage: "url('/vision-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 transition-colors duration-500 hover:bg-black/50"></div>
        
        <div className="relative z-10 text-center text-white max-w-md">
          <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 tracking-wider uppercase drop-shadow-md">
            Our Vision
          </h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed drop-shadow-md font-medium text-white/95">
            <p>We imagine a world where nobody has to choose between doing right and doing well.</p>
            <p>Where sustainability isn't a sacrifice or a luxury - it's just the default. The obvious choice. The easy choice.</p>
            <p>Where our grandchildren grow up on a planet with forests still standing, oceans still breathing, and communities that thrive because they learned to live with the earth instead of off it.</p>
            <p>That world isn't far away. It's built one decision at a time - by people who decided that "the way things have always been done" wasn't good enough.</p>
            <p className="font-bold text-earth-sage text-xl mt-4">We're building that world. And we'd like you to build it with us.</p>
          </div>
        </div>
      </div>

      {/* CENTER OVERLAY BADGE */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-earth-light w-32 h-40 md:w-40 md:h-48 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-500 rounded-2xl">
        <svg className="w-20 h-20 md:w-24 md:h-24 drop-shadow-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(50, 50) rotate(0) translate(-50, -50)">
            <path d="M 50 15 C 65 15, 78 22, 83 33" fill="none" stroke="#A3B18A" strokeWidth="7" strokeLinecap="round" />
            <polygon points="73,25 92,39 76,46" fill="#A3B18A" />
          </g>
          <g transform="translate(50, 50) rotate(120) translate(-50, -50)">
            <path d="M 50 15 C 65 15, 78 22, 83 33" fill="none" stroke="#3A5A40" strokeWidth="7" strokeLinecap="round" />
            <polygon points="73,25 92,39 76,46" fill="#3A5A40" />
          </g>
          <g transform="translate(50, 50) rotate(240) translate(-50, -50)">
            <path d="M 50 15 C 65 15, 78 22, 83 33" fill="none" stroke="#344E41" strokeWidth="7" strokeLinecap="round" />
            <polygon points="73,25 92,39 76,46" fill="#344E41" />
          </g>
          <path d="M 50 32 C 62 32, 68 45, 68 55 C 68 65, 50 70, 50 70 C 50 70, 32 65, 32 55 C 32 45, 38 32, 50 32 Z" fill="#588157" />
          <path d="M 50 70 C 50 60, 52 48, 62 40" fill="none" stroke="#DAD7CD" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}
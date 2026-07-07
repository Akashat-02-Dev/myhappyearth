"use client";

const reviewsData = [
  {
    text: "Transitioning to My Happy Earth for our guest amenities wasn't just an ecological choice; it elevated our brand. Guests frequently compliment the premium feel, and we've successfully eliminated thousands of single-use plastics from our daily operations.",
    name: "James Harrington",
    role: "Director, Harrington Boutique Hotels, UK",
  },
  {
    text: "In Berlin, our customers demand absolute sustainability. Finding a partner that provides the perfect balance of modern aesthetic appeal and zero-waste functionality was critical. The durability of these products has streamlined our entire supply chain.",
    name: "Lukas Weber",
    role: "Founder, Verde Organic Cafés, Germany",
  },
  {
    text: "Protecting the oceans is literally our business. Switching our coastal resort to these sustainable alternatives was a seamless integration. The quality far exceeds standard plastics, proving to our stakeholders that luxury and eco-consciousness can coexist.",
    name: "Sarah Caldwell",
    role: "Operations Manager, Pacific Edge Resorts, US",
  },
  {
    text: "Running major events and festivals across Toronto used to mean mountains of waste. Implementing My Happy Earth's solutions cut our landfill contribution by 80% this season. It's fundamentally changed how we architect our event logistics.",
    name: "Marcus Tremblay",
    role: "CEO, Apex Event Productions, Canada",
  },
  {
    text: "As a large-scale corporate caterer, our plastic footprint was a major liability. The switch to sustainable tableware has transformed our business model. We are now winning major corporate contracts specifically because of our verified zero-waste initiatives.",
    name: "Eleanor Vance",
    role: "Managing Director, Epicurean Corporate Dining, UK",
  },
  {
    text: "We set an aggressive zero-waste timeline for our Munich headquarters. The elegant, highly durable solutions provided by My Happy Earth helped us eliminate single-use breakroom plastics entirely, months ahead of our internal schedule.",
    name: "Klaus Fischer",
    role: "Facilities Head, TechNova Solutions, Germany",
  }
];

function TestimonialCard({ review }: { review: typeof reviewsData[0] }) {
  return (
    <div className="w-[85vw] sm:w-[350px] md:w-[400px] lg:w-[450px] flex-shrink-0 bg-white/90 backdrop-blur-md rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-earth-forest/10 mx-4">
      <svg className="w-10 h-10 text-earth-sage mb-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="font-serif italic text-base md:text-lg text-earth-deep/90 leading-relaxed mb-8 flex-grow">
        "{review.text}"
      </p>
      <div className="flex flex-col items-center mt-auto">
        <h5 className="font-sans font-bold text-lg text-earth-forest tracking-wide">
          {review.name}
        </h5>
        <p className="font-sans font-medium text-xs text-earth-deep/60 mt-1 uppercase tracking-widest">
          {review.role}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section 
      className="relative py-24 bg-cover bg-center bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('/testimonials-bg.jpg')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-earth-deep/85 backdrop-brightness-75"></div>
      
      <div className="relative z-10 w-full mx-auto text-center">
        {/* Header Section */}
        <div className="max-w-[85rem] mx-auto px-6 md:px-12 lg:px-24 mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-earth-light mb-4 uppercase tracking-wider drop-shadow-sm">
            Trusted by Global Businesses
          </h2>
          <p className="text-lg md:text-xl text-earth-light/90 font-medium max-w-2xl mx-auto">
            From boutique hotels to corporate headquarters, see how industry leaders are integrating zero-waste solutions into their daily operations.
          </p>
        </div>
        
        {/* Infinite Scroll Carousel */}
        <div className="relative flex overflow-hidden group">
          {/* Edge Fade Masks for clean visual entry/exit */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-20 bg-gradient-to-r from-[#1c231f] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-20 bg-gradient-to-l from-[#1c231f] to-transparent pointer-events-none"></div>

          {/* Scrolling Track container */}
          {/* group-hover:[animation-play-state:paused] ensures it stops when user reads */}
          <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
            {/* Render array twice to create the seamless infinite loop */}
            {[...reviewsData, ...reviewsData].map((review, index) => (
              <TestimonialCard key={index} review={review} />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16">
          <button className="bg-earth-sage text-earth-deep px-10 py-4 rounded-full font-bold text-lg hover:bg-earth-light transition-all duration-300 shadow-xl hover:-translate-y-1">
            Share Your Experiences
          </button>
        </div>
      </div>

      {/* Inline styles for the animation so it works without editing tailwind.config.ts */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: scroll 45s linear infinite;
        }
      `}} />
    </section>
  );
}
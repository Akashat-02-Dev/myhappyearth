// src/components/Testimonials.tsx
"use client";

const reviewsData = [
  {
    text: "Since switching to My Happy Earth, our household has gone almost entirely plastic-free. We've replaced the cling wrap, the plastic bags, the throwaway tableware - the works. In the last year alone, we've diverted over 200 items from landfill. It started with one swap. Now it's just how we live.",
    name: "Sarah Jenkins",
    role: "Household, NSW",
  },
  {
    text: "We used to run events that generated bins full of plastic waste. After partnering with My Happy Earth, our last three events were close to zero-waste - and our guests didn't even notice the difference, except to compliment the tableware. We proved that sustainable can still feel premium. That changed how our whole community thinks about events.",
    name: "Michael Chen",
    role: "Event Organiser, VIC",
  },
  {
    text: "I was looking for a way to make my business more sustainable without it feeling like a compromise. The products I found here don't just look beautiful - they start conversations. My customers ask about them, and now they're making changes too. One small business swapping products has rippled into dozens of households doing the same.",
    name: "Emma Wilson",
    role: "Small Business Owner, QLD",
  }
];

function TestimonialCard({ review }: { review: any }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full border border-earth-forest/10">
      <svg className="w-10 h-10 text-earth-sage mb-6" viewBox="0 0 24 24" fill="currentColor">
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
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/testimonials-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-earth-deep/80 backdrop-brightness-75"></div>
      
      <div className="relative z-10 max-w-[85rem] mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-earth-light mb-4 uppercase tracking-wider drop-shadow-sm">
          Real People. Real Change.
        </h2>
        <p className="text-lg md:text-xl text-earth-light/90 font-medium mb-16 max-w-2xl mx-auto">
          We don't have customers. We have people who decided to be part of the solution. These are their stories.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {reviewsData.map((review, index) => (
            <TestimonialCard key={index} review={review} />
          ))}
        </div>

        <button className="bg-earth-sage text-earth-deep px-10 py-4 rounded-full font-bold text-lg hover:bg-earth-light transition-all duration-300 shadow-xl hover:-translate-y-1">
          Share Your Story
        </button>
      </div>
    </section>
  );
}
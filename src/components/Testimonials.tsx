"use client";

// Mock data array
const reviewsData = [
  {
    text: "My Happy Earth's products are not just good for the planet, incredibly effective and stylish, and stylish. A brand I truly trust and love!",
    name: "Sarah Jenkins",
    role: "Eco Activist",
    image: "/reviews/sarah.jpg"
  },
  {
    text: "As an architect, I appreciate sustainable sustainable design. commih's conmitment the environment and quality is. Their packaging is als also brilliant.",
    name: "Michael Chen",
    role: "Architect",
    image: "/reviews/michael.jpg"
  },
  {
    text: "Being a student, affordibilly and ethics matter on memo My He; Eeliteee! Their Their natural skincare range range is absolute favorite.",
    name: "Emma Wilson",
    role: "University Student",
    image: "/reviews/emma.jpg"
  }
];

// Sub-component for individual review cards
function TestimonialCard({ review }: { review: any }) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-[2rem] p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full border border-earth-forest/10">
      
      {/* Golden Quote Icon */}
      <svg className="w-12 h-12 text-earth-sage mb-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Review Text */}
      <p className="font-serif italic text-lg text-earth-deep/90 leading-relaxed mb-10 flex-grow">
        {review.text}
      </p>

      {/* Customer Profile */}
      <div className="flex flex-col items-center mt-auto">
        <div 
          className="w-20 h-20 rounded-full bg-earth-light bg-cover bg-center mb-4 border-2 border-white shadow-sm flex items-center justify-center text-earth-forest/40 text-xs"
          style={{ backgroundImage: `url(${review.image})` }}
        >
          {!review.image && "IMG"}
        </div>
        <h5 className="font-serif font-bold text-xl text-earth-forest tracking-wide">
          {review.name}
        </h5>
        <p className="font-sans text-sm text-earth-deep/70 mt-1">
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
      {/* Semi-transparent overlay for readability over the background image */}
      {/* <div className="absolute inset-0 bg-earth-light/60 backdrop-blur-[2px]"></div> */}

      {/* Main Content Container (z-10 keeps it above the overlay) */}
      <div className="relative z-10 max-w-[85rem] mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-earth-light mb-16 uppercase tracking-wider drop-shadow-sm">
          What Our Customers Say
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {reviewsData.map((review, index) => (
            <TestimonialCard key={index} review={review} />
          ))}
        </div>

        {/* Bottom Rating Badge Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          
          {/* Google Review Pill */}
          <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-md border border-earth-forest/10 py-3 px-6 flex items-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="font-sans font-extrabold text-3xl text-earth-deep">
              4.9
            </div>
            <div className="flex flex-col">
              <div className="flex text-earth-sage text-lg leading-none tracking-widest mb-1">
                ★★★★★
              </div>
              <div className="text-[11px] font-sans font-semibold tracking-wide">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
                <span className="text-earth-deep/70 ml-1 font-normal">reviews</span>
              </div>
            </div>
          </div>

          {/* Social Proof Text */}
          <div className="flex flex-col text-center md:text-left drop-shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-earth-light">
              Loved by 3,500+ Australians
            </h3>
            <p className="font-sans text-earth-light/80 font-medium mt-1">
              3,500+ reviews
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
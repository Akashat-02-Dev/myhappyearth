import { heroAddressList, heroBusinessHours } from '@/data/contactInfo';

export default function ContactHeroDetails() {
  return (
    <div className="w-full flex flex-col items-center text-earth-light text-center mt-auto font-sans z-20">
      
      {/* Address List */}
      <ul className="mb-6 flex flex-col items-center gap-1 font-medium">
        {heroAddressList.map((address, index) => (
          <li key={index} className="text-sm md:text-base opacity-90 tracking-wide">
            {address}
          </li>
        ))}
      </ul>
      
      {/* Separation line */}
      <div className="h-px w-24 bg-earth-sage/50 mb-6"></div>

      {/* Business Hours Text */}
      <p className="text-lg md:text-xl font-semibold drop-shadow-sm tracking-wide">
        {heroBusinessHours}
      </p>
      
    </div>
  );
}
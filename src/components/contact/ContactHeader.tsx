import { contactHeadlines } from '@/data/contactInfo';

export default function ContactHeader() {
  return (
    <div className="flex flex-col items-center text-center text-earth-light mb-16 drop-shadow-md z-20">
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-extrabold leading-tight mb-6 flex items-center justify-center gap-4">
        {contactHeadlines.headline}
        {/* The Leaf Icon next to the headline from the image */}
        <svg className="w-10 h-10 md:w-14 md:h-14 text-earth-sage" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 4.5c-2.5 0-5 1.5-6.5 3.5C9.5 6 7 4.5 4.5 4.5v15c2.5 0 5-1.5 6.5-3.5 1.5 2 4 3.5 6.5 3.5v-15z" />
        </svg>
      </h2>
      <p className="font-sans font-medium text-lg md:text-xl leading-relaxed max-w-3xl opacity-90">
        {contactHeadlines.subheadline}
      </p>
    </div>
  );
}
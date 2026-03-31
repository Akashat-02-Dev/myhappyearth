// src/components/ContactPage/ContactFAQSection.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import FAQList from './FAQList';
import { faqData } from '@/data/faqData';

const ContactFAQSection: React.FC = () => {
  // State to manage the currently expanded FAQ item
  // I'll set the first item to be expanded by default to match your image
  const [expandedId, setExpandedId] = useState<number | null>(1);

  // Toggle function: closes other items when a new one is clicked
  const handleFAQToggle = (id: number) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  return (
    <section className="w-full bg-earth-light py-10 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      <div className="max-w-[1400px] w-full flex flex-col items-center">
        
        {/* Section Title Box */}
        <div className="bg-earth-leaf rounded-full px-12 py-5 border border-earth-forest/10 shadow-lg text-center mb-16">
          <h2 className="font-serif font-bold text-earth-light text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        {/* Dynamic FAQ List within the overall container */}
        <div className="bg-earth-leaf rounded-2xl md:rounded-3xl border border-earth-forest/10 p-8 md:p-12 lg:p-16 w-full shadow-2xl">
          <FAQList 
            data={faqData} 
            expandedId={expandedId} 
            onToggle={handleFAQToggle} 
          />
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-20 flex flex-col items-center gap-6">
          <p className="font-sans font-medium text-lg text-earth-deep tracking-tight">
            Still have questions? We're here to help
          </p>
          <Link href="/contact" className="bg-earth-deep text-white text-base md:text-lg font-semibold px-10 py-3.5 rounded-full shadow-md hover:bg-earth-deep/90 hover:scale-105 transition-all duration-300">
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ContactFAQSection;
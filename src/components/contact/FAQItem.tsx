// src/components/ContactPage/FAQItem.tsx
import React from 'react';
import { LeafIcon, PlusCircleIcon, MinusCircleIcon } from '../ui/Icons';
import { FAQItemData } from '@/data/faqData';

interface FAQItemProps {
  item: FAQItemData;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isExpanded, onToggle }) => {
  // THE FIX: Using rounded-2xl md:rounded-3xl so it stays as a clean card without elliptical stretching!
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-earth-forest/10 p-5 md:p-8 shadow-md transition-all duration-300">
      
      <button 
        onClick={() => onToggle(item.id)}
        className="w-full flex items-center justify-between gap-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-earth-sage rounded-lg"
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className={`${isExpanded ? 'font-bold' : 'font-medium'} text-earth-deep text-lg leading-tight flex-1`}>
          {item.question}
        </span>
        
        {/* State Icon (Plus/Minus) */}
        <div className="flex-shrink-0 transition-transform duration-300">
          {isExpanded ? (
            <MinusCircleIcon className="w-7 h-7 text-earth-sage" />
          ) : (
            <PlusCircleIcon className="w-7 h-7 text-earth-sage" />
          )}
        </div>
      </button>

      {/* Answer Content - Smooth transition for dynamic height */}
      <div 
        id={`faq-answer-${item.id}`}
        className={`transition-[grid-template-rows] duration-300 ease-in-out grid ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-5 border-t border-earth-forest/10 mt-5 flex flex-col gap-4">
            <p className="text-earth-deep text-opacity-80 text-sm md:text-base font-sans leading-relaxed">
              {item.answer}
            </p>
            
            {/* Expanded leaf icon at the bottom left */}
            <LeafIcon className="w-6 h-6 text-earth-sage mt-1" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default FAQItem;
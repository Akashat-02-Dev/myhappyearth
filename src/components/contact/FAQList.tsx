// src/components/ContactPage/FAQList.tsx
import React from 'react';
import FAQItem from './FAQItem';
import { FAQItemData } from '@/data/faqData';

interface FAQListProps {
  data: FAQItemData[];
  expandedId: number | null;
  onToggle: (id: number) => void;
}

const FAQList: React.FC<FAQListProps> = ({ data, expandedId, onToggle }) => {
  // Logic to split the data into two columns for desktop
  const leftColumnData = data.slice(0, Math.ceil(data.length / 2));
  const rightColumnData = data.slice(Math.ceil(data.length / 2));

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-10">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-6 md:gap-8">
        {leftColumnData.map((item) => (
          <FAQItem 
            key={item.id} 
            item={item} 
            isExpanded={expandedId === item.id} 
            onToggle={onToggle} 
          />
        ))}
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col gap-6 md:gap-8">
        {rightColumnData.map((item) => (
          <FAQItem 
            key={item.id} 
            item={item} 
            isExpanded={expandedId === item.id} 
            onToggle={onToggle} 
          />
        ))}
      </div>
    </div>
  );
};

export default FAQList;
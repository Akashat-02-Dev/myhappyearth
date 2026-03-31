// components/product/SustainableAttributes.tsx
import React from 'react';
import SustainableIcon from '@/components/ui/SustainableIcon';

interface SustainableAttributesProps {
  attributes: { text: string; label: string }[];
}

const SustainableAttributes: React.FC<SustainableAttributesProps> = ({ attributes }) => {
  return (
    <div className="grid grid-cols-4 gap-4 py-3">
      {attributes.map((attr, index) => (
        <SustainableIcon key={index} text={attr.text} label={attr.label} />
      ))}
    </div>
  );
};

export default SustainableAttributes;
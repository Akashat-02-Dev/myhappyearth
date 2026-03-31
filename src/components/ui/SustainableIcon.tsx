// components/ui/SustainableIcon.tsx
import React from 'react';

interface SustainableIconProps {
  text: string;
  label: string;
}

// Function to generate distinct simple icons for attributes
const getIcon = (text: string) => {
  switch (text) {
    case 'Bamboo':
      return <path d="M8 19V5M12 21V3M16 19V5M6 10L18 8M6 14L18 16" stroke="#5D7C5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>;
    case 'BPA Free':
      return <path d="M12 18H10A6 6 0 014 12V6M12 18H14A6 6 0 0020 12V6M12 18V21M12 6H14A6 6 0 0020 12V14M12 6H10A6 6 0 014 12V14M12 6V3M6 10H18M10 14H14" stroke="#5D7C5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>;
    case 'Cruelty-Free':
      return <path d="M12 12C12 12 12 9 10 11C8 13 4 13 4 13M12 12C12 12 16 10 16 8C16 6 16 3 14 5C12 7 4 10 4 10M4 10L12 16M12 12C12 12 19 12 20 10C21 8 21 1 21 1" stroke="#5D7C5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>;
    case 'Biodegradable':
      return <path d="M16 11V13M12 11V13M8 11V13M14.5 17C14.5 17 17 19.5 20 17C23 14.5 21 11 18 10C15 9 14.5 17 14.5 17ZM9.5 17C9.5 17 7 19.5 4 17C1 14.5 3 11 6 10C9 9 9.5 17 9.5 17ZM12 4C12 4 15 1 18 4C21 7 19 12 16 13C13 14 12 4 12 4ZM12 4C12 4 9 1 6 4C3 7 5 12 8 13C11 14 12 4 12 4Z" stroke="#5D7C5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>;
    default:
      return null;
  }
};

const SustainableIcon: React.FC<SustainableIconProps> = ({ text, label }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-1">
      {/* Clean circular icon matching overall theme and +/- style */}
      <div className="w-16 h-16 rounded-full border border-earth-dark/10 bg-white flex items-center justify-center p-2.5 shadow-md">
         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           {getIcon(text)}
         </svg>
      </div>
      <p className="text-earth-dark/90 text-sm font-medium pt-1 capitalize">{text}</p>
      <span className="text-earth-dark/60 text-[10px] uppercase font-bold tracking-wider">{label}</span>
    </div>
  );
};

export default SustainableIcon;
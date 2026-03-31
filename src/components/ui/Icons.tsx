// src/components/ui/Icons.tsx
import React from 'react';

// Common icon properties
interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const LeafIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2C12 2 12 9 10 11C8 13 4 13 4 13M12 2C12 2 16 4 16 6C16 8 16 11 14 13C12 15 4 18 4 18M4 18L12 12M12 2C12 2 19 2 20 4C21 6 21 13 21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PlusCircleIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="11" fill="white" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6.5V17.5M6.5 12H17.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const MinusCircleIcon: React.FC<IconProps> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="11" fill="white" stroke="currentColor" strokeWidth="2"/>
    <path d="M6.5 12H17.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
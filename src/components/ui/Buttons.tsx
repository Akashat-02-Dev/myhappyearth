// components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'solid', fullWidth = false }) => {
  const baseClasses = 'px-10 py-3.5 font-bold rounded-lg text-lg transition shadow-md whitespace-nowrap';
  const variantClasses = variant === 'solid'
    ? 'bg-earth-deep text-earth-light hover:bg-earth-green/90'
    : 'bg-white text-earth-green border-2 border-earth-green/80 hover:bg-earth-light';
  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button className={`${baseClasses} ${variantClasses} ${widthClass}`}>
      {children}
    </button>
  );
};

export default Button;
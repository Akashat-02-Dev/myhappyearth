// src/components/contact/ContactInputGroup.tsx
import React from 'react';

interface ContactInputGroupProps {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  name?: string;           // ADDED
  value?: string;          // ADDED
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // ADDED
  required?: boolean;      // ADDED
}

export default function ContactInputGroup({ 
  label, type, placeholder, icon, name, value, onChange, required 
}: ContactInputGroupProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-sans font-bold text-earth-deep opacity-70 text-xs md:text-sm tracking-wider uppercase">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
        <input 
          type={type} 
          name={name}             // LINKED TO STATE
          value={value}           // LINKED TO STATE
          onChange={onChange}     // LINKED TO STATE
          required={required}     // LINKED TO STATE
          placeholder={placeholder}
          className="w-full h-12 md:h-14 pl-12 pr-4 bg-earth-light border-2 border-earth-deep rounded-xl font-sans text-earth-deep focus:border-earth-leaf focus:ring-1 focus:ring-earth-leaf transition-colors duration-300 outline-none"
          suppressHydrationWarning={true}
        />
      </div>
    </div>
  );
}
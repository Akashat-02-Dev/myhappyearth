// src/components/ui/FormInput.tsx
import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-earth-dark/70 uppercase tracking-widest pl-1">
        {label}
      </label>
      <input 
        className="w-full px-5 py-3.5 bg-white/50 backdrop-blur-md border border-earth-dark/10 rounded-2xl text-earth-dark outline-none focus:bg-white focus:border-earth-green focus:ring-2 focus:ring-earth-green/20 transition-all duration-300"
        {...props}
      />
    </div>
  );
}
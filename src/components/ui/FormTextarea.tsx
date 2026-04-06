// src/components/ui/FormTextarea.tsx
import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function FormTextarea({ label, ...props }: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-earth-dark/70 uppercase tracking-widest pl-1">
        {label}
      </label>
      <textarea 
        className="w-full px-5 py-4 bg-white/50 backdrop-blur-md border border-earth-dark/10 rounded-2xl text-earth-dark outline-none focus:bg-white focus:border-earth-green focus:ring-2 focus:ring-earth-green/20 transition-all duration-300 resize-y min-h-[150px]"
        {...props}
      />
    </div>
  );
}
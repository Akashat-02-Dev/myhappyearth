"use client";

import React from 'react';
import { contactInputs } from '@/data/contactFormData';
import ContactInputGroup from './ContactInputGroup';
import ContactActionButtons from './ContactActionButtons';

export default function ContactFormContent() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      
      {/* Row 1: Grid for Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
         <ContactInputGroup {...contactInputs[0]} />
         <ContactInputGroup {...contactInputs[1]} />
      </div>

      {/* Row 2: Subject (Full Width) */}
      <ContactInputGroup {...contactInputs[2]} />

      {/* Row 3: Message Textarea */}
      <div className="flex flex-col gap-2 w-full">
        <label className="font-sans font-bold text-earth-deep opacity-70 text-xs md:text-sm tracking-wider uppercase">
          MESSAGE
        </label>
        
        <div className="relative">
          {/* Speech Bubble Icon pinned to the top-left of the textarea */}
          <div className="absolute left-3 top-4">
            <svg className="w-5 h-5 text-earth-leaf/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          
          <textarea 
            placeholder="Tell us more about your inquiry..."
            className="w-full h-32 md:h-40 pt-4 pl-12 pr-4 bg-earth-light border-2 border-earth-deep rounded-xl font-sans text-earth-deep focus:border-earth-leaf focus:ring-1 focus:ring-earth-leaf transition-colors duration-300 resize-y outline-none"
          ></textarea>
        </div>
      </div>

      {/* Row 4: Action Buttons (Attach File, Captcha, Send) */}
      <ContactActionButtons />

    </form>
  );
}
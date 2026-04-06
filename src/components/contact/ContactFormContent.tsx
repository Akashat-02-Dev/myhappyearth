// src/components/contact/ContactFormContent.tsx
"use client";

import React, { useState } from 'react';
import { contactInputs } from '@/data/contactFormData';
import ContactInputGroup from './ContactInputGroup';
import ContactActionButtons from './ContactActionButtons';
import { submitContactInquiry } from '@/data/contactData'; // Import our new Firebase function

export default function ContactFormContent() {
  // 1. State to hold the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // 2. State to handle loading and success UI
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // 3. Handle input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Handle Firebase Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await submitContactInquiry(formData);
      setStatus('success');
      // Reset form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' }); 
    } catch (error) {
      setStatus('error');
    }
  };

  // 5. SUCCESS UI - Show this if the message sent successfully
  if (status === 'success') {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 text-center text-earth-leaf animate-fade-in">
        <div className="w-20 h-20 bg-[#D0F1D8] rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-10 h-10 text-earth-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 font-serif">Message Sent!</h3>
        <p className="text-lg text-earth-deep opacity-80 mb-10 max-w-md font-medium">
          Thank you for reaching out, {formData.name || "friend"}. Our team will get back to you shortly!
        </p>
        <button 
          onClick={() => setStatus('idle')} 
          className="px-8 py-3.5 bg-earth-leaf text-white rounded-full font-bold hover:bg-earth-forest transition shadow-md"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  // 6. STANDARD FORM UI
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      
      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100 text-center">
          Oops! Something went wrong connecting to the server. Please try again.
        </div>
      )}

      {/* Row 1: Grid for Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
         <ContactInputGroup 
            {...contactInputs[0]} 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
         />
         <ContactInputGroup 
            {...contactInputs[1]} 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
         />
      </div>

      {/* Row 2: Subject (Full Width) */}
      <ContactInputGroup 
          {...contactInputs[2]} 
          name="subject" 
          value={formData.subject} 
          onChange={handleChange} 
          required 
      />

      {/* Row 3: Message Textarea */}
      <div className="flex flex-col gap-2 w-full">
        <label className="font-sans font-bold text-earth-deep opacity-70 text-xs md:text-sm tracking-wider uppercase">
          MESSAGE
        </label>
        
        <div className="relative">
          <div className="absolute left-3 top-4">
            <svg className="w-5 h-5 text-earth-leaf/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us more about your inquiry..."
            className="w-full h-32 md:h-40 pt-4 pl-12 pr-4 bg-earth-light border-2 border-earth-deep rounded-xl font-sans text-earth-deep focus:border-earth-leaf focus:ring-1 focus:ring-earth-leaf transition-colors duration-300 resize-y outline-none"
          ></textarea>
        </div>
      </div>

      {/* Row 4: Action Buttons */}
      <ContactActionButtons loading={status === 'loading'} />

    </form>
  );
}
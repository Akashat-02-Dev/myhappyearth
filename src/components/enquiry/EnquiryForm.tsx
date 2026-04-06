// src/components/enquiry/EnquiryForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import { submitEnquiry } from '@/data/enquiryData';
import { Send, CheckCircle2 } from 'lucide-react';

export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', reference: '', message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Pre-fill the reference field if the user clicked "Enquire" from a specific product
  useEffect(() => {
    if (productParam) {
      setFormData(prev => ({ ...prev, reference: `Product Enquiry: ${productParam}` }));
    }
  }, [productParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitEnquiry(formData);
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', reference: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-10 animate-fade-in">
        <div className="w-24 h-24 bg-earth-green/10 text-earth-green rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-earth-dark mb-4">Enquiry Sent!</h3>
        <p className="text-earth-dark/70 text-lg mb-8 max-w-md">
          Thank you for reaching out. A member of our team will review your message and respond shortly.
        </p>
        <button onClick={() => setStatus('idle')} className="px-8 py-3.5 bg-earth-green text-white font-bold rounded-2xl hover:bg-earth-dark transition-colors shadow-md">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-2 md:p-8">
      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-semibold border border-red-100 text-center">
          Oops! There was a problem sending your message. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Jane" />
        <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jane@example.com" />
        <FormInput label="Phone (Optional)" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+61 400 000 000" />
      </div>

      <FormInput 
        label="Product or Order Reference" 
        name="reference" 
        value={formData.reference} 
        onChange={handleChange} 
        placeholder="e.g. Bamboo Toothbrush / Order #1234" 
      />

      <FormTextarea 
        label="Your Message" 
        name="message" 
        value={formData.message} 
        onChange={handleChange} 
        required 
        placeholder="How can we help you today?" 
      />

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className={`mt-4 flex items-center justify-center gap-2 w-full md:w-auto self-end px-12 py-4 bg-earth-deep text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-earth-green hover:-translate-y-1'}`}
      >
        {status === 'loading' ? 'Sending...' : 'Send Enquiry'} <Send className="w-5 h-5 ml-2" />
      </button>
    </form>
  );
}

// The above code defines an EnquiryForm component that handles user enquiries. It manages form state, handles submission with loading and error states, and provides user feedback upon successful submission. The form includes fields for name, email, phone, reference, and message, and pre-fills the reference field if a product query parameter is present in the URL.
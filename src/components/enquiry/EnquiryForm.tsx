// src/components/enquiry/EnquiryForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import { submitEnquiry } from '@/data/enquiryData';
import { Send, CheckCircle2, Building2, User } from 'lucide-react';

export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');

  // UPDATED: Added 'enquiryType' and 'companyName' to the state
  const [formData, setFormData] = useState({
    enquiryType: 'Individual', // Default to Individual
    companyName: '',
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    reference: '', 
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (productParam) {
      setFormData(prev => ({ ...prev, reference: `Product Enquiry: ${productParam}` }));
    }
  }, [productParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setEnquiryType = (type: 'Individual' | 'Business') => {
    setFormData({ ...formData, enquiryType: type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitEnquiry(formData);
      setStatus('success');
      // Reset form state
      setFormData({ 
        enquiryType: 'Individual', companyName: '', firstName: '', 
        lastName: '', email: '', phone: '', reference: '', message: '' 
      });
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-10 animate-fade-in">
        <div className="w-24 h-24 bg-[#588157]/10 text-[#588157] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-[#344E41] mb-4">Enquiry Sent!</h3>
        <p className="text-[#344E41]/70 text-lg mb-8 max-w-md">
          Thank you for reaching out. A member of our team will review your message and respond shortly.
        </p>
        <button 
          onClick={() => setStatus('idle')} 
          className="px-8 py-3.5 bg-[#588157] text-[#FAF3DD] font-bold rounded-2xl hover:bg-[#344E41] transition-colors shadow-md"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-2 md:p-8">
      
      {/* THE FIX: Interactive Type Toggle */}
      <div className="flex bg-[#FAF3DD]/50 p-1.5 rounded-2xl w-full sm:w-fit border border-gray-100 shadow-sm mb-2">
        <button
          type="button"
          onClick={() => setEnquiryType('Individual')}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 w-1/2 sm:w-auto ${
            formData.enquiryType === 'Individual' 
              ? 'bg-white shadow-sm text-[#344E41]' 
              : 'text-gray-500 hover:text-[#588157]'
          }`}
        >
          <User className="w-4 h-4" /> Individual
        </button>
        <button
          type="button"
          onClick={() => setEnquiryType('Business')}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 w-1/2 sm:w-auto ${
            formData.enquiryType === 'Business' 
              ? 'bg-white shadow-sm text-[#344E41]' 
              : 'text-gray-500 hover:text-[#588157]'
          }`}
        >
          <Building2 className="w-4 h-4" /> Business
        </button>
      </div>

      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-semibold border border-red-100 text-center">
          Oops! There was a problem sending your message. Please try again.
        </div>
      )}

      {/* Conditionally Render Company Name if 'Business' is selected */}
      {formData.enquiryType === 'Business' && (
        <div className="animate-fade-in">
          <FormInput 
            label="Company Name" 
            name="companyName" 
            value={formData.companyName} 
            onChange={handleChange} 
            required 
            placeholder="Greenwave Enterprises" 
          />
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
        className={`mt-4 flex items-center justify-center gap-2 w-full md:w-auto self-end px-12 py-4 bg-[#344E41] text-[#FAF3DD] rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#588157] hover:-translate-y-1'}`}
      >
        {status === 'loading' ? 'Sending...' : 'Send Enquiry'} <Send className="w-5 h-5 ml-2" />
      </button>
    </form>
  );
}
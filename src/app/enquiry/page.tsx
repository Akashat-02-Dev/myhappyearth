// src/app/enquiry/page.tsx
"use client";

import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryInfo from '@/components/enquiry/EnquiryInfo';
import EnquiryForm from '@/components/enquiry/EnquiryForm';

function EnquiryContent() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-12 pt-36 pb-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-earth-dark mb-6">
          How can we assist?
        </h1>
        <p className="text-lg text-earth-dark/70 font-medium">
          Fill out the form below with your enquiry, and our dedicated support team will get back to you as soon as possible.
        </p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[2.5rem] p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 xl:col-span-4 h-full">
          <EnquiryInfo />
        </div>

        {/* Right Side: The Form */}
        <div className="lg:col-span-7 xl:col-span-8 h-full">
          <EnquiryForm />
        </div>

      </div>
    </div>
  );
}

export default function EnquiryPage() {
  return (
    <main className="relative w-full bg-[#FAF9F5] min-h-screen flex flex-col">
      {/* Decorative Background Elements for that premium Apple-style depth */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-earth-green/10 to-transparent pointer-events-none"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-earth-leaf/5 blur-[120px] pointer-events-none"></div>

      <div className="absolute top-0 w-full z-50">
        <Navbar invert={true} /> 
      </div>

      <div className="flex-grow flex flex-col">
        {/* Suspense is required because EnquiryForm uses useSearchParams */}
        <Suspense fallback={<div className="h-[60vh] flex items-center justify-center text-earth-green font-bold text-xl">Loading...</div>}>
          <EnquiryContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
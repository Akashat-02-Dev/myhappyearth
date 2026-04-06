// src/components/enquiry/EnquiryInfo.tsx
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function EnquiryInfo() {
  return (
    <div className="bg-earth-leaf text-white rounded-[2rem] p-10 md:p-14 flex flex-col h-full shadow-2xl relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Get in Touch</h2>
        <p className="text-white/80 text-lg leading-relaxed mb-12 max-w-md">
          Whether you have a question about our sustainable products, an existing order, or wholesale opportunities, our team is ready to help.
        </p>

        <div className="flex flex-col gap-8 flex-grow">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm"><Mail className="w-6 h-6" /></div>
            <div>
              <p className="text-white/60 text-sm font-semibold tracking-wider uppercase mb-1">Email Us</p>
              <p className="text-lg font-medium">hello@myhappyearth.com.au</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm"><Phone className="w-6 h-6" /></div>
            <div>
              <p className="text-white/60 text-sm font-semibold tracking-wider uppercase mb-1">Call Us</p>
              <p className="text-lg font-medium">+61 2 1234 5678</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm"><Clock className="w-6 h-6" /></div>
            <div>
              <p className="text-white/60 text-sm font-semibold tracking-wider uppercase mb-1">Response Time</p>
              <p className="text-lg font-medium">Within 24 business hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
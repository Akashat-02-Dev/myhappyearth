"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface JourneyCtaPanelProps {
  pathLabel: string;
  icon: string;
  title: string;
  subtitle: string;
  buttonText: string;
  linkUrl: string;
  imageUrl: string;
  theme: "light" | "dark";
}

export default function JourneyCtaPanel({ 
  pathLabel,
  icon,
  title, 
  subtitle, 
  buttonText, 
  linkUrl,
  imageUrl,
  theme
}: JourneyCtaPanelProps) {
  
  // Theme Configuration
  const isLight = theme === "light";
  
  const cardBg = isLight ? "bg-white" : "bg-[#344E41]";
  const textColor = isLight ? "text-[#344E41]" : "text-[#FAF3DD]";
  const subtextColor = isLight ? "text-[#344E41]/70" : "text-[#FAF3DD]/80";
  const labelBg = isLight ? "bg-[#FAF3DD] text-[#344E41]" : "bg-[#A3B18A]/20 text-[#A3B18A]";
  
  const buttonStyle = isLight 
    ? "bg-[#344E41] text-white hover:bg-[#2a3f34] shadow-md hover:shadow-xl" 
    : "bg-[#A3B18A] text-[#344E41] hover:bg-[#8f9d77] shadow-md hover:shadow-xl";

  return (
    <div className={`group flex flex-col h-full rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5 ${cardBg}`}>
      
      {/* 1. TOP IMAGE SECTION */}
      <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden bg-gray-100">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          unoptimized // Keeps Hostinger/Firebase from throwing 404s
          sizes="(max-w-768px) 100vw, 50vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle inner gradient to blend image into the card */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-${isLight ? 'white' : '[#344E41]'}/20`}></div>
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="flex flex-col flex-grow p-8 md:p-10 lg:p-12 relative">
        
        {/* Floating Path Label (Overlaps the image slightly) */}
        <div className="absolute -top-6 left-8 md:left-10 lg:left-12 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-lg border border-white/10 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 z-10" style={{ backgroundColor: isLight ? '#FAF3DD' : '#2A3F34', color: isLight ? '#344E41' : '#A3B18A' }}>
          <span className="text-lg">{icon}</span>
          <span>{pathLabel}</span>
        </div>

        {/* Text Content */}
        <div className="mt-4 flex-grow">
          <h3 className={`text-3xl lg:text-4xl font-serif font-extrabold mb-3 ${textColor}`}>
            {title}
          </h3>
          <p className={`text-base lg:text-lg font-medium leading-relaxed max-w-sm ${subtextColor}`}>
            {subtitle}
          </p>
        </div>

        {/* 3. CTA BUTTON */}
        <div className="mt-10">
          <Link 
            href={linkUrl} 
            className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base transition-all duration-300 ${buttonStyle}`}
          >
            {buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </div>
  );
}
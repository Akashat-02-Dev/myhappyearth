import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface JourneyCtaPanelProps {
  bgColor: string;
  imageUrl: string;
  textOverlay: string;
  buttonText: string;
  buttonStyle: string;
  isOutlined?: boolean;
  linkUrl: string;
}

export default function JourneyCtaPanel({ 
  bgColor, 
  imageUrl, 
  textOverlay, 
  buttonText, 
  buttonStyle,
  isOutlined = false,
  linkUrl
}: JourneyCtaPanelProps) {
  return (
    <div className={`p-12 md:p-16 ${bgColor} flex flex-col items-center justify-center text-center h-full`}>
      
      {/* 1. IMAGE CONTAINER */}
      {/* Exact aspect ratio, rounded corners, and a group hover effect */}
      <div className="w-full max-w-[400px] aspect-square overflow-hidden rounded-lg mb-10 relative shadow-xl group">
        <Image 
          src={imageUrl} 
          alt={textOverlay} 
          fill
          sizes="(max-w-768px) 100vw, 50vw"
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* TEXT PROTECTOR OVERLAY */}
        {/* A subtle gradient that sits behind the text so it never gets lost in a bright image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* 2. TEXT OVERLAY */}
        <div className="absolute inset-x-0 bottom-8 px-6 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
            {textOverlay}
          </h3>
        </div>
      </div>

      {/* 3. CTA BUTTON */}
      {/* Applies the specific background, border, and hover colors passed from the data file */}
      <Link 
        href={linkUrl} 
        className={`inline-block px-10 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:-translate-y-1 ${buttonStyle} ${isOutlined ? 'border-2' : ''}`}
      >
          {buttonText}
      </Link>

    </div>
  );
}
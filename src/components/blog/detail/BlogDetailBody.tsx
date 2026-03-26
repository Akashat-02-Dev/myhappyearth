import React from 'react';
import Image from 'next/image';
import { BlogSection } from '@/data/blogData';

export default function BlogDetailBody({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 text-[#2E473D] font-sans leading-relaxed mb-16 w-full">
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-3xl font-serif font-bold mb-4">{section.heading}</h2>
          
          <div className={`flex flex-col ${section.image ? 'md:flex-row items-start gap-8' : ''}`}>
            {/* Paragraphs */}
            <div className="flex-1">
              {section.paragraphs.map((para, i) => (
                <p key={i} className="text-base text-opacity-80 mb-4">{para}</p>
              ))}
            </div>

            {/* Optional Image for this section */}
            {section.image && (
              <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md mt-4 md:mt-0 flex-shrink-0 bg-gray-200">
                <Image src={section.image} alt={section.heading} fill className="object-cover" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
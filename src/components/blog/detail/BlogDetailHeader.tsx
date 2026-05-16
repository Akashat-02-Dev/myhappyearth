// src/components/blog/detail/BlogDetailHeader.tsx
import React from 'react';
import Image from 'next/image';
import { Facebook, Youtube, Instagram, Linkedin, Link2, Copy } from 'lucide-react';

interface HeaderProps {
  category: string;
  title: string;
  authorName: string;
  authorImage: string;
  date: string;
  readTime: string;
  linkedinLink?: string; // Kept for legacy support, though unused in the new hardcoded button
}

const getSafeImageSrc = (src: string | undefined | null, fallback: string) => {
  if (!src || typeof src !== 'string' || src.trim() === '') return fallback;
  const cleanSrc = src.trim();
  if (cleanSrc.startsWith('/')) return cleanSrc;
  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
    try { new URL(cleanSrc); return cleanSrc; } catch (e) { return fallback; }
  }
  return fallback;
};

export default function BlogDetailHeader({ category, title, authorName, authorImage, date, readTime }: HeaderProps) {
  
  const shareLinks: Array<{ icon: React.ElementType; color: string }> = [
    // { icon: Facebook, color: 'text-[#3A808C]' },
    // { icon: Youtube, color: 'text-[#3A808C]' },
    // { icon: Instagram, color: 'text-[#3A808C]' },
    // { icon: Link2, color: 'text-[#9CA3AF]' },
    // { icon: Copy, color: 'text-[#9CA3AF]' },
  ];

  const safeAuthorImage = getSafeImageSrc(authorImage, '/images/hero-woman.jpeg');

  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="bg-[#9CA988] rounded-full px-4 py-1.5 self-start text-white text-xs font-semibold tracking-wide">
        {category}
      </div>
      
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2E473D] leading-tight max-w-5xl">
        {title}
      </h1>
      
      {/* Author Row (Contains Author Info on Left, LinkedIn on Right) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        
        {/* Left Side: Author Details */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden relative bg-gray-200 shrink-0">
             <Image src={safeAuthorImage} alt={authorName || "Author"} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-1 font-sans">
            <p className="text-sm">
              <span className="text-[#9CA3AF]">By</span> <span className="font-bold text-[#2E473D]">{authorName}</span>
            </p>
            <p className="text-xs text-[#9CA3AF]">| {date} | {readTime}</p>
          </div>
        </div>

        {/* Right Side: Social / Action Links */}
        <div className="flex items-center gap-4">
          {shareLinks.map((share, index) => (
            <button key={index} className={`${share.color} hover:opacity-80 transition-opacity`}>
              <share.icon className="w-6 h-6" strokeWidth={1.5} />
            </button>
          ))}
          
          {/* Fixed LinkedIn Redirect Button */}
          <a 
            href="https://www.linkedin.com/company/greenwave-enterprises/posts/?feedView=all" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
            title="View on LinkedIn"
            aria-label="Visit Greenwave Enterprises on LinkedIn"
          >
            <Linkedin className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
        
      </div>
    </div>
  );
}
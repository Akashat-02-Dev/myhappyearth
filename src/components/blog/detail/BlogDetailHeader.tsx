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
}

export default function BlogDetailHeader({ category, title, authorName, authorImage, date, readTime }: HeaderProps) {
  const shareLinks = [
    { icon: Facebook, color: 'text-[#3A808C]' },
    { icon: Youtube, color: 'text-[#3A808C]' },
    { icon: Instagram, color: 'text-[#3A808C]' },
    { icon: Linkedin, color: 'text-[#3A808C]' },
    { icon: Link2, color: 'text-[#9CA3AF]' },
    { icon: Copy, color: 'text-[#9CA3AF]' },
  ];

  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="bg-[#9CA988] rounded-full px-4 py-1.5 self-start text-white text-xs font-semibold tracking-wide">
        {category}
      </div>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2E473D] leading-tight max-w-5xl">
        {title}
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Fallback image logic if authorImage doesn't exist yet */}
          <div className="w-14 h-14 rounded-full border border-gray-100 overflow-hidden relative bg-gray-200">
             <Image src={authorImage || '/images/placeholder.jpg'} alt={authorName} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-1 font-sans">
            <p className="text-sm">
              <span className="text-[#9CA3AF]">By</span> <span className="font-bold text-[#2E473D]">{authorName}</span>
            </p>
            <p className="text-xs text-[#9CA3AF]">| {date} | {readTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {shareLinks.map((share, index) => (
            <button key={index} className={`${share.color} hover:opacity-80 transition-opacity`}>
              <share.icon className="w-6 h-6" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
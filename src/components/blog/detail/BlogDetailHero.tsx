import React from 'react';
import Image from 'next/image';

export default function BlogDetailHero({ image, title }: { image: string, title: string }) {
  return (
    <div className="w-full relative aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-lg bg-gray-200">
      <Image src={image || '/images/placeholder.jpg'} alt={title} fill className="object-cover" priority />
    </div>
  );
}
// components/product/ImageGallery.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  mainImage: string;
  thumbnails: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ mainImage, thumbnails }) => {
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[1/1] rounded-2xl overflow-hidden border border-earth-dark/10 bg-white">
        <Image
          src={activeImage}
          alt="Main Product"
          fill
          className="object-cover"
          priority
        />
        {/* Placeholder for the water droplets effect */}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(thumb)}
            className={`relative aspect-[1/1] rounded-xl overflow-hidden border transition ${
              activeImage === thumb
                ? 'border-earth-green ring-2 ring-earth-green'
                : 'border-earth-dark/10 hover:border-earth-dark/30'
            }`}
          >
            <Image src={thumb} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
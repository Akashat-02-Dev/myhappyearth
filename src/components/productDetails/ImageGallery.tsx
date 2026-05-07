// src/components/productDetails/ImageGallery.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  mainImage: string;
  // Allow nulls or undefined just in case the database returns empty slots
  thumbnails?: (string | null | undefined)[]; 
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ mainImage, thumbnails = [] }) => {
  // THE FIX: Filter out any empty strings, nulls, or undefined values.
  // This ensures we ONLY map over real, valid image URLs.
  const validThumbnails = thumbnails.filter((thumb): thumb is string => !!thumb && thumb.trim() !== '');

  // Set the initial active image. If mainImage is empty, fallback to the first valid thumbnail.
  const [activeImage, setActiveImage] = useState(mainImage || validThumbnails[0] || '/images/blog/beach-sunset.jpg');

  // If the product data loads asynchronously, we want to make sure the main image updates.
  useEffect(() => {
    if (mainImage && mainImage.trim() !== '') {
      setActiveImage(mainImage);
    } else if (validThumbnails.length > 0) {
      setActiveImage(validThumbnails[0]);
    }
  }, [mainImage, validThumbnails.length]);

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
          sizes="(max-w-768px) 100vw, 50vw"
        />
        {/* Placeholder for the water droplets effect */}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* Thumbnails - Only render this grid if there are actual thumbnails to show */}
      {validThumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {validThumbnails.map((thumb, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(thumb)}
              className={`relative aspect-[1/1] rounded-xl overflow-hidden border transition ${
                activeImage === thumb
                  ? 'border-earth-green ring-2 ring-earth-green'
                  : 'border-earth-dark/10 hover:border-earth-dark/30'
              }`}
            >
              <Image 
                src={thumb} 
                alt={`Thumbnail ${index + 1}`} 
                fill 
                className="object-cover" 
                sizes="25vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
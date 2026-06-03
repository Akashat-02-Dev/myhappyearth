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

  // Brand-colored fallback image
  const fallbackImage = "https://placehold.co/600x600/FAF3DD/344E41?text=No+Image";

  // Set the initial active image. If mainImage is empty, fallback to the first valid thumbnail.
  const [activeImage, setActiveImage] = useState(mainImage || validThumbnails[0] || fallbackImage);
  const [imageFailed, setImageFailed] = useState(false);

  // If the product data loads asynchronously, we want to make sure the main image updates.
  useEffect(() => {
    setImageFailed(false); // Reset error state on new data load
    if (mainImage && mainImage.trim() !== '') {
      setActiveImage(mainImage);
    } else if (validThumbnails.length > 0) {
      setActiveImage(validThumbnails[0]);
    }
  }, [mainImage, validThumbnails.length]);

  const displayImage = imageFailed ? fallbackImage : activeImage;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[1/1] rounded-2xl overflow-hidden border border-earth-dark/10 bg-white">
        <Image
          src={displayImage}
          alt="Main Product"
          fill
          unoptimized // CRITICAL FIX: Bypass Next.js optimizer to stop Firebase timeouts
          className="object-cover"
          priority
          sizes="(max-w-768px) 100vw, 50vw"
          onError={() => setImageFailed(true)} // Safely catch broken links
        />
        {/* Placeholder for the water droplets effect */}
        <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>
      </div>

      {/* Thumbnails - Only render this grid if there are actual thumbnails to show */}
      {validThumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {validThumbnails.map((thumb, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveImage(thumb);
                setImageFailed(false); // Reset error state when switching to a new thumbnail
              }}
              className={`relative aspect-[1/1] rounded-xl overflow-hidden border transition-all duration-300 ${
                activeImage === thumb
                  ? 'border-earth-green ring-2 ring-earth-green scale-[1.02] shadow-sm'
                  : 'border-earth-dark/10 hover:border-earth-dark/30 opacity-80 hover:opacity-100'
              }`}
            >
              <Image 
                src={thumb} 
                alt={`Thumbnail ${index + 1}`} 
                fill 
                unoptimized // CRITICAL FIX: Bypass Next.js optimizer to stop Firebase timeouts
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
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  mainImage: string;
  thumbnails?: (string | null | undefined)[];
}

const fallbackImage = "https://placehold.co/600x600/FAF3DD/344E41?text=No+Image";

// --- BULLETPROOF URL FORMATTER ---
// --- BULLETPROOF URL FORMATTER ---
const getSafeUrl = (url: string | null | undefined) => {
  const fallbackImage = "https://placehold.co/600x600/FAF3DD/344E41?text=No+Image";
  if (!url || url.trim() === '') return fallbackImage;
  let formattedUrl = url.trim();
  
  if (formattedUrl.startsWith('http')) {
    try { return encodeURI(decodeURI(formattedUrl)); } 
    catch (e) { return formattedUrl.replace(/ /g, '%20'); }
  }
  
  const fileName = formattedUrl.split('/').pop();
  formattedUrl = `/product_images/${fileName}`;
  
  try {
    return encodeURI(decodeURI(formattedUrl));
  } catch (e) {
    return formattedUrl.replace(/ /g, '%20');
  }
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ mainImage, thumbnails = [] }) => {
  // Filter out empty items and safely format the thumbnails
  const validThumbnails = thumbnails
    .filter((thumb): thumb is string => !!thumb && thumb.trim() !== '')
    .map(thumb => getSafeUrl(thumb));

  const safeMainImage = getSafeUrl(mainImage);
  
  const [activeImage, setActiveImage] = useState(safeMainImage !== fallbackImage ? safeMainImage : (validThumbnails[0] || fallbackImage));
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false); 
    if (safeMainImage && safeMainImage !== fallbackImage) {
      setActiveImage(safeMainImage);
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
          unoptimized // CRITICAL for Hostinger
          className="object-cover"
          priority
          sizes="(max-w-768px) 100vw, 50vw"
          onError={() => setImageFailed(true)} 
        />
        <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>
      </div>

      {/* Thumbnails */}
      {validThumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {validThumbnails.map((thumb, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveImage(thumb);
                setImageFailed(false);
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
                unoptimized 
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
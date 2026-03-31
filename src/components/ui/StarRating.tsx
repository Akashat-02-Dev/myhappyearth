// components/ui/StarRating.tsx
import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-0.5 text-earth-green">
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < fullStars) {
          return <span key={index} className="text-xl">★</span>; // Solid star
        } else if (hasHalfStar && index === fullStars) {
          return <span key={index} className="text-xl">⯪</span>; // Half star (using simple glyph)
        } else {
          return <span key={index} className="text-xl text-earth-green/30">★</span>; // Empty star
        }
      })}
    </div>
  );
};

export default StarRating;
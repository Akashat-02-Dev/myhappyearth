// components/product/ProductHeader.tsx
import React from 'react';
import StarRating from '@/components/ui/StarRating';

interface ProductHeaderProps {
  title: string;
  rating: number;
  reviewCount: number;
  price: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ title, rating, reviewCount, price }) => {
  return (
    <div className="flex flex-col gap-1.5 pb-2 border-b border-earth-dark/10">
      <h1 className="text-4xl font-extrabold text-earth-dark">{title}</h1>
      <div className="flex items-center gap-2">
        <StarRating rating={rating} />
        <span className="text-earth-dark/70 text-sm">{rating.toFixed(1)} ({reviewCount} reviews)</span>
      </div>
      {/* <p className="text-3xl font-extrabold text-earth-green mt-1">{price}</p> */}
    </div>
  );
};

export default ProductHeader;
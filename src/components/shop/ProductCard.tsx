import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    rating: number;
    imageUrl: string;
    badge: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-earth-forest p-6 rounded-[2rem] shadow-xl flex flex-col gap-5 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full border border-earth-light/5">
      
      {/* Product Image and Badge */}
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-earth-light/5">
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          fill
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Subtle shadow added to the badge for better contrast over images */}
        <div className="absolute top-4 right-4 bg-badge-green text-badge-text-green px-4 py-1.5 rounded-full font-bold text-xs tracking-wide shadow-md z-10 uppercase">
          {product.badge}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow gap-1.5 px-2">
        <h3 className="font-bold text-xl text-earth-light leading-tight">
          {product.name}
        </h3>
        
        {/* Using opacity (70%) creates a professional visual hierarchy */}
        <p className="text-sm font-medium text-earth-light/70 flex-grow leading-relaxed mb-2">
          {product.description}
        </p>
        
        <p className="font-extrabold text-2xl text-earth-light tracking-tight">
          {product.price}
        </p>
        
        {/* Star Rating */}
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span 
              key={i} 
              // Empty stars are dimmed (20% opacity) so the active ones stand out
              className={`text-lg ${i < product.rating ? 'text-earth-sage' : 'text-earth-light/20'}`}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-auto pt-2">
        {/* Fixed typo and added an active scale effect for a tactile feel */}
        <button className="flex-grow bg-earth-light text-earth-forest px-6 py-3.5 rounded-2xl font-bold text-base hover:bg-white hover:shadow-lg transition-all duration-300 active:scale-[0.97]">
          Enquire
        </button>
        
        {/* Placed the heart inside a subtle interactive button container */}
        <button className="p-3.5 bg-earth-light/10 rounded-2xl text-earth-light hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 active:scale-[0.97] flex-shrink-0">
          <Heart className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
// src/components/shop/ShopContent.tsx
"use client";

import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { Product } from '@/data/shopData'; 

interface ShopContentProps {
  products: Product[]; // Notice: Only products are required here!
}

export default function ShopContent({ products = [] }: ShopContentProps) {
  // --- STATE LIVES HERE (Not in the parent page!) ---
  const [sortOption, setSortOption] = useState("alphabetical"); 
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // --- SORTING & FILTERING ENGINE ---
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Material Filtering
    if (selectedMaterials.length > 0) {
      result = result.filter(p => {
        const legacyMatch = p.material && selectedMaterials.includes(p.material);
        const arrayMatch = p.materials && p.materials.some(m => selectedMaterials.includes(m));
        return legacyMatch || arrayMatch;
      });
    }

    // Sorting Logic
    result.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;

      switch (sortOption) {
        case 'alphabetical':
          return (a.name || "").localeCompare(b.name || "");
        case 'price_low':
          return priceA - priceB;
        case 'price_high':
          return priceB - priceA;
        case 'best_seller':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return (b.id || "").localeCompare(a.id || "");
        default:
          return 0;
      }
    });

    return result;
  }, [products, sortOption, selectedMaterials]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto px-6 py-12">
      
      {/* Sidebar Section */}
      <div className="w-full lg:w-1/4 flex-shrink-0">
        {/* ShopContent passes the state down to the Sidebar */}
        <Sidebar 
          sortOption={sortOption}
          setSortOption={setSortOption}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={setSelectedMaterials}
          availableMaterials={Array.from(new Set(products.flatMap(p => p.materials || [p.material]).filter(Boolean)))}
        />
      </div>

      {/* Products Grid Section */}
      <div className="w-full lg:w-3/4">
        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedProducts.map((product) => (
              <ProductCard 
                key={product.id || product.name} 
                product={product} 
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
// src/app/products/shop/page.tsx
"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/shop/Header';
import Sidebar from '@/components/shop/Sidebar';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts, Product } from '@/data/shopData';
import { getShopSettings } from '@/data/settingsData';

// Safely parse price, ensuring we don't crash if priceStr is undefined
const parsePrice = (priceStr: string | undefined) => {
  if (!priceStr) return 0;
  const match = priceStr.toString().match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['All']);
  const [dynamicMaterials, setDynamicMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  // FIX 1: Set default to match the dropdown's default value
  const [sortOption, setSortOption] = useState('alphabetical'); 
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      setSelectedCategory(catFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const [productsData, settingsData] = await Promise.all([
          getProducts(),
          getShopSettings()
        ]);
        
        setProducts(productsData || []);
        setDynamicCategories(['All', ...(settingsData?.categories || [])]); 
        setDynamicMaterials(settingsData?.materials || []);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => parsePrice(p.price) <= maxPrice);

    // FIX 2: Check both legacy string and new array for materials
    if (selectedMaterials.length > 0) {
      result = result.filter(p => {
        const legacyMatch = p.material && selectedMaterials.includes(p.material);
        const arrayMatch = p.materials && p.materials.some(m => selectedMaterials.includes(m));
        return legacyMatch || arrayMatch;
      });
    }

    // FIX 3: Update switch cases to perfectly match the Sidebar options
    switch (sortOption) {
      case 'alphabetical':
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case 'price_low': 
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); 
        break;
      case 'price_high': 
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); 
        break;
      case 'newest': 
        result.sort((a, b) => {
          const idA = a.id ? a.id.toString() : "";
          const idB = b.id ? b.id.toString() : "";
          return idB.localeCompare(idA);
        }); 
        break;
      case 'best_seller':
      default: 
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); 
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortOption, maxPrice, selectedMaterials]);

  return (
    <main className="relative w-full bg-[#F8FAF7] min-h-screen flex flex-col">
      
      <Navbar invert={true} /> 

      <div className="flex-grow pt-36 pb-12 px-6 md:px-12 lg:px-24 flex flex-col gap-10 max-w-[1600px] mx-auto w-full">
        
        <Header 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          availableCategories={dynamicCategories}
        />

        <div className="w-full flex flex-col md:flex-row gap-12 mt-4">
          <div className="w-full md:w-[320px] shrink-0">
            <Sidebar 
              sortOption={sortOption} setSortOption={setSortOption}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials}
              availableMaterials={dynamicMaterials}
            />
          </div>

          <div className="flex-grow flex flex-col gap-8">
            {loading ? (
              <div className="py-32 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#063c60] to-[#ec6917] text-xl font-bold animate-pulse">
                Loading our collection...
              </div>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-500">
                  Showing {filteredProducts.length} products
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center text-gray-500 text-xl font-medium">
                      No products found matching your current filters.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
      
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF7] text-transparent bg-clip-text bg-gradient-to-r from-[#063c60] to-[#ec6917] font-bold text-xl">
        Loading Shop...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
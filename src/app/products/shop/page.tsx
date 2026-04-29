// src/app/products/shop/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/shop/Header';
import Sidebar from '@/components/shop/Sidebar';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts, Product } from '@/data/shopData';
import { getShopSettings } from '@/data/settingsData';

const parsePrice = (priceStr: string) => {
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['All']);
  const [dynamicMaterials, setDynamicMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        // Fetch products and settings from Firebase simultaneously
        const [productsData, settingsData] = await Promise.all([
          getProducts(),
          getShopSettings()
        ]);
        
        setProducts(productsData);
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
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => parsePrice(p.price) <= maxPrice);

    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.material));
    }

    switch (sortOption) {
      case 'price_low': result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break;
      case 'price_high': result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break;
      case 'newest': 
        // Firebase IDs are strings, so we use localeCompare instead of subtraction
        result.sort((a, b) => (b.id || "").localeCompare(a.id || "")); 
        break;
      case 'popular':
      default: result.sort((a, b) => b.rating - a.rating); break;
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
              <div className="py-32 text-center text-[#6F9B69] text-xl font-bold animate-pulse">
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
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

// --- CATEGORY MAPPER ---
// Standardizes "EcoServe" to "Eco-Serve" and groups subcategories
const getMasterCategory = (cat: string) => {
  const compostableGroup = ['Compostable Products', 'Biodegradable Products'];
  // Added both 'Eco-Serve' and 'EcoServe' to catch any legacy database entries!
  const ecoServeGroup = ['Eco-Serve', 'EcoServe', 'Natura Dine', 'Zero Waste', 'Table Products'];
  
  if (compostableGroup.includes(cat)) return 'Compostable Products';
  if (ecoServeGroup.includes(cat)) return 'Eco-Serve'; // Forces the hyphenated version
  return cat;
};

function ShopContent() {
  const searchParams = useSearchParams();
  
  // Intercept the URL immediately and map it to the master category
  const rawCatFromUrl = searchParams.get('category') || 'All';
  const initialCategory = getMasterCategory(rawCatFromUrl);

  const [products, setProducts] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['All']);
  const [dynamicMaterials, setDynamicMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  const [sortOption, setSortOption] = useState('alphabetical'); 
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Update selected category when URL changes, mapping to the master group
  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      const masterCat = getMasterCategory(catFromUrl);
      setSelectedCategory(masterCat);
      
      // Silently rewrite the URL so the active category pill works perfectly
      if (masterCat !== catFromUrl) {
        window.history.replaceState(null, '', `?category=${encodeURIComponent(masterCat)}`);
      }
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
        
        // Map the categories fetched from settings to avoid duplicate buttons
        const fetchedCategories = settingsData?.categories || [];
        const cleanCategories = Array.from(new Set(fetchedCategories.map(getMasterCategory)));
        setDynamicCategories(['All', ...cleanCategories]); 
        
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

    // --- GROUP FILTERING ---
    if (selectedCategory !== 'All') {
      const compostableGroup = ['Compostable Products', 'Biodegradable Products'];
      const ecoServeGroup = ['Eco-Serve', 'EcoServe', 'Natura Dine', 'Zero Waste', 'Table Products'];

      result = result.filter(p => {
        if (selectedCategory === 'Compostable Products') {
          return compostableGroup.includes(p.category);
        }
        // Now checks against the newly enforced hyphenated state
        if (selectedCategory === 'Eco-Serve') {
          return ecoServeGroup.includes(p.category);
        }
        return p.category === selectedCategory;
      });
    }

    result = result.filter(p => parsePrice(p.price) <= maxPrice);

    if (selectedMaterials.length > 0) {
      result = result.filter(p => {
        const legacyMatch = p.material && selectedMaterials.includes(p.material);
        const arrayMatch = p.materials && p.materials.some(m => selectedMaterials.includes(m));
        return legacyMatch || arrayMatch;
      });
    }

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
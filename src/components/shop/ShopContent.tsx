// src/components/shop/ShopContent.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/shop/Header';
import Sidebar from '@/components/shop/Sidebar';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts, Product } from '@/data/shopData';
import { getShopSettings } from '@/data/settingsData';

const parsePrice = (priceStr: string | number | undefined) => {
  if (!priceStr) return 0;
  const match = priceStr.toString().match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

// --- CATEGORY REMAPPING LOGIC ---
// Instantly maps aliases to their designated Master Category
const getMasterCategory = (cat: string) => {
  const compostableGroup = ['Compostable Products', 'Biodegradable Products'];
  const ecoServeGroup = ['EcoServe', 'Natura Dine', 'Zero Waste', 'Table Products'];
  
  if (compostableGroup.includes(cat)) return 'Compostable Products';
  if (ecoServeGroup.includes(cat)) return 'EcoServe';
  return cat;
};

export interface ShopContentProps {}

export default function ShopContent(props: ShopContentProps) {
  const searchParams = useSearchParams();
  
  // Read URL and immediately map it to the Master Category
  const rawCatFromUrl = searchParams.get('category') || 'All';
  const initialCategory = getMasterCategory(rawCatFromUrl);

  // --- STATE ---
  const [products, setProducts] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['All']);
  const [dynamicMaterials, setDynamicMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState('alphabetical');
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // --- FETCH DATA & HANDLE URL ALIASES ---
  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      const masterCat = getMasterCategory(catFromUrl);
      setSelectedCategory(masterCat);
      
      // OPTIONAL BUT PREMIUM: If the user clicked "Zero Waste", this silently 
      // rewrites the browser URL to "EcoServe" so it looks totally professional!
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
        
        // CLEANUP: We map all Admin categories through the Master filter and remove duplicates.
        // This ensures "Zero Waste" and "EcoServe" don't show up as separate buttons in the header!
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

  // --- FILTER & SORT ENGINE ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. CATEGORY GROUPING LOGIC
    if (selectedCategory !== 'All') {
      const compostableGroup = ['Compostable Products', 'Biodegradable Products'];
      const ecoServeGroup = ['EcoServe', 'Natura Dine', 'Zero Waste', 'Table Products'];

      result = result.filter(p => {
        // If the UI is showing the "Compostable Products" master category,
        // grab ANY product from the database that belongs to that group.
        if (selectedCategory === 'Compostable Products') {
          return compostableGroup.includes(p.category);
        }
        // Same logic for EcoServe
        if (selectedCategory === 'EcoServe') {
          return ecoServeGroup.includes(p.category);
        }
        // Fallback for single standard categories
        return p.category === selectedCategory;
      });
    }

    // 3. Price Filter
    result = result.filter(p => parsePrice(p.price) <= maxPrice);

    // 4. Material Filter
    if (selectedMaterials.length > 0) {
      result = result.filter(p => {
        const legacyMatch = p.material && selectedMaterials.includes(p.material);
        const arrayMatch = p.materials && p.materials.some(m => selectedMaterials.includes(m));
        return legacyMatch || arrayMatch;
      });
    }

    // 5. Sorting Logic
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

  // --- RENDER ---
  return (
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
                    <ProductCard key={product.id || product.name} product={product} />
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
  );
}
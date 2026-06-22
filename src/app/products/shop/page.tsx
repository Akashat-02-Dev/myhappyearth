// src/app/products/shop/page.tsx
"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/shop/Header';
import Sidebar from '@/components/shop/Sidebar';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts, Product } from '@/data/shopData';
import { getShopSettings } from '@/data/settingsData';
import { personalCategories, commercialCategories } from '@/data/productsCategoriesData'; 

const parsePrice = (priceStr: string | undefined) => {
  if (!priceStr) return 0;
  const match = priceStr.toString().match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

// Helper: Safely extracts category arrays from both old and new DB structures
const getProductCategories = (p: Product) => {
  return p.categories?.length ? p.categories : (p.category ? [p.category] : []);
};

function ShopContent() {
  const searchParams = useSearchParams();
  const rawCatFromUrl = searchParams.get('category') || 'All';
  const rawPathFromUrl = searchParams.get('path'); 

  const [products, setProducts] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['All']);
  const [dynamicMaterials, setDynamicMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(rawCatFromUrl);
  const [currentPath, setCurrentPath] = useState(rawPathFromUrl || 'all'); 
  const [sortOption, setSortOption] = useState('alphabetical'); 
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // 1. URL Syncing
  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    const pFromUrl = searchParams.get('path');
    if (pFromUrl) setCurrentPath(pFromUrl);
    if (catFromUrl) setSelectedCategory(catFromUrl);
  }, [searchParams]);

  // 2. Fetch Data (Runs Once)
  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const [productsData, settingsData] = await Promise.all([
          getProducts(), getShopSettings()
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

  // 3. Header Isolation (Personal vs Commercial)
  const headerCategories = useMemo(() => {
    const personalNames = personalCategories.map(c => c.title);
    const commercialNames = commercialCategories.map(c => c.title);

    if (currentPath === 'personal') {
      return dynamicCategories.filter(c => !commercialNames.includes(c));
    } else if (currentPath === 'commercial') {
      return dynamicCategories.filter(c => !personalNames.includes(c));
    }
    return dynamicCategories; 
  }, [dynamicCategories, currentPath]);

  // 4. Core Routing Logic
  const filterByContextAndCategory = useMemo(() => (p: Product) => {
    const pCats = getProductCategories(p);

    if (selectedCategory !== 'All') {
      return pCats.includes(selectedCategory);
    } else {
      if (currentPath === 'personal' || currentPath === 'commercial') {
        const allowedCats = headerCategories.filter(c => c !== 'All');
        return pCats.some(c => allowedCats.includes(c));
      }
      return true;
    }
  }, [selectedCategory, currentPath, headerCategories]);

  // 5. Dynamic Materials Calculation
  const availableMaterialsForCategory = useMemo(() => {
    const validProducts = products.filter(filterByContextAndCategory);
    const materialsSet = new Set<string>();
    
    validProducts.forEach(p => {
      if (p.material) materialsSet.add(p.material);
      if (p.materials && Array.isArray(p.materials)) p.materials.forEach(m => materialsSet.add(m));
    });

    const extractedMaterials = Array.from(materialsSet).sort((a, b) => a.localeCompare(b));
    return extractedMaterials.length > 0 ? extractedMaterials : dynamicMaterials;
  }, [products, filterByContextAndCategory, dynamicMaterials]);

  // Clear dead material filters
  useEffect(() => {
    if (availableMaterialsForCategory.length > 0) {
      setSelectedMaterials(prev => prev.filter(m => availableMaterialsForCategory.includes(m)));
    }
  }, [availableMaterialsForCategory]);

  // 6. Final Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    let result = products.filter(filterByContextAndCategory);
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.name?.toLowerCase().includes(q)) || 
        (p.description?.toLowerCase().includes(q))
      );
    }

    result = result.filter(p => parsePrice(p.price) <= maxPrice);

    if (selectedMaterials.length > 0) {
      result = result.filter(p => {
        const legacyMatch = p.material && selectedMaterials.includes(p.material);
        const arrayMatch = p.materials?.some(m => selectedMaterials.includes(m));
        return legacyMatch || arrayMatch;
      });
    }

    switch (sortOption) {
      case 'price_low': result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break;
      case 'price_high': result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break;
      case 'newest': result.sort((a, b) => (b.id || "").localeCompare(a.id || "")); break;
      case 'best_seller': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'alphabetical': 
      default: result.sort((a, b) => (a.name || "").localeCompare(b.name || "")); break;
    }
    return result;
  }, [products, filterByContextAndCategory, searchQuery, sortOption, maxPrice, selectedMaterials]);

  return (
    <main className="relative w-full bg-[#F8FAF7] min-h-screen flex flex-col">
      <Navbar invert={true} /> 
      <div className="flex-grow pt-36 pb-12 px-6 md:px-12 lg:px-24 flex flex-col gap-10 max-w-[1600px] mx-auto w-full">
        <Header 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          availableCategories={headerCategories} 
        />
        <div className="w-full flex flex-col lg:flex-row gap-12 mt-4">
          <div className="w-full lg:w-[320px] shrink-0">
            <Sidebar 
              sortOption={sortOption} setSortOption={setSortOption}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials}
              availableMaterials={availableMaterialsForCategory} 
            />
          </div>
          <div className="flex-grow flex flex-col gap-8">
            {loading ? (
              <div className="py-32 text-center text-[#6F9B69] text-xl font-bold animate-pulse">Loading collection...</div>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-500">Showing {filteredProducts.length} products</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id || product.name} product={product} currentPath={currentPath} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center text-gray-500 text-xl font-medium">No products found matching these filters.</div>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8FAF7] text-[#6F9B69] font-bold text-xl">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
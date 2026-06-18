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
// IMPORT CATEGORY LISTS FOR ISOLATION
import { personalCategories, commercialCategories } from '@/data/productsCategoriesData'; 

const parsePrice = (priceStr: string | undefined) => {
  if (!priceStr) return 0;
  const match = priceStr.toString().match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const getMasterCategory = (cat: string) => {
  const compostableGroup = ['Compostable Products', 'Biodegradable Products'];
  const ecoServeGroup = ['Eco-Serve', 'EcoServe', 'Natura Dine', 'Zero Waste', 'Table Products'];
  
  if (compostableGroup.includes(cat)) return 'Compostable Products';
  if (ecoServeGroup.includes(cat)) return 'Eco-Serve';
  return cat;
};

function ShopContent() {
  const searchParams = useSearchParams();
  const rawCatFromUrl = searchParams.get('category') || 'All';
  const rawPathFromUrl = searchParams.get('path'); // Identifies Personal vs Commercial
  const initialCategory = getMasterCategory(rawCatFromUrl);

  const [products, setProducts] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['All']);
  const [dynamicMaterials, setDynamicMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPath, setCurrentPath] = useState(rawPathFromUrl || 'all'); 
  const [sortOption, setSortOption] = useState('alphabetical'); 
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Update State Based on URL
  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    const pFromUrl = searchParams.get('path');

    // Establish context path
    if (pFromUrl) {
      setCurrentPath(pFromUrl);
    } else if (catFromUrl) {
      // Auto-detect path if missing in URL but category is recognized
      const personalNames = personalCategories.map(c => c.title);
      const commercialNames = commercialCategories.map(c => c.title);
      const masterCat = getMasterCategory(catFromUrl);
      
      if (personalNames.includes(masterCat)) setCurrentPath('personal');
      else if (commercialNames.includes(masterCat)) setCurrentPath('commercial');
    }

    if (catFromUrl) {
      const masterCat = getMasterCategory(catFromUrl);
      setSelectedCategory(masterCat);
      
      if (masterCat !== catFromUrl) {
        window.history.replaceState(null, '', `?category=${encodeURIComponent(masterCat)}${pFromUrl ? `&path=${pFromUrl}` : ''}`);
      }
    }
  }, [searchParams]);

  // Fetch Database Data
  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const [productsData, settingsData] = await Promise.all([
          getProducts(),
          getShopSettings()
        ]);
        
        setProducts(productsData || []);
        
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

  // --- PATH ISOLATION LOGIC FOR HEADER ---
  // Calculates exactly which categories belong in the top filter bar
  const headerCategories = useMemo(() => {
    const personalNames = personalCategories.map(c => c.title);
    const commercialNames = commercialCategories.map(c => c.title);

    if (currentPath === 'personal') {
      // Show only personal categories + dynamic admin ones NOT tagged as commercial
      return dynamicCategories.filter(c => !commercialNames.includes(c));
    } else if (currentPath === 'commercial') {
      // Show only commercial categories + dynamic admin ones NOT tagged as personal
      return dynamicCategories.filter(c => !personalNames.includes(c));
    }
    
    return dynamicCategories; // Fallback: Show all if no path is set
  }, [dynamicCategories, currentPath]);


  // --- PATH ISOLATION LOGIC FOR MATERIALS ---
  // Calculates materials based ONLY on products inside the current isolated path
  const availableMaterialsForCategory = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      const compostableGroup = ['Compostable Products', 'Biodegradable Products'];
      const ecoServeGroup = ['Eco-Serve', 'EcoServe', 'Natura Dine', 'Zero Waste', 'Table Products'];
      
      result = result.filter(p => {
        if (selectedCategory === 'Compostable Products') return compostableGroup.includes(p.category);
        if (selectedCategory === 'Eco-Serve') return ecoServeGroup.includes(p.category);
        return p.category === selectedCategory;
      });
    } else {
      // Restrict "All" to the current path's category list
      if (currentPath === 'personal' || currentPath === 'commercial') {
        const allowedCats = headerCategories.filter(c => c !== 'All');
        result = result.filter(p => allowedCats.includes(p.category));
      }
    }

    const materialsSet = new Set<string>();
    result.forEach(p => {
      if (p.material) materialsSet.add(p.material);
      if (p.materials && Array.isArray(p.materials)) {
        p.materials.forEach(m => materialsSet.add(m));
      }
    });

    const extractedMaterials = Array.from(materialsSet).sort((a, b) => a.localeCompare(b));
    return extractedMaterials.length > 0 ? extractedMaterials : dynamicMaterials;
  }, [products, selectedCategory, dynamicMaterials, currentPath, headerCategories]);

  // Clears checked materials if they don't exist in the newly selected category
  useEffect(() => {
    if (availableMaterialsForCategory.length > 0) {
      setSelectedMaterials(prev => 
        prev.filter(m => availableMaterialsForCategory.includes(m))
      );
    }
  }, [availableMaterialsForCategory]);


  // --- CORE PRODUCT FILTERING ---
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

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      const compostableGroup = ['Compostable Products', 'Biodegradable Products'];
      const ecoServeGroup = ['Eco-Serve', 'EcoServe', 'Natura Dine', 'Zero Waste', 'Table Products'];
      
      result = result.filter(p => {
        if (selectedCategory === 'Compostable Products') return compostableGroup.includes(p.category);
        if (selectedCategory === 'Eco-Serve') return ecoServeGroup.includes(p.category);
        return p.category === selectedCategory;
      });
    } else {
      // Restrict "All" products to current path's context
      if (currentPath === 'personal' || currentPath === 'commercial') {
        const allowedCats = headerCategories.filter(c => c !== 'All');
        result = result.filter(p => allowedCats.includes(p.category));
      }
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
  }, [products, searchQuery, selectedCategory, sortOption, maxPrice, selectedMaterials, currentPath, headerCategories]);

  return (
    <main className="relative w-full bg-[#F8FAF7] min-h-screen flex flex-col">
      <Navbar invert={true} /> 
      
      <div className="flex-grow pt-36 pb-12 px-6 md:px-12 lg:px-24 flex flex-col gap-10 max-w-[1600px] mx-auto w-full">
        
        {/* Pass filtered headerCategories instead of dynamicCategories */}
        <Header 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          availableCategories={headerCategories} 
        />
        
        <div className="w-full flex flex-col md:flex-row gap-12 mt-4">
          <div className="w-full md:w-[320px] shrink-0">
            {/* Pass path-restricted availableMaterialsForCategory */}
            <Sidebar 
              sortOption={sortOption} setSortOption={setSortOption}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials}
              availableMaterials={availableMaterialsForCategory} 
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
      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF7] text-[#6F9B69] font-bold text-xl">
        Loading Shop...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
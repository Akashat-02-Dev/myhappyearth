// src/app/productDetails/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Import your data fetcher and types
import { getProducts, Product } from '@/data/shopData';

// Import the UI components
import ImageGallery from '@/components/productDetails/ImageGallery';
import ProductDetails from '@/components/productDetails/ProductDetails';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; 

export default function DynamicProductPage() {
  const params = useParams();
  
  // Ensure it's treated as a string to perfectly match the database ID.
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const allProducts = await getProducts();
        const foundProduct = allProducts.find((p: Product) => String(p.id) === String(productId));
        
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-[#063c60] font-bold text-xl animate-pulse">
        Loading Product Details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-[#063c60]">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-4xl font-extrabold text-[#ec6917]">Product Not Found</h1>
          <p className="text-gray-600 font-medium">We couldn't find the product you're looking for.</p>
          <Link 
            href="/products/shop"
            className="mt-4 px-6 py-3 bg-[#063c60] text-white rounded-full font-semibold hover:bg-[#ec6917] transition-colors duration-300"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Safely grab the materials array and format it as a comma-separated string
  const displayMaterials = product.materials?.length 
    ? product.materials.join(', ') 
    : (product.material || 'N/A');

  // Safely grab the sizes array and format it as a comma-separated string
  const displaySizes = product.sizes?.length 
    ? product.sizes.join(', ') 
    : 'One Size / Standard';

  // Map the strict 'Product' interface to the rich data structure the UI expects
  const formattedProductData = {
    title: product.name,
    price: product.price.includes('AUD') ? product.price : `AUD ${product.price}`,
    rating: product.rating,
    reviewCount: Math.floor(Math.random() * 200) + 15,
    description: product.description + ". Crafted meticulously to ensure the highest standard of sustainable living.",
    
    mainImage: product.imageUrl || (product.imageUrls && product.imageUrls[0]) || '',
    
    thumbnails: product.imageUrls && product.imageUrls.length > 0 
      ? product.imageUrls 
      : [product.imageUrl], 
      
    // Dynamically generating proof points using the new joined strings
    sustainableProof: [
      `Made from ${displayMaterials}`,
      `Available in: ${displaySizes}`,
      `Ethically Produced for the ${product.category} Collection`,
    ],
    sustainableAttributes: [
      { text: displayMaterials, label: 'MATERIALS' },
      { text: displaySizes, label: 'AVAILABLE SIZES' }, 
      { text: product.badge || 'N/A', label: 'CERTIFIED' },
      { text: product.category, label: 'CATEGORY' },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 text-[#063c60] font-sans flex flex-col">
      {/* <Navbar /> */}
      
      <div className="flex-grow container mx-auto px-4 md:px-8 py-10 pt-24">
        
        {/* BACK BUTTON */}
        <div className="mb-8">
          <Link 
            href="/products/shop" 
            className="inline-flex items-center gap-2 text-[#063c60] hover:text-[#ec6917] font-semibold transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full">
            <ImageGallery 
              mainImage={formattedProductData.mainImage} 
              thumbnails={formattedProductData.thumbnails} 
            />
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full flex flex-col gap-6">
            <ProductDetails
              data={formattedProductData}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
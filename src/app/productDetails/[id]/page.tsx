// src/app/productDetails/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Import your data fetcher and types
import { getProducts, Product } from '@/data/shopData';

// Import the UI components we built in the previous step
import ImageGallery from '@/components/productDetails/ImageGallery';
import ProductDetails from '@/components/productDetails/ProductDetails';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; 

export default function DynamicProductPage() {
  const params = useParams();
  
  // THE FIX 1: Do not cast to Number. Firebase IDs can be alphanumeric strings.
  // We ensure it's treated as a string to perfectly match the database ID.
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch the product from local storage/shopData on mount to avoid hydration mismatches
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
        // THE FIX 2: Tell React to stop showing the loading screen whether it succeeded or failed!
        setLoading(false); 
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-light flex items-center justify-center text-earth-green font-bold text-xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-earth-light flex flex-col items-center justify-center text-earth-dark">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-extrabold text-earth-dark">Product Not Found</h1>
          <p>We couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  // Map the strict 'Product' interface to the rich data structure the UI expects
  const formattedProductData = {
    title: product.name,
    // Add "AUD" if it's missing from the raw string for formatting consistency
    price: product.price.includes('AUD') ? product.price : `AUD ${product.price}`,
    rating: product.rating,
    reviewCount: Math.floor(Math.random() * 200) + 15, // Mocking review count
    description: product.description + ". Crafted meticulously to ensure the highest standard of sustainable living. Perfect for your active lifestyle, reducing waste one step at a time.",
    mainImage: product.imageUrl,
    // Generating mock thumbnails using the main image
    thumbnails: [
      product.imageUrl,
      product.imageUrl,
      product.imageUrl,
      product.imageUrl,
    ],
    // Dynamically generating proof points based on the product's actual data!
    sustainableProof: [
      `Made from ${product.material}`,
      `Certified ${product.badge} Product`,
      `Ethically Produced for the ${product.category} Collection`,
    ],
    sustainableAttributes: [
      { text: product.material, label: 'MATERIAL' },
      { text: product.badge || 'N/A', label: 'CERTIFIED' }, // Added fallback for optional badge
      { text: 'Eco-Friendly', label: 'SUSTAINABLE' },
      { text: product.category, label: 'CATEGORY' },
    ],
  };

  return (
    <main className="min-h-screen bg-earth-light text-earth-dark font-sans flex flex-col">
      {/* <Navbar /> */}
      
      <div className="flex-grow container mx-auto px-4 md:px-8 py-10 pt-24">
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
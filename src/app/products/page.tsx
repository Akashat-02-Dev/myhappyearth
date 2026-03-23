"use client";

// Global Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Modular Products Components
import ProductsHero from '@/components/products/ProductsHero';
import ProductsCategoriesSection from '@/components/products/ProductsCategoriesSection';
import OurJourneySection from '@/components/products/OurJourneySection';

export default function ProductsPage() {
  return (
    <main className="relative w-full bg-[#F8FAF7] min-h-screen flex flex-col">
      
      {/* Navbar Integration */}
      {/* Setting invert={false} since the hero has a dark overlay */}
      <div className="absolute top-0 w-full z-50">
        <Navbar invert={false} /> 
      </div>

      {/* Component 1: Products Hero Section */}
      <ProductsHero />

      {/* Component 2: Products Categories Grid */}
      <ProductsCategoriesSection />

      {/* Component 3: Split CTA Journey Section */}
      <OurJourneySection />

      {/* Component 4: Standard Footer */}
      <Footer />

    </main>
  );
}
// src/app/impact/page.tsx

// CRITICAL: No "use client" here! This must be a Server Component to securely use your .env variables.

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import CategoryFilterBar from '@/components/blog/CategoryFilterBar';

// Import your newly updated, modular BlogSection!
import BlogSection from '@/components/blog/BlogSection';

// Import the async fetcher function
import { getLinkedInPosts } from '@/data/blogData';

export default async function BlogPage() {
  // Securely fetch the posts on the server side
  const linkedInPosts = await getLinkedInPosts();

  return (
    <main className="relative w-full bg-[#FDFCF8] min-h-screen flex flex-col">
      
      <div className="absolute top-0 w-full z-50">
        <Navbar invert={false} />
      </div>

      <BlogHero />
      <CategoryFilterBar />

      {/* Pass the securely fetched data directly into your modular component */}
      <BlogSection posts={linkedInPosts} />

      <Footer />
      
    </main>
  );
}
// src/app/impact/page.tsx
"use client"; // <-- Switched back to client component for Firebase JS SDK

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import CategoryFilterBar from '@/components/blog/CategoryFilterBar';
import BlogSection from '@/components/blog/BlogSection';

import { getBlogPosts, BlogPost } from '@/data/blogData';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirebasePosts = async () => {
      const data = await getBlogPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchFirebasePosts();
  }, []);

  return (
    <main className="relative w-full bg-[#FDFCF8] min-h-screen flex flex-col">
      <div className="absolute top-0 w-full z-50">
        <Navbar invert={false} />
      </div>

      <BlogHero />
      <CategoryFilterBar />

      {loading ? (
        <div className="w-full py-32 flex justify-center text-[#2E473D] text-xl font-bold">
          Loading Articles...
        </div>
      ) : (
        <BlogSection posts={posts} />
      )}

      <Footer />
    </main>
  );
}
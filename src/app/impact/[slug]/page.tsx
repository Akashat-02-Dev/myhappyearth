// src/app/blog/[slug]/page.tsx
// REMOVE "use client" - This is a Server Component!

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import BlogDetailHeader from '@/components/blog/detail/BlogDetailHeader';
import BlogDetailHero from '@/components/blog/detail/BlogDetailHero';
import BlogDetailBody from '@/components/blog/detail/BlogDetailBody';
import RelatedArticles from '@/components/blog/detail/RelatedArticle';

import { getBlogPostBySlug, getRelatedPosts } from '@/data/blogData';

// In Next.js Server Components, params are passed as a prop
export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  // Await the fetch functions!
  const post = await getBlogPostBySlug(slug);
  const relatedPosts = await getRelatedPosts(slug);

  if (!post) {
    return (
      <main className="w-full min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center text-center px-6">
        <Navbar invert={true} />
        <h1 className="text-5xl font-serif text-[#2E473D] font-bold mb-4">Article Not Found</h1>
        <p className="text-[#9CA3AF] mb-8">We couldn't find the blog post you're looking for.</p>
        <Link href="/impact" className="px-8 py-3 bg-[#2E473D] text-white rounded-full font-bold hover:bg-opacity-90 transition">
          Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="relative w-full bg-[#FDFCF8] min-h-screen flex flex-col">
      <div className="absolute top-0 w-full z-50">
        <Navbar invert={true} /> 
      </div>

      <div className="flex-grow pt-36 pb-16 px-4 md:px-10 lg:px-16 flex flex-col items-center">
        <div className="max-w-[1200px] w-full">
          
          <BlogDetailHeader 
            category={post.category} 
            title={post.title} 
            authorName={post.authorName} 
            authorImage={post.authorImage} 
            date={post.date} 
            readTime={post.readTime} 
          />
          <BlogDetailHero image={post.heroImage} title={post.title} />
          <BlogDetailBody sections={post.sections} />
          <RelatedArticles articles={relatedPosts} />

        </div>
      </div>
      <Footer />
    </main>
  );
}
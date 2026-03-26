// src/components/blog/BlogSection.tsx
"use client";

import React from 'react';
import BlogSectionHeader from './BlogSectionHeader';
import BlogCard from './BlogCard';
import LoadMoreButton from './LoadMoreButton';

// THE FIX: We only import the TYPE here, not the data itself!
import { BlogPost } from '@/data/blogData';

// Define the props this component expects to receive
interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  // Defensive check just in case the data is delayed
  const displayPosts = posts || [];

  return (
    <section className="w-full min-h-screen bg-[#FDFCF8] py-16 px-4 md:px-8 flex flex-col items-center justify-center">
      
      {/* Component 1: Header */}
      <BlogSectionHeader />

      {/* Component 2: Responsive Grid of Blog Cards */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* THE FIX: We explicitly define the types (post: BlogPost, index: number) */}
        {displayPosts.map((post: BlogPost, index: number) => (
          <BlogCard 
            key={index} 
            slug={post.slug}
            category={post.category}
            image={post.heroImage}
            title={post.title}
            description={post.sections[0]?.paragraphs[0] || "Read more about this topic..."}
            authorName={post.authorName}
            authorImage={post.authorImage}
            date={post.date}
            readTime={post.readTime}
          />
        ))}

      </div>

      {/* Component 3: Load More Button */}
      <LoadMoreButton />

    </section>
  );
}
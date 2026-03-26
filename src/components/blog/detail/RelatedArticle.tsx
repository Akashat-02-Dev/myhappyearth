import React from 'react';
import RelatedArticleCard from './RelatedArticleCard';
import { BlogPost } from '@/data/blogData';

export default function RelatedArticles({ articles }: { articles: BlogPost[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-20 py-16 px-4 md:px-8 bg-gray-50/50 rounded-2xl w-full">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2E473D] mb-12">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((post, index) => (
          <RelatedArticleCard 
            key={index} 
            image={post.heroImage}
            title={post.title}
            authorName={post.authorName}
            date={post.date}
          />
        ))}
      </div>
    </section>
  );
}
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  title: string;
}

export default function CategoryCard({ title }: CategoryCardProps) {
  // Defensive check to prevent crashes if data is missing
  if (!title) return null;

  // Formatting logic for local image files
  // Example: "Home & Living" -> "home-and-living"
  const imageLink = title
    .toLowerCase()
    .replace(/ & /g, '-and-') 
    .replace(/ /g, '-');      

  return (
    <Link 
      // THE FIX: Redirects to the shop page and passes the category title as a query parameter
      href={`/products/shop?category=${encodeURIComponent(title)}`} 
      className="relative group w-full aspect-square overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      
      {/* BACKGROUND IMAGE */}
      <Image 
        src={`/images/categories/category-${imageLink}.jpg`}
        alt={`${title} category`}
        fill
        className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
        // Recommended: Add a priority tag if these appear above the fold
        priority={false}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 group-hover:via-black/30 group-hover:to-black/80 transition-colors duration-500"></div>

      {/* TEXT LABEL OVERLAY */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-6 flex items-center justify-center">
        <h3 className="font-sans font-bold text-center text-lg md:text-xl lg:text-2xl text-white drop-shadow-lg transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 uppercase tracking-wider">
          {title}
        </h3>
      </div>

    </Link>
  );
}
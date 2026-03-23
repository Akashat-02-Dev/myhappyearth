import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  // THE FIX: Tell TypeScript to expect this optional prop
  availableCategories?: string[]; 
}

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  availableCategories 
}: HeaderProps) {
  
  // Use the dynamic categories from the Admin panel, or fallback to defaults
  const categories = availableCategories && availableCategories.length > 0 
    ? availableCategories 
    : ['All', 'Home & Living', 'Kitchen', 'Personal Care', 'Health', 'Office', 'Outdoors', 'Kids'];

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search sustainable products..."
          className="w-full bg-white border border-gray-200 px-14 py-4 rounded-full font-medium text-lg text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#6F9B69] focus:border-[#6F9B69] transition duration-200 outline-none shadow-sm"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {categories.map((category) => (
          <button 
            key={category} 
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full font-semibold text-base transition duration-200 ${
              selectedCategory === category 
                ? 'bg-[#6F9B69] text-white shadow-md' 
                : 'bg-[#E6E9E1] text-gray-700 hover:bg-[#6F9B69]/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
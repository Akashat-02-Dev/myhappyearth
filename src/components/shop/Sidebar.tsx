// src/components/shop/Sidebar.tsx
import React from 'react';
import { ChevronDown, Leaf, Target, Waves } from 'lucide-react';

export interface SidebarProps {
  sortOption: string;
  setSortOption: (val: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (val: string[]) => void;
  availableMaterials: string[]; 
}

export default function Sidebar({
  sortOption, 
  setSortOption, 
  maxPrice, 
  setMaxPrice, 
  selectedMaterials, 
  setSelectedMaterials,
  availableMaterials
}: SidebarProps) {
  
  // Use the dynamic materials from the Admin panel, or fallback to defaults
  const materials = availableMaterials && availableMaterials.length > 0 
    ? availableMaterials 
    : ['Juco', 'Jute', 'Organic Cotton', 'Canvas', 'Hemp', 'Vegetable Starch'];
  
  const certifications = [
    { name: 'Certified Organic', icon: <Leaf className="w-8 h-8 text-[#6F9B69]" /> },
    { name: 'Ocean Friendly', icon: <Waves className="w-8 h-8 text-[#3B82F6]" /> },
    { name: 'Australian Made', icon: <Target className="w-8 h-8 text-[#333333]" /> },
  ];

  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* SORTING DROPDOWN */}
      <div className="relative">
        <select 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-xl font-medium text-base text-gray-800 focus:ring-2 focus:ring-[#6F9B69] focus:border-[#6F9B69] transition outline-none appearance-none shadow-sm cursor-pointer"
        >
          <option value="alphabetical">Alphabetical (A-Z)</option>
          <option value="best_seller">Best Seller</option>
          <option value="newest">Newest</option>
          <option value="price_high">High to Low</option>
          <option value="price_low">Low to High</option>
        </select>
        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-8">
        
        {/* MATERIAL Checkboxes */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-gray-800">Material</h3>
          <div className="flex flex-col gap-3">
            {materials.map((material) => (
              <label key={material} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedMaterials.includes(material)} 
                  onChange={() => toggleMaterial(material)}
                  className="w-5 h-5 border-gray-300 rounded text-[#6F9B69] focus:ring-[#6F9B69] transition duration-200 cursor-pointer" 
                />
                <span className="text-sm font-medium text-gray-700 transition duration-200 group-hover:text-[#6F9B69]">{material}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gray-100"></div>

        {/* CERTIFICATIONS */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-gray-800">Certifications</h3>
          <div className="flex flex-wrap gap-4 items-center">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center transition duration-200 group-hover:border-[#6F9B69] bg-white p-2 hover:shadow-sm">
                   {cert.icon}
                   <span className="text-[9px] font-bold text-center leading-none mt-1 text-gray-600">
                     {cert.name.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
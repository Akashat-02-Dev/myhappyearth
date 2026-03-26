import React from 'react';
import { ChevronDown, Leaf, Target, Waves } from 'lucide-react';

interface SidebarProps {
  sortOption: string;
  setSortOption: (val: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (val: string[]) => void;
  // THE FIX: Tell TypeScript to expect this optional prop
  availableMaterials?: string[]; 
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
    : ['Bamboo', 'Recycled', 'Organic Cotton', 'Natural'];
  
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
      <div className="relative">
        <select 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full bg-white border border-gray-200 px-5 py-3.5 rounded-xl font-medium text-base text-gray-800 focus:ring-2 focus:ring-[#6F9B69] focus:border-[#6F9B69] transition outline-none appearance-none shadow-sm cursor-pointer"
        >
          <option value="popular">Sort by: Popular</option>
          <option value="newest">Sort by: Newest</option>
          <option value="price_low">Sort by: Price Low-High</option>
          <option value="price_high">Sort by: Price High-Low</option>
        </select>
        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-8">
        
        {/* Price Slider */}
        {/* <div className="flex flex-col gap-4">
          <h3 className="font-bold text-gray-800">Price Range: Up to ${maxPrice}</h3>
          <div className="relative pt-4 pb-2">
            <input 
              type="range" min="0" max="200" value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-20"
            />
            <div className="w-full h-1 bg-gray-200 rounded-full relative z-0">
              <div className="absolute top-0 left-0 h-full bg-[#6F9B69] rounded-full" style={{ width: `${(maxPrice/200)*100}%` }}></div>
            </div>
            <div className="absolute top-4 -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-75" style={{ left: `${(maxPrice/200)*100}%` }}>
              <div className="w-5 h-5 border-[3px] border-[#6F9B69] bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>$0</span><span>$200+</span>
          </div>
        </div> */}

        <div className="w-full h-px bg-gray-100"></div>

        {/* MATERIAL Checkboxes */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-gray-800">Material</h3>
          <div className="flex flex-col gap-3">
            {materials.map((material) => (
              <label key={material} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" checked={selectedMaterials.includes(material)} onChange={() => toggleMaterial(material)}
                  className="w-5 h-5 border-gray-300 rounded text-[#6F9B69] focus:ring-[#6F9B69] transition duration-200 cursor-pointer" 
                />
                <span className="text-sm font-medium text-gray-700 transition duration-200 group-hover:text-[#6F9B69]">{material}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gray-100"></div>

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
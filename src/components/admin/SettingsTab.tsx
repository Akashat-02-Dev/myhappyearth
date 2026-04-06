// src/components/admin/SettingsTab.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getShopSettings, saveShopSettings, ShopSettings } from '@/data/settingsData';
import { Plus, X, Layers, Tag, Loader2 } from 'lucide-react';

export default function SettingsTab() {
  const [settings, setSettings] = useState<ShopSettings>({ categories: [], materials: [] });
  const [loading, setLoading] = useState(true);
  
  const [newCategory, setNewCategory] = useState('');
  const [newMaterial, setNewMaterial] = useState('');

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getShopSettings();
      setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  // --- CATEGORY HANDLERS ---
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanValue = newCategory.trim();
    if (!cleanValue || settings.categories.includes(cleanValue)) return;

    const updatedSettings = { ...settings, categories: [...settings.categories, cleanValue] };
    setSettings(updatedSettings); // Update UI instantly
    setNewCategory('');
    await saveShopSettings(updatedSettings); // Save to Firebase
  };

  const handleRemoveCategory = async (categoryToRemove: string) => {
    const updatedSettings = { 
      ...settings, 
      categories: settings.categories.filter(c => c !== categoryToRemove) 
    };
    setSettings(updatedSettings);
    await saveShopSettings(updatedSettings);
  };

  // --- MATERIAL HANDLERS ---
  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanValue = newMaterial.trim();
    if (!cleanValue || settings.materials.includes(cleanValue)) return;

    const updatedSettings = { ...settings, materials: [...settings.materials, cleanValue] };
    setSettings(updatedSettings); 
    setNewMaterial('');
    await saveShopSettings(updatedSettings);
  };

  const handleRemoveMaterial = async (materialToRemove: string) => {
    const updatedSettings = { 
      ...settings, 
      materials: settings.materials.filter(m => m !== materialToRemove) 
    };
    setSettings(updatedSettings);
    await saveShopSettings(updatedSettings);
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-gray-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#6F9B69]" />
        <p className="font-medium">Loading store configurations...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      
      {/* CATEGORIES CARD */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#D0F1D8]/50 rounded-xl text-[#3A7045]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Product Categories</h2>
            <p className="text-sm text-gray-500">Organize your shop navigation</p>
          </div>
        </div>

        <form onSubmit={handleAddCategory} className="flex gap-2 mb-8">
          <input 
            type="text" 
            placeholder="Add new category..." 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-grow border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69] transition-colors"
          />
          <button 
            type="submit" 
            disabled={!newCategory.trim()}
            className="bg-[#6F9B69] text-white px-5 rounded-xl font-semibold hover:bg-[#5b8256] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
          >
            <Plus className="w-5 h-5" /> Add
          </button>
        </form>

        <div className="flex flex-wrap gap-3">
          {settings.categories.map((category) => (
            <div key={category} className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm animate-fade-in">
              {category}
              <button 
                onClick={() => handleRemoveCategory(category)} 
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors"
                title="Remove Category"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {settings.categories.length === 0 && (
            <p className="text-gray-400 text-sm italic w-full text-center py-4">No categories added yet.</p>
          )}
        </div>
      </div>

      {/* MATERIALS CARD */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#D0F1D8]/50 rounded-xl text-[#3A7045]">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Product Materials</h2>
            <p className="text-sm text-gray-500">Manage sustainable materials list</p>
          </div>
        </div>

        <form onSubmit={handleAddMaterial} className="flex gap-2 mb-8">
          <input 
            type="text" 
            placeholder="Add new material..." 
            value={newMaterial}
            onChange={(e) => setNewMaterial(e.target.value)}
            className="flex-grow border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69] transition-colors"
          />
          <button 
            type="submit" 
            disabled={!newMaterial.trim()}
            className="bg-[#6F9B69] text-white px-5 rounded-xl font-semibold hover:bg-[#5b8256] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
          >
            <Plus className="w-5 h-5" /> Add
          </button>
        </form>

        <div className="flex flex-wrap gap-3">
          {settings.materials.map((material) => (
            <div key={material} className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm animate-fade-in">
              {material}
              <button 
                onClick={() => handleRemoveMaterial(material)} 
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors"
                title="Remove Material"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {settings.materials.length === 0 && (
            <p className="text-gray-400 text-sm italic w-full text-center py-4">No materials added yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
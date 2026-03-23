// src/components/admin/SettingsTab.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getCategories, saveCategories, getMaterials, saveMaterials } from '@/data/shopData';
import { Trash2, Plus } from 'lucide-react';

export default function SettingsTab() {
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newMaterial, setNewMaterial] = useState('');

  useEffect(() => {
    setCategories(getCategories());
    setMaterials(getMaterials());
  }, []);

  // Generic handler for adding to a list
  const handleAdd = (item: string, list: string[], setList: (v: string[]) => void, saveFn: (v: string[]) => void, resetInput: () => void) => {
    if (!item.trim() || list.includes(item.trim())) return;
    const updated = [...list, item.trim()];
    setList(updated);
    saveFn(updated);
    resetInput();
  };

  // Generic handler for deleting from a list
  const handleDelete = (itemToRemove: string, list: string[], setList: (v: string[]) => void, saveFn: (v: string[]) => void) => {
    if (window.confirm(`Delete "${itemToRemove}"? This may affect products using this tag.`)) {
      const updated = list.filter(i => i !== itemToRemove);
      setList(updated);
      saveFn(updated);
    }
  };

  const ListManager = ({ title, list, setList, saveFn, newItem, setNewItem, placeholder }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      <div className="flex gap-2">
        <input 
          type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          className="flex-grow border border-gray-300 rounded-xl px-4 py-2 focus:ring-[#6F9B69] outline-none"
        />
        <button 
          onClick={() => handleAdd(newItem, list, setList, saveFn, () => setNewItem(''))}
          className="bg-[#6F9B69] text-white px-4 py-2 rounded-xl hover:bg-[#5b8256] transition flex items-center gap-1"
        >
          <Plus className="w-5 h-5" /> Add
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {list.map((item: string, i: number) => (
          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="font-medium text-gray-700">{item}</span>
            <button onClick={() => handleDelete(item, list, setList, saveFn)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
      <ListManager 
        title="Manage Categories (Header Tabs)" list={categories} setList={setCategories} saveFn={saveCategories} 
        newItem={newCategory} setNewItem={setNewCategory} placeholder="e.g., Electronics"
      />
      <ListManager 
        title="Manage Materials (Sidebar Filters)" list={materials} setList={setMaterials} saveFn={saveMaterials} 
        newItem={newMaterial} setNewItem={setNewMaterial} placeholder="e.g., Glass"
      />
    </div>
  );
}
// src/components/admin/ProductsTab.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getProducts, saveProducts, getCategories, getMaterials, Product } from '@/data/shopData';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
    setMaterials(getMaterials());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this product?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  const openModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setFormData(product || {
      name: '', description: '', price: '', rating: 5, imageUrl: '', badge: '', 
      category: categories[0] || '', material: materials[0] || '', stock: 0
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProducts = editingProduct 
      ? products.map(p => p.id === editingProduct.id ? { ...p, ...formData } as Product : p)
      : [...products, { ...formData, id: Date.now() } as Product];
    
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Product Inventory</h2>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#6F9B69] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#5b8256] transition shadow-sm">
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <th className="p-5 font-semibold">Product Info</th>
              <th className="p-5 font-semibold">Category</th>
              <th className="p-5 font-semibold">Material</th>
              <th className="p-5 font-semibold">Price & Stock</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-5">
                  <div className="font-bold text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-[200px]">{product.description}</div>
                </td>
                <td className="p-5"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">{product.category}</span></td>
                <td className="p-5"><span className="bg-[#D0F1D8] text-[#3A7045] px-3 py-1 rounded-lg text-xs font-bold">{product.material}</span></td>
                <td className="p-5">
                  <div className="font-medium text-gray-900">{product.price}</div>
                  <div className="text-xs font-semibold text-gray-500 mt-1">Stock: {product.stock}</div>
                </td>
                <td className="p-5 text-right flex justify-end gap-2">
                  <button onClick={() => openModal(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-800">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:bg-gray-200 rounded-full transition"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
                <input required type="text" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              
              {/* DYNAMIC DROPDOWNS */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select value={formData.category || categories[0]} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69] bg-white">
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Material</label>
                <select value={formData.material || materials[0]} onChange={e => setFormData({...formData, material: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69] bg-white">
                  {materials.map(mat => <option key={mat} value={mat}>{mat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Amount</label>
                <input required type="number" min="0" value={formData.stock || 0} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Badge Label (e.g., 'Best Seller')</label>
                <input required type="text" value={formData.badge || ''} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <input required type="text" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                <input required type="text" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-white bg-[#6F9B69] hover:bg-[#5b8256] transition shadow-md">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
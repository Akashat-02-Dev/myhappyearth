// src/components/admin/ProductsTab.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, Product } from '@/data/shopData';
import { getShopSettings } from '@/data/settingsData'; // Fetch live settings from Firebase
import { Edit2, Trash2, Plus, X, Loader2 } from 'lucide-react';

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // Fetch settings (categories/materials) AND products simultaneously
    const [settingsData, productsData] = await Promise.all([
      getShopSettings(),
      getProducts()
    ]);
    
    setCategories(settingsData.categories);
    setMaterials(settingsData.materials);
    setProducts(productsData);
    setLoading(false);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (window.confirm("Delete this product permanently?")) {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setFormData(product || {
      name: '', description: '', price: '', rating: 5, imageUrl: '', badge: '', 
      category: categories[0] || '', material: materials[0] || '', stock: '' // stock is optional/empty by default
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (editingProduct && editingProduct.id) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData as Omit<Product, 'id'>);
      }
      await fetchData(); // Refresh the grid to show the new Firebase ID
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving product to database.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-gray-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#6F9B69]" />
        <p className="font-medium">Loading inventory data...</p>
      </div>
    );
  }

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
                <td className="p-5 flex items-center gap-4">
                  {/* THE FIX: Fallback to a placeholder string immediately if product.imageUrl is empty */}
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                     <img 
                       src={product.imageUrl || '/images/blog/beach-sunset.jpg'} 
                       alt={product.name || "Product Image"} 
                       className="w-full h-full object-cover" 
                       onError={(e) => (e.currentTarget.src = '/images/blog/beach-sunset.jpg')} 
                     />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[150px]">{product.description}</div>
                  </div>
                </td>
                <td className="p-5"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">{product.category}</span></td>
                <td className="p-5"><span className="bg-[#D0F1D8] text-[#3A7045] px-3 py-1 rounded-lg text-xs font-bold">{product.material}</span></td>
                <td className="p-5">
                  <div className="font-medium text-gray-900">{product.price}</div>
                  <div className="text-xs font-semibold text-gray-500 mt-1">
                    Stock: {product.stock !== undefined && product.stock !== '' ? product.stock : 'Unlimited/Optional'}
                  </div>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openModal(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 italic">No products found. Click "Add Product" to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price (e.g., AUD 49.95)</label>
                <input required type="text" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69] bg-white">
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Material</label>
                <select value={formData.material || ''} onChange={e => setFormData({...formData, material: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69] bg-white">
                  {materials.map(mat => <option key={mat} value={mat}>{mat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Amount (Optional)</label>
                <input type="number" min="0" placeholder="Unlimited" value={formData.stock || ''} onChange={e => setFormData({...formData, stock: e.target.value ? parseInt(e.target.value) : ''})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Badge Label (Optional, e.g., 'Best Seller')</label>
                <input type="text" placeholder="Leave empty for no badge" value={formData.badge || ''} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea required rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69] resize-y" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">External Image URL</label>
                <input required type="url" placeholder="https://example.com/image.jpg" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-6 py-3 rounded-xl font-semibold text-white bg-[#6F9B69] hover:bg-[#5b8256] transition shadow-md disabled:opacity-70">
                  {isSaving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
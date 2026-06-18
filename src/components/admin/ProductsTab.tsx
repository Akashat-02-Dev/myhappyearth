// src/components/admin/ProductsTab.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, Product } from '@/data/shopData';
import { getShopSettings } from '@/data/settingsData';
import { Edit2, Trash2, Plus, X, Loader2, Link as LinkIcon, Search } from 'lucide-react';

const STANDARD_SIZES: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'One Size'];

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [imageUrls, setImageUrls] = useState<string[]>(['', '', '']);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [settingsData, productsData] = await Promise.all([
      getShopSettings(),
      getProducts()
    ]);
    
    setCategories(settingsData.categories || []);
    setMaterials(settingsData.materials || []);
    setProducts(productsData || []);
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
    
    const initialMaterials: string[] = product?.materials || (product?.material ? [product.material] : []);
    const initialCategories: string[] = product?.categories || (product?.category ? [product.category] : []);
    const initialSizes: string[] = product?.sizes || [];

    setFormData(product || {
      name: '', description: '', price: '', rating: 5, imageUrl: '', badge: '', 
      category: '', 
      categories: initialCategories, // NEW
      material: '', 
      materials: initialMaterials,
      sizes: initialSizes,
      stock: ''
    });

    if (product) {
      const existingUrls: string[] = product.imageUrls ? [...product.imageUrls] : [product.imageUrl || '', '', ''];
      while (existingUrls.length < 3) existingUrls.push('');
      setImageUrls(existingUrls.slice(0, 3));
    } else {
      setImageUrls(['', '', '']);
    }
    setIsModalOpen(true);
  };

  const handleUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const toggleMaterial = (mat: string) => {
    const current: string[] = formData.materials || [];
    setFormData({ ...formData, materials: current.includes(mat) ? current.filter(m => m !== mat) : [...current, mat] });
  };

  const toggleSize = (size: string) => {
    const current: string[] = formData.sizes || [];
    setFormData({ ...formData, sizes: current.includes(size) ? current.filter(s => s !== size) : [...current, size] });
  };

  // NEW: Toggle Category
  const toggleCategory = (cat: string) => {
    const current: string[] = formData.categories || [];
    setFormData({ ...formData, categories: current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const cleanedUrls = imageUrls.filter(url => url.trim() !== '');

      const updateData = {
        ...formData,
        imageUrls: cleanedUrls,
        imageUrl: cleanedUrls[0] || '', 
        material: formData.materials?.[0] || '',
        category: formData.categories?.[0] || '' // Fallback for legacy database structure
      };

      if (editingProduct && editingProduct.id) {
        await updateProduct(editingProduct.id, updateData);
      } else {
        await addProduct(updateData as Omit<Product, 'id'>);
      }

      await fetchData(); 
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error saving product to database.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    const catSearch = product.categories?.join(' ').toLowerCase() || product.category?.toLowerCase() || '';
    
    return (
      product.name?.toLowerCase().includes(lowerQuery) ||
      catSearch.includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
    );
  });

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#063c60]" /></div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-[#063c60]">Product Inventory</h2>
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-3">
          <div className="relative w-full sm:w-64 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm outline-none focus:border-[#ec6917] focus:ring-1 focus:ring-[#ec6917] transition-all bg-white shadow-sm"
            />
          </div>
          <button onClick={() => openModal()} className="flex shrink-0 items-center justify-center w-full sm:w-auto gap-2 bg-gradient-to-r from-[#063c60] to-[#084b78] text-white px-5 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
              <th className="p-5 font-semibold">Product Info</th>
              <th className="p-5 font-semibold">Categories</th>
              <th className="p-5 font-semibold">Specs (Materials & Sizes)</th>
              <th className="p-5 font-semibold">Price & Stock</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product: Product) => {
              const activeMaterials = product.materials?.length ? product.materials : (product.material ? [product.material] : []);
              const activeCategories = product.categories?.length ? product.categories : (product.category ? [product.category] : []);
              const activeSizes = product.sizes || [];
              
              return (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                     <img src={(product.imageUrls && product.imageUrls[0]) || product.imageUrl || 'https://placehold.co/400'} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[#063c60]">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[150px]">{product.description}</div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {activeCategories.map(c => <span key={c} className="bg-blue-50/80 text-[#063c60] px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-100">{c}</span>)}
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex flex-wrap gap-1 mb-1.5 max-w-[200px]">{activeMaterials.map(m => <span key={m} className="bg-gray-100 text-[#063c60] px-2 py-0.5 rounded-md text-[10px] font-bold">{m}</span>)}</div>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">{activeSizes.map(s => <span key={s} className="border border-[#ec6917] text-[#ec6917] bg-white px-2 py-0.5 rounded-md text-[10px] font-bold">{s}</span>)}</div>
                </td>
                <td className="p-5">
                  <div className="font-medium text-gray-900">{product.price}</div>
                  <div className="text-xs font-semibold text-gray-500 mt-1">Stock: {product.stock !== undefined && product.stock !== '' ? product.stock : 'Unlimited'}</div>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openModal(product)} className="p-2 text-[#063c60] hover:bg-blue-50 rounded-xl transition-colors"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-[#ec6917] hover:bg-orange-50 rounded-xl transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-bold text-[#063c60]">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-[#ec6917] hover:bg-orange-50 rounded-full transition-colors duration-300"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2 mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Image Paths (e.g., <span className="text-[#ec6917]">/product_images/bag.webp</span>)
                </label>
                <div className="flex flex-col gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="flex gap-4 items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                      <div className="flex flex-col flex-grow relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LinkIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input type="text" placeholder={`Image ${index + 1} URL or Path`} value={imageUrls[index]} onChange={(e) => handleUrlChange(index, e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#ec6917] transition-all bg-white" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                        <img src={imageUrls[index] || 'https://placehold.co/100'} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100/fecaca/ef4444?text=Error')} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#ec6917] bg-white/50" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price (e.g., AUD 49.95)</label>
                <input required type="text" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#ec6917] bg-white/50" />
              </div>
              
              {/* NEW: MULTI-SELECT CATEGORIES */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Categories (Select Multiple - B2C and B2B)</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat: string) => {
                    const isSelected = formData.categories?.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                          isSelected ? 'bg-gradient-to-r from-blue-600 to-blue-800 border-blue-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-600'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Materials and Sizes stay the same */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Materials (Select Multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {materials.map((mat: string) => (
                    <button type="button" key={mat} onClick={() => toggleMaterial(mat)} className={`px-4 py-2 rounded-full text-sm font-medium border ${formData.materials?.includes(mat) ? 'bg-[#063c60] text-white' : 'bg-white'}`}>{mat}</button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {STANDARD_SIZES.map((size: string) => (
                    <button type="button" key={size} onClick={() => toggleSize(size)} className={`px-3 py-2 rounded-full text-sm font-medium border ${formData.sizes?.includes(size) ? 'bg-[#ec6917] text-white' : 'bg-white'}`}>{size}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Amount</label>
                <input type="number" min="0" placeholder="Unlimited" value={formData.stock || ''} onChange={e => setFormData({...formData, stock: e.target.value ? parseInt(e.target.value) : ''})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#ec6917]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Badge Label</label>
                <input type="text" placeholder="e.g., 'Best Seller'" value={formData.badge || ''} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#ec6917]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea required rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#ec6917] resize-y" />
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t pt-5 border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-full font-semibold text-gray-500 hover:bg-gray-100">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#063c60] to-[#084b78] disabled:opacity-70">
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
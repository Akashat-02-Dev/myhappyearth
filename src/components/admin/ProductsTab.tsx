"use client";

import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, Product } from '@/data/shopData';
import { getShopSettings } from '@/data/settingsData';
import { Edit2, Trash2, Plus, X, Loader2, Link as LinkIcon, Search } from 'lucide-react';

const STANDARD_SIZES: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'One Size'];

// --- BULLETPROOF URL FORMATTER ---
const getSafeUrl = (url: string | null | undefined) => {
  if (!url || url.trim() === '') return 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';
  let formattedUrl = url.trim();
  if (!formattedUrl.startsWith('http') && !formattedUrl.startsWith('/')) {
    formattedUrl = '/' + formattedUrl;
  }
  try {
    return encodeURI(decodeURI(formattedUrl));
  } catch (e) {
    return formattedUrl.replace(/ /g, '%20');
  }
};

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

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [settingsData, productsData] = await Promise.all([ getShopSettings(), getProducts() ]);
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
    
    const initialMaterials = product?.materials?.length ? product.materials : (product?.material ? [product.material] : []);
    const initialCategories = product?.categories?.length ? product.categories : (product?.category ? [product.category] : []);
    const initialSizes = product?.sizes || [];

    setFormData(product || {
      name: '', description: '', price: '', rating: 5, imageUrl: '', badge: '', 
      category: '', categories: initialCategories, 
      material: '', materials: initialMaterials,
      sizes: initialSizes, stock: ''
    });

    if (product) {
      const existingUrls = product.imageUrls ? [...product.imageUrls] : [product.imageUrl || '', '', ''];
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

  const toggleArrayItem = (key: 'materials' | 'sizes' | 'categories', item: string) => {
    const current = formData[key] || [];
    setFormData({ ...formData, [key]: current.includes(item) ? current.filter(i => i !== item) : [...current, item] });
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
        category: formData.categories?.[0] || '' 
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
    const q = searchQuery.toLowerCase();
    const catSearch = product.categories?.join(' ').toLowerCase() || product.category?.toLowerCase() || '';
    return (product.name?.toLowerCase().includes(q) || catSearch.includes(q) || product.description?.toLowerCase().includes(q));
  });

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#063c60]" /></div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-[#063c60]">Product Inventory</h2>
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-3">
          <div className="relative w-full sm:w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm outline-none focus:border-[#ec6917] transition-all bg-white shadow-sm" />
          </div>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-gradient-to-r from-[#063c60] to-[#084b78] text-white px-5 py-2.5 rounded-full font-semibold hover:shadow-lg shrink-0">
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
              <th className="p-5 font-semibold">Specs</th>
              <th className="p-5 font-semibold">Price</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product: Product) => {
              const activeMaterials = product.materials?.length ? product.materials : (product.material ? [product.material] : []);
              const activeCategories = product.categories?.length ? product.categories : (product.category ? [product.category] : []);
              
              // NEW: Use safe URL for Admin Table
              const primaryImage = (product.imageUrls && product.imageUrls[0]) || product.imageUrl;
              const safeTableImage = getSafeUrl(primaryImage);

              return (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                     <img src={safeTableImage} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[#063c60]">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[150px]">{product.description}</div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {activeCategories.map(c => <span key={c} className="bg-blue-50/80 text-[#063c60] px-2 py-0.5 rounded-full text-[10px] font-bold">{c}</span>)}
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {activeMaterials.map(m => <span key={m} className="bg-gray-100 text-[#063c60] px-2 py-0.5 rounded-md text-[10px] font-bold">{m}</span>)}
                  </div>
                </td>
                <td className="p-5">
                  <div className="font-medium text-gray-900">{product.price}</div>
                </td>
                <td className="p-5 text-right">
                  <button onClick={() => openModal(product)} className="p-2 text-[#063c60] hover:bg-blue-50 rounded-xl"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(product.id)} className="p-2 text-[#ec6917] hover:bg-orange-50 rounded-xl"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-bold text-[#063c60]">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-[#ec6917] rounded-full"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="md:col-span-2 mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Image Paths (e.g., <span className="text-[#ec6917]">/product_images/bag.webp</span>)
                </label>
                <div className="flex flex-col gap-4">
                  {[0, 1, 2].map((index) => {
                    // NEW: Use safe URL for live Modal Preview
                    const safePreviewUrl = getSafeUrl(imageUrls[index]);
                    
                    return (
                    <div key={index} className="flex gap-4 items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                      <div className="flex flex-col flex-grow relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <input type="text" placeholder={`Image ${index + 1} URL or Path`} value={imageUrls[index]} onChange={(e) => handleUrlChange(index, e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#ec6917] bg-white" />
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                        <img src={safePreviewUrl} alt={`Preview`} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )})}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#ec6917]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price (e.g., AUD 49.95)</label>
                <input required type="text" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#ec6917]" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Categories (Select Multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat: string) => (
                    <button type="button" key={cat} onClick={() => toggleArrayItem('categories', cat)} className={`px-4 py-2 rounded-full text-sm font-medium border ${formData.categories?.includes(cat) ? 'bg-blue-600 text-white' : 'bg-white'}`}>{cat}</button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Materials (Select Multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {materials.map((mat: string) => (
                    <button type="button" key={mat} onClick={() => toggleArrayItem('materials', mat)} className={`px-4 py-2 rounded-full text-sm font-medium border ${formData.materials?.includes(mat) ? 'bg-[#063c60] text-white' : 'bg-white'}`}>{mat}</button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {STANDARD_SIZES.map((size: string) => (
                    <button type="button" key={size} onClick={() => toggleArrayItem('sizes', size)} className={`px-3 py-2 rounded-full text-sm font-medium border ${formData.sizes?.includes(size) ? 'bg-[#ec6917] text-white' : 'bg-white'}`}>{size}</button>
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
              
              <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t pt-5 border-gray-100 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-full font-semibold text-gray-500 hover:bg-gray-100">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-6 py-3 rounded-full font-semibold text-white bg-[#063c60] disabled:opacity-70">
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
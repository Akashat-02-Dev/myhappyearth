// src/components/admin/BlogTab.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, BlogPost, generateSlug } from '@/data/blogData';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

export default function BlogTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingProduct] = useState<BlogPost | null>(null);
  
  // Flattened form state for easier editing - Added linkedinLink here
  const [formData, setFormData] = useState({
    title: '', category: 'News', heroImage: '', authorName: 'My Happy Earth', 
    readTime: '3 min read', content: '', linkedinLink: '' 
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getBlogPosts();
    setPosts(data);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlogPost(id);
      fetchPosts();
    }
  };

  const openModal = (post: BlogPost | null = null) => {
    setEditingProduct(post);
    if (post) {
      // Reconstruct raw text from the sections array for editing
      const rawContent = post.sections.map(s => s.paragraphs.join('\n\n')).join('\n\n');
      setFormData({
        title: post.title, category: post.category, heroImage: post.heroImage,
        authorName: post.authorName, readTime: post.readTime, content: rawContent,
        linkedinLink: post.linkedinLink || '' // Load existing link if present
      });
    } else {
      setFormData({ title: '', category: 'News', heroImage: '', authorName: 'My Happy Earth', readTime: '3 min read', content: '', linkedinLink: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Parse the raw text area into the structured sections array your UI expects
    const paragraphs = formData.content.split('\n').filter(p => p.trim() !== '');
    
    const postData: Omit<BlogPost, 'id'> = {
      title: formData.title,
      slug: generateSlug(formData.title),
      category: formData.category,
      heroImage: formData.heroImage || '/images/blog/beach-sunset.jpg',
      authorName: formData.authorName,
      authorImage: '/images/authors/sarah.jpg',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      readTime: formData.readTime,
      linkedinLink: formData.linkedinLink, // Save the link to Firebase
      sections: [{ heading: "Article Content", paragraphs: paragraphs }]
    };

    try {
      if (editingPost && editingPost.id) {
        await updateBlogPost(editingPost.id, postData);
      } else {
        await addBlogPost(postData);
      }
      await fetchPosts();
      setIsModalOpen(false);
    } catch (error) {
      alert("Failed to save blog post.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Blog Manager</h2>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#6F9B69] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#5b8256] transition shadow-sm">
          <Plus className="w-5 h-5" /> Write New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <th className="p-5 font-semibold">Article Info</th>
              <th className="p-5 font-semibold">Category</th>
              <th className="p-5 font-semibold">Date</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-5 flex items-center gap-4">
                  {/* Added Image Display with safe fallback rendering */}
                  <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                     <img 
                       src={post.heroImage || '/images/blog/beach-sunset.jpg'} 
                       alt={post.title} 
                       className="w-full h-full object-cover" 
                       onError={(e) => (e.currentTarget.src = '/images/blog/beach-sunset.jpg')} 
                     />
                  </div>
                  <div className="font-bold text-gray-900 max-w-[250px] truncate">{post.title}</div>
                </td>
                <td className="p-5"><span className="bg-[#D0F1D8] text-[#3A7045] px-3 py-1 rounded-lg text-xs font-bold">{post.category}</span></td>
                <td className="p-5 text-gray-500">{post.date}</td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openModal(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400 italic">No blog posts found. Click "Write New Post" to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-800">{editingPost ? 'Edit Post' : 'Write New Post'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:bg-gray-200 rounded-full transition"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Article Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Read Time (e.g., '4 min read')</label>
                <input required type="text" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" />
              </div>

              {/* NEW ADDITION: LinkedIn Source URL input field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Source / LinkedIn Inspiration Link (Optional)</label>
                <input type="url" value={formData.linkedinLink} onChange={e => setFormData({...formData, linkedinLink: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" placeholder="https://www.linkedin.com/in/..." />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Image URL</label>
                {/* Kept as type="text" so you can use BOTH local paths (e.g., /images/blog/img.jpg) AND external URLs (e.g., https://unsplash.com/...) */}
                <input required type="text" value={formData.heroImage} onChange={e => setFormData({...formData, heroImage: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69]" placeholder="https://example.com/image.jpg or /images/blog/your-image.jpg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Article Content (Double enter for new paragraphs)</label>
                <textarea required rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6F9B69] resize-y" />
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-6 py-3 rounded-xl font-semibold text-white bg-[#6F9B69] hover:bg-[#5b8256] transition shadow-md disabled:opacity-70">
                  {isSaving ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
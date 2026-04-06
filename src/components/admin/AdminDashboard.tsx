// src/components/admin/AdminDashboard.tsx
"use client";

import React, { useState } from 'react';
import { LogOut, Package, Settings, FileText } from 'lucide-react'; // <-- ADDED FileText icon
import ProductsTab from './ProductsTab';
import SettingsTab from './SettingsTab';
import BlogTab from './BlogTab'; // <-- ADDED BlogTab import

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  // ADDED 'blogs' to the state union
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'blogs'>('products');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500 mt-1">Manage your storefront data and configurations.</p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-gray-200 pb-px overflow-x-auto">
          <button 
            onClick={() => setActiveTab('products')} 
            className={`flex items-center whitespace-nowrap gap-2 px-6 py-3 font-semibold text-lg transition-colors border-b-2 ${activeTab === 'products' ? 'border-[#6F9B69] text-[#6F9B69]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Package className="w-5 h-5" /> Inventory
          </button>
          
          {/* THE NEW BLOG TAB BUTTON */}
          <button 
            onClick={() => setActiveTab('blogs')} 
            className={`flex items-center whitespace-nowrap gap-2 px-6 py-3 font-semibold text-lg transition-colors border-b-2 ${activeTab === 'blogs' ? 'border-[#6F9B69] text-[#6F9B69]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <FileText className="w-5 h-5" /> Blog Manager
          </button>

          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex items-center whitespace-nowrap gap-2 px-6 py-3 font-semibold text-lg transition-colors border-b-2 ${activeTab === 'settings' ? 'border-[#6F9B69] text-[#6F9B69]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Settings className="w-5 h-5" /> Attributes Settings
          </button>
        </div>

        {/* Render Active Tab */}
        <div className="pt-2">
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'blogs' && <BlogTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>

      </div>
    </div>
  );
}
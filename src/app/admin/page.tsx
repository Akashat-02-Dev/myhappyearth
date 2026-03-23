"use client";

import React, { useState, useEffect } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Lock } from 'lucide-react';

// Hardcoded Credentials for Demo Purposes
const ADMIN_SECRET_ID = 'admin';
const ADMIN_SECRET_PASS = 'earth2026'; // Change this to whatever you prefer!

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  // Login Form State
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if already logged in on page load
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === ADMIN_SECRET_ID && password === ADMIN_SECRET_PASS) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setError('');
    } else {
      setError('Invalid ID or Password. Access Denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setUserId('');
    setPassword('');
  };

  // Show a blank/loading screen while checking session storage to prevent flash of login screen
  if (isChecking) return <div className="min-h-screen bg-gray-50"></div>;

  // Render Dashboard if Authenticated
  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Render Login Screen if NOT Authenticated
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAF7] p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-[#D0F1D8] text-[#3A7045] rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-500 font-medium">Restricted Access. Please log in.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100 text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Admin ID</label>
            <input 
              type="text" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F9B69] focus:bg-white outline-none transition"
              placeholder="Enter Secret ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6F9B69] focus:bg-white outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#6F9B69] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5b8256] transition shadow-lg mt-2 active:scale-[0.98]"
          >
            Authenticate
          </button>
        </form>
        
      </div>
    </div>
  );
}
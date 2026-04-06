// src/components/contact/ContactActionButtons.tsx
import React from 'react';

export default function ContactActionButtons({ loading }: { loading?: boolean }) {
  return (
    <div className="flex items-center gap-6">
      <button 
        type="submit" 
        disabled={loading}
        className={`w-full md:w-auto px-10 py-4 bg-earth-leaf text-earth-light rounded-full font-sans font-semibold text-lg transition-all duration-300 shadow-xl ${
          loading 
            ? 'opacity-70 cursor-not-allowed' 
            : 'hover:bg-white hover:text-earth-leaf hover:border hover:border-earth-leaf hover:-translate-y-1'
        }`}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
}
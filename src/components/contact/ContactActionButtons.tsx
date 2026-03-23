import React from 'react';

export default function ContactActionButtons() {
  return (
    // <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0 mt-6">
      <div className="flex items-center gap-6">
        
        {/* Attach File Button */}
        {/* <button 
          type="button" 
          className="flex items-center gap-2 px-6 py-3 border-2 border-earth-leaf text-earth-leaf rounded-full font-sans font-semibold hover:bg-earth-leaf hover:text-earth-light transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          Attach File
        </button>
        
        <div className="flex items-center gap-2 p-3 border border-earth-leaf/10 bg-earth-light rounded-lg cursor-default">
           <div className="w-6 h-6 border-2 border-gray-300 rounded-sm bg-white"></div>
           <span className="font-sans text-xs text-earth-deep opacity-80">I'm not a robot</span>
        </div>
      </div> */}
      
      <button 
        type="submit" 
        className="w-full md:w-auto px-10 py-4 bg-earth-leaf text-earth-light rounded-full font-sans font-semibold text-lg hover:bg-white hover:text-earth-leaf hover:border hover:border-earth-leaf transition-all duration-300 shadow-xl hover:-translate-y-1"
      >
        Send Message
      </button>
    </div>
  );
}
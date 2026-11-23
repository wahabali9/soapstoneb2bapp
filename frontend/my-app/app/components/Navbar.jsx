"use client";
import { useState } from 'react';

export default function Navbar({ onOpenTrackModal }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 py-3 px-4 sm:px-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <h1 className="text-base sm:text-lg md:text-xl font-black text-teal-100 tracking-wider">
          FRONTIER STONE
        </h1>

        {/* 💻 Desktop Navigation Links */}
        <div className="hidden md:flex gap-6 text-xs font-bold items-center">
          <a href="#showroom" className="text-slate-300 hover:text-teal-400 transition">
            Our Minerals
          </a>
          <button 
            onClick={onOpenTrackModal} 
            className="bg-slate-800 text-teal-300 border border-teal-800/80 py-2 px-3 rounded-xl hover:bg-slate-700 transition cursor-pointer"
          >
            🔍 Track Order
          </button>
          <a href="#inquiry" className="bg-teal-700 text-white py-2 px-4 rounded-xl hover:bg-teal-800 transition">
            Request a Quote
          </a>
          {/* 👇 Pointed directly to Contact Cards ID */}
          <a href="#contact-cards" className="bg-slate-800 border border-slate-700 text-slate-200 py-2 px-3 rounded-xl hover:bg-slate-700 transition">
            Contact Now
          </a>
        </div>

        {/* 📱 Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 mt-3 space-y-3 font-bold text-xs">
          <a 
            href="#showroom" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-teal-400 py-2 border-b border-slate-800/60"
          >
             Our Minerals
          </a>
          
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenTrackModal();
            }} 
            className="w-full text-left bg-slate-800 text-teal-300 border border-teal-800/80 py-2.5 px-3 rounded-xl hover:bg-slate-700 transition cursor-pointer"
          >
            🔍 Track Order
          </button>

          <a 
            href="#inquiry" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-center bg-teal-700 text-white py-2.5 px-4 rounded-xl hover:bg-teal-800 transition"
          >
            Request a Quote
          </a>

          <a 
            href="#contact-cards" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-center bg-slate-800 border border-slate-700 text-slate-200 py-2.5 px-3 rounded-xl hover:bg-slate-700 transition"
          >
            Contact Now
          </a>
        </div>
      )}
    </nav>
  );
}
import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';
export const Navbar: React.FC<any> = ({ cartCount, onOpenCart }) => (
  <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tight text-slate-900">APEXBOOK</div>
      <button onClick={onOpenCart} className="p-2 hover:bg-slate-100 rounded-full flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" />
        <span className="text-sm font-medium">{cartCount}</span>
      </button>
    </div>
  </header>
);
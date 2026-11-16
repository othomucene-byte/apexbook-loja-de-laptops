import React from 'react';
import { Search, ShoppingBag, Heart, Layers, Laptop } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  showWishlistOnly: boolean;
  onToggleWishlistFilter: () => void;
  onOpenCart: () => void;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  compareCount,
  showWishlistOnly,
  onToggleWishlistFilter,
  onOpenCart,
  onOpenCompare,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
            <Laptop className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            Apex<span className="text-indigo-600">Book</span>
          </span>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por modelo, CPU, RTX..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Comparar ({compareCount})</span>
            </button>
          )}

          <button
            onClick={onToggleWishlistFilter}
            className={`relative p-2.5 rounded-xl transition-colors cursor-pointer ${
              showWishlistOnly
                ? 'bg-rose-50 text-rose-600'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
            aria-label="Favoritos"
          >
            <Heart className={`w-5 h-5 ${showWishlistOnly ? 'fill-rose-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-500 text-white text-xs font-bold leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar laptops..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

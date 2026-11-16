import React, { useState, useEffect, useMemo } from 'react';
import { LAPTOPS } from './data/laptops';
import { Laptop, CartItem, Category, SortOption } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LaptopCard } from './components/LaptopCard';
import { LaptopModal } from './components/LaptopModal';
import { CompareModal } from './components/CompareModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => { try { const saved = localStorage.getItem('apexbook_cart'); return saved ? JSON.parse(saved) : []; } catch { return []; } });
  const [wishlist, setWishlist] = useState<string[]>(() => { try { const saved = localStorage.getItem('apexbook_wishlist'); return saved ? JSON.parse(saved) : []; } catch { return []; } });
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => { localStorage.setItem('apexbook_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('apexbook_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const filteredLaptops = useMemo(() => {
    return LAPTOPS.filter((laptop) => {
      const matchesCategory = selectedCategory === 'Todos' || laptop.category === selectedCategory;
      const matchesWishlist = !showWishlistOnly || wishlist.includes(laptop.id);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || laptop.name.toLowerCase().includes(query) || laptop.cpu.toLowerCase().includes(query);
      return matchesCategory && matchesWishlist && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy, showWishlistOnly, wishlist]);

  const handleAddToCart = (laptop: Laptop, ram: string, storage: string, color: { name: string; hex: string }, finalPrice: number) => {
    setCart((prev) => [...prev, { laptop, quantity: 1, selectedRam: ram, selectedStorage: storage, selectedColor: color, unitPrice: finalPrice }]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} cartCount={cart.length} wishlistCount={wishlist.length} compareCount={compareIds.length} onOpenCart={() => setIsCartOpen(true)} onOpenCompare={() => setIsCompareOpen(true)} />
      <main className="flex-1">
        <Hero onExplore={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} />
        <section id="catalog" className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLaptops.map((laptop) => (
              <LaptopCard key={laptop.id} laptop={laptop} onConfigure={() => setSelectedLaptop(laptop)} onQuickAdd={() => handleAddToCart(laptop, laptop.ramOptions[0], laptop.storageOptions[0], laptop.colors[0], laptop.price)} />
            ))}
          </div>
        </section>
      </main>
      {selectedLaptop && <LaptopModal laptop={selectedLaptop} onClose={() => setSelectedLaptop(null)} onAddToCart={(r, s, c, p) => { handleAddToCart(selectedLaptop, r, s, c, p); setSelectedLaptop(null); setIsCartOpen(true); }} />}
      <CartDrawer isOpen={isCartOpen} items={cart} total={cartTotal} onClose={() => setIsCartOpen(false)} onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} />
      {isCompareOpen && <CompareModal laptops={LAPTOPS.filter(l => compareIds.includes(l.id))} onClose={() => setIsCompareOpen(false)} />}
      {isCheckoutOpen && <CheckoutModal total={cartTotal} onClose={() => setIsCheckoutOpen(false)} onSuccess={() => { setCart([]); setIsCheckoutOpen(false); }} />}
    </div>
  );
}
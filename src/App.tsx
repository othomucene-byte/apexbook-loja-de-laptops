import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, Layers, Shield, Truck, CreditCard, Sparkles, CheckCircle2, X } from 'lucide-react';
import { LAPTOPS } from './data/laptops';
import { Laptop, CartItem, Category, SortOption } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LaptopCard } from './components/LaptopCard';
import { LaptopModal } from './components/LaptopModal';
import { CompareModal } from './components/CompareModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

const CATEGORIES: Category[] = ['Todos', 'Ultrabooks', 'Gaming', 'Workstation', 'Criadores'];

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('apexbook_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('apexbook_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('apexbook_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('apexbook_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredLaptops = useMemo(() => {
    return LAPTOPS.filter((laptop) => {
      const matchesCategory = selectedCategory === 'Todos' || laptop.category === selectedCategory;
      const matchesWishlist = !showWishlistOnly || wishlist.includes(laptop.id);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        laptop.name.toLowerCase().includes(query) ||
        laptop.cpu.toLowerCase().includes(query) ||
        laptop.gpu.toLowerCase().includes(query) ||
        laptop.category.toLowerCase().includes(query);
      return matchesCategory && matchesWishlist && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy, showWishlistOnly, wishlist]);

  const handleAddToCart = (laptop: Laptop, ram = laptop.ramOptions[0], storage = laptop.storageOptions[0], color = laptop.colors[0], finalPrice = laptop.price) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.laptop.id === laptop.id &&
          item.selectedRam === ram &&
          item.selectedStorage === storage &&
          item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          laptop,
          quantity: 1,
          selectedRam: ram,
          selectedStorage: storage,
          selectedColor: color,
          unitPrice: finalPrice,
        },
      ];
    });
    showToast(`${laptop.name} adicionado ao carrinho`);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removido dos favoritos' : 'Salvo nos favoritos');
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        showToast('Máximo de 3 laptops para comparação');
        return prev;
      }
      return [...prev, id];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const compareLaptops = LAPTOPS.filter((l) => compareIds.includes(l.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        compareCount={compareIds.length}
        showWishlistOnly={showWishlistOnly}
        onToggleWishlistFilter={() => setShowWishlistOnly(!showWishlistOnly)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onExplore={() => {
            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectFlagship={() => setSelectedLaptop(LAPTOPS[0])}
        />

        {/* Trust Strip */}
        <section className="border-y border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Frete Grátis Expresso</p>
                <p className="text-xs text-slate-500">Entrega segurada em todo o Brasil</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Garantia de 2 Anos</p>
                <p className="text-xs text-slate-500">Suporte técnico especializado 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">12x Sem Juros</p>
                <p className="text-xs text-slate-500">Ou 10% de desconto no Pix</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Configuração Sob Medida</p>
                <p className="text-xs text-slate-500">Personalize RAM, SSD e acabamento</p>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {showWishlistOnly ? 'Seus Laptops Favoritos' : 'Catálogo de Laptops'}
              </h2>
              <p className="text-slate-500 mt-1">
                Máquinas selecionadas para máxima produtividade, criação e jogos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowWishlistOnly(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category && !showWishlistOnly
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
            {showWishlistOnly && (
              <button
                onClick={() => setShowWishlistOnly(false)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Favoritos</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Grid */}
          {filteredLaptops.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-900">Nenhum laptop encontrado</h3>
              <p className="text-slate-500 text-sm mt-1 mb-4">
                Tente ajustar os filtros ou buscar por outro processador ou modelo.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                  setShowWishlistOnly(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLaptops.map((laptop) => (
                <LaptopCard
                  key={laptop.id}
                  laptop={laptop}
                  isWishlisted={wishlist.includes(laptop.id)}
                  isCompared={compareIds.includes(laptop.id)}
                  onToggleWishlist={() => toggleWishlist(laptop.id)}
                  onToggleCompare={() => toggleCompare(laptop.id)}
                  onConfigure={() => setSelectedLaptop(laptop)}
                  onQuickAdd={() => handleAddToCart(laptop)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Compare Bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>{compareIds.length} {compareIds.length === 1 ? 'laptop selecionado' : 'laptops selecionados'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Comparar Agora
            </button>
            <button
              onClick={() => setCompareIds([])}
              className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Limpar comparação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm font-medium border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            ApexBook
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ApexBook Hardware Store. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {selectedLaptop && (
        <LaptopModal
          laptop={selectedLaptop}
          onClose={() => setSelectedLaptop(null)}
          onAddToCart={(ram, storage, color, price) => {
            handleAddToCart(selectedLaptop, ram, storage, color, price);
            setSelectedLaptop(null);
          }}
        />
      )}

      {isCompareOpen && (
        <CompareModal
          laptops={compareLaptops}
          onClose={() => setIsCompareOpen(false)}
          onRemove={(id) => setCompareIds((prev) => prev.filter((item) => item !== id))}
          onAddToCart={(laptop) => handleAddToCart(laptop)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        total={cartTotal}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          total={cartTotal}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            setCart([]);
            setIsCheckoutOpen(false);
            showToast('Pedido confirmado com sucesso!');
          }}
        />
      )}
    </div>
  );
}

export default App;

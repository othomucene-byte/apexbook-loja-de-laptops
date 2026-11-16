import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { LaptopVisual } from './LaptopVisual';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
}  

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  total,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-lg text-slate-900">Seu Carrinho</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="font-semibold text-slate-900">Seu carrinho está vazio</p>
              <p className="text-sm text-slate-500 mt-1">Explore nosso catálogo e escolha seu próximo laptop.</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.laptop.id}-${idx}`} className="flex gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="w-24 shrink-0 bg-white rounded-xl p-1 border border-slate-100 flex items-center">
                  <LaptopVisual gradient={item.laptop.accentGradient} chassisColor={item.selectedColor.hex} compact />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-sm text-slate-900 truncate">{item.laptop.name}</h3>
                    <button
                      onClick={() => onRemove(idx)}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.selectedRam} • {item.selectedStorage} • {item.selectedColor.name}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(idx, -1)}
                        className="text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(idx, 1)}
                        className="text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="font-bold text-sm text-slate-900">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Frete Expresso</span>
              <span className="text-sm font-semibold text-emerald-600">Grátis</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Finalizar Compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

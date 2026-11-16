import React from 'react';
import { Heart, Star, Layers, Plus } from 'lucide-react';
import { Laptop } from '../types';
import { LaptopVisual } from './LaptopVisual';

interface LaptopCardProps {
  laptop: Laptop;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: () => void;
  onToggleCompare: () => void;
  onConfigure: () => void;
  onQuickAdd: () => void;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({
  laptop,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onConfigure,
  onQuickAdd,
}) => {
  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-200">
      <div>
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {laptop.badge ? (
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
              {laptop.badge}
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-400">{laptop.category}</span>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleCompare}
              title="Comparar"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleWishlist}
              title="Favoritar"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-500'
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Visual */}
        <div
          onClick={onConfigure}
          className="bg-slate-50 rounded-xl mb-4 cursor-pointer group-hover:bg-slate-100/80 transition-colors"
        >
          <LaptopVisual
            gradient={laptop.accentGradient}
            chassisColor={laptop.colors[0].hex}
            compact
          />
        </div>

        {/* Info */}
        <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mb-1">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="text-slate-800">{laptop.rating}</span>
          <span className="text-slate-400 font-normal">({laptop.reviews})</span>
        </div>

        <h3
          onClick={onConfigure}
          className="font-bold text-slate-900 text-base leading-snug cursor-pointer hover:text-indigo-600 transition-colors"
        >
          {laptop.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{laptop.tagline}</p>

        {/* Key Specs Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium">
            {laptop.cpu}
          </span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium">
            {laptop.ramOptions[0]}
          </span>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-slate-900">{formatPrice(laptop.price)}</span>
          {laptop.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(laptop.originalPrice)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onConfigure}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            Configurar
          </button>
          <button
            onClick={onQuickAdd}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

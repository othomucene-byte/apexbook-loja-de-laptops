import React, { useState } from 'react';
import { X, Cpu, Monitor, Battery, Check, ShoppingBag } from 'lucide-react';
import { Laptop } from '../types';
import { LaptopVisual } from './LaptopVisual';

interface LaptopModalProps {
  laptop: Laptop;
  onClose: () => void;
  onAddToCart: (ram: string, storage: string, color: { name: string; hex: string }, finalPrice: number) => void;
}  

export const LaptopModal: React.FC<LaptopModalProps> = ({ laptop, onClose, onAddToCart }) => {
  const [ramIndex, setRamIndex] = useState(0);
  const [storageIndex, setStorageIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const extraCost = ramIndex * 1200 + storageIndex * 900;
  const finalPrice = laptop.price + extraCost;

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{laptop.category}</span>
            <h2 className="text-xl font-bold text-slate-900">{laptop.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Visual & Specs */}
          <div className="space-y-5">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <LaptopVisual
                gradient={laptop.accentGradient}
                chassisColor={laptop.colors[colorIndex].hex}
                label={laptop.name}
              />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-2"><Cpu className="w-4 h-4" /> Processador</span>
                <span className="font-semibold text-slate-900">{laptop.cpu}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-2"><Monitor className="w-4 h-4" /> Tela</span>
                <span className="font-semibold text-slate-900">{laptop.display}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-2"><Battery className="w-4 h-4" /> Bateria</span>
                <span className="font-semibold text-slate-900">{laptop.battery}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">Peso</span>
                <span className="font-semibold text-slate-900">{laptop.weight}</span>
              </div>
            </div>
          </div>

          {/* Right: Configurator */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Color */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Acabamento: <span className="text-slate-900">{laptop.colors[colorIndex].name}</span>
                </label>
                <div className="flex gap-3 mt-2.5">
                  {laptop.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setColorIndex(idx)}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                        colorIndex === idx ? 'border-indigo-600 scale-110' : 'border-slate-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {colorIndex === idx && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* RAM */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Memória RAM
                </label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {laptop.ramOptions.map((ram, idx) => (
                    <button
                      key={ram}
                      onClick={() => setRamIndex(idx)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        ramIndex === idx
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Armazenamento SSD
                </label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {laptop.storageOptions.map((ssd, idx) => (
                    <button
                      key={ssd}
                      onClick={() => setStorageIndex(idx)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        storageIndex === idx
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {ssd}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-sm text-slate-500">Total configurado</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{formatPrice(finalPrice)}</p>
                  <p className="text-xs text-emerald-600 font-medium">
                    ou 12x de {formatPrice(Math.round(finalPrice / 12))} sem juros
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  onAddToCart(
                    laptop.ramOptions[ramIndex],
                    laptop.storageOptions[storageIndex],
                    laptop.colors[colorIndex],
                    finalPrice
                  )
                }
                className="w-full py-3.5 bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar ao Carrinho</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

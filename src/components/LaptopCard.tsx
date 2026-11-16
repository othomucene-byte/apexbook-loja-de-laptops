import React from 'react';
import { LaptopVisual } from './LaptopVisual';
export const LaptopCard: React.FC<any> = ({ laptop, onConfigure, onQuickAdd }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
    <LaptopVisual gradient={laptop.accentGradient} compact />
    <h3 className="font-bold text-lg mt-4">{laptop.name}</h3>
    <p className="text-sm text-slate-500 mb-4">{laptop.tagline}</p>
    <div className="flex gap-2">
      <button onClick={onConfigure} className="flex-1 bg-slate-100 hover:bg-slate-200 py-2 rounded-lg font-medium">Config</button>
      <button onClick={onQuickAdd} className="flex-1 bg-slate-900 text-white hover:bg-black py-2 rounded-lg font-medium">Comprar</button>
    </div>
  </div>
);
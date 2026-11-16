import React from 'react';
export const LaptopModal: React.FC<any> = ({ laptop, onClose, onAddToCart }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/60" onClick={onClose} />
    <div className="bg-white p-8 rounded-3xl max-w-lg w-full relative z-10">
      <h2 className="text-2xl font-bold mb-4">{laptop.name}</h2>
      <p className="text-slate-600 mb-6">{laptop.tagline}</p>
      <button onClick={() => onAddToCart(laptop.ramOptions[0], laptop.storageOptions[0], laptop.colors[0], laptop.price)} className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-black">Adicionar ao Carrinho</button>
    </div>
  </div>
);
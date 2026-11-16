import React from 'react';
export const CartDrawer: React.FC<any> = ({ isOpen, items, total, onClose, onCheckout }) => isOpen ? (
  <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-6 shadow-2xl overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Seu Pedido</h2>
      <div className="space-y-4">
        {items.map((i: any, idx: number) => <div key={idx} className="p-4 border rounded-xl">{i.laptop.name} - R${i.unitPrice}</div>)}
      </div>
      <div className="mt-8 pt-4 border-t font-bold text-xl">Total: R${total.toLocaleString('pt-BR')}</div>
      <button onClick={onCheckout} className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl">Finalizar Compra</button>
    </div>
  </div>
) : null;
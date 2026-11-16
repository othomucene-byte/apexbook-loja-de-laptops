import React from 'react';
export const CheckoutModal: React.FC<any> = ({ total, onClose, onSuccess }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/60" onClick={onClose} />
    <div className="bg-white p-8 rounded-3xl max-w-sm w-full relative z-10 text-center">
      <h2 className="text-xl font-bold mb-4">Confirmar Pagamento</h2>
      <p className="text-slate-500 mb-6">Total: R${total.toLocaleString('pt-BR')}</p>
      <button onClick={onSuccess} className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">Pagar Agora</button>
    </div>
  </div>
);
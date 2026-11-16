import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard } from 'lucide-react';

interface CheckoutModalProps {
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}  

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ total, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState<'pix' | 'card'>('pix');

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const finalTotal = payment === 'pix' ? Math.round(total * 0.9) : total;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Finalizar Pedido</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Mariana Silva"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mariana@exemplo.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Endereço de Entrega</label>
            <input
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Av. Paulista, 1000 - São Paulo, SP"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">Forma de Pagamento</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPayment('pix')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  payment === 'pix' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'
                }`}
              >
                <p className="text-xs font-bold text-slate-900">Pix (10% OFF)</p>
                <p className="text-[11px] text-emerald-600 font-medium">Aprovação imediata</p>
              </button>
              <button
                type="button"
                onClick={() => setPayment('card')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  payment === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'
                }`}
              >
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" /> Cartão 12x
                </p>
                <p className="text-[11px] text-slate-500">Sem juros</p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Total a pagar</p>
              <p className="text-xl font-bold text-slate-900">{formatPrice(finalTotal)}</p>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Pedido</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

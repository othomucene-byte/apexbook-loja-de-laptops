import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Laptop } from '../types';
import { LaptopVisual } from './LaptopVisual';

interface CompareModalProps {
  laptops: Laptop[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (laptop: Laptop) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  laptops,
  onClose,
  onRemove,
  onAddToCart,
}) => {
  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Comparar Especificações</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {laptops.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            Nenhum laptop selecionado para comparação.
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="w-36 pb-4 text-xs font-semibold text-slate-400 uppercase">Modelo</th>
                  {laptops.map((laptop) => (
                    <th key={laptop.id} className="pb-4 px-3 align-top">
                      <div className="bg-slate-50 rounded-2xl p-3 relative">
                        <button
                          onClick={() => onRemove(laptop.id)}
                          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <LaptopVisual gradient={laptop.accentGradient} compact />
                        <p className="font-bold text-slate-900 text-sm mt-2">{laptop.name}</p>
                        <p className="text-indigo-600 font-bold text-sm mt-0.5">{formatPrice(laptop.price)}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="py-3 text-slate-500 font-medium">Processador</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-3 font-semibold text-slate-900">{l.cpu}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 text-slate-500 font-medium">Placa de Vídeo</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-3 text-slate-700">{l.gpu}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 text-slate-500 font-medium">Tela</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-3 text-slate-700">{l.display}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 text-slate-500 font-medium">Bateria</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-3 text-slate-700">{l.battery}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 text-slate-500 font-medium">Peso</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-3 text-slate-700">{l.weight}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4" />
                  {laptops.map((l) => (
                    <td key={l.id} className="py-4 px-3">
                      <button
                        onClick={() => onAddToCart(l)}
                        className="w-full py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Comprar</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

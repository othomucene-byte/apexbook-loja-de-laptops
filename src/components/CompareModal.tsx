import React from 'react';
export const CompareModal: React.FC<any> = ({ laptops, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/60" onClick={onClose} />
    <div className="bg-white p-8 rounded-3xl max-w-2xl w-full relative z-10">
      <h2 className="text-2xl font-bold mb-6">Comparação</h2>
      <div className="grid grid-cols-2 gap-4">
        {laptops.map((l: any) => <div key={l.id} className="p-4 bg-slate-50 rounded-xl">{l.name}</div>)}
      </div>
    </div>
  </div>
);
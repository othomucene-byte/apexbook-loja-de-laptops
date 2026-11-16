import React from 'react';
export const Hero: React.FC<any> = ({ onExplore }) => (
  <section className="bg-slate-950 text-white py-24 text-center">
    <h1 className="text-6xl font-black mb-6">A próxima era da performance.</h1>
    <button onClick={onExplore} className="bg-white text-slate-950 px-8 py-3 rounded-full font-semibold hover:bg-slate-200">Conheça a Linha</button>
  </section>
);
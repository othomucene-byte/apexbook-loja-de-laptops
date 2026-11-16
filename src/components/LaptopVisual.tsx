import React from 'react';
interface Props { gradient: string; compact?: boolean; }
export const LaptopVisual: React.FC<Props> = ({ gradient, compact = false }) => (
  <div className={`relative flex flex-col items-center justify-center p-4 ${compact ? 'h-32' : 'h-64'}`}>
    <div className={`rounded-xl border-4 border-slate-900 shadow-2xl transition-all ${compact ? 'w-32 h-20' : 'w-64 h-40'} bg-gradient-to-br ${gradient}`} />
    <div className={`bg-slate-800 rounded-b-lg ${compact ? 'w-40 h-2' : 'w-72 h-4'}`} />
  </div>
);
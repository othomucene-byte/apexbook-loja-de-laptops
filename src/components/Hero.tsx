import React from 'react';
import { ArrowRight, Cpu, Monitor, Battery } from 'lucide-react';
import { LaptopVisual } from './LaptopVisual';

interface HeroProps {
  onExplore: () => void;
  onSelectFlagship: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onSelectFlagship }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.22),_transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              Nova Geração 2025
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
              Engenharia extrema para quem cria o futuro.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Descubra laptops com processadores de última geração, telas OLED 120Hz e autonomia para acompanhar o seu ritmo sem limites.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExplore}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSelectFlagship}
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-colors cursor-pointer"
              >
                Configurar Flagship
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <LaptopVisual
                gradient="from-indigo-600 via-purple-600 to-slate-900"
                label="ApexBook Pro 16"
              />
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-center">
                <div>
                  <Cpu className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-white">M3 Max</p>
                  <p className="text-[11px] text-slate-400">16-Core</p>
                </div>
                <div>
                  <Monitor className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-white">XDR 120Hz</p>
                  <p className="text-[11px] text-slate-400">16.2 Pol.</p>
                </div>
                <div>
                  <Battery className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-white">22 Horas</p>
                  <p className="text-[11px] text-slate-400">Autonomia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

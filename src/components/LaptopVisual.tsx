import React from 'react';

interface LaptopVisualProps {
  gradient: string;
  chassisColor?: string;
  label?: string;
  compact?: boolean;
}

export const LaptopVisual: React.FC<LaptopVisualProps> = ({
  gradient,
  chassisColor = '#1e293b',
  label,
  compact = false,
}) => {
  return (
    <div className={`relative w-full flex flex-col items-center justify-center ${compact ? 'py-2' : 'py-5'}`}>
      {/* Screen */}
      <div
        className={`relative rounded-t-xl border-[3px] border-slate-800 shadow-lg overflow-hidden ${
          compact ? 'w-32 h-20' : 'w-48 sm:w-52 h-32'
        }`}
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-90 flex flex-col justify-between p-2.5`}>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>
            <div className="w-1 h-1 rounded-full bg-white/60" />
          </div>
          {label && !compact && (
            <div className="text-[10px] font-semibold text-white/90 tracking-wide uppercase truncate">
              {label}
            </div>
          )}
        </div>
      </div>
      {/* Base / Keyboard deck */}
      <div
        className={`h-2.5 rounded-b-lg shadow-md border-t border-white/10 flex items-center justify-center ${
          compact ? 'w-36' : 'w-56 sm:w-60'
        }`}
        style={{ backgroundColor: chassisColor }}
      >
        <div className="w-8 h-0.5 rounded-full bg-white/25" />
      </div>
    </div>
  );
};

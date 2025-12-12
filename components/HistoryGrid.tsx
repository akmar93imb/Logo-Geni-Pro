import React from 'react';
import { GeneratedLogo } from '../types';
import { Clock } from 'lucide-react';

interface HistoryGridProps {
  history: GeneratedLogo[];
  onSelect: (logo: GeneratedLogo) => void;
}

export const HistoryGrid: React.FC<HistoryGridProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-slate-400 font-medium flex items-center gap-2 mb-4">
        <Clock size={16} /> Recent Designs
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {history.map((logo) => (
          <button
            key={logo.id}
            onClick={() => onSelect(logo)}
            className="relative aspect-square group rounded-xl overflow-hidden border border-slate-700 bg-slate-800 hover:border-brand-500 transition-all"
          >
            <img 
              src={logo.imageUrl} 
              alt="History item" 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <p className="text-xs text-white truncate w-full text-left">
                {new Date(logo.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

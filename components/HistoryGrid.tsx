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
    <div>
      <h3 className="text-gray-500 text-sm font-semibold flex items-center gap-2 mb-4 uppercase tracking-wider">
        <Clock size={14} /> Recent Generations
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {history.map((logo) => (
          <button
            key={logo.id}
            onClick={() => onSelect(logo)}
            className="relative aspect-square group rounded-lg overflow-hidden border border-gray-200 bg-white hover:border-black hover:shadow-md transition-all"
          >
            <div className="p-2 w-full h-full flex items-center justify-center">
                <img 
                src={logo.imageUrl} 
                alt="History item" 
                className="max-w-full max-h-full object-contain"
                />
            </div>
            
            {/* Timestamp hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Load</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

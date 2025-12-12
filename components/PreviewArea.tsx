import React from 'react';
import { Download, Share2, Maximize2, Wand2, RefreshCw } from 'lucide-react';
import { GeneratedLogo } from '../types';

interface PreviewAreaProps {
  currentLogo: GeneratedLogo | null;
  isGenerating: boolean;
  onRemix: (logo: GeneratedLogo) => void;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ currentLogo, isGenerating, onRemix }) => {
  
  const handleDownload = () => {
    if (!currentLogo) return;
    const link = document.createElement('a');
    link.href = currentLogo.imageUrl;
    link.download = `logogenie-${currentLogo.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Main Canvas Area */}
      <div className="relative flex-grow bg-slate-900/50 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex items-center justify-center p-8 group backdrop-blur-sm min-h-[300px]">
        
        {/* Transparency Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 0h10v10H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E")` 
             }}>
        </div>

        {/* Dynamic content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-brand-500/30 border-t-brand-400 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wand2 className="text-brand-400 animate-bounce" size={32} />
                </div>
              </div>
              <p className="text-brand-200 font-medium tracking-wide">Conjuring your brand identity...</p>
            </div>
          ) : currentLogo ? (
            <img 
              src={currentLogo.imageUrl} 
              alt="Generated Logo" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg shadow-black/50"
            />
          ) : (
            <div className="text-center space-y-4 text-slate-500">
              <div className="w-24 h-24 mx-auto bg-slate-800/50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-700">
                <Share2 className="opacity-20" size={40} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-slate-400">Ready to Create</p>
                <p className="text-sm opacity-60 max-w-xs mx-auto">Fill out the form on the left to generate your unique professional logo</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Toolbar - Always visible when logo exists */}
      <div className={`
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500
        ${currentLogo && !isGenerating ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none grayscale'}
      `}>
        
        {/* Remix Button */}
        <button 
          onClick={() => currentLogo && onRemix(currentLogo)}
          disabled={!currentLogo || isGenerating}
          className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-800 border border-slate-600 text-white font-semibold hover:bg-slate-700 hover:border-brand-400 transition-all hover:-translate-y-1 shadow-lg group"
        >
          <div className="p-2 bg-brand-500/20 rounded-lg group-hover:bg-brand-500 text-brand-400 group-hover:text-white transition-colors">
            <RefreshCw size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-400 font-normal">Like this idea?</div>
            <div className="text-sm">Generate Variations</div>
          </div>
        </button>

        {/* Download Button */}
        <button 
          onClick={handleDownload}
          disabled={!currentLogo || isGenerating}
          className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold hover:from-brand-500 hover:to-indigo-500 transition-all hover:-translate-y-1 shadow-lg shadow-brand-900/50"
        >
          <div className="p-2 bg-white/20 rounded-lg">
            <Download size={24} />
          </div>
          <div className="text-left">
            <div className="text-xs text-brand-100 font-normal">High Quality</div>
            <div className="text-sm">Download PNG</div>
          </div>
        </button>

        {/* View Fullscreen / Share */}
        <button 
          className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 font-semibold hover:bg-slate-700 hover:text-white transition-all hover:-translate-y-1 shadow-lg md:col-span-2 lg:col-span-1"
          onClick={() => {
             if(currentLogo) window.open(currentLogo.imageUrl, '_blank');
          }}
          disabled={!currentLogo || isGenerating}
        >
          <Maximize2 size={20} />
          <span className="text-sm">View Full Size</span>
        </button>

      </div>
    </div>
  );
};

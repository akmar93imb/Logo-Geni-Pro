import React from 'react';
import { Download, Share2, Maximize2 } from 'lucide-react';
import { GeneratedLogo } from '../types';

interface PreviewAreaProps {
  currentLogo: GeneratedLogo | null;
  isGenerating: boolean;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ currentLogo, isGenerating }) => {
  
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
    <div className="flex flex-col h-full gap-4">
      <div className="relative flex-grow bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex items-center justify-center p-8 group">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500 via-slate-900 to-black pointer-events-none"></div>
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

        {isGenerating ? (
          <div className="text-center space-y-4 animate-pulse">
            <div className="w-48 h-48 rounded-full bg-slate-700/50 mx-auto flex items-center justify-center border-4 border-slate-600/30">
                <div className="w-32 h-32 rounded-full bg-slate-600/50"></div>
            </div>
            <p className="text-brand-400 font-medium">AI is crafting your brand identity...</p>
          </div>
        ) : currentLogo ? (
          <div className="relative w-full h-full flex items-center justify-center">
             <img 
               src={currentLogo.imageUrl} 
               alt="Generated Logo" 
               className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg transition-transform duration-500 hover:scale-105"
             />
             
             {/* Overlay Actions */}
             <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <button 
                onClick={handleDownload}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full border border-white/20 shadow-lg transition-all hover:scale-110"
                title="Download PNG"
               >
                 <Download size={20} />
               </button>
               <button 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full border border-white/20 shadow-lg transition-all hover:scale-110"
                title="View Fullscreen"
               >
                 <Maximize2 size={20} />
               </button>
             </div>
          </div>
        ) : (
          <div className="text-center space-y-4 text-slate-500">
            <div className="w-24 h-24 mx-auto border-4 border-dashed border-slate-700 rounded-2xl flex items-center justify-center">
              <Share2 className="opacity-20" size={40} />
            </div>
            <p className="text-lg">Your masterpiece will appear here</p>
            <p className="text-sm opacity-60">Fill out the form to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

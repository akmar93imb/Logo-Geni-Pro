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
      <div className="relative flex-grow bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center p-8 min-h-[400px]">
        
        {/* Subtle Checkerboard for transparency indication */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
        </div>

        {/* Dynamic content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-black animate-spin"></div>
              <p className="text-gray-500 font-medium text-sm">Designing...</p>
            </div>
          ) : currentLogo ? (
            <img 
              src={currentLogo.imageUrl} 
              alt="Generated Logo" 
              className="max-w-full max-h-full object-contain drop-shadow-xl"
            />
          ) : (
            <div className="text-center space-y-4 text-gray-400">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                <Share2 className="opacity-30" size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-gray-900 font-medium">No logo generated yet</p>
                <p className="text-sm text-gray-500">Fill out the form to start creating</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-3">
        
        {/* Download Button - Primary High Visibility */}
        <button 
          onClick={handleDownload}
          disabled={!currentLogo || isGenerating}
          className={`
            flex-grow flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
            ${!currentLogo || isGenerating 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md'}
          `}
        >
          <Download size={18} />
          <span>Download PNG</span>
        </button>

        {/* Remix Button - Secondary */}
        <button 
          onClick={() => currentLogo && onRemix(currentLogo)}
          disabled={!currentLogo || isGenerating}
          className={`
            px-6 py-3 rounded-lg font-medium border transition-all flex items-center gap-2
            ${!currentLogo || isGenerating 
              ? 'bg-white border-gray-200 text-gray-300 cursor-not-allowed' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-black'}
          `}
        >
          <RefreshCw size={18} />
          <span className="hidden sm:inline">Remix</span>
        </button>

         {/* Fullscreen Button - Icon Only */}
         <button 
          onClick={() => {
             if(currentLogo) window.open(currentLogo.imageUrl, '_blank');
          }}
          disabled={!currentLogo || isGenerating}
          className={`
            p-3 rounded-lg border transition-all
            ${!currentLogo || isGenerating 
              ? 'bg-white border-gray-200 text-gray-300 cursor-not-allowed' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-black'}
          `}
          title="View Fullscreen"
        >
          <Maximize2 size={18} />
        </button>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { LogoForm } from './components/LogoForm';
import { PreviewArea } from './components/PreviewArea';
import { HistoryGrid } from './components/HistoryGrid';
import { LogoFormValues, LogoStyle, GeneratedLogo } from './types';
import { generateLogoImages } from './services/geminiService';
import { LayoutGrid, AlertCircle } from 'lucide-react';

const INITIAL_FORM_STATE: LogoFormValues = {
  brandName: '',
  tagline: '',
  description: '',
  style: LogoStyle.MINIMALIST,
  colors: '',
  variationCount: 1,
};

export default function App() {
  const [formValues, setFormValues] = useState<LogoFormValues>(INITIAL_FORM_STATE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo | null>(null);
  const [history, setHistory] = useState<GeneratedLogo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LogoFormValues, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleGenerate = async () => {
    if (!formValues.brandName || !formValues.description) {
      setError("Please provide at least a brand name and description.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const images = await generateLogoImages(formValues);
      
      const newLogos: GeneratedLogo[] = images.map(url => ({
        id: crypto.randomUUID(),
        imageUrl: url,
        prompt: formValues.description,
        createdAt: Date.now(),
      }));

      if (newLogos.length > 0) {
        setCurrentLogo(newLogos[0]);
        setHistory((prev) => [...newLogos, ...prev]);
      }
    } catch (err: any) {
      console.error("Failed to generate logo:", err);
      setError(err.message || "Something went wrong while generating the logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRemix = async (baseLogo: GeneratedLogo) => {
    setIsGenerating(true);
    setError(null);
    
    const remixValues = { ...formValues };
    if (remixValues.variationCount < 2) {
      remixValues.variationCount = 2;
      setFormValues(prev => ({ ...prev, variationCount: 2 }));
    }

    try {
      const images = await generateLogoImages(remixValues, baseLogo.imageUrl);
      
      const newLogos: GeneratedLogo[] = images.map(url => ({
        id: crypto.randomUUID(),
        imageUrl: url,
        prompt: formValues.description,
        createdAt: Date.now(),
        parentId: baseLogo.id
      }));

      if (newLogos.length > 0) {
        setCurrentLogo(newLogos[0]);
        setHistory((prev) => [...newLogos, ...prev]);
      }
    } catch (err: any) {
      console.error("Failed to remix logo:", err);
      setError("Failed to create variations. " + (err.message || ""));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white pb-10">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brand-400 to-indigo-600 p-2 rounded-lg shadow-lg shadow-brand-500/20">
              <LayoutGrid size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              LogoGenie <span className="text-brand-400">Pro</span>
            </h1>
          </div>
          <a 
            href="https://ai.google.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 hover:text-brand-400 transition-colors bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 hover:border-brand-500/50"
          >
            Powered by Gemini
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Responsive Grid: Controls Stack on Mobile, Side-by-Side on LG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[calc(100vh-160px)] min-h-[600px]">
          
          {/* Left Column: Controls (Scrollable independently on desktop) */}
          <div className="lg:col-span-4 h-full">
            <LogoForm 
              values={formValues} 
              onChange={handleInputChange} 
              onSubmit={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Column: Preview & History */}
          <div className="lg:col-span-8 h-full flex flex-col gap-6">
            <div className="flex-grow min-h-[400px]">
               <PreviewArea 
                 currentLogo={currentLogo} 
                 isGenerating={isGenerating} 
                 onRemix={handleRemix}
               />
            </div>
            
            {/* History Row (Bottom of Right Col) */}
            <div className="mt-auto">
              <HistoryGrid history={history} onSelect={setCurrentLogo} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

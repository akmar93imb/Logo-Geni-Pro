import React, { useState, useCallback } from 'react';
import { LogoForm } from './components/LogoForm';
import { PreviewArea } from './components/PreviewArea';
import { HistoryGrid } from './components/HistoryGrid';
import { LogoFormValues, LogoStyle, GeneratedLogo } from './types';
import { generateLogoImage } from './services/geminiService';
import { LayoutGrid, AlertCircle } from 'lucide-react';

const INITIAL_FORM_STATE: LogoFormValues = {
  brandName: '',
  tagline: '',
  description: '',
  style: LogoStyle.MINIMALIST,
  colors: '',
};

export default function App() {
  const [formValues, setFormValues] = useState<LogoFormValues>(INITIAL_FORM_STATE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo | null>(null);
  const [history, setHistory] = useState<GeneratedLogo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LogoFormValues, value: string) => {
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
      const imageUrl = await generateLogoImage(formValues);
      
      const newLogo: GeneratedLogo = {
        id: crypto.randomUUID(),
        imageUrl,
        prompt: formValues.description,
        createdAt: Date.now(),
      };

      setCurrentLogo(newLogo);
      setHistory((prev) => [newLogo, ...prev]);
    } catch (err: any) {
      console.error("Failed to generate logo:", err);
      setError(err.message || "Something went wrong while generating the logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-brand-400 to-indigo-600 p-2 rounded-lg">
              <LayoutGrid size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              LogoGenie <span className="text-brand-400">Pro</span>
            </h1>
          </div>
          <a 
            href="https://ai.google.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-medium text-slate-500 hover:text-brand-400 transition-colors"
          >
            Powered by Gemini
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)] min-h-[600px]">
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 h-full">
            <LogoForm 
              values={formValues} 
              onChange={handleInputChange} 
              onSubmit={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-8 h-full flex flex-col">
            <div className="flex-grow">
               <PreviewArea currentLogo={currentLogo} isGenerating={isGenerating} />
            </div>
            
            {/* History Row (Bottom of Right Col) */}
            <div className="mt-auto pt-4">
              <HistoryGrid history={history} onSelect={setCurrentLogo} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

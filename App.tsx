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
  referenceImage: undefined,
};

export default function App() {
  const [formValues, setFormValues] = useState<LogoFormValues>(INITIAL_FORM_STATE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo | null>(null);
  const [history, setHistory] = useState<GeneratedLogo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LogoFormValues, value: string | number | undefined) => {
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
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans pb-10">
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-black">
              <LayoutGrid size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              LogoGenie <span className="text-gray-500 font-normal">Pro</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
               Gemini 2.5 Flash
             </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[600px]">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 h-full">
            <LogoForm 
              values={formValues} 
              onChange={handleInputChange} 
              onSubmit={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Column: Preview & History */}
          <div className="lg:col-span-8 h-full flex flex-col gap-8">
            <div className="flex-grow min-h-[400px]">
               <PreviewArea 
                 currentLogo={currentLogo} 
                 isGenerating={isGenerating} 
                 onRemix={handleRemix}
               />
            </div>
            
            <div className="mt-auto border-t border-gray-100 pt-8">
              <HistoryGrid history={history} onSelect={setCurrentLogo} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
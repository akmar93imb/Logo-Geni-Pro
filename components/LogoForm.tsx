import React, { useRef } from 'react';
import { LogoFormValues, LogoStyle } from '../types';
import { Loader2, Sparkles, Palette, Type, AlignLeft, Layers, Upload, X, Image as ImageIcon } from 'lucide-react';

interface LogoFormProps {
  values: LogoFormValues;
  onChange: (field: keyof LogoFormValues, value: string | number | undefined) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

export const LogoForm: React.FC<LogoFormProps> = ({ values, onChange, onSubmit, isGenerating }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simplified style options with neutral colors for UI consistency
  const styles = [
    { label: "Minimalist", value: LogoStyle.MINIMALIST },
    { label: "Abstract", value: LogoStyle.ABSTRACT },
    { label: "Vintage", value: LogoStyle.VINTAGE },
    { label: "Mascot", value: LogoStyle.MASCOT },
    { label: "Luxury", value: LogoStyle.LUXURY },
    { label: "Tech", value: LogoStyle.TECH },
  ];

  const counts = [1, 2, 3, 4];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('referenceImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    onChange('referenceImage', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="space-y-8 flex-grow">
        
        {/* Brand Info */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Brand Details
          </h3>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Brand Name</label>
            <input
              type="text"
              value={values.brandName}
              onChange={(e) => onChange('brandName', e.target.value)}
              placeholder="e.g. Orbit Coffee"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black transition-all outline-none text-sm shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Tagline <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input
              type="text"
              value={values.tagline}
              onChange={(e) => onChange('tagline', e.target.value)}
              placeholder="e.g. Out of this world"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black transition-all outline-none text-sm shadow-sm"
            />
          </div>

           <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={values.description}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Describe your business, values, and key elements..."
              rows={3}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black transition-all outline-none resize-none text-sm shadow-sm"
            />
          </div>
        </section>

        {/* Reference Image */}
        <section className="space-y-4">
           <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Reference Image
          </h3>
          
          <div>
            {!values.referenceImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="bg-gray-100 p-2 rounded-full mb-2">
                   <Upload size={16} className="text-gray-700" />
                </div>
                <p className="text-xs font-medium">Click to upload reference</p>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img 
                  src={values.referenceImage} 
                  alt="Reference" 
                  className="w-full h-32 object-contain p-2" 
                />
                <button 
                  onClick={clearImage}
                  className="absolute top-1 right-1 bg-white hover:bg-gray-100 text-gray-700 p-1.5 rounded-md border border-gray-200 shadow-sm transition-all"
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Style & Config */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Style & Output
          </h3>

           <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Style</label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((s) => (
                <button
                  key={s.label}
                  onClick={() => onChange('style', s.value)}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-md border text-left transition-all
                    ${values.style === s.value 
                      ? 'bg-black text-white border-black shadow-md' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
                  `}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Colors</label>
            <input
              type="text"
              value={values.colors}
              onChange={(e) => onChange('colors', e.target.value)}
              placeholder="e.g. Black and Gold"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black transition-all outline-none text-sm shadow-sm"
            />
          </div>

           <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex justify-between">
              <span>Count</span>
            </label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {counts.map((num) => (
                <button
                  key={num}
                  onClick={() => onChange('variationCount', num)}
                  className={`
                    flex-1 py-1.5 rounded-md text-xs font-semibold transition-all
                    ${values.variationCount === num
                      ? 'bg-white text-black shadow-sm border border-gray-200'
                      : 'text-gray-500 hover:text-gray-900'}
                  `}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </section>

      </div>

      <button
        onClick={onSubmit}
        disabled={isGenerating || !values.brandName || !values.description}
        className={`
          mt-8 w-full py-3.5 rounded-lg font-semibold text-sm shadow-sm transition-all
          flex items-center justify-center gap-2
          ${isGenerating || !values.brandName || !values.description
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-gray-800 hover:shadow-md'}
        `}
      >
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin" size={16} /> Generating...
          </>
        ) : (
          <>
            <Sparkles size={16} /> Generate Logo
          </>
        )}
      </button>
    </div>
  );
};
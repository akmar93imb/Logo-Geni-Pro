import React from 'react';
import { LogoFormValues, LogoStyle } from '../types';
import { Loader2, Sparkles, Palette, Type, AlignLeft, Layers } from 'lucide-react';

interface LogoFormProps {
  values: LogoFormValues;
  onChange: (field: keyof LogoFormValues, value: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

export const LogoForm: React.FC<LogoFormProps> = ({ values, onChange, onSubmit, isGenerating }) => {
  
  const styles = [
    { label: "Minimalist", value: LogoStyle.MINIMALIST, color: "bg-blue-500" },
    { label: "Abstract", value: LogoStyle.ABSTRACT, color: "bg-purple-500" },
    { label: "Vintage", value: LogoStyle.VINTAGE, color: "bg-amber-600" },
    { label: "Mascot", value: LogoStyle.MASCOT, color: "bg-orange-500" },
    { label: "Luxury", value: LogoStyle.LUXURY, color: "bg-slate-700" },
    { label: "Tech / Cyber", value: LogoStyle.TECH, color: "bg-cyan-500" },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 h-full flex flex-col overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="text-brand-400" />
          Create Your Identity
        </h2>
        <p className="text-slate-400 text-sm mt-1">Describe your brand and let AI handle the artistry.</p>
      </div>

      <div className="space-y-6 flex-grow">
        
        {/* Brand Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Type size={16} /> Brand Name
          </label>
          <input
            type="text"
            value={values.brandName}
            onChange={(e) => onChange('brandName', e.target.value)}
            placeholder="e.g. Orbit Coffee"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <AlignLeft size={16} /> Tagline (Optional)
          </label>
          <input
            type="text"
            value={values.tagline}
            onChange={(e) => onChange('tagline', e.target.value)}
            placeholder="e.g. Out of this world"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Layers size={16} /> Business Description
          </label>
          <textarea
            value={values.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="e.g. A futuristic coffee shop located on a space station serving robotic brew."
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none resize-none"
          />
        </div>

        {/* Style Selection */}
        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Palette size={16} /> Logo Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {styles.map((s) => (
              <button
                key={s.label}
                onClick={() => onChange('style', s.value)}
                className={`
                  p-2 text-xs font-semibold rounded-lg border transition-all duration-200
                  ${values.style === s.value 
                    ? 'bg-brand-600 border-brand-400 text-white shadow-lg shadow-brand-900/50 scale-105' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}
                `}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

         {/* Colors */}
         <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Palette size={16} /> Preferred Colors
          </label>
          <input
            type="text"
            value={values.colors}
            onChange={(e) => onChange('colors', e.target.value)}
            placeholder="e.g. Deep Navy and Gold"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
          />
        </div>

      </div>

      <button
        onClick={onSubmit}
        disabled={isGenerating || !values.brandName || !values.description}
        className={`
          mt-6 w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all
          flex items-center justify-center gap-2
          ${isGenerating || !values.brandName || !values.description
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white hover:shadow-brand-500/25 shadow-brand-900/50 transform active:scale-95'}
        `}
      >
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin" /> Designing...
          </>
        ) : (
          <>
            <Sparkles className="fill-current" /> Generate Logo
          </>
        )}
      </button>
    </div>
  );
};

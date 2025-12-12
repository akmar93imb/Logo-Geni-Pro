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

  const styles = [
    { label: "Minimalist", value: LogoStyle.MINIMALIST, color: "bg-blue-500" },
    { label: "Abstract", value: LogoStyle.ABSTRACT, color: "bg-purple-500" },
    { label: "Vintage", value: LogoStyle.VINTAGE, color: "bg-amber-600" },
    { label: "Mascot", value: LogoStyle.MASCOT, color: "bg-orange-500" },
    { label: "Luxury", value: LogoStyle.LUXURY, color: "bg-slate-700" },
    { label: "Tech / Cyber", value: LogoStyle.TECH, color: "bg-cyan-500" },
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
    <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-slate-700 h-full flex flex-col overflow-y-auto custom-scrollbar">
      
      <div className="mb-6 pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="text-brand-400" />
          Configuration
        </h2>
        <p className="text-slate-400 text-sm mt-1">Define your brand identity or upload a sketch.</p>
      </div>

      <div className="space-y-8 flex-grow">
        
        {/* Section 1: Brand Info */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            Brand Essentials
          </h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Brand Name</label>
            <div className="relative">
              <Type className="absolute left-3 top-3.5 text-slate-500" size={16} />
              <input
                type="text"
                value={values.brandName}
                onChange={(e) => onChange('brandName', e.target.value)}
                placeholder="e.g. Orbit Coffee"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Tagline <span className="text-slate-600 text-xs font-normal">(Optional)</span></label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3.5 text-slate-500" size={16} />
              <input
                type="text"
                value={values.tagline}
                onChange={(e) => onChange('tagline', e.target.value)}
                placeholder="e.g. Out of this world"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description / Brief</label>
            <div className="relative">
              <textarea
                value={values.description}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="Describe your business. If uploading a photo, describe how you want to revise or fix it..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none resize-none"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Reference Image */}
        <section className="space-y-4">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            Reference / Revision (Optional)
          </h3>
          
          <div className="space-y-2">
            {!values.referenceImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:border-brand-500 hover:text-brand-400 hover:bg-slate-800/50 transition-all cursor-pointer relative group"
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="bg-slate-800 p-3 rounded-full mb-3 group-hover:bg-slate-700 transition-colors">
                   <Upload size={20} />
                </div>
                <p className="text-sm font-medium text-center">Upload Sketch or Logo</p>
                <p className="text-xs text-center opacity-60 mt-1">To revise or redesign</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-brand-500/50 bg-slate-900 group shadow-lg shadow-brand-900/20">
                <div className="absolute top-2 left-2 z-10 bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">
                   <ImageIcon size={10} /> Reference Active
                </div>
                <img 
                  src={values.referenceImage} 
                  alt="Reference" 
                  className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <button 
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-slate-900/80 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur-sm transition-all border border-slate-700 hover:border-red-400 shadow-xl"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Visual Style */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            Visual Identity
          </h3>

           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Aesthetic Style</label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((s) => (
                <button
                  key={s.label}
                  onClick={() => onChange('style', s.value)}
                  className={`
                    px-3 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 text-left
                    ${values.style === s.value 
                      ? 'bg-slate-800 border-brand-500 text-brand-300 shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'}
                  `}
                >
                  <div className={`w-2 h-2 rounded-full inline-block mr-2 ${s.color}`}></div>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Color Palette</label>
            <div className="relative">
              <Palette className="absolute left-3 top-3.5 text-slate-500" size={16} />
              <input
                type="text"
                value={values.colors}
                onChange={(e) => onChange('colors', e.target.value)}
                placeholder="e.g. Deep Navy and Gold"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex justify-between">
              <span>Variations</span>
              <span className="text-xs text-brand-400">{values.variationCount} images</span>
            </label>
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {counts.map((num) => (
                <button
                  key={num}
                  onClick={() => onChange('variationCount', num)}
                  className={`
                    flex-1 py-2 rounded-lg text-sm font-bold transition-all
                    ${values.variationCount === num
                      ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'}
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
          mt-6 w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all
          flex items-center justify-center gap-2 relative overflow-hidden group
          ${isGenerating || !values.brandName || !values.description
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
            : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:shadow-brand-500/40 hover:scale-[1.02] border border-brand-500/50'}
        `}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl pointer-events-none"></div>
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

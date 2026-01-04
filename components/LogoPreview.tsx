
import React from 'react';
import { LogoDesign, TShirtColor } from '../types';

interface Props {
  design: LogoDesign | null;
  isLoading: boolean;
  shirtColor: TShirtColor;
}

const LogoPreview: React.FC<Props> = ({ design, isLoading, shirtColor }) => {
  const getShirtFilter = (color: TShirtColor) => {
    switch (color) {
      case 'black': return 'brightness(15%) grayscale(1)';
      case 'gray': return 'brightness(50%) grayscale(1)';
      case 'blue': return 'sepia(1) saturate(5) hue-rotate(180deg) brightness(0.7)';
      case 'red': return 'sepia(1) saturate(5) hue-rotate(330deg) brightness(0.7)';
      case 'navy': return 'sepia(1) saturate(5) hue-rotate(190deg) brightness(0.3)';
      default: return 'none'; // White
    }
  };

  if (!design && !isLoading) {
    return (
      <div className="w-full aspect-square glass rounded-3xl flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-700">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <i className="fas fa-image text-4xl text-slate-600"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-300">Ready for Preview</h3>
        <p className="text-slate-500 max-w-xs mt-2">
          Your creative designs will appear here. Start by describing your logo on the left.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Main Mockup Container */}
      <div className="relative aspect-square glass rounded-3xl overflow-hidden group">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-pulse">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-wand-sparkles text-2xl text-indigo-500"></i>
              </div>
            </div>
            <p className="mt-6 text-lg font-medium text-white">Forging your vision...</p>
            <p className="text-sm text-slate-400 mt-2">Gemini AI is crafting the perfect logo.</p>
          </div>
        )}

        {/* T-Shirt Base Image */}
        <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105">
           <img 
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000" 
            alt="T-shirt Mockup" 
            className="w-full h-full object-contain pointer-events-none select-none transition-all duration-500"
            style={{ filter: getShirtFilter(shirtColor) }}
          />
        </div>

        {/* Logo Overlay */}
        {design && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 aspect-square relative translate-y-[-10%] opacity-90 mix-blend-multiply transition-all duration-300 hover:scale-110">
                {/* We use mix-blend-multiply because the generated image has a white background */}
              <img 
                src={design.imageUrl} 
                alt="Logo Design" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Design Info Tag */}
        {design && !isLoading && (
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="glass p-3 rounded-xl border-slate-700/50 max-w-[70%]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">{design.style.name} Style</span>
              <h4 className="text-sm font-bold text-white truncate">{design.prompt}</h4>
            </div>
            <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = design.imageUrl;
                    link.download = `logo-visionary-${design.id}.png`;
                    link.click();
                  }}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-indigo-600 transition-colors"
                  title="Download Image"
                >
                  <i className="fas fa-download"></i>
                </button>
            </div>
          </div>
        )}
      </div>

      {/* Raw Image Card */}
      {design && !isLoading && (
        <div className="glass p-4 rounded-2xl flex items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
            <img src={design.imageUrl} alt="Raw Design" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-slate-200">Print-Ready File</h5>
            <p className="text-xs text-slate-500 mt-1">
              This high-resolution image is optimized for DTG or screen printing. Use the white-background version for most apparel templates.
            </p>
          </div>
          <button 
            onClick={() => {
                const link = document.createElement('a');
                link.href = design.imageUrl;
                link.download = `logo-visionary-source-${design.id}.png`;
                link.click();
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <i className="fas fa-file-export"></i>
            Source
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoPreview;

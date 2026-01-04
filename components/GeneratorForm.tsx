
import React, { useState } from 'react';
import { DesignStyle } from '../types';
import { DESIGN_STYLES } from '../constants';

interface Props {
  onGenerate: (prompt: string, style: DesignStyle) => void;
  isLoading: boolean;
}

const GeneratorForm: React.FC<Props> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>(DESIGN_STYLES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, selectedStyle);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300">What's the logo concept?</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A powerful tiger wearing sunglasses, A geometric mountain peak..."
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
          required
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-300">Choose a Style</label>
        <div className="grid grid-cols-2 gap-3">
          {DESIGN_STYLES.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => setSelectedStyle(style)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedStyle.id === style.id
                  ? 'border-indigo-500 bg-indigo-500/20 text-white'
                  : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <i className={`fas ${style.icon} text-sm`}></i>
                <span className="text-sm font-bold">{style.name}</span>
              </div>
              <p className="text-[10px] leading-tight opacity-70">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-bold text-white shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group"
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Generating Magic...
          </>
        ) : (
          <>
            Generate Design
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </>
        )}
      </button>
    </form>
  );
};

export default GeneratorForm;

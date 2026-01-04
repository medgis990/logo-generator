
import React, { useState, useEffect } from 'react';
import { LogoDesign, DesignStyle, TShirtColor } from './types';
import { DESIGN_STYLES, T_SHIRT_OPTIONS } from './constants';
import { generateLogo } from './services/gemini';
import GeneratorForm from './components/GeneratorForm';
import LogoPreview from './components/LogoPreview';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  const [designs, setDesigns] = useState<LogoDesign[]>([]);
  const [currentDesign, setCurrentDesign] = useState<LogoDesign | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shirtColor, setShirtColor] = useState<TShirtColor>('white');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tshirt-logos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDesigns(parsed);
        if (parsed.length > 0) setCurrentDesign(parsed[0]);
      } catch (e) {
        console.error("Failed to load designs", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('tshirt-logos', JSON.stringify(designs));
  }, [designs]);

  const handleGenerate = async (prompt: string, style: DesignStyle) => {
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateLogo(prompt, style.promptModifier);
      const newDesign: LogoDesign = {
        id: crypto.randomUUID(),
        prompt,
        style,
        imageUrl,
        timestamp: Date.now()
      };
      setDesigns(prev => [newDesign, ...prev]);
      setCurrentDesign(newDesign);
    } catch (err: any) {
      setError(err.message || "Failed to generate logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectDesign = (design: LogoDesign) => {
    setCurrentDesign(design);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteDesign = (id: string) => {
    setDesigns(prev => prev.filter(d => d.id !== id));
    if (currentDesign?.id === id) {
      setCurrentDesign(designs.find(d => d.id !== id) || null);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass py-4 px-6 mb-8 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <i className="fas fa-shirt text-xl"></i>
            </div>
            <h1 className="text-2xl font-brand tracking-wider text-white">Logo Visionary</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Generator</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Mockups</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Options */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-wand-magic-sparkles text-indigo-400"></i>
                Design Your Logo
              </h2>
              <GeneratorForm onGenerate={handleGenerate} isLoading={isGenerating} />
              
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
                  <i className="fas fa-circle-exclamation"></i>
                  {error}
                </div>
              )}
            </div>

            <div className="glass p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-palette text-indigo-400"></i>
                Mockup Customization
              </h2>
              <p className="text-sm text-slate-400 mb-4">Choose a T-shirt color to see your logo in action.</p>
              <div className="grid grid-cols-3 gap-3">
                {T_SHIRT_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setShirtColor(opt.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      shirtColor === opt.id 
                        ? 'border-indigo-500 bg-indigo-500/10' 
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full shadow-inner border border-white/10" 
                      style={{ backgroundColor: opt.hex }}
                    />
                    <span className="text-xs font-medium">{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Large Preview */}
          <div className="lg:col-span-7">
            <LogoPreview 
              design={currentDesign} 
              isLoading={isGenerating} 
              shirtColor={shirtColor}
            />
          </div>
        </div>

        {/* Gallery Section */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <i className="fas fa-layer-group text-indigo-400"></i>
              Your Design History
            </h2>
            <span className="text-sm text-slate-400">{designs.length} Designs</span>
          </div>
          <Gallery 
            designs={designs} 
            onSelect={handleSelectDesign} 
            onDelete={handleDeleteDesign}
            activeId={currentDesign?.id}
          />
        </section>
      </main>

      <footer className="mt-20 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2024 T-Shirt Logo Visionary. Powered by Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

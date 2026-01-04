
import React from 'react';
import { LogoDesign } from '../types';

interface Props {
  designs: LogoDesign[];
  onSelect: (design: LogoDesign) => void;
  onDelete: (id: string) => void;
  activeId?: string;
}

const Gallery: React.FC<Props> = ({ designs, onSelect, onDelete, activeId }) => {
  if (designs.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-700">
        <p className="text-slate-500 italic">No designs generated yet. Be the first to create something awesome!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {designs.map((design) => (
        <div 
          key={design.id}
          className={`relative group glass rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
            activeId === design.id ? 'ring-2 ring-indigo-500 scale-[1.02]' : 'hover:scale-[1.02] hover:bg-slate-800'
          }`}
          onClick={() => onSelect(design)}
        >
          {/* Logo Thumb */}
          <div className="aspect-square bg-white flex items-center justify-center p-4">
            <img 
              src={design.imageUrl} 
              alt={design.prompt} 
              className="w-full h-full object-contain drop-shadow-md" 
            />
          </div>

          {/* Info Overlay */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">
                {design.style.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(design.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-red-400 transition-all"
              >
                <i className="fas fa-trash-alt text-xs"></i>
              </button>
            </div>
            <p className="text-xs font-medium text-slate-300 truncate pr-2">
              {design.prompt}
            </p>
          </div>
          
          {/* Selection indicator */}
          {activeId === design.id && (
            <div className="absolute top-2 left-2 bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-check text-[10px]"></i>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;

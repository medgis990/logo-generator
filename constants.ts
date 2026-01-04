
import { DesignStyle, TShirtOption } from './types';

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean lines and simple shapes.',
    promptModifier: 'minimalist, flat vector, clean geometric lines, solid colors, isolated on plain white background, professional logo style, white background',
    icon: 'fa-minus'
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    description: 'Bold, gritty, and urban aesthetic.',
    promptModifier: 'streetwear brand logo, edgy, gritty texture, bold typography, urban style, high contrast, isolated on white background, hypebeast aesthetic',
    icon: 'fa-road'
  },
  {
    id: 'vintage',
    name: 'Vintage/Retro',
    description: 'Classic 70s-90s nostalgic feel.',
    promptModifier: 'vintage retro logo style, 1980s aesthetic, distressed texture, faded colors, badge style, isolated on white background, nostalgia vibes',
    icon: 'fa-history'
  },
  {
    id: 'mascot',
    name: 'Mascot',
    description: 'Character-based illustrated designs.',
    promptModifier: 'esports mascot logo, detailed illustration, thick outlines, vibrant colors, vector art, aggressive stance, isolated on white background',
    icon: 'fa-dragon'
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Modern art and flowing shapes.',
    promptModifier: 'modern abstract logo, flowing organic shapes, gradient colors, sleek, conceptual, premium feel, isolated on white background',
    icon: 'fa-wind'
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Focus on beautiful lettering.',
    promptModifier: 'custom typography logo, hand-lettered style, artistic font design, calligraphy, elegant, isolated on white background',
    icon: 'fa-font'
  }
];

export const T_SHIRT_OPTIONS: TShirtOption[] = [
  { id: 'white', hex: '#FFFFFF', name: 'Cloud White' },
  { id: 'black', hex: '#111111', name: 'Jet Black' },
  { id: 'gray', hex: '#888888', name: 'Heather Gray' },
  { id: 'blue', hex: '#3B82F6', name: 'Electric Blue' },
  { id: 'red', hex: '#EF4444', name: 'Candy Red' },
  { id: 'navy', hex: '#1E3A8A', name: 'Navy Blue' },
];

export const SHIRT_BASE_IMAGE = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000';


export interface LogoDesign {
  id: string;
  prompt: string;
  style: DesignStyle;
  imageUrl: string;
  timestamp: number;
}

export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  icon: string;
}

export type TShirtColor = 'white' | 'black' | 'gray' | 'blue' | 'red' | 'navy';

export interface TShirtOption {
  id: TShirtColor;
  hex: string;
  name: string;
}

export enum LogoStyle {
  MINIMALIST = "Minimalist, flat design, clean lines, geometric",
  ABSTRACT = "Abstract, modern art, conceptual, fluid shapes",
  VINTAGE = "Vintage, retro, badge style, textured, classic typography",
  MASCOT = "Mascot, character-based, friendly, vibrant, illustration",
  LUXURY = "Luxury, elegant, serif fonts, gold and black, sophisticated",
  TECH = "Tech, futuristic, cyber, gradients, circuit patterns, neon"
}

export interface LogoFormValues {
  brandName: string;
  tagline: string;
  description: string;
  style: LogoStyle;
  colors: string;
}

export interface GeneratedLogo {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: number;
}

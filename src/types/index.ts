
export interface PromptDetail {
  id: number;
  dateCreated: string;
  prompt: string;
  sexual: "X" | "O";
  violence: "X" | "O";
  discrimination: "X" | "O";
  illegal: "X" | "O";
  fake: "X" | "O";
  shocking: "X" | "O";
  culture: "X" | "O";
  privacy: "X" | "O";
  disrespect: "X" | "O";
  etc: "X" | "O";
}

export interface ImageAnalysis {
  id: number;
  dateCreated: string;
  prompt: string;
  sexual: number;
  violence: number;
  discrimination: number;
  illegal: number;
  fake: number;
  shocking: number;
  culture: number;
  privacy: number;
  disrespect: number;
  totalScore: number;
  reason: string;
  imagePath?: string;
}

export interface GeneratedImage {
  prompt: string;
  imagen3: string;
  dalle: string;
  midjourney: string;
  metadata: {
    sexual: number;
    violence: number;
    discrimination: number;
    illegal: number;
    fake: number;
    shocking: number;
    culture: number;
    privacy: number;
    disrespect: number;
  };
}

export type Category = 
  | "sexual" 
  | "violence" 
  | "discrimination" 
  | "illegal" 
  | "fake" 
  | "shocking" 
  | "culture" 
  | "privacy" 
  | "disrespect" 
  | "etc";

export interface CategoryFilter {
  sexual: boolean;
  violence: boolean;
  discrimination: boolean;
  illegal: boolean;
  fake: boolean;
  shocking: boolean;
  culture: boolean;
  privacy: boolean;
  disrespect: boolean;
  etc: boolean;
}

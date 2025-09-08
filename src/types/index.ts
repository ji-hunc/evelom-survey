export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  suitableFor: {
    skinType: ('dry' | 'oily' | 'combination' | 'sensitive' | 'normal')[];
    concerns: string[];
    lifestyle: string[];
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'yesno' | 'scale' | 'choice';
  options?: string[];
  category: 'skinType' | 'concerns' | 'lifestyle' | 'preferences' | 'environmental';
}

export interface QuizAnswer {
  questionId: number;
  answer: string | number | boolean;
}

export interface SkinDiagnosisData {
  moisture: number; // 수분
  sebum: number; // 유분
  elasticity: number; // 탄력
  pigmentation: number; // 색소
  pores: number; // 모공
}

export interface UserProfile {
  quizAnswers: QuizAnswer[];
  skinDiagnosisData?: SkinDiagnosisData;
  recommendedProduct?: Product;
}
export interface PhraseItem {
  it: string;
  kr: string;
  pron: string;
}

export interface Category {
  id: string;
  title: string;
  color: string;
  items: PhraseItem[];
}

export interface CultureTip {
  title: string;
  content: string;
}

export interface QuizQuestion {
  question: string;
  answer: string;
  options: string[];
  pron: string;
}

export type ViewState = 'home' | 'category' | 'quiz' | 'culture' | 'ai-guide' | 'translator';

export interface SpeechFeedback {
  status: 'idle' | 'listening' | 'success' | 'fail';
  message: string;
}
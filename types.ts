
export enum View {
  DASHBOARD = 'DASHBOARD',
  LEARN = 'LEARN',
  DICTIONARY = 'DICTIONARY',
  HSK = 'HSK',
  CULTURE = 'CULTURE',
  AI_TUTOR = 'AI_TUTOR',
  // SETTINGS is now accessed via the user profile, not a main navigation item.
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'ru' | 'ar' | 'zh_hk';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  joinedDate: string;
  stats: {
    vocabulary: number;
    grammar: number;
    listening: number;
    reading: number;
  };
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  locked: boolean;
  lessons: number;
  completed: number;
  focus: string;
  category: string;
}

export interface WordEntry {
  simplified: string;
  traditional: string;
  pinyin: string;
  meanings: string[];
  hskLevel?: number;
  etymology?: string;
  components: { char: string; meaning: string; radical: boolean }[];
  examples: { chinese: string; pinyin: string; translation: string }[];
  compounds: { word: string; pinyin: string; meaning: string }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  analysis?: {
    original: string;
    correction: string;
    explanation: string;
  };
}

export interface TutorSession {
  id: string;
  title: string;
  date: number;
  messages: ChatMessage[];
}

export type TutorMode = 'TEXT' | 'VOICE';

export type ExerciseType = 'SELECT' | 'LISTEN' | 'SPEAK' | 'WRITE' | 'READ';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[]; // These options are now translation keys
  answer: string; // This answer is now a translation key or the original Chinese/Pinyin string
  pinyin: string;
  chinese: string;
  audioUrl?: string;
}

export interface HSKLevel {
  level: number;
  requiredVocab: number;
  title: string;
}

// Added missing HSKQuestion interface to fix import errors in HSKCenter
export interface HSKQuestion {
  id: string;
  question: string;
  content: string;
  options: string[];
  answer: string;
  explanation: string;
}

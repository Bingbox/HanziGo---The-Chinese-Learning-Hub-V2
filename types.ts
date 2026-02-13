
export enum View {
  DASHBOARD = 'DASHBOARD',
  LEARN = 'LEARN',
  DICTIONARY = 'DICTIONARY',
  HSK = 'HSK',
  CULTURE = 'CULTURE',
  AI_TUTOR = 'AI_TUTOR',
  SETTINGS = 'SETTINGS',
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

export interface StoredUser extends User {
  password: string; 
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
  vocab?: {
    word: string;
    pinyin: string;
    meaning: string;
  }[];
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
  options?: string[]; 
  answer: string; 
  pinyin: string;
  chinese: string;
  audioUrl?: string;
}

export interface HSKLevel {
  level: number;
  requiredVocab: number;
  title: string;
}

export interface HSKQuestion {
  id: string;
  question: string;
  content: string;
  options: string[];
  answer: string;
  explanation: string;
}

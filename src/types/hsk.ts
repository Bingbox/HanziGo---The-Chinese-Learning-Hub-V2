export interface Question {
  id: string;
  level: number;
  type: 'multiple-choice' | 'reading' | 'listening';
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface Exam {
  level: number;
  questions: Question[];
}

export interface ExamResult {
  id: string;
  level: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
}

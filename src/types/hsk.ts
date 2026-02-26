export enum QuestionType {
  SingleChoice = 'SingleChoice',
  MultipleSelect = 'MultipleSelect',
  TrueFalse = 'TrueFalse',
  FillInTheBlank = 'FillInTheBlank',
  ShortAnswer = 'ShortAnswer',
  Analysis = 'Analysis',
}

export interface BaseQuestion {
  id: string;
  level: number;
  question: Record<string, string>; // 支持多语言
  score: number; // 每道题的分数
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: QuestionType.SingleChoice;
  options: Record<string, string[]>; // 支持多语言
  correctAnswer: string | Record<string, string>; // 单个正确选项的值，支持多语言
}

export interface MultipleSelectQuestion extends BaseQuestion {
  type: QuestionType.MultipleSelect;
  options: Record<string, string[]>; // 支持多语言
  correctAnswers: string[] | Record<string, string[]>; // 多个正确选项的值数组，支持多语言
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: QuestionType.TrueFalse;
  correctAnswer: boolean; // true 或 false
}

export interface FillInTheBlankQuestion extends BaseQuestion {
  type: QuestionType.FillInTheBlank;
  blanks: Record<string, string[]>; // 支持多语言
  correctAnswers: string[]; // 对应每个空的正确答案数组
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: QuestionType.ShortAnswer;
  referenceAnswer: Record<string, string>; // 参考答案，支持多语言
}

export interface AnalysisQuestion extends BaseQuestion {
  type: QuestionType.Analysis;
  referenceAnswer: Record<string, string>; // 参考答案，支持多语言
  scoringCriteria?: Record<string, string>; // 评分标准，支持多语言
}

export type Question = SingleChoiceQuestion
  | MultipleSelectQuestion
  | TrueFalseQuestion
  | FillInTheBlankQuestion
  | ShortAnswerQuestion
  | AnalysisQuestion;

export interface Exam {
  level: number;
  questions: Question[];
  totalScore: number; // 考试总分
}

export interface ExamResult {
  id: string;
  level: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
  answers: { questionId: string; userAnswer: string | string[] | boolean }[]; // 存储用户答案
}


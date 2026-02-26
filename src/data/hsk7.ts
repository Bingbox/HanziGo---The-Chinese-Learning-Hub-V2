import { Question, QuestionType } from '../types/hsk';

export const hsk7Questions: Question[] = [
  {
    id: 'hsk7-sc-1',
    level: 7,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“量子力学”是什么意思？',
      en: 'What does "量子力学" mean?',
      ko: '"量子力학"은 무슨 뜻입니까?',
    },
    options: {
      zh: ['Quantum mechanics', 'Classical mechanics', 'Thermodynamics', 'Electromagnetism'],
      en: ['Quantum mechanics', 'Classical mechanics', 'Thermodynamics', 'Electromagnetism'],
      ko: ['양자 역학', '고전 역학', '열역학', '전자기학'],
    },
    correctAnswer: 'Quantum mechanics',
    score: 10,
  },
];

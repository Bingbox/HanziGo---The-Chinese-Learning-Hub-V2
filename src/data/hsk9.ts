import { Question, QuestionType } from '../types/hsk';

export const hsk9Questions: Question[] = [
  {
    id: 'hsk9-sc-1',
    level: 9,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“意识形态”是什么意思？',
      en: 'What does "意识形态" mean?',
      ko: '"이데올로기"는 무슨 뜻입니까?',
    },
    options: {
      zh: ['Ideology', 'Philosophy', 'Sociology', 'Politics'],
      en: ['Ideology', 'Philosophy', 'Sociology', 'Politics'],
      ko: ['이데올로기', '철학', '사회학', '정치'],
    },
    correctAnswer: 'Ideology',
    score: 10,
  },
];

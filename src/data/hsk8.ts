import { Question, QuestionType } from '../types/hsk';

export const hsk8Questions: Question[] = [
  {
    id: 'hsk8-sc-1',
    level: 8,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“人工智能”是什么意思？',
      en: 'What does "人工智能" mean?',
      ko: '"인공지능"은 무슨 뜻입니까?',
    },
    options: {
      zh: ['Artificial intelligence', 'Machine learning', 'Deep learning', 'Big data'],
      en: ['Artificial intelligence', 'Machine learning', 'Deep learning', 'Big data'],
      ko: ['인공지능', '기계 학습', '딥 러닝', '빅 데이터'],
    },
    correctAnswer: 'Artificial intelligence',
    score: 10,
  },
];

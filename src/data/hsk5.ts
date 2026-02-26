import { Question, QuestionType } from '../types/hsk';

export const hsk5Questions: Question[] = [
  {
    id: 'hsk5-sc-1',
    level: 5,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“经济全球化”是什么意思？',
      en: 'What does "经济全球化" mean?',
      ko: '"经济全球化"은 무슨 뜻입니까?',
    },
    options: {
      zh: ['Economic globalization', 'Cultural diversity', 'Political stability', 'Technological innovation'],
      en: ['Economic globalization', 'Cultural diversity', 'Political stability', 'Technological innovation'],
      ko: ['경제 세계화', '문화 다양성', '정치적 안정', '기술 혁신'],
    },
    correctAnswer: 'Economic globalization',
    score: 5,
  },
  {
    id: 'hsk5-an-1',
    level: 5,
    type: QuestionType.Analysis,
    question: {
      zh: '请分析“只有……才……”和“无论……都……”的用法。',
      en: 'Please analyze the usage of "只有……才……" and "无论……都……".',
      ko: '"只有……才……"와 "无论……都……"의 용법을 분석하세요.',
    },
    referenceAnswer: {
      zh: '“只有……才……”表示必要条件；“无论……都……”表示无条件。',
      en: '"只有……才……" (zhǐyǒu...cái...) indicates a necessary condition; "无论……都……" (wúlùn...dōu...) indicates no condition.',
      ko: '"只有……才……"는 필요 조건을 나타내고, "无论……都……"는 무조건을 나타냅니다.',
    },
    scoringCriteria: {
      zh: '准确区分必要条件与无条件即可得分。',
      en: 'Correctly distinguish between necessary condition and no condition to get points.',
      ko: '필요 조건과 무조건을 정확하게 구분하면 점수를 얻을 수 있습니다.',
    },
    score: 25,
  },
];

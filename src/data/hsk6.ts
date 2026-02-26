import { Question, QuestionType } from '../types/hsk';

export const hsk6Questions: Question[] = [
  {
    id: 'hsk6-sc-1',
    level: 6,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“可持续发展”是什么意思？',
      en: 'What does "可持续发展" mean?',
      ko: '"可持续发展"은 무슨 뜻입니까?',
    },
    options: {
      zh: ['Sustainable development', 'Economic growth', 'Environmental protection', 'Social progress'],
      en: ['Sustainable development', 'Economic growth', 'Environmental protection', 'Social progress'],
      ko: ['지속 가능한 발전', '경제 성장', '환경 보호', '사회적 진보'],
    },
    correctAnswer: 'Sustainable development',
    score: 5,
  },
  {
    id: 'hsk6-an-1',
    level: 6,
    type: QuestionType.Analysis,
    question: {
      zh: '请分析“既然……就……”和“宁可……也不……”的用法。',
      en: 'Please analyze the usage of "既然……就……" and "宁可……也不……".',
      ko: '"既然……就……"와 "宁可……也不……"의 용법을 분석하세요.',
    },
    referenceAnswer: {
      zh: '“既然……就……”表示因果关系；“宁可……也不……”表示两害相权取其轻。',
      en: '"既然……就……" (jìrán...jiù...) indicates a causal relationship; "宁可……也不……" (nìngkě...yěbù...) indicates choosing the lesser of two evils.',
      ko: '"既然……就……"는 인과 관계를 나타내고, "宁可……也不……"는 두 가지 해로운 것 중 덜한 것을 선택함을 나타냅니다.',
    },
    scoringCriteria: {
      zh: '准确区分因果关系与选择关系即可得分。',
      en: 'Correctly distinguish between causal and choice relationships to get points.',
      ko: '인과 관계와 선택 관계를 정확하게 구분하면 점수를 얻을 수 있습니다.',
    },
    score: 30,
  },
];

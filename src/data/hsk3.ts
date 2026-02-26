import { Question, QuestionType } from '../types/hsk';

export const hsk3Questions: Question[] = [
  {
    id: 'hsk3-sc-1',
    level: 3,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“周末你有什么打算？”是什么意思？',
      en: 'What does "周末你有什么打算？" mean?',
      ko: '"周末你有什么打算？"은 무슨 뜻입니까?',
    },
    options: {
      zh: [
        'What are your plans for the weekend?',
        'How was your weekend?',
        'Do you like weekends?',
        'What did you do last weekend?'
      ],
      en: [
        'What are your plans for the weekend?',
        'How was your weekend?',
        'Do you like weekends?',
        'What did you do last weekend?'
      ],
      ko: [
        '주말에 무슨 계획이 있어요?',
        '주말 어땠어요?',
        '주말을 좋아해요?',
        '지난 주말에 뭐 했어요?'
      ],
    },
    correctAnswer: {
      zh: 'What are your plans for the weekend?',
      en: 'What are your plans for the weekend?',
      ko: '주말에 무슨 계획이 있어요?',
    },
    score: 5,
  },
  {
    id: 'hsk3-an-1',
    level: 3,
    type: QuestionType.Analysis,
    question: {
      zh: '请分析“可以”和“能”在汉语中的区别。',
      en: 'Please analyze the difference between "可以" and "能" in Chinese.',
      ko: '중국어에서 "可以"와 "能"의 차이점을 분석하세요.',
    },
    referenceAnswer: {
      zh: '“可以”表示允许或许可；“能”表示能力或客观条件允许。',
      en: '"可以" (kěyǐ) indicates permission; "能" (néng) indicates ability or objective possibility.',
      ko: '"可以"는 허락이나 허가를 나타내고, "能"은 능력이나 객관적인 조건이 허락됨을 나타냅니다.',
    },
    scoringCriteria: {
      zh: '区分许可与能力即可得分。',
      en: 'Distinguish between permission and ability to get points.',
      ko: '허가와 능력을 구분하면 점수를 얻을 수 있습니다.',
    },
    score: 15,
  },
];

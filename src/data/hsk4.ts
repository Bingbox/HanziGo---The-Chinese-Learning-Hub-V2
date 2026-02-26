import { Question, QuestionType } from '../types/hsk';

export const hsk4Questions: Question[] = [
  {
    id: 'hsk4-sc-1',
    level: 4,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“环境保护”是什么意思？',
      en: 'What does "环境保护" mean?',
      ko: '"环境保护"은 무슨 뜻입니까?',
    },
    options: {
      zh: ['Environmental protection', 'Economic development', 'Social harmony', 'Cultural exchange'],
      en: ['Environmental protection', 'Economic development', 'Social harmony', 'Cultural exchange'],
      ko: ['환경 보호', '경제 발전', '사회 화합', '문화 교류'],
    },
    correctAnswer: 'Environmental protection',
    score: 5,
  },
  {
    id: 'hsk4-an-1',
    level: 4,
    type: QuestionType.Analysis,
    question: {
      zh: '请分析“把”字句的语法结构和使用场景。',
      en: 'Please analyze the grammatical structure and usage scenarios of the "把" sentence.',
      ko: '"把"자문의 문법 구조와 사용 상황을 분석하세요.',
    },
    referenceAnswer: {
      zh: '结构为“主语 + 把 + 宾语 + 动词 + 其他成分”，用于强调动作对宾语的处理结果。',
      en: 'The structure is "Subject + 把 + Object + Verb + Other components", used to emphasize the result of the action on the object.',
      ko: '구조는 "주어 + 把 + 목적어 + 동사 + 기타 성분"이며, 동작이 목적어에 미치는 처리 결과를 강조하는 데 사용됩니다.',
    },
    scoringCriteria: {
      zh: '正确描述结构和强调点即可得分。',
      en: 'Correctly describe the structure and emphasis point to get points.',
      ko: '구조와 강조점을 정확하게 설명하면 점수를 얻을 수 있습니다.',
    },
    score: 20,
  },
];

import { Question, QuestionType } from '../types/hsk';

export const hsk2Questions: Question[] = [
  {
    id: 'hsk2-sc-1',
    level: 2,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“猫”的拼音是？',
      en: 'What is the pinyin for "猫" (cat)?',
      ko: '"猫"(고양이)의 병음은 무엇입니까?',
    },
    options: {
      zh: ['māo', 'gǒu', 'niǎo', 'yú'],
      en: ['māo', 'gǒu', 'niǎo', 'yú'],
      ko: ['māo', 'gǒu', 'niǎo', 'yú'],
    },
    correctAnswer: 'māo',
    score: 5,
  },
  {
    id: 'hsk2-ms-1',
    level: 2,
    type: QuestionType.MultipleSelect,
    question: {
      zh: '以下哪些是交通工具？',
      en: 'Which of the following are means of transportation?',
      ko: '다음 중 교통수단은 무엇입니까?',
    },
    options: {
      zh: ['汽车', '飞机', '桌子', '椅子'],
      en: ['汽车', '飞机', '桌子', '椅子'],
      ko: ['汽车', '飞机', '桌子', '椅子'],
    },
    correctAnswers: ['汽车', '飞机'],
    score: 10,
  },
  {
    id: 'hsk2-tf-1',
    level: 2,
    type: QuestionType.TrueFalse,
    question: {
      zh: '“很高兴认识你”的意思是“Nice to meet you”。',
      en: '"很高兴认识你" means "Nice to meet you".',
      ko: '"很高兴认识你"는 "만나서 반가워요"라는 뜻입니다.',
    },
    correctAnswer: true,
    score: 5,
  },
  {
    id: 'hsk2-fb-1',
    level: 2,
    type: QuestionType.FillInTheBlank,
    question: {
      zh: '我喜欢___书。',
      en: 'I like ___ books.',
      ko: '나는 책 ___ 것을 좋아한다.',
    },
    blanks: {
      zh: ['___'],
      en: ['___'],
      ko: ['___'],
    },
    correctAnswers: ['看'],
    score: 5,
  },
  {
    id: 'hsk2-sa-1',
    level: 2,
    type: QuestionType.ShortAnswer,
    question: {
      zh: '请用汉语写出“I love China”。',
      en: 'Please write "I love China" in Chinese.',
      ko: '"I love China"를 중국어로 쓰세요.',
    },
    referenceAnswer: {
      zh: '我爱中国',
      en: '我爱中国 (Wǒ ài Zhōngguó)',
      ko: '我爱中国 (Wǒ ài Zhōngguó)',
    },
    score: 10,
  },
  {
    id: 'hsk2-an-1',
    level: 2,
    type: QuestionType.Analysis,
    question: {
      zh: '请分析“去”和“来”在语境上的区别。',
      en: 'Please analyze the difference between "去" and "来" in context.',
      ko: '문맥에서 "去"와 "来"의 차이점을 분석하세요.',
    },
    referenceAnswer: {
      zh: '“去”表示从说话人所在地到别处；“来”表示从别处到说话人所在地。',
      en: '"去" (qù) means going from the speaker\'s location to another place; "来" (lái) means coming from another place to the speaker\'s location.',
      ko: '"去"는 말하는 사람이 있는 곳에서 다른 곳으로 가는 것을 의미하고, "来"는 다른 곳에서 말하는 사람이 있는 곳으로 오는 것을 의미합니다.',
    },
    scoringCriteria: {
      zh: '准确区分方向性即可得分。',
      en: 'Correctly distinguish the directionality to get points.',
      ko: '방향성을 정확하게 구분하면 점수를 얻을 수 있습니다.',
    },
    score: 15,
  },
];

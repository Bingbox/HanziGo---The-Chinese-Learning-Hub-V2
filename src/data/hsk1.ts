import { Question, QuestionType } from '../types/hsk';

export const hsk1Questions: Question[] = [
  // 单选题 (Single Choice)
  {
    id: 'hsk1-sc-1',
    level: 1,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“你好”的拼音是？',
      en: 'What is the pinyin for "你好"?',
      ko: '"你好"의 병음은 무엇입니까?',
    },
    options: {
      zh: ['nǐ hǎo', 'ní hǎo', 'nǐ hǎo ma', 'nǐ hǎo ne'],
      en: ['nǐ hǎo', 'ní hǎo', 'nǐ hǎo ma', 'nǐ hǎo ne'],
      ko: ['nǐ hǎo', 'ní hǎo', 'nǐ hǎo ma', 'nǐ hǎo ne'],
    },
    correctAnswer: 'nǐ hǎo',
    score: 5,
  },
  {
    id: 'hsk1-sc-2',
    level: 1,
    type: QuestionType.SingleChoice,
    question: {
      zh: '“谢谢”的拼音是？',
      en: 'What is the pinyin for "谢谢"?',
      ko: '"谢谢"의 병음은 무엇입니까?',
    },
    options: {
      zh: ['xièxie', 'zàijiàn', 'bùkèqi', 'méiguānxī'],
      en: ['xièxie', 'zàijiàn', 'bùkèqi', 'méiguānxī'],
      ko: ['xièxie', 'zàijiàn', 'bùkèqi', 'méiguānxī'],
    },
    correctAnswer: 'xièxie',
    score: 5,
  },
  // 多选题 (Multiple Select)
  {
    id: 'hsk1-ms-1',
    level: 1,
    type: QuestionType.MultipleSelect,
    question: {
      zh: '以下哪些词语是表示“吃”的动作？',
      en: 'Which of the following words represent the action of "eating"?',
      ko: '다음 중 "먹다"라는 동작을 나타내는 단어는 무엇입니까?',
    },
    options: {
      zh: ['喝 (hē)', '吃 (chī)', '看 (kàn)', '说 (shuō)'],
      en: ['喝 (hē)', '吃 (chī)', '看 (kàn)', '说 (shuō)'],
      ko: ['喝 (hē)', '吃 (chī)', '看 (kàn)', '说 (shuō)'],
    },
    correctAnswers: ['吃 (chī)'],
    score: 5,
  },
  // 判断题 (True/False)
  {
    id: 'hsk1-tf-1',
    level: 1,
    type: QuestionType.TrueFalse,
    question: {
      zh: '“是”的意思是“yes”。',
      en: '"是" means "yes".',
      ko: '"是"는 "yes"라는 뜻입니다.',
    },
    correctAnswer: true,
    score: 5,
  },
  // 填空题 (Fill in the Blank)
  {
    id: 'hsk1-fb-1',
    level: 1,
    type: QuestionType.FillInTheBlank,
    question: {
      zh: '我爱___。',
      en: 'I love ___.',
      ko: '나는 ___를 사랑한다.',
    },
    blanks: {
      zh: ['___'],
      en: ['___'],
      ko: ['___'],
    },
    correctAnswers: ['你'],
    score: 5,
  },
  // 简答题 (Short Answer)
  {
    id: 'hsk1-sa-1',
    level: 1,
    type: QuestionType.ShortAnswer,
    question: {
      zh: '请用汉语写出“Thank you”。',
      en: 'Please write "Thank you" in Chinese.',
      ko: '"Thank you"를 중국어로 쓰세요.',
    },
    referenceAnswer: {
      zh: '谢谢',
      en: '谢谢 (xièxie)',
      ko: '谢谢 (xièxie)',
    },
    score: 10,
  },
  // 分析题 (Analysis)
  {
    id: 'hsk1-an-1',
    level: 1,
    type: QuestionType.Analysis,
    question: {
      zh: '请解释“你好”的含义和使用场景。',
      en: 'Please explain the meaning and usage scenarios of "你好".',
      ko: '"你好"의 의미와 사용 상황을 설명하세요.',
    },
    referenceAnswer: {
      zh: '“你好”是汉语中最常见的问候语，意为“Hello”。通常用于两个人见面时打招呼。',
      en: '"你好" (nǐ hǎo) is the most common greeting in Chinese, meaning "Hello". It is usually used to greet people when meeting.',
      ko: '"你好"는 중국어에서 가장 흔한 인사말로 "안녕하세요"라는 뜻입니다. 보통 두 사람이 만났을 때 인사하는 데 사용됩니다.',
    },
    scoringCriteria: {
      zh: '解释含义和使用场景，表达清晰即可得分。',
      en: 'Explain the meaning and usage scenarios clearly to get points.',
      ko: '의미와 사용 상황을 명확하게 설명하면 점수를 얻을 수 있습니다.',
    },
    score: 15,
  },
];

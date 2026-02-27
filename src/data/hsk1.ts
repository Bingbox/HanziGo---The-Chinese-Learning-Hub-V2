import { Question, QuestionType } from '../types/hsk';

export const hsk1Questions: Question[] = [
  // 听力模拟 (Listening Simulation) - True/False
  {
    id: 'hsk1-l1-1',
    level: 1,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与图片是否一致：\n录音：坐 出租车 (zuò chūzūchē)\n图片：🚴‍♂️ (骑自行车)',
      en: '[Listening Simulation] True or False:\nAudio: 坐 出租车 (zuò chūzūchē)\nPicture: 🚴‍♂️ (Riding a bike)',
      ko: '[듣기 시뮬레이션] 녹음과 사진이 일치하는지 판단하세요:\n녹음: 坐 出租车 (zuò chūzūchē)\n사진: 🚴‍♂️ (자전거 타기)',
    },
    correctAnswer: false,
    score: 10,
  },
  {
    id: 'hsk1-l1-2',
    level: 1,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与图片是否一致：\n录音：喝 水 (hē shuǐ)\n图片：🥛 (喝水)',
      en: '[Listening Simulation] True or False:\nAudio: 喝 水 (hē shuǐ)\nPicture: 🥛 (Drinking water)',
      ko: '[듣기 시뮬레이션] 녹음과 사진이 일치하는지 판단하세요:\n녹음: 喝 水 (hē shuǐ)\n사진: 🥛 (물 마시기)',
    },
    correctAnswer: true,
    score: 10,
  },
  // 听力模拟 (Listening Simulation) - Single Choice
  {
    id: 'hsk1-l3-1',
    level: 1,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n男：这个椅子多少钱？ (Zhège yǐzi duōshao qián?)\n女：七十块。 (Qīshí kuài.)\n问：椅子多少钱？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nMale: 这个椅子多少钱？ (Zhège yǐzi duōshao qián?)\nFemale: 七十块。 (Qīshí kuài.)\nQuestion: How much is the chair?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n남: 这个椅子多少钱？ (Zhège yǐzi duōshao qián?)\n여: 七十块。 (Qīshí kuài.)\n질문: 의자는 얼마입니까?',
    },
    options: {
      zh: ['A. 17块 (17 kuài)', 'B. 70块 (70 kuài)', 'C. 7块 (7 kuài)'],
      en: ['A. 17块 (17 kuài)', 'B. 70块 (70 kuài)', 'C. 7块 (7 kuài)'],
      ko: ['A. 17块 (17 kuài)', 'B. 70块 (70 kuài)', 'C. 7块 (7 kuài)'],
    },
    correctAnswer: {
      zh: 'B. 70块 (70 kuài)',
      en: 'B. 70块 (70 kuài)',
      ko: 'B. 70块 (70 kuài)',
    },
    score: 10,
  },
  {
    id: 'hsk1-l4-1',
    level: 1,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n女：下午我去商店，我想买一些水果。 (Xiàwǔ wǒ qù shāngdiàn, wǒ xiǎng mǎi yìxiē shuǐguǒ.)\n问：她下午去哪里？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nFemale: 下午我去商店，我想买一些水果。 (Xiàwǔ wǒ qù shāngdiàn, wǒ xiǎng mǎi yìxiē shuǐguǒ.)\nQuestion: Where is she going in the afternoon?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n여: 下午我去商店，我想买一些水果。 (Xiàwǔ wǒ qù shāngdiàn, wǒ xiǎng mǎi yìxiē shuǐguǒ.)\n질문: 그녀는 오후에 어디에 갑니까?',
    },
    options: {
      zh: ['A. 商店 (shāngdiàn)', 'B. 医院 (yīyuàn)', 'C. 学校 (xuéxiào)'],
      en: ['A. 商店 (shāngdiàn)', 'B. 医院 (yīyuàn)', 'C. 学校 (xuéxiào)'],
      ko: ['A. 商店 (shāngdiàn)', 'B. 医院 (yīyuàn)', 'C. 学校 (xuéxiào)'],
    },
    correctAnswer: 'A. 商店 (shāngdiàn)',
    score: 10,
  },
  // 阅读 (Reading) - Single Choice
  {
    id: 'hsk1-r1-1',
    level: 1,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 选择与词语意思一致的图片：\n电视 (diànshì)',
      en: '[Reading] Choose the picture that matches the word:\n电视 (diànshì)',
      ko: '[읽기] 단어의 의미와 일치하는 사진을 고르세요:\n电视 (diànshì)',
    },
    options: {
      zh: ['A. 📺', 'B. ✈️', 'C. 🍎'],
      en: ['A. 📺', 'B. ✈️', 'C. 🍎'],
      ko: ['A. 📺', 'B. ✈️', 'C. 🍎'],
    },
    correctAnswer: 'A. 📺',
    score: 10,
  },
  {
    id: 'hsk1-r2-1',
    level: 1,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 选择与句子意思一致的图片：\n他在睡觉呢。 (Tā zài shuìjiào ne.)',
      en: '[Reading] Choose the picture that matches the sentence:\n他在睡觉呢。 (Tā zài shuìjiào ne.)',
      ko: '[읽기] 문장의 의미와 일치하는 사진을 고르세요:\n他在睡觉呢。 (Tā zài shuìjiào ne.)',
    },
    options: {
      zh: ['A. 🏃‍♂️', 'B. 😴', 'C. 📖'],
      en: ['A. 🏃‍♂️', 'B. 😴', 'C. 📖'],
      ko: ['A. 🏃‍♂️', 'B. 😴', 'C. 📖'],
    },
    correctAnswer: 'B. 😴',
    score: 10,
  },
  {
    id: 'hsk1-r3-1',
    level: 1,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 为下面的句子选择正确的回答：\n你怎么去那个饭店？ (Nǐ zěnme qù nàge fàndiàn?)',
      en: '[Reading] Choose the correct response for the following sentence:\n你怎么去那个饭店？ (Nǐ zěnme qù nàge fàndiàn?)',
      ko: '[읽기] 다음 문장에 대한 올바른 대답을 고르세요:\n你怎么去那个饭店？ (Nǐ zěnme qù nàge fàndiàn?)',
    },
    options: {
      zh: ['A. 7点了。 (7 diǎn le.)', 'B. 坐出租车。 (Zuò chūzūchē.)', 'C. 苹果。 (Píngguǒ.)'],
      en: ['A. 7点了。 (7 diǎn le.)', 'B. 坐出租车。 (Zuò chūzūchē.)', 'C. 苹果。 (Píngguǒ.)'],
      ko: ['A. 7点了。 (7 diǎn le.)', 'B. 坐出租车。 (Zuò chūzūchē.)', 'C. 苹果。 (Píngguǒ.)'],
    },
    correctAnswer: 'B. 坐出租车。 (Zuò chūzūchē.)',
    score: 10,
  },
  // 阅读 (Reading) - Fill in the Blank
  {
    id: 'hsk1-r4-1',
    level: 1,
    type: QuestionType.FillInTheBlank,
    question: {
      zh: '[阅读] 选择合适的词语填空：\n喂，张先生在（ ___ ）吗？\n\n备选词语：\nA. 家 (jiā)\nB. 名字 (míngzi)\nC. 学习 (xuéxí)',
      en: '[Reading] Choose the appropriate word to fill in the blank:\n喂，张先生在（ ___ ）吗？\n\nOptions:\nA. 家 (jiā)\nB. 名字 (míngzi)\nC. 学习 (xuéxí)',
      ko: '[읽기] 빈칸에 알맞은 단어를 고르세요:\n喂，张先生在（ ___ ）吗？\n\n보기:\nA. 家 (jiā)\nB. 名字 (míngzi)\nC. 学习 (xuéxí)',
    },
    blanks: {
      zh: ['___'],
      en: ['___'],
      ko: ['___'],
    },
    correctAnswers: ['A'],
    score: 15,
  },
  {
    id: 'hsk1-r4-2',
    level: 1,
    type: QuestionType.FillInTheBlank,
    question: {
      zh: '[阅读] 选择合适的词语填空：\n我7点30分去（ ___ ），10点前回来。\n\n备选词语：\nA. 对不起 (duìbuqǐ)\nB. 看见 (kànjiàn)\nC. 火车站 (huǒchēzhàn)',
      en: '[Reading] Choose the appropriate word to fill in the blank:\n我7点30分去（ ___ ），10点前回来。\n\nOptions:\nA. 对不起 (duìbuqǐ)\nB. 看见 (kànjiàn)\nC. 火车站 (huǒchēzhàn)',
      ko: '[읽기] 빈칸에 알맞은 단어를 고르세요:\n我7点30分去（ ___ ），10点前回来。\n\n보기:\nA. 对不起 (duìbuqǐ)\nB. 看见 (kànjiàn)\nC. 火车站 (huǒchēzhàn)',
    },
    blanks: {
      zh: ['___'],
      en: ['___'],
      ko: ['___'],
    },
    correctAnswers: ['C'],
    score: 15,
  },
];


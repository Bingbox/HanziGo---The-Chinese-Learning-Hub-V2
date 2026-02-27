import { Question, QuestionType } from '../types/hsk';

export const hsk2Questions: Question[] = [
  // 听力模拟 (Listening Simulation) - True/False
  {
    id: 'hsk2-l1-1',
    level: 2,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与图片是否一致：\n录音：他正在打电话呢。 (Tā zhèngzài dǎ diànhuà ne.)\n图片：📱 (打电话)',
      en: '[Listening Simulation] True or False:\nAudio: 他正在打电话呢。 (Tā zhèngzài dǎ diànhuà ne.)\nPicture: 📱 (Making a phone call)',
      ko: '[듣기 시뮬레이션] 녹음과 사진이 일치하는지 판단하세요:\n녹음: 他正在打电话呢。 (Tā zhèngzài dǎ diànhuà ne.)\n사진: 📱 (전화 통화 중)',
      ja: '[リスニング模擬] 音声と写真が一致しているか判断してください：\n音声：他正在打电话呢。 (Tā zhèngzài dǎ diànhuà ne.)\n写真：📱 (電話をかける)',
    },
    correctAnswer: true,
    score: 10,
  },
  {
    id: 'hsk2-l1-2',
    level: 2,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与图片是否一致：\n录音：上午我买了一些鸡蛋。 (Shàngwǔ wǒ mǎile yìxiē jīdàn.)\n图片：🍎 (苹果)',
      en: '[Listening Simulation] True or False:\nAudio: 上午我买了一些鸡蛋。 (Shàngwǔ wǒ mǎile yìxiē jīdàn.)\nPicture: 🍎 (Apple)',
      ko: '[듣기 시뮬레이션] 녹음과 사진이 일치하는지 판단하세요:\n녹음: 上午我买了一些鸡蛋。 (Shàngwǔ wǒ mǎile yìxiē jīdàn.)\n사진: 🍎 (사과)',
      ja: '[リスニング模擬] 音声と写真が一致しているか判断してください：\n音声：上午我买了一些鸡蛋。 (Shàngwǔ wǒ mǎile yìxiē jīdàn.)\n写真：🍎 (リンゴ)',
    },
    correctAnswer: false,
    score: 10,
  },
  {
    id: 'hsk2-l1-3',
    level: 2,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与图片是否一致：\n录音：他正在跑步呢。 (Tā zhèngzài pǎobù ne.)\n图片：🏃‍♂️ (跑步)',
      en: '[Listening Simulation] True or False:\nAudio: 他正在跑步呢。 (Tā zhèngzài pǎobù ne.)\nPicture: 🏃‍♂️ (Running)',
      ko: '[듣기 시뮬레이션] 녹음과 사진이 일치하는지 판단하세요:\n녹음: 他正在跑步呢。 (Tā zhèngzài pǎobù ne.)\n사진: 🏃‍♂️ (달리기 중)',
      ja: '[リスニング模擬] 音声と写真が一致しているか判断してください：\n音声：他正在跑步呢。 (Tā zhèngzài pǎobù ne.)\n写真：🏃‍♂️ (走る)',
    },
    correctAnswer: true,
    score: 10,
  },
  {
    id: 'hsk2-l1-4',
    level: 2,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与图片是否一致：\n录音：外边下雨了。 (Wàibian xiàyǔ le.)\n图片：☀️ (晴天)',
      en: '[Listening Simulation] True or False:\nAudio: 外边下雨了。 (Wàibian xiàyǔ le.)\nPicture: ☀️ (Sunny)',
      ko: '[듣기 시뮬레이션] 녹음과 사진이 일치하는지 판단하세요:\n녹음: 外边下雨了。 (Wàibian xiàyǔ le.)\n사진: ☀️ (맑음)',
      ja: '[リスニング模擬] 音声と写真が一致しているか判断してください：\n音声：外边下雨了。 (Wàibian xiàyǔ le.)\n写真：☀️ (晴れ)',
    },
    correctAnswer: false,
    score: 10,
  },
  // 听力模拟 (Listening Simulation) - Single Choice
  {
    id: 'hsk2-l2-1',
    level: 2,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n男：你喜欢什么运动？ (Nǐ xǐhuan shénme yùndòng?)\n女：我最喜欢踢足球。 (Wǒ zuì xǐhuan tī zúqiú.)\n问：女的最喜欢什么运动？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nMale: 你喜欢什么运动？ (Nǐ xǐhuan shénme yùndòng?)\nFemale: 我最喜欢踢足球。 (Wǒ zuì xǐhuan tī zúqiú.)\nQuestion: What sport does the female like most?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n남: 你喜欢什么运动？ (Nǐ xǐhuan shénme yùndòng?)\n여: 我最喜欢踢足球。 (Wǒ zuì xǐhuan tī zúqiú.)\n질문: 여자가 가장 좋아하는 운동은 무엇입니까?',
      ja: '[リスニング模擬] 会話を聞いて、正しい答えを選んでください：\n男：你喜欢什么运动？ (Nǐ xǐhuan shénme yùndòng?)\n女：我最喜欢踢足球。 (Wǒ zuì xǐhuan tī zúqiú.)\n質問：女的最喜欢什么运动？',
    },
    options: {
      zh: ['A. 跑步 (pǎobù)', 'B. 游泳 (yóuyǒng)', 'C. 踢足球 (tī zúqiú)'],
      en: ['A. 跑步 (pǎobù)', 'B. 游泳 (yóuyǒng)', 'C. 踢足球 (tī zúqiú)'],
      ko: ['A. 跑步 (pǎobù)', 'B. 游泳 (yóuyǒng)', 'C. 踢足球 (tī zúqiú)'],
      ja: ['A. 跑步 (pǎobù)', 'B. 游泳 (yóuyǒng)', 'C. 踢足球 (tī zúqiú)'],
    },
    correctAnswer: 'C. 踢足球 (tī zúqiú)',
    score: 10,
  },
  {
    id: 'hsk2-l3-1',
    level: 2,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n女：下星期我们要去上海旅游，你去吗？ (Xià xīngqī wǒmen yào qù Shànghǎi lǚyóu, nǐ qù ma?)\n男：太好了！我也去。 (Tài hǎo le! Wǒ yě qù.)\n问：男的是什么意思？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nFemale: 下星期我们要去上海旅游，你去吗？ (Xià xīngqī wǒmen yào qù Shànghǎi lǚyóu, nǐ qù ma?)\nMale: 太好了！我也去。 (Tài hǎo le! Wǒ yě qù.)\nQuestion: What does the male mean?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n여: 下星期我们要去上海旅游，你去吗？ (Xià xīngqī wǒmen yào qù Shànghǎi lǚyóu, nǐ qù ma?)\n남: 太好了！我也去。 (Tài hǎo le! Wǒ yě qù.)\n질문: 남자의 말은 무슨 뜻입니까?',
    },
    options: {
      zh: ['A. 他也去 (Tā yě qù)', 'B. 他不去 (Tā bú qù)', 'C. 他去过了 (Tā qùguo le)'],
      en: ['A. 他也去 (Tā yě qù)', 'B. 他不去 (Tā bú qù)', 'C. 他去过了 (Tā qùguo le)'],
      ko: ['A. 他也去 (Tā yě qù)', 'B. 他不去 (Tā bú qù)', 'C. 他去过了 (Tā qùguo le)'],
      ja: ['A. 他也去 (Tā yě qù)', 'B. 他不去 (Tā bú qù)', 'C. 他去过了 (Tā qùguo le)'],
    },
    correctAnswer: {
      zh: 'A. 他也去 (Tā yě qù)',
      en: 'A. 他也去 (Tā yě qù)',
      ko: 'A. 他也去 (Tā yě qù)',
      ja: 'A. 他也去 (Tā yě qù)',
    },
    score: 10,
  },
  // 阅读 (Reading) - Single Choice
  {
    id: 'hsk2-r1-1',
    level: 2,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 选择与句子意思一致的图片：\n每个星期六，我都去打篮球。 (Měi ge xīngqīliù, wǒ dōu qù dǎ lánqiú.)',
      en: '[Reading] Choose the picture that matches the sentence:\n每个星期六，我都去打篮球。 (Měi ge xīngqīliù, wǒ dōu qù dǎ lánqiú.)',
      ko: '[읽기] 문장의 의미와 일치하는 사진을 고르세요:\n每个星期六，我都去打篮球。 (Měi ge xīngqīliù, wǒ dōu qù dǎ lánqiú.)',
      ja: '[リーディング] 文の意味と一致する写真を選んでください：\n每个星期六，我都去打篮球。 (Měi ge xīngqīliù, wǒ dōu qù dǎ lánqiú.)',
    },
    options: {
      zh: ['A. ⚽', 'B. 🏀', 'C. 🎾'],
      en: ['A. ⚽', 'B. 🏀', 'C. 🎾'],
      ko: ['A. ⚽', 'B. 🏀', 'C. 🎾'],
      ja: ['A. ⚽', 'B. 🏀', 'C. 🎾'],
    },
    correctAnswer: 'B. 🏀',
    score: 10,
  },
  {
    id: 'hsk2-r1-2',
    level: 2,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 选择与句子意思一致的图片：\n我喜欢喝咖啡。 (Wǒ xǐhuan hē kāfēi.)',
      en: '[Reading] Choose the picture that matches the sentence:\n我喜欢喝咖啡。 (Wǒ xǐhuan hē kāfēi.)',
      ko: '[읽기] 문장의 의미와 일치하는 사진을 고르세요:\n我喜欢喝咖啡。 (Wǒ xǐhuan hē kāfēi.)',
      ja: '[リーディング] 文の意味と一致する写真を選んでください：\n我喜欢喝咖啡。 (Wǒ xǐhuan hē kāfēi.)',
    },
    options: {
      zh: ['A. ☕', 'B. 🍵', 'C. 🥛'],
      en: ['A. ☕', 'B. 🍵', 'C. 🥛'],
      ko: ['A. ☕', 'B. 🍵', 'C. 🥛'],
      ja: ['A. ☕', 'B. 🍵', 'C. 🥛'],
    },
    correctAnswer: 'A. ☕',
    score: 10,
  },
  {
    id: 'hsk2-r1-3',
    level: 2,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 选择与句子意思一致的图片：\n他在看报纸呢。 (Tā zài kàn bàozhǐ ne.)',
      en: '[Reading] Choose the picture that matches the sentence:\n他在看报纸呢。 (Tā zài kàn bàozhǐ ne.)',
      ko: '[읽기] 문장의 의미와 일치하는 사진을 고르세요:\n他在看报纸呢。 (Tā zài kàn bàozhǐ ne.)',
      ja: '[リーディング] 文の意味と一致する写真を選んでください：\n他在看报纸呢。 (Tā zài kàn bàozhǐ ne.)',
    },
    options: {
      zh: ['A. 📖', 'B. 📰', 'C. 💻'],
      en: ['A. 📖', 'B. 📰', 'C. 💻'],
      ko: ['A. 📖', 'B. 📰', 'C. 💻'],
      ja: ['A. 📖', 'B. 📰', 'C. 💻'],
    },
    correctAnswer: 'B. 📰',
    score: 10,
  },
  // 阅读 (Reading) - Fill in the Blank
  {
    id: 'hsk2-r2-1',
    level: 2,
    type: QuestionType.FillInTheBlank,
    question: {
      zh: '[阅读] 选择合适的词语填空：\n这件衣服她（ ___ ）穿过一次。\n\n备选词语：\nA. 去年 (qùnián)\nB. 比 (bǐ)\nC. 事情 (shìqing)',
      en: '[Reading] Choose the appropriate word to fill in the blank:\n这件衣服她（ ___ ）穿过一次。\n\nOptions:\nA. 去年 (qùnián)\nB. 比 (bǐ)\nC. 事情 (shìqing)',
      ko: '[읽기] 빈칸에 알맞은 단어를 고르세요:\n这件衣服她（ ___ ）穿过一次。\n\n보기:\nA. 去年 (qùnián)\nB. 比 (bǐ)\nC. 事情 (shìqing)',
    },
    blanks: {
      zh: ['___'],
      en: ['___'],
      ko: ['___'],
      ja: ['___'],
    },
    correctAnswers: ['A'],
    score: 15,
  },
  // 阅读 (Reading) - True/False
  {
    id: 'hsk2-r3-1',
    level: 2,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[阅读] 请判断句子与带星号的陈述是否一致：\n妹妹现在上班了，每天都很忙，所以玩儿的时间很少。\n★ 妹妹工作很忙。',
      en: '[Reading] True or False based on the text:\n妹妹现在上班了，每天都很忙，所以玩儿的时间很少。\n★ 妹妹工作很忙。 (My younger sister is very busy at work.)',
      ko: '[읽기] 다음 문장과 별표(*) 문장이 일치하는지 판단하세요:\n妹妹现在上班了，每天都很忙，所以玩儿的时间很少。\n★ 妹妹工作很忙。',
      ja: '[リーディング] 文とアスタリスク(*)の文が一致しているか判断してください：\n妹妹现在上班了，每天都很忙，所以玩儿的时间很少。\n★ 妹妹工作很忙。',
    },
    correctAnswer: true,
    score: 10,
  },
  {
    id: 'hsk2-r3-2',
    level: 2,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[阅读] 请判断句子与带星号的陈述是否一致：\n今天天有些阴，可能要下雨，等天气好的时候再去买自行车吧。\n★ 外面在下雨。',
      en: '[Reading] True or False based on the text:\n今天天有些阴，可能要下雨，等天气好的时候再去买自行车吧。\n★ 外面在下雨。 (It is raining outside.)',
      ko: '[읽기] 다음 문장과 별표(*) 문장이 일치하는지 판단하세요:\n今天天有些阴，可能要下雨，等天气好的时候再去买自行车吧。\n★ 外面在下雨。',
      ja: '[リーディング] 文とアスタリスク(*)の文が一致しているか判断してください：\n今天天有些阴，可能要下雨，等天气好的时候再去买自行车吧。\n★ 外面在下雨。',
    },
    correctAnswer: false,
    score: 10,
  },
  // 阅读 (Reading) - Single Choice (Dialogue)
  {
    id: 'hsk2-r4-1',
    level: 2,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 为下面的句子选择正确的回答：\n欢迎您来我们学校！ (Huānyíng nín lái wǒmen xuéxiào!)',
      en: '[Reading] Choose the correct response for the following sentence:\n欢迎您来我们学校！ (Huānyíng nín lái wǒmen xuéxiào!)',
      ko: '[읽기] 다음 문장에 대한 올바른 대답을 고르세요:\n欢迎您来我们学校！ (Huānyíng nín lái wǒmen xuéxiào!)',
      ja: '[リーディング] 次の文に対する正しい答えを選んでください：\n欢迎您来我们学校！ (Huānyíng nín lái wǒmen xuéxiào!)',
    },
    options: {
      zh: ['A. 谢谢你送我回来。 (Xièxie nǐ sòng wǒ huílai.)', 'B. 没关系。 (Méi guānxi.)', 'C. 谢谢！ (Xièxie!)'],
      en: ['A. 谢谢你送我回来。 (Xièxie nǐ sòng wǒ huílai.)', 'B. 没关系。 (Méi guānxi.)', 'C. 谢谢！ (Xièxie!)'],
      ko: ['A. 谢谢你送我回来。 (Xièxie nǐ sòng wǒ huílai.)', 'B. 没关系。 (Méi guānxi.)', 'C. 谢谢！ (Xièxie!)'],
      ja: ['A. 谢谢你送我回来。 (Xièxie nǐ sòng wǒ huílai.)', 'B. 没关系。 (Méi guānxi.)', 'C. 谢谢！ (Xièxie!)'],
    },
    correctAnswer: {
      zh: 'C. 谢谢！ (Xièxie!)',
      en: 'C. 谢谢！ (Xièxie!)',
      ko: 'C. 谢谢！ (Xièxie!)',
      ja: 'C. 谢谢！ (Xièxie!)',
    },
    score: 15,
  },
];

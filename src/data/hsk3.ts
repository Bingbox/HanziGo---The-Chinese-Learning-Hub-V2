import { Question, QuestionType } from '../types/hsk';

export const hsk3Questions: Question[] = [
  // 听力模拟 (Listening Simulation) - True/False
  {
    id: 'hsk3-l1-1',
    level: 3,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与陈述是否一致：\n录音：为了让自己更健康，他每天都花一个小时去锻炼身体。 (Wèile ràng zìjǐ gèng jiànkāng, tā měitiān dōu huā yí ge xiǎoshí qù duànliàn shēntǐ.)\n★ 他希望自己很健康。',
      en: '[Listening Simulation] True or False based on the audio:\nAudio: 为了让自己更健康，他每天都花一个小时去锻炼身体。 (Wèile ràng zìjǐ gèng jiànkāng, tā měitiān dōu huā yí ge xiǎoshí qù duànliàn shēntǐ.)\n★ 他希望自己很健康。 (He hopes to be very healthy.)',
      ko: '[듣기 시뮬레이션] 녹음과 별표(*) 문장이 일치하는지 판단하세요:\n녹음: 为了让自己更健康，他每天都花一个小时去锻炼身体。 (Wèile ràng zìjǐ gèng jiànkāng, tā měitiān dōu huā yí ge xiǎoshí qù duànliàn shēntǐ.)\n★ 他希望自己很健康。',
      ja: '[リスニング模擬] 音声と陳述が一致しているか判断してください：\n音声：为了让自己更健康，他每天都花一个小时去锻炼身体。 (Wèile ràng zìjǐ gèng jiànkāng, tā měitiān dōu huā yí ge xiǎoshí qù duànliàn shēntǐ.)\n★ 他希望自己很健康。',
    },
    correctAnswer: true,
    score: 10,
  },
  {
    id: 'hsk3-l1-2',
    level: 3,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与陈述是否一致：\n录音：今天我想早点儿回家。看了看手表，才5点。过了一会儿再看表，还是5点，我这才发现我的手表不走了。 (Jīntiān wǒ xiǎng zǎodiǎnr huíjiā. Kànle kàn shǒubiǎo, cái 5 diǎn. Guòle yíhuìr zài kàn biǎo, háishì 5 diǎn, wǒ zhè cái fāxiàn wǒ de shǒubiǎo bù zǒu le.)\n★ 那块儿手表不是他的。',
      en: '[Listening Simulation] True or False based on the audio:\nAudio: 今天我想早点儿回家。看了看手表，才5点。过了一会儿再看表，还是5点，我这才发现我的手表不走了。 (Jīntiān wǒ xiǎng zǎodiǎnr huíjiā. Kànle kàn shǒubiǎo, cái 5 diǎn. Guòle yíhuìr zài kàn biǎo, háishì 5 diǎn, wǒ zhè cái fāxiàn wǒ de shǒubiǎo bù zǒu le.)\n★ 那块儿手表不是他的。 (That watch is not his.)',
      ko: '[듣기 시뮬레이션] 녹음과 별표(*) 문장이 일치하는지 판단하세요:\n녹음: 今天我想早点儿回家。看了看手表，才5点。过了一会儿再看表，还是5点，我这才发现我的手表不走了。 (Jīntiān wǒ xiǎng zǎodiǎnr huíjiā. Kànle kàn shǒubiǎo, cái 5 diǎn. Guòle yíhuìr zài kàn biǎo, háishì 5 diǎn, wǒ zhè cái fāxiàn wǒ de shǒubiǎo bù zǒu le.)\n★ 那块儿手表不是他的。',
      ja: '[リスニング模擬] 音声と陳述が一致しているか判断してください：\n音声：今天我想早点儿回家。看了看手表，才5点。过了一会儿再看表，还是5点，我这才发现我的手表不走了。 (Jīntiān wǒ xiǎng zǎodiǎnr huíjiā. Kànle kàn shǒubiǎo, cái 5 diǎn. Guòle yíhuìr zài kàn biǎo, háishì 5 diǎn, wǒ zhè cái fāxiàn wǒ de shǒubiǎo bù zǒu le.)\n★ 那块儿手表不是他的。',
    },
    correctAnswer: false,
    score: 10,
  },
  // 听力模拟 (Listening Simulation) - Single Choice
  {
    id: 'hsk3-l2-1',
    level: 3,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n男：小王，帮我开一下门，好吗？谢谢！ (Xiǎo Wáng, bāng wǒ kāi yíxià mén, hǎo ma? Xièxie!)\n女：没问题。您去超市了？买了这么多东西。 (Méi wèntí. Nín qù chāoshì le? Mǎile zhème duō dōngxi.)\n问：男的想让小王做什么？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nMale: 小王，帮我开一下门，好吗？谢谢！ (Xiǎo Wáng, bāng wǒ kāi yíxià mén, hǎo ma? Xièxie!)\nFemale: 没问题。您去超市了？买了这么多东西。 (Méi wèntí. Nín qù chāoshì le? Mǎile zhème duō dōngxi.)\nQuestion: What does the man want Xiao Wang to do?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n남: 小王，帮我开一下门，好吗？谢谢！ (Xiǎo Wáng, bāng wǒ kāi yíxià mén, hǎo ma? Xièxie!)\n여: 没问题。您去超市了？买了这么多东西。 (Méi wèntí. Nín qù chāoshì le? Mǎile zhème duō dōngxi.)\n질문: 남자는 샤오왕에게 무엇을 해달라고 합니까?',
      ja: '[リスニング模擬] 会話を聞いて、正しい答えを選んでください：\n男：小王，帮我开一下门，好吗？谢谢！ (Xiǎo Wáng, bāng wǒ kāi yíxià mén, hǎo ma? Xièxie!)\n女：没问题。您去超市了？买了这么多东西。 (Méi wèntí. Nín qù chāoshì le? Mǎile zhème duō dōngxi.)\n質問：男の人は小王に何をしてほしいですか？',
    },
    options: {
      zh: ['A. 开门', 'B. 拿东西', 'C. 去超市买东西'],
      en: ['A. 开门', 'B. 拿东西', 'C. 去超市买东西'],
      ko: ['A. 开门', 'B. 拿东西', 'C. 去超市买东西'],
      ja: ['A. ドアを開ける', 'B. 物を運ぶ', 'C. スーパーに買い物に行く'],
    },
    correctAnswer: {
      zh: 'A. 开门',
      en: 'A. 开门',
      ko: 'A. 开门',
      ja: 'A. ドアを開ける',
    },
    score: 10,
  },
  // 阅读 (Reading) - Fill in the Blank
  {
    id: 'hsk3-r1-1',
    level: 3,
    type: QuestionType.FillInTheBlank,
    question: {
      zh: '[阅读] 选择合适的词语填空：\n她说话的（ ___ ）多好听啊！\n\n备选词语：\nA. 刻 (kè)\nB. 双 (shuāng)\nC. 音乐 (yīnyuè)\nD. 其他 (qítā)\nE. 声音 (shēngyīn)\nF. 干净 (gānjìng)',
      en: '[Reading] Choose the appropriate word to fill in the blank:\n她说话的（ ___ ）多好听啊！\n\nOptions:\nA. 刻 (kè)\nB. 双 (shuāng)\nC. 音乐 (yīnyuè)\nD. 其他 (qítā)\nE. 声音 (shēngyīn)\nF. 干净 (gānjìng)',
      ko: '[읽기] 빈칸에 알맞은 단어를 고르세요:\n她说话的（ ___ ）多好听啊！\n\n보기:\nA. 刻 (kè)\nB. 双 (shuāng)\nC. 音乐 (yīnyuè)\nD. 其他 (qítā)\nE. 声音 (shēngyīn)\nF. 干净 (gānjìng)',
      ja: '[リーディング] 空欄に適切な語句を選んでください：\n她说话的（ ___ ）多好听啊！\n\n選択肢：\nA. 刻 (kè)\nB. 双 (shuāng)\nC. 音乐 (yīnyuè)\nD. 其他 (qítā)\nE. 声音 (shēngyīn)\nF. 干净 (gānjìng)',
    },
    blanks: {
      zh: ['___'],
      en: ['___'],
      ko: ['___'],
      ja: ['___'],
    },
    correctAnswers: ['E'],
    score: 15,
  },
  // 阅读 (Reading) - Single Choice
  {
    id: 'hsk3-r2-1',
    level: 3,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 阅读短文，选择正确答案：\n您是来参加今天会议的吗？您来早了一点儿，现在才八点半。您先进来坐吧。\n★ 会议最可能几点开始？',
      en: '[Reading] Read the text and choose the correct answer:\n您是来参加今天会议的吗？您来早了一点儿，现在才八点半。您先进来坐吧。\n★ What time is the meeting most likely to start?',
      ko: '[읽기] 다음 글을 읽고 올바른 답을 고르세요:\n您是来参加今天会议的吗？您来早了一点儿，现在才八点半。您先进来坐吧。\n★ 회의는 몇 시에 시작할 가능성이 가장 높습니까?',
      ja: '[リーディング] 短文を読んで、正しい答えを選んでください：\n您是来参加今天会议的吗？您来早了一点儿，现在才八点半。您先进来坐吧。\n★ 会議は最も早く何時に始まりますか？',
    },
    options: {
      zh: ['A. 8点', 'B. 8点半', 'C. 9点'],
      en: ['A. 8点', 'B. 8点半', 'C. 9点'],
      ko: ['A. 8点', 'B. 8点半', 'C. 9点'],
      ja: ['A. 8時', 'B. 8時半', 'C. 9時'],
    },
    correctAnswer: {
      zh: 'C. 9点',
      en: 'C. 9点',
      ko: 'C. 9点',
      ja: 'C. 9時',
    },
    score: 15,
  },
  // 书写 (Writing) - Rearrange words
  {
    id: 'hsk3-w1-1',
    level: 3,
    type: QuestionType.ShortAnswer,
    question: {
      zh: '[书写] 完成句子（排列词语）：\n那座桥 / 800年的 / 历史 / 有 / 了',
      en: '[Writing] Complete the sentence (rearrange the words):\n那座桥 / 800年的 / 历史 / 有 / 了',
      ko: '[쓰기] 문장 완성하기 (단어 배열):\n那座桥 / 800年的 / 历史 / 有 / 了',
      ja: '[ライティング] 文を完成させてください（単語を並べ替える）：\n那座桥 / 800年的 / 历史 / 有 / 了',
    },
    referenceAnswer: {
      zh: '那座桥有800年的历史了。',
      en: '那座桥有800年的历史了。',
      ko: '那座桥有800年的历史了。',
      ja: '那座桥有800年的历史了。',
    },
    score: 20,
  },
  // 书写 (Writing) - Write character
  {
    id: 'hsk3-w2-1',
    level: 3,
    type: QuestionType.ShortAnswer,
    question: {
      zh: '[书写] 写出拼音对应的汉字：\n没（guān）系，别难过，高兴点儿。',
      en: '[Writing] Write the Chinese character for the pinyin:\n没（guān）系，别难过，高兴点儿。',
      ko: '[쓰기] 병음에 해당하는 한자를 쓰세요:\n没（guān）系，别难过，高兴点儿。',
      ja: '[ライティング] ピンインに対応する漢字を書いてください：\n没（guān）系，别难过，高兴点儿。',
    },
    referenceAnswer: {
      zh: '关',
      en: '关',
      ko: '关',
      ja: '关',
    },
    score: 20,
  },
];

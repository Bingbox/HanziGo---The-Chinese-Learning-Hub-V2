import { Question, QuestionType } from '../types/hsk';

export const hsk4Questions: Question[] = [
  // 听力模拟 (Listening Simulation) - True/False
  {
    id: 'hsk4-l1-1',
    level: 4,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与陈述是否一致：\n录音：我想去办个信用卡，今天下午你有时间吗？陪我去一趟银行？\n★ 他打算下午去银行。',
      en: '[Listening Simulation] True or False based on the audio:\nAudio: 我想去办个信用卡，今天下午你有时间吗？陪我去一趟银行？\n★ 他打算下午去银行。 (He plans to go to the bank in the afternoon.)',
      ko: '[듣기 시뮬레이션] 녹음과 별표(*) 문장이 일치하는지 판단하세요:\n녹음: 我想去办个信用卡，今天下午你有时间吗？陪我去一趟银行？\n★ 他打算下午去银行。',
      ja: '[リスニング模擬] 音声と陳述が一致しているか判断してください：\n音声：我想去办个信用卡，今天下午你有时间吗？陪我去一趟银行？\n★ 他打算下午去银行。',
    },
    correctAnswer: true,
    score: 10,
  },
  {
    id: 'hsk4-l1-2',
    level: 4,
    type: QuestionType.TrueFalse,
    question: {
      zh: '[听力模拟] 请判断录音与陈述是否一致：\n录音：现在我很少看电视，其中一个原因是，广告太多了，不管什么时间，也不管什么节目，只要你打开电视，总能看到那么多的广告，浪费我的时间。\n★ 他喜欢看电视广告。',
      en: '[Listening Simulation] True or False based on the audio:\nAudio: 现在我很少看电视，其中一个原因是，广告太多了，不管什么时间，也不管什么节目，只要你打开电视，总能看到那么多的广告，浪费我的时间。\n★ 他喜欢看电视广告。 (He likes watching TV commercials.)',
      ko: '[듣기 시뮬레이션] 녹음과 별표(*) 문장이 일치하는지 판단하세요:\n녹음: 现在我很少看电视，其中一个原因是，广告太多了，不管什么时间，也不管什么节目，只要你打开电视，总能看到那么多的广告，浪费我的时间。\n★ 他喜欢看电视广告。',
      ja: '[リスニング模擬] 音声と陳述が一致しているか判断してください：\n音声：现在我很少看电视，其中一个原因是，广告太多了，不管什么时间，也不管什么节目，只要你打开电视，总能看到那么多的广告，浪费我的时间。\n★ 他喜欢看电视广告。',
    },
    correctAnswer: false,
    score: 10,
  },
  // 听力模拟 (Listening Simulation) - Single Choice
  {
    id: 'hsk4-l2-1',
    level: 4,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n女：该加油了，去机场的路上有加油站吗？\n男：有，你放心吧。\n问：男的主要是什么意思？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nFemale: 该加油了，去机场的路上有加油站吗？\nMale: 有，你放心吧。\nQuestion: What does the man mainly mean?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n여: 该加油了，去机场的路上有加油站吗？\n남: 有，你放心吧。\n질문: 남자의 주요 의미는 무엇입니까?',
      ja: '[リスニング模擬] 会話を聞いて、正しい答えを選んでください：\n女：该加油了，去机场の路上にガソリンスタンドはありますか？\n男：あります、安心してください。\n質問：男の人は主に何を意味していますか？',
    },
    options: {
      zh: ['A. 去机场', 'B. 快到了', 'C. 油是满的', 'D. 有加油站'],
      en: ['A. 去机场', 'B. 快到了', 'C. 油是满的', 'D. 有加油站'],
      ko: ['A. 去机场', 'B. 快到了', 'C. 油是满的', 'D. 有加油站'],
      ja: ['A. 空港に行く', 'B. もうすぐ着く', 'C. ガソリンが満タン', 'D. ガソリンスタンドがある'],
    },
    correctAnswer: {
      zh: 'D. 有加油站',
      en: 'D. 有加油站',
      ko: 'D. 有加油站',
      ja: 'D. ガソリンスタンドがある',
    },
    score: 10,
  },
  // 阅读 (Reading) - Fill in the Blank
  {
    id: 'hsk4-r1-1',
    level: 4,
    type: QuestionType.FillInTheBlank,
    question: {
      zh: '[阅读] 选择合适的词语填空：\n她每天都（ ___ ）走路上下班，所以身体一直很不错。\n\n备选词语：\nA. 随着\nB. 尝\nC. 春节\nD. 坚持\nE. 收拾\nF. 提醒',
      en: '[Reading] Choose the appropriate word to fill in the blank:\n她每天都（ ___ ）走路上下班，所以身体一直很不错。\n\nOptions:\nA. 随着\nB. 尝\nC. 春节\nD. 坚持\nE. 收拾\nF. 提醒',
      ko: '[읽기] 빈칸에 알맞은 단어를 고르세요:\n她每天都（ ___ ）走路上下班，所以身体一直很不错。\n\n보기:\nA. 随着\nB. 尝\nC. 春节\nD. 坚持\nE. 收拾\nF. 提醒',
      ja: '[リーディング] 空欄に適切な語句を選んでください：\n她每天都（ ___ ）走路上下班，所以身体一直很不错。\n\n選択肢：\nA. 随着\nB. 尝\nC. 春节\nD. 坚持\nE. 收拾\nF. 提醒',
    },
    blanks: {
      zh: ['___'],
      en: ['___'],
      ko: ['___'],
      ja: ['___'],
    },
    correctAnswers: ['D'],
    score: 15,
  },
  // 阅读 (Reading) - Rearrange Sentences
  {
    id: 'hsk4-r2-1',
    level: 4,
    type: QuestionType.ShortAnswer,
    question: {
      zh: '[阅读] 排列顺序：\nA：可是今天起晚了\nB：平时我骑自行车上下班\nC：所以就打车来公司\n请写出正确的字母顺序（例如：ABC）。',
      en: '[Reading] Rearrange the sentences:\nA：可是今天起晚了\nB：平时我骑自行车上下班\nC：所以就打车来公司\nPlease write the correct letter order (e.g., ABC).',
      ko: '[읽기] 문장 순서 배열하기:\nA：可是今天起晚了\nB：平时我骑自行车上下班\nC：所以就打车来公司\n올바른 알파벳 순서를 쓰세요 (예: ABC).',
      ja: '[リーディング] 文を並べ替えてください：\nA：可是今天起晚了\nB：平时我骑自行车上下班\nC：所以就打车来公司\n正しいアルファベット順を書いてください（例：ABC）。',
    },
    referenceAnswer: {
      zh: 'BAC',
      en: 'BAC',
      ko: 'BAC',
      ja: 'BAC',
    },
    score: 15,
  },
  // 阅读 (Reading) - Single Choice
  {
    id: 'hsk4-r3-1',
    level: 4,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 阅读短文，选择正确答案：\n她很活泼，说话很有趣，总能给我们带来快乐，我们都很喜欢和她在一起。\n★ 她是个什么样的人？',
      en: '[Reading] Read the text and choose the correct answer:\n她很活泼，说话很有趣，总能给我们带来快乐，我们都很喜欢和她在一起。\n★ What kind of person is she?',
      ko: '[읽기] 다음 글을 읽고 올바른 답을 고르세요:\n她很活泼，说话很有趣，总能给我们带来快乐，我们都很喜欢和她在一起。\n★ 그녀는 어떤 사람입니까?',
      ja: '[リーディング] 短文を読んで、正しい答えを選んでください：\n彼女はとても活発で、話が面白く、いつも私たちに楽しみをもたらしてくれます。私たちは皆、彼女と一緒にいるのが大好きです。\n★ 彼女はどんな人ですか？',
    },
    options: {
      zh: ['A. 幽默', 'B. 马虎', 'C. 骄傲', 'D. 害羞'],
      en: ['A. 幽默', 'B. 马虎', 'C. 骄傲', 'D. 害羞'],
      ko: ['A. 幽默', 'B. 马虎', 'C. 骄傲', 'D. 害羞'],
      ja: ['A. ユーモラス', 'B. 不注意', 'C. 傲慢', 'D. 恥ずかしがり屋'],
    },
    correctAnswer: {
      zh: 'A. 幽默',
      en: 'A. 幽默',
      ko: 'A. 幽默',
      ja: 'A. ユーモラス',
    },
    score: 15,
  },
  // 书写 (Writing) - Rearrange words
  {
    id: 'hsk4-w1-1',
    level: 4,
    type: QuestionType.ShortAnswer,
    question: {
      zh: '[书写] 完成句子（排列词语）：\n音乐 / 喜欢 / 流行 / 他 / 听',
      en: '[Writing] Complete the sentence (rearrange the words):\n音乐 / 喜欢 / 流行 / 他 / 听',
      ko: '[쓰기] 문장 완성하기 (단어 배열):\n音乐 / 喜欢 / 流行 / 他 / 听',
      ja: '[ライティング] 文を完成させてください（単語を並べ替える）：\n音楽 / 好き / 流行 / 彼 / 聞く',
    },
    referenceAnswer: {
      zh: '他喜欢听流行音乐。',
      en: '他喜欢听流行音乐。',
      ko: '他喜欢听流行音乐。',
      ja: '他喜欢听流行音乐。',
    },
    score: 25,
  },
];

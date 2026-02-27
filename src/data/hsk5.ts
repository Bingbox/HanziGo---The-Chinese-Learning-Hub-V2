import { Question, QuestionType } from '../types/hsk';

export const hsk5Questions: Question[] = [
  // 听力模拟 (Listening Simulation) - Single Choice
  {
    id: 'hsk5-l1-1',
    level: 5,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n女：明天上午 9 点我准时到。\n男：我觉得还是提前几分钟吧。\n问：男的主要是什么意思？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nFemale: 明天上午 9 点我准时到。\nMale: 我觉得还是提前几分钟吧。\nQuestion: What does the man mainly mean?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n여: 明天上午 9 点我准时到。\n남: 我觉得还是提前几分钟吧。\n질문: 남자의 주요 의미는 무엇입니까?',
      ja: '[リスニング模擬] 会話を聞いて、正しい答えを選んでください：\n女：明日午前9時に時間通りに到着します。\n男：やはり数分早めに来たほうがいいと思います。\n質問：男の人は主に何を意味していますか？',
    },
    options: {
      zh: ['A. 9点太早了', 'B. 他不会迟到', 'C. 可能不参加', 'D. 应该早点儿来'],
      en: ['A. 9点太早了', 'B. 他不会迟到', 'C. 可能不参加', 'D. 应该早点儿来'],
      ko: ['A. 9点太早了', 'B. 他不会迟到', 'C. 可能不参加', 'D. 应该早点儿来'],
      ja: ['A. 9時は早すぎる', 'B. 彼は遅刻しない', 'C. 参加しないかもしれない', 'D. 早く来るべきだ'],
    },
    correctAnswer: {
      zh: 'D. 应该早点儿来',
      en: 'D. 应该早点儿来',
      ko: 'D. 应该早点儿来',
      ja: 'D. 早く来るべきだ',
    },
    score: 10,
  },
  {
    id: 'hsk5-l1-2',
    level: 5,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n男：这份报告你看了吗？有什么意见？\n女：我还没来得及细看，等我看完再告诉你吧。\n问：女的是什么意思？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nMale: Have you read this report? Any opinions?\nFemale: I haven\'t had time to look at it in detail yet. I\'ll tell you after I finish reading it.\nQuestion: What does the woman mean?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n남: 이 보고서 읽어봤나요? 의견이 있나요?\n여: 아직 자세히 볼 시간이 없었어요. 다 읽고 나서 알려드릴게요.\n질문: 여자의 말은 무슨 뜻입니까?',
      ja: '[リスニング模擬] 会話を聞いて、正しい答えを選んでください：\n男：この報告書は読みましたか？何か意見はありますか？\n女：まだ詳しく見る時間がありませんでした。読み終わったら教えます。\n質問：女の人は何を意味していますか？',
    },
    options: {
      zh: ['A. 报告写得很好', 'B. 她不想看报告', 'C. 她还没看完', 'D. 她没有意见'],
      en: ['A. The report is well written', 'B. She doesn\'t want to read it', 'C. She hasn\'t finished reading it', 'D. She has no opinion'],
      ko: ['A. 보고서가 잘 작성되었다', 'B. 그녀는 보고서를 읽고 싶지 않다', 'C. 그녀는 아직 다 읽지 않았다', 'D. 그녀는 의견이 없다'],
      ja: ['A. 報告書はよく書けている', 'B. 彼女は報告書を読みたくない', 'C. 彼女はまだ読み終わっていない', 'D. 彼女は意見がない'],
    },
    correctAnswer: 'C. 她还没看完',
    score: 10,
  },
  {
    id: 'hsk5-l2-1',
    level: 5,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听对话，选择正确答案：\n女：您好！欢迎光临。请问您几位？\n男：三个，我们提前预订了。\n女：好的，请问先生您怎么称呼？\n男：我姓李。\n女：李先生，里面请，靠窗户的那个桌子是给您留的。\n问：根据对话，下列哪项正确？',
      en: '[Listening Simulation] Listen to the dialogue and choose the correct answer:\nFemale: 您好！欢迎光临。请问您几位？\nMale: 三个，我们提前预订了。\nFemale: 好的，请问先生您怎么称呼？\nMale: 我姓李。\nFemale: 李先生，里面请，靠窗户的那个桌子是给您留的。\nQuestion: According to the dialogue, which of the following is correct?',
      ko: '[듣기 시뮬레이션] 대화를 듣고 올바른 답을 고르세요:\n여: 您好！欢迎光临。请问您几位？\n남: 三个，我们提前预订了。\n여: 好的，请问先生您怎么称呼？\n남: 我姓李。\n여: 李先生，里面请，靠窗户的那个桌子是给您留的。\n질문: 대화 내용과 일치하는 것은 무엇입니까?',
    },
    options: {
      zh: ['A. 他们在饭店', 'B. 现在是下午', 'C. 他们在开会', 'D. 男的想买桌子'],
      en: ['A. 他们在饭店', 'B. 现在是下午', 'C. 他们在开会', 'D. 男的想买桌子'],
      ko: ['A. 他们在饭店', 'B. 现在是下午', 'C. 他们在开会', 'D. 男的想买桌子'],
      ja: ['A. 彼らはレストランにいる', 'B. 今は午後である', 'C. 彼らは会議中である', 'D. 男はテーブルを買いたい'],
    },
    correctAnswer: {
      zh: 'A. 他们在饭店',
      en: 'A. 他们在饭店',
      ko: 'A. 他们在饭店',
      ja: 'A. 彼らはレストランにいる',
    },
    score: 10,
  },
  // 阅读 (Reading) - Single Choice (Fill in the blank in context)
  {
    id: 'hsk5-r1-1',
    level: 5,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 选择合适的词语填空：\n在高速行驶的火车上，有一位老人不小心把刚买的新鞋从窗口掉下去一只，周围的人都觉得很（ ___ ）。',
      en: '[Reading] Choose the appropriate word to fill in the blank:\n在高速行驶的火车上，有一位老人不小心把刚买的新鞋从窗口掉下去一只，周围的人都觉得很（ ___ ）。',
      ko: '[읽기] 빈칸에 알맞은 단어를 고르세요:\n在高速行驶的火车上，有一位老人不小心把刚买的新鞋从窗口掉下去一只，周围的人都觉得很（ ___ ）。',
      ja: '[リーディング] 空欄に適切な語句を選んでください：\n高速で走る列車の中で、ある老人が誤って買ったばかりの新しい靴を窓から片方落としてしまいました。周りの人々はとても（ ___ ）と感じました。',
    },
    options: {
      zh: ['A. 浪费', 'B. 伤心', 'C. 可惜', 'D. 痛苦'],
      en: ['A. 浪费', 'B. 伤心', 'C. 可惜', 'D. 痛苦'],
      ko: ['A. 浪费', 'B. 伤心', 'C. 可惜', 'D. 痛苦'],
      ja: ['A. 無駄', 'B. 悲しい', 'C. 惜しい', 'D. 苦しい'],
    },
    correctAnswer: 'C. 可惜',
    score: 15,
  },
  {
    id: 'hsk5-r1-2',
    level: 5,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 选择合适的词语填空：\n机会总是留给有（ ___ ）的人。',
      en: '[Reading] Choose the appropriate word to fill in the blank:\nOpportunities are always reserved for those who are ( ___ ).',
      ko: '[읽기] 빈칸에 알맞은 단어를 고르세요:\n기회는 항상 ( ___ ) 된 사람에게 돌아갑니다.',
      ja: '[リーディング] 空欄に適切な語句を選んでください：\nチャンスは常に ( ___ ) ができている人のためにあります。',
    },
    options: {
      zh: ['A. 准备', 'B. 打算', 'C. 计划', 'D. 安排'],
      en: ['A. Prepared', 'B. Intending', 'C. Planning', 'D. Arranging'],
      ko: ['A. 준비', 'B. 작정', 'C. 계획', 'D. 배치'],
      ja: ['A. 準備', 'B. つもり', 'C. 計画', 'D. 手配'],
    },
    correctAnswer: 'A. 准备',
    score: 15,
  },
  // 阅读 (Reading) - Single Choice (Comprehension)
  {
    id: 'hsk5-r2-1',
    level: 5,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 阅读短文，选择正确答案：\n从1995年开始，学校每年举行一次演讲比赛，到现在已经是第15届了。今年的比赛定在下周六，对于这场比赛，我非常有把握，我要争取发挥出最好水平，你们就等我的好消息吧。\n★ 根据这段话，可以知道：',
      en: '[Reading] Read the text and choose the correct answer:\n从1995年开始，学校每年举行一次演讲比赛，到现在已经是第15届了。今年的比赛定在下周六，对于这场比赛，我非常有把握，我要争取发挥出最好水平，你们就等我的好消息吧。\n★ According to this passage, we can know:',
      ko: '[읽기] 다음 글을 읽고 올바른 답을 고르세요:\n从1995年开始，学校每年举行一次演讲比赛，到现在已经是第15届了。今年的比赛定在下周六，对于这场比赛，我非常有把握，我要争取发挥出最好水平，你们就等我的好消息吧。\n★ 이 단락에 따르면 알 수 있는 것은:',
    },
    options: {
      zh: ['A. 比赛安排在周六下午', 'B. 我每年都参加这个比赛', 'C. 我对这次比赛很有信心', 'D. 这场比赛的水平不是很高'],
      en: ['A. 比赛安排在周六下午', 'B. 我每年都参加这个比赛', 'C. 我对这次比赛很有信心', 'D. 这场比赛的水平不是很高'],
      ko: ['A. 比赛安排在周六下午', 'B. 我每年都参加这个比赛', 'C. 我对这次比赛很有信心', 'D. 这场比赛的水平不是很高'],
    },
    correctAnswer: {
      zh: 'C. 我对这次比赛很有信心',
      en: 'C. 我对这次比赛很有信心',
      ko: 'C. 我对这次比赛很有信心',
    },
    score: 15,
  },
  // 书写 (Writing) - Rearrange words
  {
    id: 'hsk5-w1-1',
    level: 5,
    type: QuestionType.ShortAnswer,
    question: {
      zh: '[书写] 完成句子（排列词语）：\n大笑 / 忍不住 / 起来 / 他',
      en: '[Writing] Complete the sentence (rearrange the words):\n大笑 / 忍不住 / 起来 / 他',
      ko: '[쓰기] 문장 완성하기 (단어 배열):\n大笑 / 忍不住 / 起来 / 他',
    },
    referenceAnswer: {
      zh: '他忍不住大笑起来。',
      en: '他忍不住大笑起来。',
      ko: '他忍不住大笑起来。',
    },
    score: 25,
  },
  // 书写 (Writing) - Short Essay
  {
    id: 'hsk5-w2-1',
    level: 5,
    type: QuestionType.Analysis,
    question: {
      zh: '[书写] 请结合下列词语（要全部使用），写一篇80字左右的短文：\n元旦、放松、礼物、表演、善良',
      en: '[Writing] Please write a short essay of about 80 words using all the following words:\n元旦 (New Year\'s Day), 放松 (relax), 礼物 (gift), 表演 (performance), 善良 (kind)',
      ko: '[쓰기] 다음 단어들을 모두 사용하여 80자 내외의 짧은 글을 쓰세요:\n元旦, 放松, 礼物, 表演, 善良',
    },
    referenceAnswer: {
      zh: '（参考范文）元旦那天，我们公司举办了晚会。大家终于可以放松一下了。晚会上有很多精彩的表演，我还收到了一份特别的礼物。送我礼物的是一位非常善良的同事，我感到很温暖。',
      en: '(Sample Essay) On New Year\'s Day, our company held a party. Everyone could finally relax. There were many wonderful performances at the party, and I also received a special gift. The person who gave me the gift is a very kind colleague, and I felt very warm.',
      ko: '(모범 답안) 새해 첫날, 우리 회사는 파티를 열었습니다. 모두가 마침내 휴식을 취할 수 있었습니다. 파티에는 멋진 공연이 많았고, 저도 특별한 선물을 받았습니다. 선물을 준 사람은 매우 착한 동료였고, 저는 마음이 따뜻해졌습니다.',
    },
    scoringCriteria: {
      zh: '包含所有词语，语句通顺，逻辑合理，字数符合要求即可得分。',
      en: 'Points are awarded if all words are included, sentences are fluent, logic is reasonable, and the word count meets the requirement.',
      ko: '모든 단어가 포함되고, 문장이 자연스러우며, 논리가 합리적이고, 글자 수 요구 사항을 충족하면 점수를 얻습니다.',
    },
    score: 25,
  },
];

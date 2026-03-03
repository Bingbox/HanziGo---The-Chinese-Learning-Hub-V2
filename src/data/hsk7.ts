import { Question, QuestionType } from '../types/hsk';

export const hsk7Questions: Question[] = [
  // 听力 (Listening) - 40题
  {
    id: 'hsk7-l1-1',
    level: 7,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力] 听录音，选择正确答案：\n（录音内容：关于全球气候变化的科学报告片段）\n问：报告中提到的主要观点是什么？',
      en: '[Listening] Listen to the audio and choose the correct answer:\n(Audio: Fragment of a scientific report on global climate change)\nQuestion: What is the main point mentioned in the report?',
      ko: '[듣기] 녹음을 듣고 올바른 답을 고르세요:\n(녹음 내용: 지구 기후 변화에 대한 과학 보고서 발췌)\n질문: 보고서에서 언급된 주요 관점은 무엇입니까?',
      ja: '[リスニング] 音声を聞いて、正しい答えを選んでください：\n（音声内容：关于全球气候变化的科学报告片段）\n質問：報告書で言及されている主な観点は何ですか？',
      'zh-TW': '[聽力] 聽錄音，選擇正確答案：\n（錄音內容：關於全球氣候變化的科學報告片段）\n問：報告中提到的主要觀點是什麼？',
    },
    options: {
      zh: ['A. 气候变化不可逆转', 'B. 人类活动是主要原因', 'C. 自然因素起决定作用', 'D. 目前数据尚不充分'],
      en: ['A. 气候变化不可逆转', 'B. 人类活动是主要原因', 'C. 自然因素起决定作用', 'D. 目前数据尚不充分'],
      ko: ['A. 气候变化不可逆转', 'B. 人类活动是主要原因', 'C. 自然因素起决定作用', 'D. 目前数据尚不充分'],
      ja: ['A. 气候变化不可逆转', 'B. 人类活动是主要原因', 'C. 自然因素起决定作用', 'D. 目前数据尚不充分'],
      'zh-TW': ['A. 氣候變化不可逆轉', 'B. 人類活動是主要原因', 'C. 自然因素起決定作用', 'D. 目前數據尚不充分'],
    },
    correctAnswer: {
      zh: 'B. 人类活动是主要原因',
      en: 'B. 人类活动是主要原因',
      ko: 'B. 人类活动是主要原因',
      ja: 'B. 人类活动是主要原因',
      'zh-TW': 'B. 人類活動是主要原因',
    },
    score: 1,
  },
  {
    id: 'hsk7-l1-2',
    level: 7,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力] 听录音，选择正确答案：\n（录音内容：关于人工智能在医学领域应用的讲座）\n问：讲座中提到的AI在医学上的一个重要应用是什么？',
      'zh-TW': '[聽力] 聽錄音，選擇正確答案：\n（錄音內容：關於人工智能在醫學領域應用的講座）\n問：講座中提到的AI在醫學上的一個重要應用是什麼？',
      en: '[Listening] Listen to the audio and choose the correct answer:\n(Audio: Lecture on the application of AI in the medical field)\nQuestion: What is an important application of AI in medicine mentioned in the lecture?',
      ko: '[듣기] 녹음을 듣고 올바른 답을 고르세요:\n(녹음 내용: 의학 분야에서 인공지능의 응용에 관한 강연)\n질문: 강연에서 언급된 의학 분야의 AI의 중요한 응용 중 하나는 무엇입니까?',
      ja: '[リスニング] 音声を聞いて、正しい答えを選んでください：\n（音声内容：医学分野における人工知能の応用に関する講義）\n質問：講義の中で言及された医学におけるAIの重要な応用の一つは何ですか？？',
    },
    options: {
      zh: ['A. 辅助诊断疾病', 'B. 代替医生手术', 'C. 自动开具处方', 'D. 降低医疗成本'],
      'zh-TW': ['A. 輔助診斷疾病', 'B. 代替醫生手術', 'C. 自動開具處方', 'D. 降低醫療成本'],
      en: ['A. 辅助诊断疾病', 'B. 代替医生手术', 'C. 自动开具处方', 'D. 降低医疗成本'],
      ko: ['A. 辅助诊断疾病', 'B. 代替医生手术', 'C. 自动开具处方', 'D. 降低医疗成本'],
      ja: ['A. 辅助诊断疾病', 'B. 代替医生手术', 'C. 自动开具处方', 'D. 降低医疗成本'],
    },
    correctAnswer: {
      zh: 'A. 辅助诊断疾病',
      'zh-TW': 'A. 輔助診斷疾病',
      en: 'A. 辅助诊断疾病',
      ko: 'A. 辅助诊断疾病',
      ja: 'A. 辅助诊断疾病',
    },
    score: 1,
  },
  // 阅读 (Reading) - 47题
  {
    id: 'hsk7-r1-1',
    level: 7,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 阅读下文，选出正确答案：\n中国古代哲学强调“天人合一”，这一思想不仅影响了古代的政治、伦理，也深刻地渗透到了文学、艺术等各个领域。它主张人与自然不是对立的，而是一个有机的整体。\n★ “天人合一”思想强调的是：',
      en: '[Reading] Read the text and choose the correct answer:\n中国古代哲学强调“天人合一”，这一思想不仅影响了古代的政治、伦理，也深刻地渗透到了文学、艺术等各个领域。It advocates that humans and nature are not opposed, but an organic whole.\n★ The "Tian Ren He Yi" thought emphasizes:',
      ko: '[읽기] 다음 글을 읽고 올바른 답을 고르세요:\n中国古代哲学强调“天人合一”，这一思想不仅影响了古代的政治、伦理，也深刻地渗透到了文学、艺术等各个领域。인간과 자연은 대립하는 것이 아니라 하나의 유기적인 전체라는 주장입니다.\n★ "천인합일" 사상이 강조하는 것은:',
      ja: '[リーディング] 次の文章を読み、正しい答えを選んでください：\n中国古代哲学强调“天人合一”，这一思想不仅影响了古代的政治、伦理，也深刻地渗透到了文学、艺术等各个领域。人間と自然は対立するものではなく、一つの有機的な全体であると主張しています。\n★ 「天人合一」思想が強調しているのは：',
      'zh-TW': '[閱讀] 閱讀下文，選出正確答案：\n中國古代哲學強調「天人合一」，這一思想不僅影響了古代的政治、倫理，也深刻地滲透到了文學、藝術等各個領域。它主張人與自然不是對立的，而是一個有機的整體。\n★ 「天人合一」思想強調的是：',
    },
    options: {
      zh: ['A. 人定胜天', 'B. 顺其自然', 'C. 人与自然和谐统一', 'D. 改造自然'],
      en: ['A. 人定胜天', 'B. 顺其自然', 'C. 人与自然和谐统一', 'D. 改造自然'],
      ko: ['A. 人定胜天', 'B. 顺其自然', 'C. 人与自然和谐统一', 'D. 改造自然'],
      ja: ['A. 人定胜天', 'B. 顺其自然', 'C. 人与自然和谐统一', 'D. 改造自然'],
      'zh-TW': ['A. 人定勝天', 'B. 順其自然', 'C. 人與自然和諧統一', 'D. 改造自然'],
    },
    correctAnswer: {
      zh: 'C. 人与自然和谐统一',
      en: 'C. 人与自然和谐统一',
      ko: 'C. 人与自然和谐统一',
      ja: 'C. 人与自然和谐统一',
      'zh-TW': 'C. 人與自然和諧統一',
    },
    score: 1,
  },
  // 写作 (Writing) - 2题
  {
    id: 'hsk7-w1-1',
    level: 7,
    type: QuestionType.Analysis,
    question: {
      zh: '[写作] 请根据以下图表信息，写一篇分析报告（约200字）。\n（图表：某城市近十年空气质量变化趋势图）',
      en: '[Writing] Please write an analysis report (about 200 words) based on the following chart information.\n（图表：某城市近十年空气质量变化趋势图）',
      ko: '[쓰기] 다음 도표 정보를 바탕으로 분석 보고서를 작성하세요 (약 200자).\n（图表：某城市近十年空气质量变化趋势图）',
    },
    referenceAnswer: {
      zh: '（参考范文）从图表中可以看出，该城市近十年来空气质量总体呈上升趋势。虽然在中间几年略有波动，但随着环保政策的实施和绿色能源的推广，空气优良天数显著增加，PM2.5浓度逐年下降。这表明该城市的治理措施取得了实效。',
      en: '（参考范文）从图表中可以看出，该城市近十年来空气质量总体呈上升趋势。虽然在中间几年略有波动，但随着环保政策的实施和绿色能源的推广，空气优良天数显著增加，PM2.5浓度逐年下降。这表明该城市的治理措施取得了实效。',
      ko: '（参考范文）从图表中可以看出，该城市近十年来空气质量总体呈上升趋势。虽然在中间几年略有波动，但随着环保政策的实施和绿色能源的推广，空气优良天数显著增加，PM2.5浓度逐年下降。这表明该城市的治理措施取得了实效。',
    },
    score: 15,
  },
  // 翻译 (Translation) - 4题
  {
    id: 'hsk7-t1-1',
    level: 7,
    type: QuestionType.Translation,
    question: {
      zh: '[翻译] 请将以下段落翻译成中文：\nArtificial Intelligence is transforming the way we live and work. From autonomous vehicles to smart assistants, AI technologies are becoming increasingly integrated into our daily lives.',
      en: '[Translation] Please translate the following paragraph into Chinese:\nArtificial Intelligence is transforming the way we live and work. From autonomous vehicles to smart assistants, AI technologies are becoming increasingly integrated into our daily lives.',
      ko: '[번역] 다음 단락을 중국어로 번역하세요:\nArtificial Intelligence is transforming the way we live and work. From autonomous vehicles to smart assistants, AI technologies are becoming increasingly integrated into our daily lives.',
    },
    referenceAnswer: {
      zh: '人工智能正在改变我们生活和工作的方式。从自动驾驶汽车到智能助手，人工智能技术正日益融入我们的日常生活。',
      en: '人工智能正在改变我们生活和工作的方式。从自动驾驶汽车到智能助手，人工智能技术正日益融入我们的日常生活。',
      ko: '人工智能正在改变我们生活和工作的方式。从自动驾驶汽车到智能助手，人工智能技术正日益融入我们的日常生活。',
    },
    score: 10,
  },
  // 口语 (Speaking) - 5题
  {
    id: 'hsk7-s1-1',
    level: 7,
    type: QuestionType.Speaking,
    question: {
      zh: '[口语] 请结合自己的经历，谈谈你对“终身学习”的理解。（限时3分钟）',
      en: '[Speaking] Based on your own experience, talk about your understanding of "lifelong learning". (Time limit: 3 minutes)',
      ko: '[말하기] 자신의 경험을 바탕으로 "평생 학습"에 대한 이해를 이야기해 보세요. (제한 시간: 3분)',
    },
    referenceAnswer: {
      zh: '（参考回答要点）1. 终身学习的定义；2. 现代社会知识更新快，必须不断学习；3. 结合个人学习新技能的经历；4. 总结终身学习对个人发展的意义。',
      en: '（参考回答要点）1. 终身学习的定义；2. 现代社会知识更新快，必须不断学习；3. 结合个人学习新技能的经历；4. 总结终身学习对个人发展的意义。',
      ko: '（参考回答要点）1. 终身学习的定义；2. 现代社会知识更新快，必须不断学习；3. 结合个人学习新技能的经历；4. 总结终身学习对个人发展的意义。',
    },
    score: 10,
  },
];

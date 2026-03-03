import { Question, QuestionType } from '../types/hsk';

export const hsk9Questions: Question[] = [
  // 听力 (Listening) - 40题
  {
    id: 'hsk9-l1-1',
    level: 9,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力] 听录音，选择正确答案：\n（录音内容：关于量子力学与哲学关系的深度探讨）\n问：讲者认为量子力学对传统哲学观念的最大冲击是什么？',
      en: '[Listening] Listen to the audio and choose the correct answer:\n(Audio: In-depth discussion on the relationship between quantum mechanics and philosophy)\nQuestion: What does the speaker think is the greatest impact of quantum mechanics on traditional philosophical concepts?',
      ko: '[듣기] 녹음을 듣고 올바른 답을 고르세요:\n(녹음 내용: 양자 역학과 철학의 관계에 대한 심층 토론)\n질문: 강연자는 양자 역학이 전통적인 철학 관념에 준 가장 큰 충격이 무엇이라고 생각합니까?',
      ja: '[リスニング] 音声を聞いて、正しい答えを選んでください：\n（音声内容：关于量子力学与哲学关系的深度探讨）\n質問：話者は、量子力学が伝統的な哲学概念に与えた最大の衝撃は何だと考えていますか？',
      'zh-TW': '[聽力] 聽錄音，選擇正確答案：\n（錄音內容：關於量子力學與哲學關係的深度探討）\n問：講者認為量子力學對傳統哲學觀念的最大衝擊是什麼？',
    },
    options: {
      zh: ['A. 否定了因果律', 'B. 动摇了客观实在性', 'C. 证明了唯心主义', 'D. 统一了科学与宗教'],
      en: ['A. 否定了因果律', 'B. 动摇了客观实在性', 'C. 证明了唯心主义', 'D. 统一了科学与宗教'],
      ko: ['A. 否定了因果律', 'B. 动摇了客观实在性', 'C. 证明了唯心主义', 'D. 统一了科学与宗教'],
      ja: ['A. 否定了因果律', 'B. 动摇了客观实在性', 'C. 证明了唯心主义', 'D. 统一了科学与宗教'],
      'zh-TW': ['A. 否定了因果律', 'B. 動搖了客觀實在性', 'C. 證明了唯心主義', 'D. 統一了科學與宗教'],
    },
    correctAnswer: {
      zh: 'B. 动摇了客观实在性',
      en: 'B. 动摇了客观实在性',
      ko: 'B. 动摇了客观实在性',
      ja: 'B. 动摇了客观实在性',
      'zh-TW': 'B. 動搖了客觀實在性',
    },
    score: 1,
  },
  {
    id: 'hsk9-l1-2',
    level: 9,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力] 听录音，选择正确答案：\n（录音内容：关于“人类命运共同体”理念的国际政治评论）\n问：评论中提到的“人类命运共同体”理念的核心内涵是什么？',
      'zh-TW': '[聽力] 聽錄音，選擇正確答案：\n（錄音內容：關於「人類命運共同體」理念的國際政治評論）\n問：評論中提到的「人類命運共同體」理念的核心內涵是什麼？',
      en: '[Listening] Listen to the audio and choose the correct answer:\n(Audio: International political commentary on the concept of "Community with a Shared Future for Mankind")\nQuestion: What is the core connotation of the concept of "Community with a Shared Future for Mankind" mentioned in the commentary?',
      ko: '[듣기] 녹음을 듣고 올바른 답을 고르세요:\n(녹음 내용: "인류 운명 공동체" 이념에 대한 국제 정치 평론)\n질문: 평론에서 언급된 "인류 운명 공동체" 이념의 핵심 내상은 무엇입니까?',
      ja: '[リスニング] 音声を聞いて、正しい答えを選んでください：\n（音声内容：「人類運命共同体」の理念に関する国際政治評論）\n質問：評論の中で言及された「人類運命共同体」の理念の核心的な内包は何ですか？',
    },
    options: {
      zh: ['A. 建立全球统一政府', 'B. 消除各国文化差异', 'C. 合作共赢、共同发展', 'D. 实行单一的经济模式'],
      'zh-TW': ['A. 建立全球統一政府', 'B. 消除各國文化差異', 'C. 合作共贏、共同發展', 'D. 實行單一的經濟模式'],
      en: ['A. 建立全球统一政府', 'B. 消除各国文化差异', 'C. 合作共赢、共同发展', 'D. 实行单一的经济模式'],
      ko: ['A. 建立全球统一政府', 'B. 消除各国文化差异', 'C. 合作共赢、共同发展', 'D. 实行单一的经济模式'],
      ja: ['A. 建立全球统一政府', 'B. 消除各国文化差异', 'C. 合作共赢、共同发展', 'D. 实行单一的经济模式'],
    },
    correctAnswer: {
      zh: 'C. 合作共赢、共同发展',
      'zh-TW': 'C. 合作共贏、共同發展',
      en: 'C. 合作共赢、共同发展',
      ko: 'C. 合作共赢、共同发展',
      ja: 'C. 合作共赢、共同发展',
    },
    score: 1,
  },
  // 阅读 (Reading) - 47题
  {
    id: 'hsk9-r1-1',
    level: 9,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 阅读下文，选出正确答案：\n全球化是一个复杂的历史进程，它既带来了经济的繁荣和文化的交流，也引发了贫富差距扩大、文化同质化等问题。在这一进程中，各国应秉持开放包容、互利共赢的原则，共同应对挑战，推动构建人类命运共同体。\n★ 作者对全球化的态度是：',
      en: '[Reading] Read the text and choose the correct answer:\n全球化是一个复杂的历史进程，它既带来了经济的繁荣和文化的交流，也引发了贫富差距扩大、文化同质化等问题。In this process, all countries should uphold the principles of openness, inclusiveness, and mutual benefit, jointly address challenges, and promote the building of a community with a shared future for mankind.\n★ The author\'s attitude towards globalization is:',
      ko: '[읽기] 다음 글을 읽고 올바른 답을 고르세요:\n全球化是一个复杂的历史进程，它既带来了经济의 번영과 문화 교류를 가져왔지만, 빈부 격차 확대, 문화 동질화 등 문제도 야기했습니다. 이 과정에서 각국은 개방과 포용, 상호 이익과 상생의 원칙을 견지하고 도전에 공동으로 대응하며 인류 운명 공동체 구축을 추진해야 합니다.\n★ 저자의 세계화에 대한 태도는:',
      ja: '[リーディング] 次の文章を読み、正しい答えを選んでください：\n全球化是一个复杂的历史进程，它既带来了经济的繁荣和文化的交流，也引发了贫富差距扩大、文化同质化等问题。このプロセスにおいて、各国は開放的で包摂的、互恵的でウィンウィンの原則を堅持し、共に課題に対応し、人類運命共同体の構築を推進すべきです。\n★ 著者のグローバル化に対する態度は：',
      'zh-TW': '[閱讀] 閱讀下文，選出正確答案：\n全球化是一個複雜的歷史進程，它既帶來了經濟的繁榮和文化的交流，也引發了貧富差距擴大、文化同質化等問題。在這一進程中，各國應秉持開放包容、互利共贏的原則，共同應對挑戰，推動構建人類命運共同體。\n★ 作者對全球化的態度是：',
    },
    options: {
      zh: ['A. 全盘否定', 'B. 盲目乐观', 'C. 辩证看待', 'D. 悲观失望'],
      en: ['A. 全盘否定', 'B. 盲目乐观', 'C. 辩证看待', 'D. 悲观失望'],
      ko: ['A. 全盘否定', 'B. 盲目乐观', 'C. 辩证看待', 'D. 悲观失望'],
      ja: ['A. 全盘否定', 'B. 盲目乐观', 'C. 辩证看待', 'D. 悲观失望'],
      'zh-TW': ['A. 全盤否定', 'B. 盲目樂觀', 'C. 辯證看待', 'D. 悲觀失望'],
    },
    correctAnswer: {
      zh: 'C. 辩证看待',
      en: 'C. 辩证看待',
      ko: 'C. 辩证看待',
      ja: 'C. 辩证看待',
      'zh-TW': 'C. 辯證看待',
    },
    score: 1,
  },
  // 写作 (Writing) - 2题
  {
    id: 'hsk9-w1-1',
    level: 9,
    type: QuestionType.Analysis,
    question: {
      zh: '[写作] 请阅读以下学术观点，写一篇评论文章（约600字）。\n观点：随着人工智能的发展，未来大部分职业将被机器取代，人类将面临大规模失业的危机。',
      en: '[Writing] Please read the following academic viewpoint and write a commentary article (about 600 words).\n观点：随着人工智能的发展，未来大部分职业将被机器取代，人类将面临大规模失业的危机。',
      ko: '[쓰기] 다음 학술적 관점을 읽고 논평 기사를 작성하세요 (약 600자).\n观点：随着人工智能的发展，未来大部分职业将被机器取代，人类将面临大规模失业的危机。',
    },
    referenceAnswer: {
      zh: '（参考范文要点）1. 承认AI对就业市场的冲击；2. 分析哪些职业容易被取代，哪些不易；3. 提出AI也会创造新就业机会；4. 强调人类应提升自身技能，与AI协作共存；5. 呼吁社会制度的变革以适应新时代。',
      en: '（参考范文要点）1. 承认AI对就业市场的冲击；2. 分析哪些职业容易被取代，哪些不易；3. 提出AI也会创造新就业机会；4. 强调人类应提升自身技能，与AI协作共存；5. 呼吁社会制度的变革以适应新时代。',
      ko: '（参考范文要点）1. 承认AI对就业市场的冲击；2. 分析哪些职业容易被取代，哪些不易；3. 提出AI也会创造新就业机会；4. 强调人类应提升自身技能，与AI协作共存；5. 呼吁社会制度的变革以适应新时代。',
    },
    score: 25,
  },
  // 翻译 (Translation) - 4题
  {
    id: 'hsk9-t1-1',
    level: 9,
    type: QuestionType.Translation,
    question: {
      zh: '[翻译] 请将以下古文段落翻译成现代汉语：\n大道之行也，天下为公，选贤与能，讲信修睦。故人不独亲其亲，不独子其子，使老有所终，壮有所用，幼有所长，矜、寡、孤、独、废疾者皆有所养。',
      en: '[Translation] Please translate the following ancient Chinese paragraph into modern Chinese:\n大道之行也，天下为公，选贤与能，讲信修睦。故人不独亲其亲，不独子其子，使老有所终，壮有所用，幼有所长，矜、寡、孤、独、废疾者皆有所养。',
      ko: '[번역] 다음 고문 단락을 현대 중국어로 번역하세요:\n大道之行也，天下为公，选贤与能，讲信修睦。故人不独亲其亲，不独子其子，使老有所终，壮有所用，幼有所长，矜、寡、孤、独、废疾者皆有所养。',
    },
    referenceAnswer: {
      zh: '在大道施行的时候，天下是人们所共有的，把品德高尚的人、能干的人选拔出来，讲求诚信，培养和睦气氛。所以人们不单是亲爱自己的亲人，不单是抚育自己的子女，使老年人能终其天年，中年人能为社会效力，幼童能顺利地成长，使老而无妻的人、老而无夫的人、幼而无父的人、老而无子的人、残疾人都能得到供养。',
      en: '在大道施行的时候，天下是人们所共有的，把品德高尚的人、能干的人选拔出来，讲求诚信，培养和睦气氛。所以人们不单是亲爱自己的亲人，不单是抚育自己的子女，使老年人能终其天年，中年人能为社会效力，幼童能顺利地成长，使老而无妻的人、老而无夫的人、幼而无父的人、老而无子的人、残疾人都能得到供养。',
      ko: '在大道施行的时候，天下是人们所共有的，把品德高尚的人、能干的人选拔出来，讲求诚信，培养和睦气氛。所以人们不单是亲爱自己的亲人，不单是抚育自己的子女，使老年人能终其天年，中年人能为社会效力，幼童能顺利地成长，使老而无妻的人、老而无夫的人、幼而无父的人、老而无子的人、残疾人都能得到供养。',
    },
    score: 20,
  },
  // 口语 (Speaking) - 5题
  {
    id: 'hsk9-s1-1',
    level: 9,
    type: QuestionType.Speaking,
    question: {
      zh: '[口语] 请就“文化自信与文明互鉴”这一主题进行即兴演讲。（限时5分钟）',
      en: '[Speaking] Please give an impromptu speech on the topic of "Cultural Confidence and Mutual Learning among Civilizations". (Time limit: 5 minutes)',
      ko: '[말하기] "문화적 자신감과 문명 간의 상호 학습"이라는 주제로 즉흥 연설을 하세요. (제한 시간: 5분)',
    },
    referenceAnswer: {
      zh: '（参考演讲结构）1. 开篇点题：文化自信是基础，文明互鉴是途径；2. 论证文化自信的重要性（民族精神、国家认同）；3. 论证文明互鉴的必要性（取长补短、共同进步）；4. 结合实例（如“一带一路”文化交流）；5. 结尾升华：构建人类命运共同体。',
      en: '（参考演讲结构）1. 开篇点题：文化自信是基础，文明互鉴是途径；2. 论证文化自信的重要性（民族精神、国家认同）；3. 论证文明互鉴的必要性（取长补短、共同进步）；4. 结合实例（如“一带一路”文化交流）；5. 结尾升华：构建人类命运共同体。',
      ko: '（参考演讲结构）1. 开篇点题：文化自信是基础，文明互鉴是途径；2. 论证文化自信的重要性（民族精神、国家认同）；3. 论证文明互鉴的必要性（取长补短、共同进步）；4. 结合实例（如“一带一路”文化交流）；5. 结尾升华：构建人类命运共同体。',
    },
    score: 20,
  },
];

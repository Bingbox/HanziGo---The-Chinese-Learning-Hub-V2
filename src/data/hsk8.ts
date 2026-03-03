import { Question, QuestionType } from '../types/hsk';

export const hsk8Questions: Question[] = [
  // 听力 (Listening) - 40题
  {
    id: 'hsk8-l1-1',
    level: 8,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力] 听录音，选择正确答案：\n（录音内容：关于中国古代经济史的讲座片段，涉及宋代纸币“交子”的起源）\n问：讲座中提到“交子”出现的根本原因是什么？',
      en: '[Listening] Listen to the audio and choose the correct answer:\n(Audio: Fragment of a lecture on ancient Chinese economic history, involving the origin of Song Dynasty paper money "Jiaozi")\nQuestion: What is the fundamental reason for the appearance of "Jiaozi" mentioned in the lecture?',
      ko: '[듣기] 녹음을 듣고 올바른 답을 고르세요:\n(녹음 내용: 송나라 지폐 "교자"의 기원과 관련된 중국 고대 경제사 강의 발췌)\n질문: 강의에서 언급된 "교자"가 출현한 근본적인 원인은 무엇입니까?',
      ja: '[リスニング] 音声を聞いて、正しい答えを選んでください：\n（音声内容：关于中国古代经济史的讲座片段，涉及宋代纸币“交子”的起源）\n質問：講義の中で「交子」が出現した根本的な原因は何だと述べられていますか？',
      'zh-TW': '[聽力] 聽錄音，選擇正確答案：\n（錄音內容：關於中國古代經濟史的講座片段，涉及宋代紙幣「交子」的起源）\n問：講座中提到「交子」出現的根本原因是什麼？',
    },
    options: {
      zh: ['A. 金属货币携带不便', 'B. 商品经济的高度发展', 'C. 政府强制推行', 'D. 造纸技术的进步'],
      en: ['A. 金属货币携带不便', 'B. 商品经济的高度发展', 'C. 政府强制推行', 'D. 造纸技术的进步'],
      ko: ['A. 金属货币携带不便', 'B. 商品经济的高度发展', 'C. 政府强制推行', 'D. 造纸技术的进步'],
      ja: ['A. 金属货币携带不便', 'B. 商品经济的高度发展', 'C. 政府强制推行', 'D. 造纸技术的进步'],
      'zh-TW': ['A. 金屬貨幣攜帶不便', 'B. 商品經濟的高度發展', 'C. 政府強制推行', 'D. 造紙技術的進步'],
    },
    correctAnswer: {
      zh: 'B. 商品经济的高度发展',
      en: 'B. 商品经济的高度发展',
      ko: 'B. 商品经济的高度发展',
      ja: 'B. 商品经济的高度发展',
      'zh-TW': 'B. 商品經濟的高度發展',
    },
    score: 1,
  },
  {
    id: 'hsk8-l1-2',
    level: 8,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力] 听录音，选择正确答案：\n（录音内容：关于中国传统建筑中“斗拱”结构的科普介绍）\n问：斗拱在传统建筑中的主要作用是什么？',
      'zh-TW': '[聽力] 聽錄音，選擇正確答案：\n（錄音內容：關於中國傳統建築中「斗拱」結構的科普介紹）\n問：斗拱在傳統建築中的主要作用是什麼？',
      en: '[Listening] Listen to the audio and choose the correct answer:\n(Audio: Popular science introduction to the "Dougong" structure in traditional Chinese architecture)\nQuestion: What is the main function of Dougong in traditional architecture?',
      ko: '[듣기] 녹음을 듣고 올바른 답을 고르세요:\n(녹음 내용: 중국 전통 건축의 "두공" 구조에 대한 대중 과학 소개)\n질문: 전통 건축에서 두공의 주요 역할은 무엇입니까?',
      ja: '[リスニング] 音声を聞いて、正しい答えを選んでください：\n（音声内容：中国伝統建築における「斗拱（ときょう）」構造に関する解説）\n質問：伝統建築における斗拱の主な役割は何ですか？',
    },
    options: {
      zh: ['A. 装饰美化', 'B. 承重与抗震', 'C. 排水防潮', 'D. 通风采光'],
      'zh-TW': ['A. 裝飾美化', 'B. 承重與抗震', 'C. 排水防潮', 'D. 通風採光'],
      en: ['A. 装饰美化', 'B. 承重与抗震', 'C. 排水防潮', 'D. 通风采光'],
      ko: ['A. 装饰美化', 'B. 承重与抗震', 'C. 排水防潮', 'D. 通风采光'],
      ja: ['A. 装饰美化', 'B. 承重与抗震', 'C. 排水防潮', 'D. 通风采光'],
    },
    correctAnswer: {
      zh: 'B. 承重与抗震',
      'zh-TW': 'B. 承重與抗震',
      en: 'B. 承重与抗震',
      ko: 'B. 承重与抗震',
      ja: 'B. 承重与抗震',
    },
    score: 1,
  },
  // 阅读 (Reading) - 47题
  {
    id: 'hsk8-r1-1',
    level: 8,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 阅读下文，选出正确答案：\n《红楼梦》不仅是一部伟大的小说，更是一部百科全书式的著作。它对清代社会的各个方面，如饮食、服饰、建筑、礼仪等，都有详尽而生动的描写。因此，研究《红楼梦》对于了解当时的社会风貌具有极高的史料价值。\n★ 这段文字主要说明了《红楼梦》的：',
      en: '[Reading] Read the text and choose the correct answer:\n《红楼梦》不仅是一部伟大的小说，更是一部百科全书式的著作。It has detailed and vivid descriptions of all aspects of Qing Dynasty society, such as food, clothing, architecture, etiquette, etc. Therefore, studying "Dream of the Red Chamber" has extremely high historical value for understanding the social features of that time.\n★ This passage mainly explains the 《红楼梦》\'s:',
      ko: '[읽기] 다음 글을 읽고 올바른 답을 고르세요:\n《红楼梦》不仅是一部伟大的小说，更是一部百科全서식 저작입니다. 청나라 사회의 음식, 복식, 건축, 예절 등 모든 측면에 대해 상세하고 생생하게 묘사하고 있습니다. 따라서 "홍루몽" 연구는 당시의 사회상을 이해하는 데 매우 높은 사료적 가치를 지닙니다.\n★ 이 글은 주로 《红楼梦》의 무엇을 설명하고 있습니까?',
      ja: '[リーディング] 次の文章を読み、正しい答えを選んでください：\n《红楼梦》不仅是一部伟大的小说，更是一部百科全書的な著作です。清代社会の飲食、服飾、建築、礼儀など、あらゆる側面について詳細かつ生き生きと描写されています。したがって、「紅楼夢」の研究は当時の社会風貌を理解する上で非常に高い史料価値を持っています。\n★ この文章は主に 《红楼梦》の何を説明していますか？',
      'zh-TW': '[閱讀] 閱讀下文，選出正確答案：\n《紅樓夢》不僅是一部偉大的小說，更是一部百科全書式的著作。它對清代社會的各個方面，如飲食、服飾、建築、禮儀等，都有詳盡而生動的描寫。因此，研究《紅樓夢》對於瞭解當時的社會風貌具有極高的史料價值。\n★ 這段文字主要說明了《紅樓夢》的：',
    },
    options: {
      zh: ['A. 文学成就', 'B. 艺术特色', 'C. 史料价值', 'D. 人物形象'],
      en: ['A. 文学成就', 'B. 艺术特色', 'C. 史料价值', 'D. 人物形象'],
      ko: ['A. 文学成就', 'B. 艺术特色', 'C. 史料价值', 'D. 人物形象'],
      ja: ['A. 文学成就', 'B. 艺术特色', 'C. 史料价值', 'D. 人物形象'],
      'zh-TW': ['A. 文學成就', 'B. 藝術特色', 'C. 史料價值', 'D. 人物形象'],
    },
    correctAnswer: {
      zh: 'C. 史料价值',
      en: 'C. 史料价值',
      ko: 'C. 史料价值',
      ja: 'C. 史料价值',
      'zh-TW': 'C. 史料價值',
    },
    score: 1,
  },
  // 写作 (Writing) - 2题
  {
    id: 'hsk8-w1-1',
    level: 8,
    type: QuestionType.Analysis,
    question: {
      zh: '[写作] 请阅读以下材料，写一篇议论文（约400字）。\n材料：近年来，“慢生活”理念逐渐流行。有人认为这是一种逃避现实的表现，也有人认为这是对生活质量的追求。请谈谈你的看法。',
      en: '[Writing] Please read the following material and write an argumentative essay (about 400 words).\n材料：近年来，“慢生活”理念逐渐流行。有人认为这是一种逃避现实的表现，也有人认为这是对生活质量的追求。请谈谈你的看法。',
      ko: '[쓰기] 다음 자료를 읽고 논설문을 작성하세요 (약 400자).\n材料：近年来，“慢生活”理念逐渐流行。有人认为这是一种逃避现实的表现，也有人认为这是对生活质量的追求。请谈谈你的看法。',
    },
    referenceAnswer: {
      zh: '（参考范文要点）1. 阐述“慢生活”的定义；2. 分析正反两方观点；3. 提出自己的观点：慢生活并非懒惰，而是为了更好地调整节奏，提高效率和幸福感；4. 结合现代社会压力大的背景进行论证。',
      en: '（参考范文要点）1. 阐述“慢生活”的定义；2. 分析正反两方观点；3. 提出自己的观点：慢生活并非懒惰，而是为了更好地调整节奏，提高效率和幸福感；4. 结合现代社会压力大的背景进行论证。',
      ko: '（参考范文要点）1. 阐述“慢生活”的定义；2. 分析正反两方观点；3. 提出自己的观点：慢生活并非懒惰，而是为了更好地调整节奏，提高效率和幸福感；4. 结合现代社会压力大的背景进行论证。',
    },
    score: 20,
  },
  // 翻译 (Translation) - 4题
  {
    id: 'hsk8-t1-1',
    level: 8,
    type: QuestionType.Translation,
    question: {
      zh: '[翻译] 请将以下段落翻译成中文：\nSustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs. It contains within it two key concepts: the concept of needs, in particular the essential needs of the world\'s poor, to which overriding priority should be given.',
      en: '[Translation] Please translate the following paragraph into Chinese:\nSustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs. It contains within it two key concepts: the concept of needs, in particular the essential needs of the world\'s poor, to which overriding priority should be given.',
      ko: '[번역] 다음 단락을 중국어로 번역하세요:\nSustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs. It contains within it two key concepts: the concept of needs, in particular the essential needs of the world\'s poor, to which overriding priority should be given.',
    },
    referenceAnswer: {
      zh: '可持续发展是指既满足当代人的需求，又不损害后代人满足其自身需求的能力的发展。它包含两个关键概念：需求的概念，特别是世界贫困人口的基本需求，应给予其压倒性的优先权。',
      en: '可持续发展是指既满足当代人的需求，又不损害后代人满足其自身需求的能力的发展。它包含两个关键概念：需求的概念，特别是世界贫困人口的基本需求，应给予其压倒性的优先权。',
      ko: '可持续发展是指既满足当代人的需求，又不损害后代人满足其自身需求的能力的发展。它包含两个关键概念：需求的概念，特别是世界贫困人口的基本需求，应给予其压倒性的优先权。',
    },
    score: 15,
  },
  // 口语 (Speaking) - 5题
  {
    id: 'hsk8-s1-1',
    level: 8,
    type: QuestionType.Speaking,
    question: {
      zh: '[口语] 请就“科技发展与人文关怀”这一话题发表你的看法。（限时3分钟）',
      en: '[Speaking] Please express your views on the topic of "Technological Development and Humanistic Care". (Time limit: 3 minutes)',
      ko: '[말하기] "과학 기술 발전과 인문학적 배려"라는 주제에 대해 자신의 견해를 발표하세요. (제한 시간: 3분)',
    },
    referenceAnswer: {
      zh: '（参考回答要点）1. 科技带来的便利与挑战；2. 人文关怀在科技时代的缺失与重要性；3. 如何平衡两者关系；4. 举例说明（如AI伦理、数字鸿沟等）。',
      en: '（参考回答要点）1. 科技带来的便利与挑战；2. 人文关怀在科技时代的缺失与重要性；3. 如何平衡两者关系；4. 举例说明（如AI伦理、数字鸿沟等）。',
      ko: '（参考回答要点）1. 科技带来的便利与挑战；2. 人文关怀在科技时代的缺失与重要性；3. 如何平衡两者关系；4. 举例说明（如AI伦理、数字鸿沟等）。',
    },
    score: 15,
  },
];

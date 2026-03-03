import { Question, QuestionType } from '../types/hsk';

export const hsk6Questions: Question[] = [
  // 听力模拟 (Listening Simulation) - Single Choice
  {
    id: 'hsk6-l1-1',
    level: 6,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听录音，选择与所听内容一致的一项：\n录音：童话里的人物往往在现实中并不存在。童话最大的特点是使用丰富的想象力，让动物和植物都拥有了人的感情，很容易让儿童接受。虽然童话主要是写给孩子的，不过，有童心的成年人同样能在童话中找到快乐。',
      en: '[Listening Simulation] Listen to the audio and choose the option that matches the content:\nAudio: 童话里的人物往往在现实中并不存在。童话最大的特点是使用丰富的想象力，让动物和植物都拥有了人的感情，很容易让儿童接受。虽然童话主要是写给孩子的，不过，有童心的成年人同样能在童话中找到快乐。',
      ko: '[듣기 시뮬레이션] 녹음을 듣고 내용과 일치하는 항목을 고르세요:\n녹음: 童话里的人物往往在现实中并不存在。童话最大的特点是使用丰富的想象力，让动物和植物都拥有了人的感情，很容易让儿童接受。虽然童话主要是写给孩子的，不过，有童心的成年人同样能在童话中找到快乐。',
      ja: '[リスニング模擬] 音声を聞いて、内容と一致するものを一つ選んでください：\n音声：童话里的人物往往在现实中并不存在。童话最大的特点是使用丰富的想象力，让动物和植物都拥有了人的感情，很容易让儿童接受。虽然童话主要是写给孩子的，不过，有童心的成年人同样能在童话中找到快乐。',
      'zh-TW': '[聽力模擬] 聽錄音，選擇與所聽內容一致的一項：\n錄音：童話裏的人物往往在現實中並不存在。童話最大的特點是使用豐富的想像力，讓動物和植物都擁有了人的感情，很容易讓兒童接受。雖然童話主要是寫給孩子的，不過，有童心的成年人同樣能在童話中找到快樂。',
    },
    options: {
      zh: ['A. 童话想象力丰富', 'B. 成人都喜欢童话', 'C. 童话是写给成人的', 'D. 童话不适合儿童阅读'],
      en: ['A. 童话想象力丰富', 'B. 成人都喜欢童话', 'C. 童话是写给成人的', 'D. 童话不适合儿童阅读'],
      ko: ['A. 童话想象力丰富', 'B. 成人都喜欢童话', 'C. 童话是写给成人的', 'D. 童话不适合儿童阅读'],
      ja: ['A. 童话想象力丰富', 'B. 成人都喜欢童话', 'C. 童话是写给成人的', 'D. 童话不适合儿童阅读'],
      'zh-TW': ['A. 童話想像力豐富', 'B. 成人都喜歡童話', 'C. 童話是寫給成人的', 'D. 童話不適合兒童閱讀'],
    },
    correctAnswer: {
      zh: 'A. 童话想象力丰富',
      en: 'A. 童话想象力丰富',
      ko: 'A. 童话想象力丰富',
      ja: 'A. 童话想象力丰富',
      'zh-TW': 'A. 童話想像力豐富',
    },
    score: 10,
  },
  {
    id: 'hsk6-l1-2',
    level: 6,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[听力模拟] 听录音，选择与所听内容一致的一项：\n录音：在这个竞争激烈的时代，终身学习已经不再是一个口号，而是一种生存技能。只有不断更新自己的知识储备，才能在职场中保持竞争力。',
      'zh-TW': '[聽力模擬] 聽錄音，選擇與所聽內容一致的一項：\n錄音：在這個競爭激烈的時代，終身學習已經不再是一個口號，而是一種生存技能。只有不斷更新自己的知識儲備，才能在職場中保持競爭力。',
      en: '[Listening Simulation] Listen to the audio and choose the option that matches the content:\nAudio: 在这个竞争激烈的时代，终身学习已经不再是一个口号，而是一种生存技能。只有不断更新自己的知识储备，才能在职场中保持竞争力。',
      ko: '[듣기 시뮬레이션] 녹음을 듣고 내용과 일치하는 항목을 고르세요:\n녹음: 在这个竞争激烈的时代，终身学习已经不再是一个口号，而是一种生存技能。只有不断更新自己的知识储备，才能在职场中保持竞争力。',
      ja: '[リスニング模擬] 音声を聞いて、内容と一致するものを一つ選んでください：\n音声：在这个竞争激烈的时代，终身学习已经不再是一个口号，而是一种生存技能。只有不断更新自己的知识储备，才能在职场中保持竞争力。',
    },
    options: {
      zh: ['A. 竞争并不激烈', 'B. 学习只是口号', 'C. 知识更新很重要', 'D. 职场不需要竞争'],
      'zh-TW': ['A. 競爭並不激烈', 'B. 學習只是口號', 'C. 知識更新很重要', 'D. 職場不需要競爭'],
      en: ['A. 竞争并不激烈', 'B. 学习只是口号', 'C. 知识更新很重要', 'D. 职场不需要竞争'],
      ko: ['A. 竞争并不激烈', 'B. 学习只是口号', 'C. 知识更新很重要', 'D. 职场不需要竞争'],
      ja: ['A. 竞争并不激烈', 'B. 学习只是口号', 'C. 知识更新很重要', 'D. 职场不需要竞争'],
    },
    correctAnswer: {
      zh: 'C. 知识更新很重要',
      'zh-TW': 'C. 知識更新很重要',
      en: 'C. 知识更新很重要',
      ko: 'C. 知识更新很重要',
      ja: 'C. 知识更新很重要',
    },
    score: 10,
  },
  // 阅读 (Reading) - Single Choice (Find grammatical error)
  {
    id: 'hsk6-r1-1',
    level: 6,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 请选出有语病的一项：',
      en: '[Reading] Please choose the option with a grammatical error:',
      ko: '[읽기] 문법적으로 오류가 있는 항목을 고르세요:',
      ja: '[リーディング] 文法的に誤りのあるものを一つ選んでください：',
      'zh-TW': '[閱讀] 請選出有語病的一項：',
    },
    options: {
      zh: [
        'A. 他突然提出辞职，让我们感到很意外。',
        'B. 茅盾的童年生活，是他创作《春蚕》的源泉。',
        'C. 劳动时间缩短，是大众旅游得以发展的基本条件。',
        'D. 他除了班里和学生会的工作外，还承担了广播站的主持人。'
      ],
      en: [
        'A. 他突然提出辞职，让我们感到很意外。',
        'B. 茅盾的童年生活，是他创作《春蚕》的源泉。',
        'C. 劳动时间缩短，是大众旅游得以发展的基本条件。',
        'D. 他除了班里和学生会的工作外，还承担了广播站的主持人。'
      ],
      ko: [
        'A. 他突然提出辞职，让我们感到很意外。',
        'B. 茅盾的童年生活，是他创作《春蚕》的源泉。',
        'C. 劳动时间缩短，是大众旅游得以发展的基本条件。',
        'D. 他除了班里和学生会的工作外，还承担了广播站的主持人。'
      ],
      ja: [
        'A. 他突然提出辞职，让我们感到很意外。',
        'B. 茅盾的童年生活，是他创作《春蚕》的源泉。',
        'C. 劳动时间缩短，是大众旅游得以发展的基本条件。',
        'D. 他除了班里和学生会的工作外，还承担了广播站的主持人。'
      ],
      'zh-TW': [
        'A. 他突然提出辭職，讓我們感到很意外。',
        'B. 茅盾的童年生活，是他創作《春蠶》的源泉。',
        'C. 勞動時間縮短，是大眾旅遊得以發展的基本條件。',
        'D. 他除了班裏和學生會的工作外，還承擔了廣播站的主持人。'
      ],
    },
    correctAnswer: 'D. 他除了班里和学生会的工作外，还承担了广播站的主持人。',
    score: 15,
  },
  {
    id: 'hsk6-r1-2',
    level: 6,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 请选出有语病的一项：',
      en: '[Reading] Please choose the option with a grammatical error:',
      ko: '[읽기] 문법적으로 오류가 있는 항목을 고르세요:',
      ja: '[リーディング] 文法的に誤りのあるものを一つ選んでください：',
    },
    options: {
      zh: [
        'A. 经过大家的努力，终于完成了这项任务。',
        'B. 这种产品的价格比原来降低了一倍。',
        'C. 无论天气多么恶劣，他都坚持准时到校。',
        'D. 他的建议得到了大家的赞同和支持。'
      ],
      en: [
        'A. 经过大家的努力，终于完成了这项任务。',
        'B. 这种产品的价格比原来降低了一倍。',
        'C. 无论天气多么恶劣，他都坚持准时到校。',
        'D. 他的建议得到了大家的赞同 and 支持。'
      ],
      ko: [
        'A. 经过大家的努力，终于完成了这项任务。',
        'B. 这种产品的价格比原来降低了一倍。',
        'C. 无论天气多么恶劣，他都坚持准时到校。',
        'D. 他的建议得到了大家的赞同和支持。'
      ],
      ja: [
        'A. 经过大家的努力，终于完成了这项任务。',
        'B. 这种产品的价格比原来降低了一倍。',
        'C. 无论天气多么恶劣，他都坚持准时到校。',
        'D. 他的建议得到了大家的赞同和支持。'
      ],
    },
    correctAnswer: 'B. 这种产品的价格比原来降低了一倍。',
    score: 15,
  },
  // 阅读 (Reading) - Fill in the Blank (Multiple Choice)
  {
    id: 'hsk6-r2-1',
    level: 6,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 选词填空：\n椅子的舒适问题，只要设计时考虑人体结构的（ ___ ），便可以解决。设计一把椅子而（ ___ ）了人体的结构，就像设计蛋盒而不顾蛋的（ ___ ）。',
      en: '[Reading] Choose the correct words to fill in the blanks:\n椅子的舒适问题，只要设计时考虑人体结构的（ ___ ），便可以解决。设计一把椅子而（ ___ ）了人体的结构，就像设计蛋盒而不顾蛋的（ ___ ）。',
      ko: '[읽기] 빈칸에 알맞은 단어를 고르세요:\n椅子的舒适问题，只要设计时考虑人体结构的（ ___ ），便可以解决。设计一把椅子而（ ___ ）了人体的结构，就像设计蛋盒而不顾蛋的（ ___ ）。',
    },
    options: {
      zh: [
        'A. 特征 / 忽略 / 形状',
        'B. 本质 / 忽视 / 形态',
        'C. 特点 / 忘记 / 外观',
        'D. 构造 / 违反 / 外貌'
      ],
      en: [
        'A. 特征 / 忽略 / 形状',
        'B. 本质 / 忽视 / 形态',
        'C. 特点 / 忘记 / 外观',
        'D. 构造 / 违反 / 外貌'
      ],
      ko: [
        'A. 特征 / 忽略 / 形状',
        'B. 本质 / 忽视 / 形态',
        'C. 特点 / 忘记 / 外观',
        'D. 构造 / 违反 / 外貌'
      ],
    },
    correctAnswer: 'A. 特征 / 忽略 / 形状',
    score: 15,
  },
  // 阅读 (Reading) - Reading Comprehension
  {
    id: 'hsk6-r4-1',
    level: 6,
    type: QuestionType.SingleChoice,
    question: {
      zh: '[阅读] 阅读短文，选择正确答案：\n对于普通双排5座轿车而言，应该把哪个座位留给客人，才是最有礼貌的做法呢？专家表示，在社交应酬中，如果是主人自驾车陪客人出去游玩，那么副驾驶座就是最有礼貌的座位。而在公务接待中，副驾驶座后面的座位是最礼貌的座位。公务接待时，副驾驶座被称为“随员座”，一般是翻译、秘书的位置，让客人坐在这里是不礼貌的。\n\n★ 自己驾车时，把哪个座位留给客人是最礼貌的？',
      en: '[Reading] Read the text and choose the correct answer:\n对于普通双排5座轿车而言，应该把哪个座位留给客人，才是最有礼貌的做法呢？专家表示，在社交应酬中，如果是主人自驾车陪客人出去游玩，那么副驾驶座就是最有礼貌的座位。而在公务接待中，副驾驶座后面的座位是最礼貌的座位。公务接待时，副驾驶座被称为“随员座”，一般是翻译、秘书的位置，让客人坐在这里是不礼貌的。\n\n★ 自己驾车时，把哪个座位留给客人是最礼貌的？',
      ko: '[읽기] 다음 글을 읽고 올바른 답을 고르세요:\n对于普通双排5座轿车而言，应该把哪个座位留给客人，才是最有礼貌的做法呢？专家表示，在社交应酬中，如果是主人自驾车陪客人出去游玩，那么副驾驶座就是最有礼貌的座位。而在公务接待中，副驾驶座后面的座位是最礼貌的座位。公务接待时，副驾驶座被称为“随员座”，一般是翻译、秘书的位置，让客人坐在这里是不礼貌的。\n\n★ 自己驾车时，把哪个座位留给客人是最礼貌的？',
    },
    options: {
      zh: ['A. 副驾驶座', 'B. 驾驶座后座', 'C. 后排正中间', 'D. 副驾驶座后座'],
      en: ['A. 副驾驶座', 'B. 驾驶座后座', 'C. 后排正中间', 'D. 副驾驶座后座'],
      ko: ['A. 副驾驶座', 'B. 驾驶座后座', 'C. 后排正中间', 'D. 副驾驶座后座'],
    },
    correctAnswer: {
      zh: 'A. 副驾驶座',
      en: 'A. 副驾驶座',
      ko: 'A. 副驾驶座',
    },
    score: 20,
  },
  // 书写 (Writing) - Summary
  {
    id: 'hsk6-w1-1',
    level: 6,
    type: QuestionType.Analysis,
    question: {
      zh: '[书写] 缩写文章：\n请仔细阅读下面这篇文章（约1000字），然后将其缩写成一篇400字左右的短文。标题自拟。只需复述文章内容，不需加入自己的观点。\n（此处省略原文《父亲的遗嘱》内容，请根据原文大意进行缩写）',
      en: '[Writing] Summarize the article:\nPlease read the following article carefully (about 1000 words), and then summarize it into a short essay of about 400 words. Create your own title. Just retell the content of the article, do not add your own opinions.\n(The original text "Father\'s Will" is omitted here, please summarize based on the general idea)',
      ko: '[쓰기] 글 요약하기:\n다음 글(약 1000자)을 주의 깊게 읽고, 약 400자의 짧은 글로 요약하세요. 제목은 직접 정하세요. 글의 내용만 다시 말하고, 자신의 의견은 추가하지 마세요.\n(원문 "아버지의 유언" 내용은 생략됨, 전체적인 의미를 바탕으로 요약하세요)',
    },
    referenceAnswer: {
      zh: '（参考范文大意）一位富有的父亲为了让挥霍无度的儿子学会自立，假装破产。儿子在经历打击后，到父亲朋友的公司从底层做起，历经艰辛，最终凭借自己的努力和聪明才智成为总经理，并收获了真正的爱情和友谊。父亲临终前留下遗嘱，揭示了假破产的真相，表示用有价的财产换来了一个无价的能干儿子，他感到非常高兴。',
      en: '(Sample Summary Idea) A wealthy father pretended to be bankrupt in order to make his extravagant son learn to be independent. After experiencing the blow, the son started from the bottom in his father\'s friend\'s company, went through hardships, and finally became the general manager through his own efforts and intelligence, and gained true love and friendship. Before his death, the father left a will revealing the truth of the fake bankruptcy, saying that he was very happy to exchange his valuable property for an invaluable capable son.',
      ko: '(모범 답안 개요) 부유한 아버지는 낭비벽이 심한 아들이 자립심을 배우게 하려고 파산한 척했습니다. 충격을 받은 아들은 아버지 친구의 회사에서 밑바닥부터 시작하여 고난을 겪은 끝에 자신의 노력과 지혜로 총지배인이 되었고, 진정한 사랑과 우정을 얻었습니다. 아버지는 임종 전에 가짜 파산의 진실을 밝히는 유언장을 남기며, 가치 있는 재산을 돈으로 살 수 없는 유능한 아들과 바꾸게 되어 매우 기쁘다고 말했습니다.',
    },
    scoringCriteria: {
      zh: '内容完整，概括准确，条理清晰，字数在400字左右，无明显语病即可得分。',
      en: 'Points are awarded if the content is complete, the summary is accurate, the organization is clear, the word count is around 400 words, and there are no obvious grammatical errors.',
      ko: '내용이 완전하고, 요약이 정확하며, 조리가 명확하고, 글자 수가 400자 내외이며, 명백한 문법적 오류가 없으면 점수를 얻습니다.',
    },
    score: 40,
  },
];

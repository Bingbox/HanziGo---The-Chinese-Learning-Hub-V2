
export interface CuratedArticle {
  id: string;
  icon: string;
  chineseTitle: string;
  pinyinTitle: string;
  summary: string;
  fullContentChinese: string;
  fullContentTranslated: string;
  keyConcepts: { word: string; pinyin: string; meaning: string }[];
  reflection: string;
}

export const PRESET_CULTURE_CONTENT: Record<string, CuratedArticle> = {
  // PHILOSOPHY (哲学)
  "confucianism": {
    id: "confucianism",
    icon: "🏛️",
    chineseTitle: "儒家思想",
    pinyinTitle: "Rújiā Sīxiǎng",
    summary: "summary_confucianism",
    fullContentChinese: "儒家思想 (Rújiā Sīxiǎng) 是中国文化的灵魂。孔子提倡“仁” (Rén) 和“礼” (Lǐ)，强调个人通过修身实现社会和谐。儒家认为，家庭是社会的微缩模型，孝道 (Xiàodào) 是万德之基。",
    fullContentTranslated: "fullContent_confucianism",
    keyConcepts: [
      { word: "仁", pinyin: "Rén", meaning: "confucianism_仁" },
      { word: "礼", pinyin: "Lǐ", meaning: "confucianism_礼" },
      { word: "修身", pinyin: "Xiūshēn", meaning: "confucianism_修身" }
    ],
    reflection: "reflection_confucianism"
  },
  "taoism": {
    id: "taoism",
    icon: "☯️",
    chineseTitle: "道家文化",
    pinyinTitle: "Dàojiā Wénhuà",
    summary: "summary_taoism",
    fullContentChinese: "道家 (Dàojiā) 崇尚自然。老子认为“道” (Dào) 是万物之源。通过“无为” (Wúwéi)，人类可以达到顺应天时、返璞归真的境界。阴阳 (Yīnyáng) 的转换体现了宇宙间互补与循环的永恒真理。",
    fullContentTranslated: "fullContent_taoism",
    keyConcepts: [
      { word: "道", pinyin: "Dào", meaning: "taoism_道" },
      { word: "无为", pinyin: "Wúwéi", meaning: "taoism_无为" },
      { word: "阴阳", pinyin: "Yīnyáng", meaning: "taoism_阴阳" }
    ],
    reflection: "reflection_taoism"
  },
  "mohism": {
    id: "mohism",
    icon: "🕊️",
    chineseTitle: "墨家思想",
    pinyinTitle: "Mòjiā Sīxiǎng",
    summary: "summary_mohism",
    fullContentChinese: "墨家 (Mòjiā) 由墨子创立，主张“兼爱” (Jiān'ài) 和“非攻” (Fēigōng)。墨家关注社会底层，提倡节约，反对不义战争，体现了古代的人道主义精神。",
    fullContentTranslated: "fullContent_mohism",
    keyConcepts: [
      { word: "兼爱", pinyin: "Jiān'ài", meaning: "mohism_兼爱" },
      { word: "非攻", pinyin: "Fēigōng", meaning: "mohism_非攻" }
    ],
    reflection: "reflection_mohism"
  },
  "chinese_buddhism": {
    id: "chinese_buddhism",
    icon: "🧘",
    chineseTitle: "中国佛教",
    pinyinTitle: "Zhōngguó Fójiào",
    summary: "summary_chinese_buddhism",
    fullContentChinese: "佛教传入中国后，与本土文化融合，形成了具有中国特色的佛教，如禅宗 (Chánzōng)。它强调“顿悟” (Dùnwù) 和心性修养，对中国哲学、文学和艺术产生了深远影响。",
    fullContentTranslated: "fullContent_chinese_buddhism",
    keyConcepts: [
      { word: "禅宗", pinyin: "Chánzōng", meaning: "chinese_buddhism_禅宗" },
      { word: "顿悟", pinyin: "Dùnwù", meaning: "chinese_buddhism_顿悟" }
    ],
    reflection: "reflection_chinese_buddhism"
  },
  // HISTORY (历史)
  "silk_road": {
    id: "silk_road",
    icon: "🐫",
    chineseTitle: "丝绸之路",
    pinyinTitle: "Sīchóu Zhī Lù",
    summary: "summary_silk_road",
    fullContentChinese: "丝绸之路是东西方文明交流的桥梁。汉代张骞出使西域开启了这一征程。它不仅输送丝绸，更促进了造纸术、宗教和艺术在全球范围内的传播。",
    fullContentTranslated: "fullContent_silk_road",
    keyConcepts: [
      { word: "交流", pinyin: "Jiāoliú", meaning: "silk_road_交流" },
      { word: "文明", pinyin: "Wénmíng", meaning: "silk_road_文明" }
    ],
    reflection: "reflection_silk_road"
  },
  "forbidden_city": {
    id: "forbidden_city",
    icon: "🏯",
    chineseTitle: "故宫历史",
    pinyinTitle: "Gùgōng Lìshǐ",
    summary: "summary_forbidden_city",
    fullContentChinese: "故宫，又称紫禁城，是中国古代宫廷建筑的巅峰。作为明清两代的权力中心，它的布局严格遵循礼制。这里的每一块红砖黄瓦都见证了帝国最核心的权力运作与宫廷往事。",
    fullContentTranslated: "fullContent_forbidden_city",
    keyConcepts: [
      { word: "紫禁城", pinyin: "Zǐjìnchéng", meaning: "forbidden_city_紫禁城" },
      { word: "权力", pinyin: "Quánlì", meaning: "forbidden_city_权力" }
    ],
    reflection: "reflection_forbidden_city"
  },
  "great_wall": {
    id: "great_wall",
    icon: "🧱",
    chineseTitle: "长城故事",
    pinyinTitle: "Chángchéng Gùshì",
    summary: "summary_great_wall",
    fullContentChinese: "长城 (Chángchéng) 是世界七大奇迹之一，始建于春秋战国时期，秦朝统一后大规模修建。它不仅是军事防御工程，更是中华民族坚韧不拔精神的象征。",
    fullContentTranslated: "fullContent_great_wall",
    keyConcepts: [
      { word: "奇迹", pinyin: "Qíjī", meaning: "great_wall_奇迹" },
      { word: "防御", pinyin: "Fángyù", meaning: "great_wall_防御" }
    ],
    reflection: "reflection_great_wall"
  },
  "dynasties_timeline": {
    id: "dynasties_timeline",
    icon: "📜",
    chineseTitle: "朝代更替",
    pinyinTitle: "Cháodài Gēngtì",
    summary: "summary_dynasties_timeline",
    fullContentChinese: "中国历史经历了夏商周、秦汉、唐宋元明清等多个朝代。唐朝 (Tángcháo) 的繁荣与宋朝 (Sòngcháo) 的文治，代表了古代文明的高峰。分久必合，合久必分，是历史的周期律。",
    fullContentTranslated: "fullContent_dynasties_timeline",
    keyConcepts: [
      { word: "唐朝", pinyin: "Tángcháo", meaning: "dynasties_timeline_唐朝" },
      { word: "盛世", pinyin: "Shèngshì", meaning: "dynasties_timeline_盛世" }
    ],
    reflection: "reflection_dynasties_timeline"
  },
  "civil_exams": {
    id: "civil_exams",
    icon: "🎓",
    chineseTitle: "科举制度",
    pinyinTitle: "Kējǔ Zhìdù",
    summary: "summary_civil_exams",
    fullContentChinese: "科举 (Kējǔ) 是中国古代选拔官员的制度，始于隋唐，止于清末。它打破了门第限制，让平民子弟也有机会通过读书改变命运，体现了“学而优则仕”的理念。",
    fullContentTranslated: "fullContent_civil_exams",
    keyConcepts: [
      { word: "科举", pinyin: "Kējǔ", meaning: "civil_exams_科举" },
      { word: "状元", pinyin: "Zhuàngyuán", meaning: "civil_exams_状元" }
    ],
    reflection: "reflection_civil_exams"
  },
  // LANGUAGE (语言)
  "evolution_hanzi": {
    id: "evolution_hanzi",
    icon: "🔣",
    chineseTitle: "汉字演变",
    pinyinTitle: "Hànzì Yǎnbiàn",
    summary: "summary_evolution_hanzi",
    fullContentChinese: "汉字 (Hànzì) 是世界上最古老的文字之一。从甲骨文 (Jiǎgǔwén) 到金文、小篆，再到隶书、楷书，汉字的演变记录了中华文明的传承与发展。",
    fullContentTranslated: "fullContent_evolution_hanzi",
    keyConcepts: [
      { word: "甲骨文", pinyin: "Jiǎgǔwén", meaning: "evolution_hanzi_甲骨文" },
      { word: "象形", pinyin: "Xiàngxíng", meaning: "evolution_hanzi_象形" }
    ],
    reflection: "reflection_evolution_hanzi"
  },
  "famous_idioms": {
    id: "famous_idioms",
    icon: "🗣️",
    chineseTitle: "成语故事",
    pinyinTitle: "Chéngyǔ Gùshì",
    summary: "summary_famous_idioms",
    fullContentChinese: "成语 (Chéngyǔ) 是汉语中的定型短语，多由四个字组成。每个成语背后都有一个历史典故，如“守株待兔”、“画蛇添足”，蕴含着深刻的哲理和智慧。",
    fullContentTranslated: "fullContent_famous_idioms",
    keyConcepts: [
      { word: "典故", pinyin: "Diǎngù", meaning: "famous_idioms_典故" },
      { word: "寓意", pinyin: "Yùyì", meaning: "famous_idioms_寓意" }
    ],
    reflection: "reflection_famous_idioms"
  },
  // AESTHETICS (美学)
  "tea_culture": {
    id: "tea_culture",
    icon: "🍵",
    chineseTitle: "茶文化",
    pinyinTitle: "Chá Wénhuà",
    summary: "summary_tea_culture",
    fullContentChinese: "中国茶文化强调“和、静、怡、真”。茶圣陆羽在《茶经》中确立了茶的地位。品茶不仅是饮用，更是一种精神修行，让人在繁忙中寻得内心的平和与澄明。",
    fullContentTranslated: "fullContent_tea_culture",
    keyConcepts: [
      { word: "品茶", pinyin: "Pǐnchá", meaning: "tea_culture_品茶" },
      { word: "禅茶一味", pinyin: "Chán chá yīwèi", meaning: "tea_culture_禅茶一味" }
    ],
    reflection: "reflection_tea_culture"
  },
  "suzhou_gardens": {
    id: "suzhou_gardens",
    icon: "🎋",
    chineseTitle: "苏州园林",
    pinyinTitle: "Sūzhōu Yuánlín",
    summary: "summary_suzhou_gardens",
    fullContentChinese: "苏州园林 (Sūzhōu Yuánlín) 是“咫尺之内再造乾坤”的艺术。通过叠山理水，它创造出“移步换景” (Yíbù Huànjǐng) 的效果，体现了人与自然的和谐共生。",
    fullContentTranslated: "fullContent_suzhou_gardens",
    keyConcepts: [
      { word: "意境", pinyin: "Yìjìng", meaning: "suzhou_gardens_意境" },
      { word: "山水", pinyin: "Shānshuǐ", meaning: "suzhou_gardens_山水" }
    ],
    reflection: "reflection_suzhou_gardens"
  },
  "porcelain_arts": {
    id: "porcelain_arts",
    icon: "🏺",
    chineseTitle: "陶瓷艺术",
    pinyinTitle: "Táocí Yìshù",
    summary: "summary_porcelain_arts",
    fullContentChinese: "中国是瓷器的故乡。青花瓷 (Qīnghuācí) 蓝白相间，素雅高洁。瓷器不仅是实用的器皿，更是精美的艺术品，通过丝绸之路传遍世界。",
    fullContentTranslated: "fullContent_porcelain_arts",
    keyConcepts: [
      { word: "青花", pinyin: "Qīnghuā", meaning: "porcelain_arts_青花" },
      { word: "工匠", pinyin: "Gōngjiàng", meaning: "porcelain_arts_工匠" }
    ],
    reflection: "reflection_porcelain_arts"
  },
  // ART (艺术)
  "peking_opera": {
    id: "peking_opera",
    icon: "🎭",
    chineseTitle: "京剧艺术",
    pinyinTitle: "Jīngjù Yìshù",
    summary: "summary_peking_opera",
    fullContentChinese: "京剧 (Jīngjù) 是中国国粹，集歌、舞、演、武于一体。它以脸谱 (Liǎnpǔ) 和行当 (Hángdang) 为特色，通过程式化的动作和唱腔，讲述历史故事和民间传说。",
    fullContentTranslated: "fullContent_peking_opera",
    keyConcepts: [
      { word: "国粹", pinyin: "Guócuì", meaning: "peking_opera_国粹" },
      { word: "脸谱", pinyin: "Liǎnpǔ", meaning: "peking_opera_脸谱" }
    ],
    reflection: "reflection_peking_opera"
  },
  "calligraphy_styles": {
    id: "calligraphy_styles",
    icon: "🖌️",
    chineseTitle: "书法流派",
    pinyinTitle: "Shūfǎ Liúpài",
    summary: "summary_calligraphy_styles",
    fullContentChinese: "中国书法 (Shūfǎ) 历史悠久，分为篆、隶、楷、行、草五大书体。每种书体都有其独特的韵味和表现力，是中华文化审美的重要组成部分。",
    fullContentTranslated: "fullContent_calligraphy_styles",
    keyConcepts: [
      { word: "书体", pinyin: "Shūtǐ", meaning: "calligraphy_styles_书体" },
      { word: "韵味", pinyin: "Yùnwèi", meaning: "calligraphy_styles_韵味" }
    ],
    reflection: "reflection_calligraphy_styles"
  },
  "trad_painting": {
    id: "trad_painting",
    icon: "🎨",
    chineseTitle: "中国国画",
    pinyinTitle: "Zhōngguó Guóhuà",
    summary: "summary_trad_painting",
    fullContentChinese: "国画 (Guóhuà) 讲究“气韵生动”。画家用毛笔和水墨，在宣纸上描绘山水、花鸟。留白 (Liúbái) 是国画的重要技法，给予观者无限的想象空间。",
    fullContentTranslated: "fullContent_trad_painting",
    keyConcepts: [
      { word: "写意", pinyin: "Xiěyì", meaning: "trad_painting_写意" },
      { word: "留白", pinyin: "Liúbái", meaning: "trad_painting_留白" }
    ],
    reflection: "reflection_trad_painting"
  },
  "folk_music": {
    id: "folk_music",
    icon: "🎵",
    chineseTitle: "民族音乐",
    pinyinTitle: "Mínzú Yīnyuè",
    summary: "summary_folk_music",
    fullContentChinese: "中国民乐源远流长。古琴 (Gǔqín) 的深沉、二胡 (Èrhú) 的哀婉、琵琶的激昂，构成了丰富的音乐画卷。高山流水遇知音，音乐是心灵的语言。",
    fullContentTranslated: "fullContent_folk_music",
    keyConcepts: [
      { word: "知音", pinyin: "Zhīyīn", meaning: "folk_music_知音" },
      { word: "旋律", pinyin: "Xuánlǜ", meaning: "folk_music_旋律" }
    ],
    reflection: "reflection_folk_music"
  },
  // FESTIVALS (节日)
  "lunar_new_year": {
    id: "lunar_new_year",
    icon: "🏮",
    chineseTitle: "春节习俗",
    pinyinTitle: "Chūnjié Xísú",
    summary: "summary_lunar_new_year",
    fullContentChinese: "春节 (Chūnjié)，即农历新年，是中国最重要的传统节日。家家户户贴春联 (Chūnlián)、吃饺子 (Jiǎozi)、放鞭炮，寓意辞旧迎新、祈福纳祥。",
    fullContentTranslated: "fullContent_lunar_new_year",
    keyConcepts: [
      { word: "春联", pinyin: "Chūnlián", meaning: "lunar_new_year_春联" },
      { word: "饺子", pinyin: "Jiǎozi", meaning: "lunar_new_year_饺子" }
    ],
    reflection: "reflection_lunar_new_year"
  },
  "mid_autumn": {
    id: "mid_autumn",
    icon: "🥮",
    chineseTitle: "中秋团圆",
    pinyinTitle: "Zhōngqiū Tuányuán",
    summary: "summary_mid_autumn",
    fullContentChinese: "中秋节 (Zhōngqiūjié) 是团圆的节日。人们赏月、吃月饼 (Yuèbǐng)，寄托对远方亲人的思念。“但愿人长久，千里共婵娟”是中秋最美好的祝愿。",
    fullContentTranslated: "fullContent_mid_autumn",
    keyConcepts: [
      { word: "团圆", pinyin: "Tuányuán", meaning: "mid_autumn_团圆" },
      { word: "思念", pinyin: "Sīniàn", meaning: "mid_autumn_思念" }
    ],
    reflection: "reflection_mid_autumn"
  },
  "dragon_boat": {
    id: "dragon_boat",
    icon: "🐉",
    chineseTitle: "端午竞渡",
    pinyinTitle: "Duānwǔ Jìngdù",
    summary: "summary_dragon_boat",
    fullContentChinese: "端午节 (Duānwǔjié) 是为了纪念爱国诗人屈原。人们赛龙舟 (Sài Lóngzhōu)、吃粽子 (Zòngzi)，挂艾草，驱邪避疫，弘扬爱国主义精神。",
    fullContentTranslated: "fullContent_dragon_boat",
    keyConcepts: [
      { word: "龙舟", pinyin: "Lóngzhōu", meaning: "dragon_boat_龙舟" },
      { word: "纪念", pinyin: "Jìniàn", meaning: "dragon_boat_纪念" }
    ],
    reflection: "reflection_dragon_boat"
  },
  // FOOD (美食)
  "eight_cuisines": {
    id: "eight_cuisines",
    icon: "🍲",
    chineseTitle: "八大菜系",
    pinyinTitle: "Bādà Càixì",
    summary: "summary_eight_cuisines",
    fullContentChinese: "中国八大菜系 (Bādà Càixì) 包括鲁、川、粤、苏、闽、浙、湘、徽。它们风味各异，代表了中国饮食文化的博大精深。",
    fullContentTranslated: "fullContent_eight_cuisines",
    keyConcepts: [
      { word: "菜系", pinyin: "Càixì", meaning: "eight_cuisines_菜系" },
      { word: "风味", pinyin: "Fēngwèi", meaning: "eight_cuisines_风味" }
    ],
    reflection: "reflection_eight_cuisines"
  },
  "dim_sum": {
    id: "dim_sum",
    icon: "🥟",
    chineseTitle: "广式点心",
    pinyinTitle: "Guǎngshì Diǎnxīn",
    summary: "summary_dim_sum",
    fullContentChinese: "早茶 (Zǎochá) 是广东饮食文化的重要组成部分。点心 (Diǎnxīn) 精致多样，如虾饺、烧卖。人们在茶楼里“一盅两件”，享受悠闲的社交时光。",
    fullContentTranslated: "fullContent_dim_sum",
    keyConcepts: [
      { word: "早茶", pinyin: "Zǎochá", meaning: "dim_sum_早茶" },
      { word: "精致", pinyin: "Jīngzhì", meaning: "dim_sum_精致" }
    ],
    reflection: "reflection_dim_sum"
  },
  "street_food": {
    id: "street_food",
    icon: "🍢",
    chineseTitle: "街头美食",
    pinyinTitle: "Jiētóu Měishí",
    summary: "summary_street_food",
    fullContentChinese: "中国的街头美食充满了烟火气 (Yānhuǒqì)。从北方的煎饼果子到南方的臭豆腐，这些小吃不仅美味廉价，更承载着地方的记忆和人情味。",
    fullContentTranslated: "fullContent_street_food",
    keyConcepts: [
      { word: "小吃", pinyin: "Xiǎochī", meaning: "street_food_小吃" },
      { word: "特色", pinyin: "Tèsè", meaning: "street_food_特色" }
    ],
    reflection: "reflection_street_food"
  },
  // CRAFTS (工艺)
  "silk_weaving": {
    id: "silk_weaving",
    icon: "🧵",
    chineseTitle: "丝绸织造",
    pinyinTitle: "Sīchóu Zhīzào",
    summary: "summary_silk_weaving",
    fullContentChinese: "中国是丝绸的故乡。养蚕 (Yǎngcán) 缫丝织锦，工艺复杂精湛。丝绸柔软光亮，被誉为“纤维皇后”，是古代中国最重要的贸易商品。",
    fullContentTranslated: "fullContent_silk_weaving",
    keyConcepts: [
      { word: "丝绸", pinyin: "Sīchóu", meaning: "silk_weaving_丝绸" },
      { word: "工艺", pinyin: "Gōngyì", meaning: "silk_weaving_工艺" }
    ],
    reflection: "reflection_silk_weaving"
  },
  "paper_cutting": {
    id: "paper_cutting",
    icon: "✂️",
    chineseTitle: "民间剪纸",
    pinyinTitle: "Mínjiān Jiǎnzhǐ",
    summary: "summary_paper_cutting",
    fullContentChinese: "剪纸 (Jiǎnzhǐ) 是一种镂空艺术。一把剪刀，一张红纸，就能变幻出花鸟虫鱼、喜庆图案。它常用于节日装饰，寓意吉祥如意。",
    fullContentTranslated: "fullContent_paper_cutting",
    keyConcepts: [
      { word: "吉祥", pinyin: "Jíxiáng", meaning: "paper_cutting_吉祥" },
      { word: "装饰", pinyin: "Zhuāngshì", meaning: "paper_cutting_装饰" }
    ],
    reflection: "reflection_paper_cutting"
  },
  // ARCHITECTURE (建筑)
  "feng_shui": {
    id: "feng_shui",
    icon: "🧭",
    chineseTitle: "风水智慧",
    pinyinTitle: "Fēngshuǐ Zhìhuì",
    summary: "summary_feng_shui",
    fullContentChinese: "风水 (Fēngshuǐ) 追求人与环境的和谐。它通过对气场 (Qìchǎng) 的调节，选择适宜的居住环境，以求趋吉避凶。这体现了中国古人“天人合一”的宇宙观。",
    fullContentTranslated: "fullContent_feng_shui",
    keyConcepts: [
      { word: "和谐", pinyin: "Héxié", meaning: "feng_shui_和谐" },
      { word: "环境", pinyin: "Huánjìng", meaning: "feng_shui_环境" }
    ],
    reflection: "reflection_feng_shui"
  },
  "courtyards": {
    id: "courtyards",
    icon: "🏠",
    chineseTitle: "四合院",
    pinyinTitle: "Sìhéyuàn",
    summary: "summary_courtyards",
    fullContentChinese: "四合院 (Sìhéyuàn) 是北京传统的住宅形式。四面房屋围合一个庭院，长幼有序，内外有别。庭院是家庭生活的中心，充满了浓厚的生活气息。",
    fullContentTranslated: "fullContent_courtyards",
    keyConcepts: [
      { word: "庭院", pinyin: "Tíngyuàn", meaning: "courtyards_庭院" },
      { word: "传统", pinyin: "Chuántǒng", meaning: "courtyards_传统" }
    ],
    reflection: "reflection_courtyards"
  },
  // ETHICS (伦理)
  "filial_piety": {
    id: "filial_piety",
    icon: "🙇",
    chineseTitle: "百善孝为先",
    pinyinTitle: "Bǎishàn Xiào Wéi Xiān",
    summary: "summary_filial_piety",
    fullContentChinese: "孝 (Xiào) 是中国伦理的核心。尊敬父母、赡养老人是子女的责任。孝道不仅是家庭规范，也是社会稳定的基石，延伸为对国家的忠诚。",
    fullContentTranslated: "fullContent_filial_piety",
    keyConcepts: [
      { word: "孝顺", pinyin: "Xiàoshùn", meaning: "filial_piety_孝顺" },
      { word: "责任", pinyin: "Zérèn", meaning: "filial_piety_责任" }
    ],
    reflection: "reflection_filial_piety"
  },
  "etiquette": {
    id: "etiquette",
    icon: "🤝",
    chineseTitle: "礼仪之邦",
    pinyinTitle: "Lǐyí Zhī Bāng",
    summary: "summary_etiquette",
    fullContentChinese: "中国素称“礼仪之邦”。礼尚往来 (Lǐshàng Wǎnglái) 是人际交往的准则。无论是餐桌礼仪还是待客之道，都体现了对他人的尊重和谦逊。",
    fullContentTranslated: "fullContent_etiquette",
    keyConcepts: [
      { word: "尊重", pinyin: "Zūnzhòng", meaning: "etiquette_尊重" },
      { word: "谦逊", pinyin: "Qiānxùn", meaning: "etiquette_谦逊" }
    ],
    reflection: "reflection_etiquette"
  },
  // MEDICINE (医学)
  "tcm_fundamentals": {
    id: "tcm_fundamentals",
    icon: "🌿",
    chineseTitle: "中医基础",
    pinyinTitle: "Zhōngyī Jīchǔ",
    summary: "summary_tcm_fundamentals",
    fullContentChinese: "中医 (Zhōngyī) 强调整体观念和辨证论治。通过“望闻问切” (Wàng Wén Wèn Qiè) 四诊合参，探求病因。它不仅治病，更注重养生 (Yǎngshēng) 和防病。",
    fullContentTranslated: "fullContent_tcm_fundamentals",
    keyConcepts: [
      { word: "养生", pinyin: "Yǎngshēng", meaning: "tcm_fundamentals_养生" },
      { word: "整体", pinyin: "Zhěngtǐ", meaning: "tcm_fundamentals_整体" }
    ],
    reflection: "reflection_tcm_fundamentals"
  },
  "acupuncture": {
    id: "acupuncture",
    icon: "📍",
    chineseTitle: "针灸疗法",
    pinyinTitle: "Zhēnjiǔ Liáofǎ",
    summary: "summary_acupuncture",
    fullContentChinese: "针灸 (Zhēnjiǔ) 是通过刺激人体穴位 (Xuéwèi) 来调节经络气血的疗法。它神奇的疗效已被世界公认，是中医学对人类健康的伟大贡献。",
    fullContentTranslated: "fullContent_acupuncture",
    keyConcepts: [
      { word: "穴位", pinyin: "Xuéwèi", meaning: "acupuncture_穴位" },
      { word: "经络", pinyin: "Jīngluò", meaning: "acupuncture_经络" }
    ],
    reflection: "reflection_acupuncture"
  },
  // MARTIAL ARTS (武术)
  "shaolin_kungfu": {
    id: "shaolin_kungfu",
    icon: "🥋",
    chineseTitle: "少林功夫",
    pinyinTitle: "Shàolín Gōngfu",
    summary: "summary_shaolin_kungfu",
    fullContentChinese: "天下功夫出少林。少林功夫 (Shàolín Gōngfu) 讲究“禅武合一”。习武不仅是强身健体，更是修身养性，磨练意志的过程。",
    fullContentTranslated: "fullContent_shaolin_kungfu",
    keyConcepts: [
      { word: "功夫", pinyin: "Gōngfu", meaning: "shaolin_kungfu_功夫" },
      { word: "意志", pinyin: "Yìzhì", meaning: "shaolin_kungfu_意志" }
    ],
    reflection: "reflection_shaolin_kungfu"
  },
  "tai_chi": {
    id: "tai_chi",
    icon: "☯️",
    chineseTitle: "太极拳",
    pinyinTitle: "Tàijíquán",
    summary: "summary_tai_chi",
    fullContentChinese: "太极拳 (Tàijíquán) 是一种柔和缓慢的拳术。它以柔克刚 (Yǐróukègāng)，动静结合，体现了道家阴阳平衡的哲学，是极佳的身心锻炼方式。",
    fullContentTranslated: "fullContent_tai_chi",
    keyConcepts: [
      { word: "平衡", pinyin: "Pínghéng", meaning: "tai_chi_平衡" },
      { word: "柔和", pinyin: "Róuhé", meaning: "tai_chi_柔和" }
    ],
    reflection: "reflection_tai_chi"
  }
};

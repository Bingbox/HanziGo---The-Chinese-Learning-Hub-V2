
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
  }
};

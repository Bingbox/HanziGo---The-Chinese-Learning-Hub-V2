
export interface CuratedArticle {
  id: string;
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
    chineseTitle: "儒家思想",
    pinyinTitle: "Rújiā Sīxiǎng",
    summary: "The moral and social pillar of East Asian civilization.",
    fullContentChinese: "儒家思想 (Rújiā Sīxiǎng) 是中国文化的灵魂。孔子提倡“仁” (Rén) 和“礼” (Lǐ)，强调个人通过修身实现社会和谐。儒家认为，家庭是社会的微缩模型，孝道 (Xiàodào) 是万德之基。",
    fullContentTranslated: "Confucianism is the soul of Chinese culture. Confucius advocated 'Ren' (Benevolence) and 'Li' (Ritual), emphasizing self-cultivation for social harmony. It views the family as a microcosm of society, with filial piety as the root of all virtues.",
    keyConcepts: [
      { word: "仁", pinyin: "Rén", meaning: "Benevolence" },
      { word: "礼", pinyin: "Lǐ", meaning: "Ritual / Etiquette" },
      { word: "修身", pinyin: "Xiūshēn", meaning: "Self-cultivation" }
    ],
    reflection: "Harmony without uniformity is the mark of a noble soul."
  },
  "taoism": {
    id: "taoism",
    chineseTitle: "道家文化",
    pinyinTitle: "Dàojiā Wénhuà",
    summary: "Living in harmony with the natural flow of the universe.",
    fullContentChinese: "道家 (Dàojiā) 崇尚自然。老子认为“道” (Dào) 是万物之源。通过“无为” (Wúwéi)，人类可以达到顺应天时、返璞归真的境界。阴阳 (Yīnyáng) 的转换体现了宇宙间互补与循环的永恒真理。",
    fullContentTranslated: "Taoism advocates living with nature. Laozi believed the 'Tao' (The Way) is the source of all things. Through 'Wu Wei' (Non-action), humans align with natural timing. Yin and Yang reflect the eternal truth of complementarity in the universe.",
    keyConcepts: [
      { word: "道", pinyin: "Dào", meaning: "The Way" },
      { word: "无为", pinyin: "Wúwéi", meaning: "Non-action" },
      { word: "阴阳", pinyin: "Yīnyáng", meaning: "Yin and Yang" }
    ],
    reflection: "Great talent matures late; great music is silent."
  },
  "silk_road": {
    id: "silk_road",
    chineseTitle: "丝绸之路",
    pinyinTitle: "Sīchóu Zhī Lù",
    summary: "The ancient bridge connecting East and West.",
    fullContentChinese: "丝绸之路是东西方文明交流的桥梁。汉代张骞出使西域开启了这一征程。它不仅输送丝绸，更促进了造纸术、宗教和艺术在全球范围内的传播。",
    fullContentTranslated: "The Silk Road bridged civilizations. Zhang Qian's Han mission started this journey, transporting silk and spreading papermaking, religion, and art globally.",
    keyConcepts: [
      { word: "交流", pinyin: "Jiāoliú", meaning: "Exchange" },
      { word: "文明", pinyin: "Wénmíng", meaning: "Civilization" }
    ],
    reflection: "Culture has no borders on the long road."
  },
  "forbidden_city": {
    id: "forbidden_city",
    chineseTitle: "故宫历史",
    pinyinTitle: "Gùgōng Lìshǐ",
    summary: "The imperial heart of Ming and Qing dynasties.",
    fullContentChinese: "故宫，又称紫禁城，是中国古代宫廷建筑的巅峰。作为明清两代的权力中心，它的布局严格遵循礼制。这里的每一块红砖黄瓦都见证了帝国最核心的权力运作与宫廷往事。",
    fullContentTranslated: "The Forbidden City is the zenith of ancient Chinese palatial architecture. As the power center for the Ming and Qing, its layout strictly followed rituals, witnessing centuries of imperial governance.",
    keyConcepts: [
      { word: "紫禁城", pinyin: "Zǐjìnchéng", meaning: "Forbidden City" },
      { word: "权力", pinyin: "Quánlì", meaning: "Power" }
    ],
    reflection: "Grandeur is but a vessel for the weight of history."
  },
  "tea_culture": {
    id: "tea_culture",
    chineseTitle: "茶文化",
    pinyinTitle: "Chá Wénhuà",
    summary: "A meditative journey through flavor and stillness.",
    fullContentChinese: "中国茶文化强调“和、静、怡、真”。茶圣陆羽在《茶经》中确立了茶的地位。品茶不仅是饮用，更是一种精神修行，让人在繁忙中寻得内心的平和与澄明。",
    fullContentTranslated: "Tea culture emphasizes 'Harmony, Quiet, Joy, and Truth'. As defined in Lu Yu's 'Classic of Tea', drinking tea is a spiritual practice, offering inner peace in a busy world.",
    keyConcepts: [
      { word: "品茶", pinyin: "Pǐnchá", meaning: "Tasting Tea" },
      { word: "禅茶一味", pinyin: "Chán chá yīwèi", meaning: "Zen and Tea are One" }
    ],
    reflection: "Life is like tea: the first steep is bitter, the second sweet."
  }
};

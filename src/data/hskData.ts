export interface HSKLevelData {
  level: number;
  titleKey: string;
  descriptionKey: string;
  categoryKey: 'beginner' | 'intermediate' | 'advanced';
  vocab: number;
  tier: string;
  questionCount: number;
  duration: number;
}

export const hskLevels: HSKLevelData[] = [
  // Beginner
  { level: 1, titleKey: 'hsk1', descriptionKey: 'hsk1_desc', categoryKey: 'beginner', vocab: 150, tier: '初等', questionCount: 40, duration: 40 },
  { level: 2, titleKey: 'hsk2', descriptionKey: 'hsk2_desc', categoryKey: 'beginner', vocab: 300, tier: '初等', questionCount: 60, duration: 55 },
  { level: 3, titleKey: 'hsk3', descriptionKey: 'hsk3_desc', categoryKey: 'beginner', vocab: 600, tier: '初等', questionCount: 80, duration: 90 },
  // Intermediate
  { level: 4, titleKey: 'hsk4', descriptionKey: 'hsk4_desc', categoryKey: 'intermediate', vocab: 1200, tier: '中等', questionCount: 100, duration: 105 },
  { level: 5, titleKey: 'hsk5', descriptionKey: 'hsk5_desc', categoryKey: 'intermediate', vocab: 2500, tier: '中等', questionCount: 120, duration: 120 },
  { level: 6, titleKey: 'hsk6', descriptionKey: 'hsk6_desc', categoryKey: 'intermediate', vocab: 5000, tier: '中等', questionCount: 100, duration: 140 },
  // Advanced
  { level: 7, titleKey: 'hsk7', descriptionKey: 'hsk7_desc', categoryKey: 'advanced', vocab: 11000, tier: '高等', questionCount: 98, duration: 160 },
  { level: 8, titleKey: 'hsk8', descriptionKey: 'hsk8_desc', categoryKey: 'advanced', vocab: 22000, tier: '高等', questionCount: 98, duration: 180 },
  { level: 9, titleKey: 'hsk9', descriptionKey: 'hsk9_desc', categoryKey: 'advanced', vocab: 35000, tier: '高等', questionCount: 98, duration: 200 },
];

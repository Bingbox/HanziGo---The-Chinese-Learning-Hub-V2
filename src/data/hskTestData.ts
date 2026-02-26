import { Question } from '../types/hsk';

export const hskCategories = [
    {
        title: '初等 (1-3级)',
        levels: [
            { level: 1, description: '能理解并使用最简单的词语和句子。', disabled: false },
            { level: 2, description: '能就熟悉的日常话题进行简单直接的交流。', disabled: false },
            { level: 3, description: '能完成生活、学习、工作等方面的基本交际任务。', disabled: false },
        ]
    },
    {
        title: '中等 (4-6级)',
        levels: [
            { level: 4, description: '能就较广泛领域的话题进行比较流利的交流。', disabled: false },
            { level: 5, description: '能阅读汉语报刊杂志，欣赏汉语影视节目，进行较为完整的演讲。', disabled: false },
            { level: 6, description: '能轻松理解听到或读到的汉语信息，以口头或书面形式流利表达自己的见解。', disabled: false },
        ]
    },
    {
        title: '高等 (7-9级)',
        levels: [
            { level: 7, description: '能就专业领域进行深入讨论，具备一定的学术表达能力。', disabled: false },
            { level: 8, description: '能熟练运用汉语进行复杂的社会交际和专业工作。', disabled: false },
            { level: 9, description: '汉语应用水平接近母语者，能自如应对各种高难度交际任务。', disabled: false },
        ]
    }
];

export const questionBank: Question[] = [
  // HSK 1
  { id: 'h1-1', level: 1, type: 'multiple-choice', question: '你好 (nǐ hǎo) means:', options: ['Hello', 'Goodbye', 'Thank you'], correctAnswer: 'Hello' },
  { id: 'h1-2', level: 1, type: 'multiple-choice', question: '“谢谢”是什么意思？', options: ['Hello', 'Goodbye', 'Thank you'], correctAnswer: 'Thank you' },
  // HSK 2
  { id: 'h2-1', level: 2, type: 'multiple-choice', question: '“我想喝茶。” - What does the person want to drink?', options: ['Water', 'Tea', 'Coffee'], correctAnswer: 'Tea' },
  // HSK 3
  { id: 'h3-1', level: 3, type: 'multiple-choice', question: '“周末你有什么打算？” means:', options: ['What are your plans for the weekend?', 'How was your weekend?', 'Do you like weekends?'], correctAnswer: 'What are your plans for the weekend?' },
  // Add more questions for all levels...
];

import { HSKQuestion } from '../../types';

// NOTE: This is a sample question bank. For a full HSK simulation, this would need to be significantly expanded.
export const hskQuestionBank: Record<number, HSKQuestion[]> = {
  1: [
    { id: 'hsk1-1', level: 1, questionKey: 'q_character_to_pinyin', content: '苹果', options: ['píngguǒ', 'xiāngjiāo', 'xīguā', 'cǎoméi'], answer: 'píngguǒ', explanation: 'hsk1_1_e' },
    { id: 'hsk1-2', level: 1, questionKey: 'q_translate_hello', options: ['再见', '谢谢', '你好', '不客气'], answer: '你好', explanation: 'hsk1_2_e' },
    { id: 'hsk1-3', level: 1, questionKey: 'q_character_to_pinyin', content: '再见', options: ['zàijiàn', 'hēshuǐ', 'chīfàn', 'kànshū'], answer: 'zàijiàn', explanation: 'hsk1_3_e' },
    { id: 'hsk1-4', level: 1, questionKey: 'q_translate_thank_you', options: ['不客气', '没关系', '对不起', '谢谢'], answer: '谢谢', explanation: 'hsk1_4_e' },
  ],
  2: [
    { id: 'hsk2-1', level: 2, questionKey: 'q_character_to_pinyin', content: '猫', options: ['māo', 'gǒu', 'niǎo', 'yú'], answer: 'māo', explanation: 'hsk2_1_e' },
    { id: 'hsk2-2', level: 2, questionKey: 'q_translate_dog', options: ['猫', '狗', '鸟', '鱼'], answer: '狗', explanation: 'hsk2_2_e' },
  ]
};

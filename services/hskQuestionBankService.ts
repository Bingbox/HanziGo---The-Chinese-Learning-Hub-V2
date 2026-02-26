import { Question } from '../src/types/hsk';
import { hskQuestionBank } from '../src/data/hskQuestionBank';

class HSKQuestionBankService {
  public getQuestionsForLevel(level: number, count: number = 10): Question[] {
    const questions = hskQuestionBank[level] || [];
    if (questions.length === 0) {
      return [];
    }

    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

export const hskQuestionBankService = new HSKQuestionBankService();

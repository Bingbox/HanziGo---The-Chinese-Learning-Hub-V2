import { Question, Exam, QuestionType } from '../types/hsk';
import { hskQuestionBank } from '../data/hskQuestionBank';

export class ExamService {
  /**
   * 根据级别生成模拟考试试卷
   * @param level HSK级别 (1-9)
   * @param questionCount 题目数量，默认 20 道
   */
  static generateMockExam(level: number, questionCount: number = 20): Exam {
    const allQuestions = hskQuestionBank[level] || [];
    
    if (allQuestions.length === 0) {
      throw new Error(`No questions found for HSK Level ${level}`);
    }

    // 随机打乱题目
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    
    // 选取指定数量的题目
    const selectedQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));
    
    // 计算总分
    const totalScore = selectedQuestions.reduce((sum, q) => sum + q.score, 0);

    return {
      level,
      questions: selectedQuestions,
      totalScore,
    };
  }

  /**
   * 获取题目在当前语言下的展示内容
   */
  static getLocalizedContent(content: Record<string, any>, lang: string): any {
    return content[lang] || content['zh'] || '';
  }

  /**
   * 自动评分逻辑 (仅限客观题)
   */
  static gradeObjectiveQuestion(question: Question, userAnswer: any): boolean {
    switch (question.type) {
      case QuestionType.SingleChoice:
        return question.correctAnswer === userAnswer;
      case QuestionType.MultipleSelect:
        if (!Array.isArray(userAnswer)) return false;
        return (
          userAnswer.length === question.correctAnswers.length &&
          userAnswer.every((ans) => question.correctAnswers.includes(ans))
        );
      case QuestionType.TrueFalse:
        return question.correctAnswer === userAnswer;
      case QuestionType.FillInTheBlank:
        if (!Array.isArray(userAnswer)) return false;
        return (
          userAnswer.length === question.correctAnswers.length &&
          userAnswer.every((ans, i) => ans === question.correctAnswers[i])
        );
      default:
        return false; // 主观题需要人工阅卷或 AI 评分
    }
  }
}

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
        if (typeof question.correctAnswer === 'string') {
          return question.correctAnswer === userAnswer;
        } else {
          return Object.values(question.correctAnswer).includes(userAnswer);
        }
      case QuestionType.MultipleSelect:
        if (!Array.isArray(userAnswer)) return false;
        
        let correctAnswersArray: string[] = [];
        if (Array.isArray(question.correctAnswers)) {
          correctAnswersArray = question.correctAnswers;
        } else {
          // If it's a Record, we need to check if the user's answers match any language's correct answers
          // A simpler approach is to flatten all possible correct answers across languages
          // But since the user selects from one language's options, their answers will be from that language
          const allPossibleAnswers = Object.values(question.correctAnswers).flat();
          return userAnswer.length === question.correctAnswers['zh'].length &&
                 userAnswer.every((ans) => allPossibleAnswers.includes(ans));
        }

        return (
          userAnswer.length === correctAnswersArray.length &&
          userAnswer.every((ans) => correctAnswersArray.includes(ans))
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

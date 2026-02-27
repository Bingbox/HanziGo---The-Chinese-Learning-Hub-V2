import { Question, Exam, QuestionType } from '../types/hsk';
import { hskQuestionBank } from '../data/hskQuestionBank';

export class ExamService {
  /**
   * HSK Exam Structure Configuration
   */
  private static examStructure: Record<number, { listening: number; reading: number; writing: number }> = {
    1: { listening: 20, reading: 20, writing: 0 }, // Total 40
    2: { listening: 35, reading: 25, writing: 0 }, // Total 60
    3: { listening: 40, reading: 30, writing: 10 }, // Total 80
    4: { listening: 45, reading: 40, writing: 15 }, // Total 100
    5: { listening: 45, reading: 45, writing: 10 }, // Total 100
    6: { listening: 50, reading: 50, writing: 10 }, // Total 110 (User requested 10 writing)
    7: { listening: 40, reading: 40, writing: 10 }, // Placeholder for 7-9
    8: { listening: 40, reading: 40, writing: 10 },
    9: { listening: 40, reading: 40, writing: 10 },
  };

  /**
   * 根据级别生成模拟考试试卷
   * @param level HSK级别 (1-9)
   */
  static generateMockExam(level: number): Exam {
    const allQuestions = hskQuestionBank[level] || [];
    
    if (allQuestions.length === 0) {
      throw new Error(`No questions found for HSK Level ${level}`);
    }

    const structure = this.examStructure[level] || { listening: 20, reading: 20, writing: 0 };
    const totalQuestionsNeeded = structure.listening + structure.reading + structure.writing;

    // Filter questions by type (heuristic based on ID or content if explicit type is missing, 
    // but currently we rely on the bank having mixed types. 
    // Ideally, we should filter by type, but for now we will shuffle and fill to meet the count.)
    
    // Since we might not have enough unique questions, we will fill the exam to meet the required count
    // by repeating questions if necessary, to simulate the exam length.
    
    let selectedQuestions: Question[] = [];
    
    // Simple strategy: Shuffle and repeat until we reach the count
    // In a real app, we would query by section (Listening, Reading, Writing).
    // Here we assume the bank has a mix. We will try to balance if possible, 
    // but primarily ensure the total count matches the user's request for the "Mock Exam" experience.
    
    // Separate by type if possible to distribute? 
    // Our current QuestionType doesn't explicitly map 1:1 to "Listening/Reading" sections 
    // (e.g. SingleChoice can be both). 
    // So we will just fill to the total count for now.
    
    let pool = [...allQuestions];
    while (selectedQuestions.length < totalQuestionsNeeded) {
        if (pool.length === 0) {
            pool = [...allQuestions]; // Refill pool if exhausted
        }
        const randomIndex = Math.floor(Math.random() * pool.length);
        const q = pool.splice(randomIndex, 1)[0];
        
        // Clone the question to ensure unique object references if we modify them later (though we don't here)
        // We append a suffix to ID to make it unique for React keys
        const uniqueQ = { ...q, id: `${q.id}_${selectedQuestions.length}` };
        selectedQuestions.push(uniqueQ);
    }
    
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

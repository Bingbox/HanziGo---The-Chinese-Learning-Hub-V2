import React, { useState, useEffect } from 'react';
import { Question, ExamResult, QuestionType, SingleChoiceQuestion, MultipleSelectQuestion, TrueFalseQuestion, FillInTheBlankQuestion, ShortAnswerQuestion, AnalysisQuestion } from '../types/hsk';
import { ArrowLeft } from 'lucide-react';

interface ExamViewProps {
  level: number;
  questions: Question[];
  language: string;
  onFinish: (result: ExamResult) => void;
  onBack: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ level, questions = [], language, onFinish, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | boolean>>({});

  useEffect(() => {
    if (!Array.isArray(questions)) return;
    
    const initialAnswers: Record<string, string | string[] | boolean> = {};
    questions.forEach(q => {
      if (!q) return;
      if (q.type === QuestionType.MultipleSelect) {
        initialAnswers[q.id] = [];
      } else if (q.type === QuestionType.TrueFalse) {
        initialAnswers[q.id] = false;
      } else {
        initialAnswers[q.id] = '';
      }
    });
    setAnswers(initialAnswers);
    setCurrentQuestionIndex(0);
  }, [questions]);

  const handleAnswer = (questionId: string, userAnswer: string | string[] | boolean) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: userAnswer,
    }));
  };

  const handleSubmit = () => {
    if (!Array.isArray(questions)) return;

    let correctAnswersCount = 0;
    let totalScore = 0;
    const userAnswers: { questionId: string; userAnswer: string | string[] | boolean }[] = [];

    questions.forEach(q => {
      if (!q) return;
      const userAnswer = answers[q.id];
      userAnswers.push({ questionId: q.id, userAnswer });
      totalScore += q.score || 0;

      switch (q.type) {
        case QuestionType.SingleChoice:
          const scQ = q as SingleChoiceQuestion;
          let isCorrect = false;
          if (typeof scQ.correctAnswer === 'string') {
            isCorrect = userAnswer === scQ.correctAnswer;
          } else {
            // Check if user answer matches any of the correct answers (multilingual)
            // Or specifically the current language one
            const correctAns = scQ.correctAnswer[language] || scQ.correctAnswer['zh'];
            isCorrect = userAnswer === correctAns;
          }
          
          if (isCorrect) {
            correctAnswersCount++;
          }
          break;
        case QuestionType.MultipleSelect:
          const msQ = q as MultipleSelectQuestion;
          let correctSelectAnswers: string[] = [];
          if (Array.isArray(msQ.correctAnswers)) {
            correctSelectAnswers = [...msQ.correctAnswers].sort();
          } else {
             // If it's a record, try to get answers for current language, fallback to 'zh'
             const answers = msQ.correctAnswers[language] || msQ.correctAnswers['zh'] || [];
             correctSelectAnswers = [...answers].sort();
          }
          
          const userSelectAnswers = [...(userAnswer as string[] || [])].sort();
          // Simple array comparison after sorting
          if (JSON.stringify(correctSelectAnswers) === JSON.stringify(userSelectAnswers)) {
            correctAnswersCount++;
          }
          break;
        case QuestionType.TrueFalse:
          if (userAnswer === (q as TrueFalseQuestion).correctAnswer) {
            correctAnswersCount++;
          }
          break;
        case QuestionType.FillInTheBlank:
          const fbQ = q as FillInTheBlankQuestion;
          const correctFillAnswers = (fbQ.correctAnswers || []).map(ans => (ans || '').trim().toLowerCase());
          const userFillAnswers = (userAnswer as string[] || []).map(ans => (ans || '').trim().toLowerCase());
          if (JSON.stringify(correctFillAnswers) === JSON.stringify(userFillAnswers)) {
            correctAnswersCount++;
          }
          break;
        case QuestionType.ShortAnswer:
        case QuestionType.Analysis:
          if (userAnswer && typeof userAnswer === 'string' && userAnswer.trim() !== '') {
            correctAnswersCount++;
          }
          break;
        default:
          break;
      }
    });

    const score = questions.length > 0 ? Math.round((correctAnswersCount / questions.length) * 100) : 0;

    const result: ExamResult = {
      id: new Date().toISOString(),
      level,
      score,
      totalQuestions: questions.length,
      correctAnswers: correctAnswersCount,
      date: new Date().toLocaleString(),
      answers: userAnswers,
    };
    onFinish(result);
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    return <div className="text-center p-8 text-white/70">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div className="text-center p-8 text-white/70">Question not found.</div>;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // 渲染不同题型的函数
  const renderQuestionInput = (question: Question) => {
    const currentAnswer = answers[question.id];

    switch (question.type) {
      case QuestionType.SingleChoice:
        const scQuestion = question as SingleChoiceQuestion;
        const scOptions = scQuestion.options?.[language] || scQuestion.options?.['zh'] || [];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {scOptions.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleAnswer(scQuestion.id, option)}
                className={`w-full text-center p-4 rounded-lg border-2 transition-colors text-lg font-semibold ${currentAnswer === option ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/20 hover:bg-white/10 text-white/80'}`}>
                {option}
              </button>
            ))}
          </div>
        );
      case QuestionType.MultipleSelect:
        const msQuestion = question as MultipleSelectQuestion;
        const msOptions = msQuestion.options?.[language] || msQuestion.options?.['zh'] || [];
        const selectedOptions = currentAnswer as string[] || [];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {msOptions.map((option, index) => (
              <button 
                key={index}
                onClick={() => {
                  const newSelected = selectedOptions.includes(option)
                    ? selectedOptions.filter(item => item !== option)
                    : [...selectedOptions, option];
                  handleAnswer(msQuestion.id, newSelected);
                }}
                className={`w-full text-center p-4 rounded-lg border-2 transition-colors text-lg font-semibold ${selectedOptions.includes(option) ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/20 hover:bg-white/10 text-white/80'}`}>
                {option}
              </button>
            ))}
          </div>
        );
      case QuestionType.TrueFalse:
        const tfQuestion = question as TrueFalseQuestion;
        return (
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={() => handleAnswer(tfQuestion.id, true)}
              className={`w-full text-center p-4 rounded-lg border-2 transition-colors text-lg font-semibold ${currentAnswer === true ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/20 hover:bg-white/10 text-white/80'}`}>
              正确
            </button>
            <button 
              onClick={() => handleAnswer(tfQuestion.id, false)}
              className={`w-full text-center p-4 rounded-lg border-2 transition-colors text-lg font-semibold ${currentAnswer === false ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/20 hover:bg-white/10 text-white/80'}`}>
              错误
            </button>
          </div>
        );
      case QuestionType.FillInTheBlank:
        const fbQuestion = question as FillInTheBlankQuestion;
        const fbBlanks = fbQuestion.blanks?.[language] || fbQuestion.blanks?.['zh'] || [];
        const fillAnswers = currentAnswer as string[] || fbBlanks.map(() => '');
        return (
          <div className="flex flex-col gap-4 mt-6">
            {fbBlanks.map((blank, index) => (
              <input
                key={index}
                type="text"
                value={fillAnswers[index] || ''}
                onChange={(e) => {
                  const newFillAnswers = [...fillAnswers];
                  newFillAnswers[index] = e.target.value;
                  handleAnswer(fbQuestion.id, newFillAnswers);
                }}
                placeholder={`填写第 ${index + 1} 个空 (${blank})`}
                className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white/80 focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>
        );
      case QuestionType.ShortAnswer:
        const saQuestion = question as ShortAnswerQuestion;
        return (
          <div className="mt-6">
            <textarea
              value={currentAnswer as string || ''}
              onChange={(e) => handleAnswer(saQuestion.id, e.target.value)}
              placeholder="请输入您的答案..."
              rows={5}
              className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white/80 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
        );
      case QuestionType.Analysis:
        const anQuestion = question as AnalysisQuestion;
        return (
          <div className="mt-6">
            <textarea
              value={currentAnswer as string || ''}
              onChange={(e) => handleAnswer(anQuestion.id, e.target.value)}
              placeholder="请输入您的分析..."
              rows={8}
              className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white/80 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
        );
      default:
        return <p className="text-red-500">未知题型</p>;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col h-full">
      <div className="mb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          返回级别选择
        </button>
      </div>

      <div className="w-full bg-white/5 rounded-full h-2.5 mb-4 border border-white/10">
        <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">HSK {level} 模拟考试</h2>
        <p className="text-white/60 font-medium">题目 {currentQuestionIndex + 1} / {questions.length}</p>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex-grow flex flex-col justify-center">
        <p className="text-2xl text-white text-center">{currentQuestion.question?.[language] || currentQuestion.question?.['zh'] || 'No question text available'}</p>
        {renderQuestionInput(currentQuestion)}
      </div>

      <div className="flex justify-between mt-8">
        <button 
          onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-8 py-3 rounded-lg bg-white/10 disabled:opacity-50 transition-colors font-semibold">
          上一题
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button 
            onClick={() => setCurrentQuestionIndex(i => Math.min(questions.length - 1, i + 1))}
            className="px-8 py-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors font-semibold">
            下一题
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-500 transition-colors font-semibold">
            提交答案
          </button>
        )}
      </div>
    </div>
  );
};

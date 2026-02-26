import React, { useState, useEffect } from 'react';
import { Question, ExamResult } from '../types/hsk';
import { questionBank } from '../data/hskTestData';
import { ArrowLeft } from 'lucide-react';

interface ExamViewProps {
  level: number;
  onFinish: (result: ExamResult) => void;
  onBack: () => void;
}

const EXAM_LENGTH = 10;

export const ExamView: React.FC<ExamViewProps> = ({ level, onFinish, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const levelQuestions = questionBank.filter(q => q.level === level);
    const shuffled = levelQuestions.sort(() => 0.5 - Math.random());
    const examQuestions = shuffled.slice(0, EXAM_LENGTH);
    setQuestions(examQuestions);
    setAnswers(new Array(examQuestions.length).fill(''));
  }, [level]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    const score = Math.round((correctAnswers / questions.length) * 100);

    const result: ExamResult = {
      id: new Date().toISOString(),
      level,
      score,
      totalQuestions: questions.length,
      correctAnswers,
      date: new Date().toLocaleString(),
    };
    onFinish(result);
  };

  if (questions.length === 0) {
    return <div className="text-center p-8 text-white/70">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
        <p className="text-2xl text-white text-center">{currentQuestion.question}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {currentQuestion.options?.map(option => (
          <button 
            key={option}
            onClick={() => handleAnswer(option)}
            className={`w-full text-center p-4 rounded-lg border-2 transition-colors text-lg font-semibold ${answers[currentQuestionIndex] === option ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/20 hover:bg-white/10 text-white/80'}`}>
            {option}
          </button>
        ))}
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

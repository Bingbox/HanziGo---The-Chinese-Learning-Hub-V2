import React from 'react';
import { ExamResult } from '../types/hsk';

interface ResultsViewProps {
  result: ExamResult;
  onRestart: () => void;
  onViewHistory: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onRestart, onViewHistory }) => {
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-4">
      <h2 className="text-4xl font-bold text-white mb-2">Exam Results</h2>
      <p className="text-white/70 mb-6">HSK Level {result.level}</p>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
        <p className="text-lg text-white/80">Your Score</p>
        <p className="text-7xl font-bold text-green-400 my-4">{result.score}</p>
        <p className="text-white/80">You answered {result.correctAnswers} out of {result.totalQuestions} questions correctly.</p>
      </div>

      <div className="flex gap-4 justify-center">
        <button onClick={onRestart} className="px-8 py-3 rounded-lg bg-white/10 hover:bg-white/20">Take Another Exam</button>
        <button onClick={onViewHistory} className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500">View History</button>
      </div>
    </div>
  );
};

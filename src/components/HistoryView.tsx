import React from 'react';
import { ExamResult } from '../types/hsk';

interface HistoryViewProps {
  history: ExamResult[];
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <button onClick={onBack} className="mb-4 text-sm text-white/70 hover:text-white">← Back to Levels</button>
      <h2 className="text-3xl font-bold text-white mb-6">Exam History</h2>
      
      {history.length === 0 ? (
        <p className="text-center text-white/60">You haven't completed any exams yet.</p>
      ) : (
        <div className="space-y-4">
          {history.slice().reverse().map(result => (
            <div key={result.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">HSK Level {result.level}</p>
                <p className="text-sm text-white/60">{result.date}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">{result.score}</p>
                <p className="text-sm text-white/60">{result.correctAnswers}/{result.totalQuestions} correct</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

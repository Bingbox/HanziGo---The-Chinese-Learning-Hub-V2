import React from 'react';

interface LevelCardProps {
  level: number;
  description: string;
  onStart: (level: number) => void;
  disabled?: boolean;
}

export const LevelCard: React.FC<LevelCardProps> = ({ level, description, onStart, disabled = false }) => {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold text-white">HSK {level}</h3>
        <p className="text-white/60 mt-2 text-sm">{description}</p>
      </div>
      <button
        onClick={() => onStart(level)}
        disabled={disabled}
        className="mt-6 w-full bg-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-colors disabled:cursor-not-allowed disabled:bg-white/5"
      >
        {disabled ? '即将推出' : '开始模拟考试'}
      </button>
    </div>
  );
};

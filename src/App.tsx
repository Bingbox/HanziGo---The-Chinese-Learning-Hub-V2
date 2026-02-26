import React, { useState, useEffect } from 'react';
import { LevelCard } from './components/LevelCard';
import { hskCategories } from './data/hskTestData';
import { ExamView } from './components/ExamView';
import { ResultsView } from './components/ResultsView';
import { HistoryView } from './components/HistoryView';
import { ExamResult, Question } from './types/hsk';
import { History, Book, Globe } from 'lucide-react';
import { ExamService } from './services/ExamService';

function App() {
  const [currentView, setCurrentView] = useState('level-select');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    const savedHistory = localStorage.getItem('hskExamHistory');
    if (savedHistory) {
      setExamHistory(JSON.parse(savedHistory));
    }
    const savedLang = localStorage.getItem('hskLanguage');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const saveHistory = (history: ExamResult[]) => {
    setExamHistory(history);
    localStorage.setItem('hskExamHistory', JSON.stringify(history));
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('hskLanguage', lang);
  };

  const startExam = (level: number) => {
    try {
      setSelectedLevel(level);
      const exam = ExamService.generateMockExam(level, 10); // 默认生成10道题进行测试
      setExamQuestions(exam.questions);
      setCurrentView('exam');
    } catch (error) {
      alert('该级别题库正在扩充中，请稍后再试！');
    }
  };

  const handleExamFinish = (result: ExamResult) => {
    const newHistory = [...examHistory, result];
    saveHistory(newHistory);
    setLatestResult(result);
    setCurrentView('results');
  };

  const renderLevelSelect = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center py-12 md:py-16">
        <div className="flex justify-center items-center gap-4 mb-4">
            <Book size={48} className="text-blue-400"/>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">HSK 3.0 模拟考试平台</h1>
        </div>
        <div className="flex justify-center items-center gap-4 mb-8">
          <Globe size={20} className="text-white/50" />
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            <option value="zh" className="bg-slate-800">中文 (Chinese)</option>
            <option value="en" className="bg-slate-800">English</option>
            <option value="ko" className="bg-slate-800">한국어 (Korean)</option>
          </select>
        </div>
        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">根据最新的汉语水平考试3.0标准，选择您的等级开始模拟测试。</p>
        <button 
            onClick={() => setCurrentView('history')}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <History size={18}/>
            查看考试历史
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {hskCategories?.map(category => (
            <div key={category.title} className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-white/80 tracking-wide px-2">{category.title}</h2>
                <div className="flex flex-col gap-6">
                    {category.levels?.map(level => (
                        <LevelCard
                            key={level.level}
                            level={level.level}
                            description={level.description}
                            onStart={startExam}
                            disabled={level.disabled}
                        />
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen w-full bg-slate-900 text-white py-10 flex items-center justify-center">
      {currentView === 'level-select' && renderLevelSelect()}
      {currentView === 'exam' && selectedLevel && (
        <ExamView 
          level={selectedLevel} 
          questions={examQuestions}
          language={language}
          onFinish={handleExamFinish} 
          onBack={() => setCurrentView('level-select')} 
        />
      )}
      {currentView === 'results' && latestResult && <ResultsView result={latestResult} onRestart={() => setCurrentView('level-select')} onViewHistory={() => setCurrentView('history')} />}
      {currentView === 'history' && <HistoryView history={examHistory} onBack={() => setCurrentView('level-select')} />}
    </main>
  );
}

export default App;

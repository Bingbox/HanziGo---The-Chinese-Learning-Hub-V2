import React, { useState, useEffect } from 'react';
import { LevelCard } from './components/LevelCard';
import { ExamView } from './components/ExamView';
import { ResultsView } from './components/ResultsView';
import { HistoryView } from './components/HistoryView';
import { AdminDashboard } from './components/AdminDashboard';
import { ExamResult, Question } from './types/hsk';
import { History, Book, Globe, Layout, BookOpen, Compass, ClipboardList } from 'lucide-react';
import { ExamService } from './services/ExamService';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [currentView, setCurrentView] = useState('level-select');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);
  const [language, setLanguage] = useState('zh');
  const [hskCategories, setHskCategories] = useState<any[]>([]);
  const [learnContent, setLearnContent] = useState<any[]>([]);
  const [exploreContent, setExploreContent] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('hskExamHistory');
    if (savedHistory) {
      setExamHistory(JSON.parse(savedHistory));
    }
    const savedLang = localStorage.getItem('hskLanguage');
    if (savedLang) {
      setLanguage(savedLang);
    }
    
    // Check if we should be in admin mode
    if (window.location.pathname === '/admin') {
      setCurrentView('admin');
    }

    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [exams, learn, explore] = await Promise.all([
        fetch('/api/content/exams').then(res => res.json()),
        fetch('/api/content/learn').then(res => res.json()),
        fetch('/api/content/explore').then(res => res.json())
      ]);
      setHskCategories(exams);
      setLearnContent(learn);
      setExploreContent(explore);
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    }
  };

  const saveHistory = (history: ExamResult[]) => {
    setExamHistory(history);
    localStorage.setItem('hskExamHistory', JSON.stringify(history));
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('hskLanguage', lang);
  };

  const startExam = async (level: number) => {
    try {
      setSelectedLevel(level);
      const exam = await ExamService.generateMockExam(level);
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

  const translations: Record<string, any> = {
    zh: {
      exam: '模拟考试平台',
      learn: '学习中心',
      explore: '文化探索',
      admin: '管理后台',
    },
    'zh-TW': {
      exam: '模擬考試平台',
      learn: '學習中心',
      explore: '文化探索',
      admin: '管理後台',
    },
    en: {
      exam: 'Mock Exam Platform',
      learn: 'Learning Center',
      explore: 'Culture Explore',
      admin: 'Admin CMS',
    },
    ko: {
      exam: '모의고사 플랫폼',
      learn: '학습 센터',
      explore: '문화 탐구',
      admin: '관리자 센터',
    },
    ja: {
      exam: '模擬試験プラットフォーム',
      learn: '学習センター',
      explore: '文化探求',
      admin: '管理センター',
    }
  };

  const t = translations[language] || translations['zh'];

  const categoryTranslations: Record<string, any> = {
    zh: {
      beginner: '初级 (Beginner)',
      intermediate: '中级 (Intermediate)',
      advanced: '高级 (Advanced)',
    },
    'zh-TW': {
      beginner: '初級 (Beginner)',
      intermediate: '中級 (Intermediate)',
      advanced: '高級 (Advanced)',
    },
    en: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
    ko: {
      beginner: '초급 (Beginner)',
      intermediate: '중급 (Intermediate)',
      advanced: '고급 (Advanced)',
    },
    ja: {
      beginner: '初級 (Beginner)',
      intermediate: '中級 (Intermediate)',
      advanced: '上級 (Advanced)',
    }
  };

  const ct = categoryTranslations[language] || categoryTranslations['zh'];

  const renderLevelSelect = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center py-12 md:py-16">
        <div className="flex justify-center items-center gap-4 mb-4">
            <Book size={48} className="text-blue-400"/>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">HSK 3.0 {t.exam}</h1>
        </div>
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-white/50" />
            <select 
              value={language} 
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="zh" className="bg-slate-800">简体中文</option>
              <option value="zh-TW" className="bg-slate-800">繁體中文</option>
              <option value="en" className="bg-slate-800">English</option>
              <option value="ko" className="bg-slate-800">한국어</option>
              <option value="ja" className="bg-slate-800">日本語</option>
            </select>
          </div>
          <button 
            onClick={() => {
              window.history.pushState({}, '', '/admin');
              setCurrentView('admin');
            }}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-blue-400 transition-colors"
          >
            <Layout size={16} />
            {t.admin}
          </button>
        </div>

        <nav className="flex justify-center gap-4 mb-12">
          <NavButton active={currentView === 'level-select'} onClick={() => setCurrentView('level-select')} icon={<ClipboardList size={18}/>} label={t.exam} />
          <NavButton active={currentView === 'learn'} onClick={() => setCurrentView('learn')} icon={<BookOpen size={18}/>} label={t.learn} />
          <NavButton active={currentView === 'explore'} onClick={() => setCurrentView('explore')} icon={<Compass size={18}/>} label={t.explore} />
        </nav>

        {currentView === 'level-select' && (
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            {language === 'zh' ? '根据最新的汉语水平考试3.0标准，选择您的等级开始模拟测试。' : 
             language === 'zh-TW' ? '根據最新的漢語水平考試3.0標準，選擇您的等級開始模擬測試。' :
             language === 'en' ? 'Choose your level to start the mock test based on the latest HSK 3.0 standards.' :
             language === 'ko' ? '최신 HSK 3.0 표준에 따라 레벨을 선택하여 모의고사를 시작하세요.' :
             '最新のHSK 3.0基準に基づいた模擬試験を開始するには、レベルを選択してください。'}
          </p>
        )}
        
        {currentView === 'level-select' && (
          <button 
              onClick={() => setCurrentView('history')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <History size={18}/>
              {language === 'zh' ? '查看考试历史' : 
               language === 'zh-TW' ? '查看考試歷史' :
               language === 'en' ? 'View Exam History' :
               language === 'ko' ? '시험 기록 보기' :
               '試験履歴を表示'}
          </button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {currentView === 'level-select' && (
          <motion.div 
            key="levels"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
          >
            {hskCategories?.map((category, idx) => (
                <div key={category.title} className="flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold text-white/80 tracking-wide px-2">
                      {idx === 0 ? ct.beginner : idx === 1 ? ct.intermediate : ct.advanced}
                    </h2>
                    <div className="flex flex-col gap-6">
                        {category.levels?.map((level: any) => (
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
          </motion.div>
        )}

        {currentView === 'learn' && (
          <motion.div 
            key="learn"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {learnContent.map(item => (
              <div key={item.id}>
                <ContentCard item={item} />
              </div>
            ))}
          </motion.div>
        )}

        {currentView === 'explore' && (
          <motion.div 
            key="explore"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {exploreContent.map(item => (
              <div key={item.id}>
                <ContentCard item={item} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (currentView === 'admin') {
    return <AdminDashboard onBack={() => {
      window.history.pushState({}, '', '/');
      setCurrentView('level-select');
    }} />;
  }

  return (
    <main className="min-h-screen w-full bg-slate-900 text-white py-10 flex flex-col items-center">
      {(currentView === 'level-select' || currentView === 'learn' || currentView === 'explore') && renderLevelSelect()}
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

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
        active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-white/5 text-white/60 hover:bg-white/10'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function ContentCard({ item }: { item: any }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
      <p className="text-white/60 text-sm mb-4">{item.description}</p>
      <div className="text-white/80 leading-relaxed whitespace-pre-wrap">{item.content}</div>
    </div>
  );
}

export default App;


import React, { useState, createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Dictionary from './components/Dictionary';
import AITutor from './components/AITutor';
import CultureFeed from './components/CultureFeed';
import Learn from './components/Learn';
import ExamCenter from './components/ExamCenter';
import Settings from './components/Settings';
import { AdminDashboard } from './components/AdminDashboard';
import { View, Language, User, Unit, ExamRecord } from './types';
import { translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
  user: User | null;
  setUser: (user: User | null) => void;
  allUnits: Unit[];
  exploreContent: any[];
  activeUnitId: string | null;
  setActiveUnitId: (id: string | null) => void;
  activeCultureTopic: string | null;
  setActiveCultureTopic: (id: string | null) => void;
  examHistory: ExamRecord[];
  addExamRecord: (record: Omit<ExamRecord, 'id' | 'date'>) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useExam = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useExam must be used within LanguageProvider');
  return context;
};

const App: React.FC = () => {
  const [currentView, setView] = useState<View>(View.DASHBOARD);
  const [language, setLanguage] = useState<Language>('en');
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [activeCultureTopic, setActiveCultureTopic] = useState<string | null>(null);
  const [examHistory, setExamHistory] = useState<ExamRecord[]>([]);
  
  const [user, setUser] = useState<User | null>({
    id: 'u-001',
    name: 'Alex Chen',
    email: 'alex@hanzigo.ai',
    avatar: '🦁',
    level: 4,
    xp: 4850,
    joinedDate: 'Jan 2024',
    stats: {
      vocabulary: 78,
      grammar: 62,
      listening: 45,
      reading: 92
    }
  });

  const t = useCallback((key: string, params?: Record<string, any>) => {
    let text = translations[language]?.[key] || translations['en']?.[key] || translations['zh']?.[key] || key;
    if (params) {
      Object.keys(params).forEach(p => {
        text = text.replace(`{${p}}`, String(params[p]));
      });
    }
    return text;
  }, [language]);

  const [allUnits, setAllUnits] = useState<Unit[]>([]);
  const [exploreContent, setExploreContent] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Learn Units
        const learnRes = await fetch('/api/content/learn');
        const learnData = await learnRes.json();
        if (learnData && learnData.length > 0) {
          setAllUnits(learnData);
        } else {
          const hardcodedUnits: Unit[] = [
            { id: 'u1', title: t('introToPinyin'), description: t('descIntro'), icon: '👋', color: 'bg-emerald-500', lessons: 4, completed: 3, locked: false, focus: t('focusPinyin'), category: 'Foundation' },
            { id: 'u8', title: t('numbersAndCounting'), description: t('descNumbers'), icon: '🔢', color: 'bg-cyan-500', lessons: 6, completed: 1, locked: false, focus: t('focusLogic'), category: 'Foundation' },
            { id: 'u4', title: t('dailyLife'), description: t('descDaily'), icon: '⏰', color: 'bg-blue-500', lessons: 8, completed: 0, locked: false, focus: t('focusRoutine'), category: 'Lifestyle' },
            { id: 'u2', title: t('chineseCuisine'), description: t('descFoodUnit'), icon: '🍜', color: 'bg-orange-500', lessons: 5, completed: 0, locked: false, focus: t('focusFood'), category: 'Lifestyle' },
            { id: 'u5', title: t('shoppingExpressions'), description: t('descShopping'), icon: '🛍️', color: 'bg-rose-500', lessons: 5, completed: 0, locked: false, focus: t('focusShopping'), category: 'Lifestyle' },
            { id: 'u6', title: t('socialInteractions'), description: t('descSocial'), icon: '🤝', color: 'bg-purple-500', lessons: 7, completed: 0, locked: false, focus: t('focusSocial'), category: 'Interaction' },
            { id: 'u3', title: t('travelNavigation'), description: t('descTravel'), icon: '🚇', color: 'bg-indigo-500', lessons: 6, completed: 0, locked: false, focus: t('focusNav'), category: 'Interaction' },
            { id: 'u7', title: t('culturalInsights'), description: t('descCulture'), icon: '🎨', color: 'bg-amber-500', lessons: 10, completed: 0, locked: false, focus: t('focusCulture'), category: 'Immersion' },
            { id: 'u9', title: t('businessChinese'), description: t('descBusiness'), icon: '💼', color: 'bg-slate-700', lessons: 12, completed: 0, locked: true, focus: t('focusFormal'), category: 'Immersion' },
          ];
          setAllUnits(hardcodedUnits);
        }

        // Fetch Explore Categories
        const exploreRes = await fetch('/api/content/explore');
        const exploreData = await exploreRes.json();
        if (exploreData && exploreData.length > 0) {
          setExploreContent(exploreData);
        } else {
          // Fallback to hardcoded categories if DB is empty
          const hardcodedExplore = [
            { id: 'cat_philosophy', title: t('catPhilosophy'), desc: t('descPhilosophy'), overviewKey: 'overviewPhilosophy', icon: '☯️', color: 'bg-slate-900', subTopics: ['confucianism', 'taoism', 'mohism', 'chinese_buddhism'] },
            { id: 'cat_history', title: t('catHistory'), desc: t('descHistory'), overviewKey: 'overviewHistory', icon: '📜', color: 'bg-amber-800', subTopics: ['silk_road', 'forbidden_city', 'great_wall', 'dynasties_timeline', 'civil_exams'] },
            { id: 'cat_language', title: t('catLanguage'), desc: t('descLanguage'), overviewKey: 'overviewLanguage', icon: '🖌️', color: 'bg-red-700', subTopics: ['evolution_hanzi', 'famous_idioms'] },
            { id: 'cat_art', title: t('catArt'), desc: t('descArt'), overviewKey: 'overviewArt', icon: '🎭', color: 'bg-indigo-700', subTopics: ['peking_opera', 'trad_painting', 'folk_music'] },
            { id: 'cat_aesthetics', title: t('catAesthetics'), desc: t('descAesthetics'), overviewKey: 'overviewAesthetics', icon: '🍵', color: 'bg-emerald-800', subTopics: ['tea_culture', 'suzhou_gardens', 'porcelain_arts'] },
            { id: 'cat_festivals', title: t('catFestivals'), desc: t('descFestivals'), overviewKey: 'overviewFestivals', icon: '🏮', color: 'bg-orange-600', subTopics: ['lunar_new_year', 'mid_autumn', 'dragon_boat'] },
            { id: 'cat_food', title: t('catFood'), desc: t('descFoodCat'), overviewKey: 'overviewFood', icon: '🥟', color: 'bg-yellow-600', subTopics: ['eight_cuisines', 'dim_sum', 'street_food'] },
            { id: 'cat_crafts', title: t('catCrafts'), desc: t('descCrafts'), overviewKey: 'overviewCrafts', icon: '🏺', color: 'bg-teal-700', subTopics: ['silk_weaving', 'paper_cutting'] },
            { id: 'cat_architecture', title: t('catArchitecture'), desc: t('descArchitecture'), overviewKey: 'overviewArchitecture', icon: '🏯', color: 'bg-stone-800', subTopics: ['feng_shui', 'courtyards'] },
            { id: 'cat_ethics', title: t('catEthics'), desc: t('descEthics'), overviewKey: 'overviewEthics', icon: '🧧', color: 'bg-rose-700', subTopics: ['filial_piety', 'etiquette'] },
            { id: 'cat_medicine', title: t('catMedicine'), desc: t('descMedicine'), overviewKey: 'overviewMedicine', icon: '🌿', color: 'bg-green-700', subTopics: ['tcm_fundamentals', 'acupuncture'] },
            { id: 'cat_martial_arts', title: t('catMartialArts'), desc: t('descMartialArts'), overviewKey: 'overviewMartialArts', icon: '🥋', color: 'bg-blue-900', subTopics: ['shaolin_kungfu', 'tai_chi'] }
          ];
          setExploreContent(hardcodedExplore);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [language, t]);

  useEffect(() => {
    const savedLang = localStorage.getItem('hanzigo_lang') as Language;
    if (savedLang) {
      setLanguage(savedLang);
      document.documentElement.dir = (savedLang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.lang = savedLang;
    }
    
    const savedUser = localStorage.getItem('hanzigo_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedHistory = localStorage.getItem('hanzigo_exam_history');
    if (savedHistory) setExamHistory(JSON.parse(savedHistory));
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('hanzigo_lang', lang);
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.lang = lang;
  };

  const handleSetUser = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem('hanzigo_user', JSON.stringify(u));
    else localStorage.removeItem('hanzigo_user');
  };

  const addExamRecord = (record: Omit<ExamRecord, 'id' | 'date'>) => {
    const newRecord: ExamRecord = {
      ...record,
      id: `ex-${Date.now()}`,
      date: Date.now(),
    };
    setExamHistory(prev => {
      const updatedHistory = [newRecord, ...prev];
      localStorage.setItem('hanzigo_exam_history', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard setView={setView} />;
      case View.DICTIONARY: return <Dictionary />;
      case View.AI_TUTOR: return <AITutor />;
      case View.CULTURE: return <CultureFeed />;
      case View.LEARN: return <Learn />;
      case View.EXAM: return <ExamCenter />;
      case View.SETTINGS: return <Settings />;
      case View.ADMIN: return <AdminDashboard onBack={() => setView(View.DASHBOARD)} />;
      default: return <Dashboard setView={setView} />;
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage: handleSetLanguage, t, user, setUser: handleSetUser, 
      allUnits, exploreContent, activeUnitId, setActiveUnitId, activeCultureTopic, setActiveCultureTopic, 
      examHistory, addExamRecord 
    }}>
      <div className={`flex h-screen w-screen overflow-hidden bg-gray-50 flex-col md:flex-row ${language === 'ar' ? 'rtl font-arabic' : 'ltr'}`}>
        <Navigation currentView={currentView} setView={setView} />
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="mx-auto max-w-7xl min-h-full">
            {renderContent()}
          </div>
          <div className="h-20 md:hidden" />
        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;

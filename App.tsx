
import React, { useState, createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Dictionary from './components/Dictionary';
import AITutor from './components/AITutor';
import CultureFeed from './components/CultureFeed';
import Learn from './components/Learn';
import HSKCenter from './components/HSKCenter';
import Settings from './components/Settings';
import { View, Language, User, Unit } from './types';
import { translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
  user: User | null;
  setUser: (user: User | null) => void;
  allUnits: Unit[];
  activeUnitId: string | null;
  setActiveUnitId: (id: string | null) => void;
  activeCultureTopic: string | null;
  setActiveCultureTopic: (id: string | null) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};

const App: React.FC = () => {
  const [currentView, setView] = useState<View>(View.DASHBOARD);
  const [language, setLanguage] = useState<Language>('en');
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [activeCultureTopic, setActiveCultureTopic] = useState<string | null>(null);
  
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
    let text = translations[language]?.[key] || translations['en']?.[key] || key;
    if (params) {
      Object.keys(params).forEach(p => {
        text = text.replace(`{${p}}`, String(params[p]));
      });
    }
    return text;
  }, [language]);

  const allUnits = useMemo<Unit[]>(() => [
    { id: 'u1', title: t('introToPinyin'), description: t('descIntro'), icon: '👋', color: 'bg-emerald-500', lessons: 4, completed: 3, locked: false, focus: t('focusPinyin'), category: 'Foundation' },
    { id: 'u8', title: t('numbersAndCounting'), description: t('descNumbers'), icon: '🔢', color: 'bg-cyan-500', lessons: 6, completed: 1, locked: false, focus: t('focusLogic'), category: 'Foundation' },
    { id: 'u4', title: t('dailyLife'), description: t('descDaily'), icon: '⏰', color: 'bg-blue-500', lessons: 8, completed: 0, locked: false, focus: t('focusRoutine'), category: 'Lifestyle' },
    { id: 'u2', title: t('chineseCuisine'), description: t('descFoodUnit'), icon: '🍜', color: 'bg-orange-500', lessons: 5, completed: 0, locked: false, focus: t('focusFood'), category: 'Lifestyle' },
    { id: 'u5', title: t('shoppingExpressions'), description: t('descShopping'), icon: '🛍️', color: 'bg-rose-500', lessons: 5, completed: 0, locked: false, focus: t('focusShopping'), category: 'Lifestyle' },
    { id: 'u6', title: t('socialInteractions'), description: t('descSocial'), icon: '🤝', color: 'bg-purple-500', lessons: 7, completed: 0, locked: false, focus: t('focusSocial'), category: 'Interaction' },
    { id: 'u3', title: t('travelNavigation'), description: t('descTravel'), icon: '🚇', color: 'bg-indigo-500', lessons: 6, completed: 0, locked: false, focus: t('focusNav'), category: 'Interaction' },
    { id: 'u7', title: t('culturalInsights'), description: t('descCulture'), icon: '🎨', color: 'bg-amber-500', lessons: 10, completed: 0, locked: false, focus: t('focusCulture'), category: 'Immersion' },
    { id: 'u9', title: t('businessChinese'), description: t('descBusiness'), icon: '💼', color: 'bg-slate-700', lessons: 12, completed: 0, locked: true, focus: t('focusFormal'), category: 'Immersion' },
  ], [language, t]);

  useEffect(() => {
    const savedLang = localStorage.getItem('hanzigo_lang') as Language;
    if (savedLang) {
      setLanguage(savedLang);
      document.documentElement.dir = (savedLang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.lang = savedLang;
    }
    
    const savedUser = localStorage.getItem('hanzigo_user');
    if (savedUser) setUser(JSON.parse(savedUser));
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

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard setView={setView} />;
      case View.DICTIONARY: return <Dictionary />;
      case View.AI_TUTOR: return <AITutor />;
      case View.CULTURE: return <CultureFeed />;
      case View.LEARN: return <Learn />;
      case View.HSK: return <HSKCenter />;
      case View.SETTINGS: return <Settings />;
      default: return <Dashboard setView={setView} />;
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage: handleSetLanguage, t, user, setUser: handleSetUser, 
      allUnits, activeUnitId, setActiveUnitId, activeCultureTopic, setActiveCultureTopic 
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

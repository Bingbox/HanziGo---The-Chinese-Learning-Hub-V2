
import React from 'react';
import { View } from '../types';
import { useTranslation } from '../App';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

// SF Symbols 5 Style Icons
const Icons = {
  Home: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600 scale-110' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Learn: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600 scale-110' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  Dictionary: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600 scale-110' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  ),
  Tutor: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600 scale-110' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  ),
  Culture: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600 scale-110' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 0 1 8.716 6.747M12 3a9.004 9.004 0 0 0-8.716 6.747" />
    </svg>
  ),
  Exam: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600 scale-110' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  // Settings icon is removed from main nav items, but defined here for potential use elsewhere if needed.
  Settings: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600 scale-110' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
};

const BrandLogo: React.FC<{ size?: string }> = ({ size = "w-12 h-12" }) => (
  <div className={`${size} relative animate-in zoom-in duration-500 group`}>
    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl shadow-xl transform transition-all group-hover:scale-110 group-hover:rotate-3"></div>
    <svg viewBox="0 0 100 100" className="absolute inset-0 p-2.5 fill-white">
      <path d="M25 20h10v60H25z M65 20h10v60H65z M35 45h30v10H35z" />
      <path d="M20 20l30-10 30 10v5h-60z" className="opacity-40" />
    </svg>
  </div>
);

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const { t, user } = useTranslation();

  const items = [
    { id: View.DASHBOARD, label: t('home'), Icon: Icons.Home },
    { id: View.LEARN, label: t('learn'), Icon: Icons.Learn },
    { id: View.DICTIONARY, label: t('dict'), Icon: Icons.Dictionary },
    { id: View.AI_TUTOR, label: t('tutor'), Icon: Icons.Tutor },
    { id: View.CULTURE, label: t('explore'), Icon: Icons.Culture },
    { id: View.HSK, label: t('tests'), Icon: Icons.Exam },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] glass border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16">
          {items.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setView(id)} className="flex flex-col items-center justify-center flex-1 transition-all">
              <Icon active={currentView === id} />
              <span className={`text-[9px] font-black uppercase mt-1.5 tracking-widest ${currentView === id ? 'text-red-600' : 'text-gray-400'}`}>{label}</span>
            </button>
          ))}
          {/* User profile button for mobile, now leads to settings */}
          <button
            onClick={() => setView('SETTINGS' as View)} // Direct to 'SETTINGS' view for User Management
            className="flex flex-col items-center justify-center flex-1 transition-all"
          >
            <span className={`w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] transition-transform ${currentView === 'SETTINGS' as View ? 'scale-110 -translate-y-1 ring-2 ring-red-500' : ''}`}>
              {user?.avatar || '👤'}
            </span>
            <span className={`text-[9px] font-black uppercase mt-1.5 tracking-widest ${currentView === 'SETTINGS' as View ? 'text-red-600' : 'text-gray-400'}`}>
              {t('profile')}
            </span>
          </button>
        </div>
      </div>

      {/* Tablet/Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-100 sticky top-0 overflow-y-auto">
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-14 cursor-pointer group" onClick={() => setView(View.DASHBOARD)}>
            <BrandLogo />
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-gray-900 leading-none">Hanzi<span className="text-red-600 italic">Go</span></h1>
              <p className="text-[9px] uppercase font-black text-gray-400 tracking-[0.2em] mt-1.5">{t('masteryHub')}</p>
            </div>
          </div>

          <div className="space-y-1.5 flex-1">
            {items.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setView(id)} className={`flex items-center gap-4 w-full px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${currentView === id ? 'bg-red-50 text-red-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                <Icon active={currentView === id} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* User profile button for desktop, now leads to settings */}
          <div className="mt-auto pt-8 border-t border-gray-50">
            <button onClick={() => setView('SETTINGS' as View)} className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-colors ${currentView === 'SETTINGS' as View ? 'bg-red-50 text-red-600 shadow-sm' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">{user?.avatar || '👤'}</div>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-black truncate">{user?.name || t('user')}</p> {/* Use t('user') for default user name */}
                <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>{t('online')}</span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

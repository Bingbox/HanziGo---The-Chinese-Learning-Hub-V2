
import React, { useState } from 'react';
import { useTranslation } from '../App';
import { Language, User } from '../types';
import { translations } from '../translations';

// SF Symbols 5 Style Icons for Settings
const SettingsIcons = {
  Profile: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-colors ${active ? 'fill-red-600' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  Language: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-colors ${active ? 'fill-red-600' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 0 1 8.716 6.747M12 3a9.004 9.004 0 0 0-8.716 6.747" />
    </svg>
  ),
  Account: ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-colors ${active ? 'fill-red-600' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 3h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v4.5a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[1.8]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6.75a2.25 2.25 0 0 1 2.25 2.25v13.5a2.25 2.25 0 0 1-2.25 2.25H10.5a2.25 2.25 0 0 1-2.25-2.25V15M12 12l4.5-4.5M12 12l-4.5 4.5M12 12l4.5 4.5M12 12l-4.5-4.5" />
    </svg>
  ),
};

const Settings: React.FC = () => {
  const { language, setLanguage, t, user, setUser } = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'language'>('profile');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const languages: Language[] = ['en', 'es', 'ja', 'de', 'ko', 'fr', 'ru', 'ar', 'zh_hk'];

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'User',
      email: formData.email || 'user@example.com',
      avatar: '🦁',
      level: 1,
      xp: 0,
      joinedDate: new Date().toLocaleDateString(language), // Localize joined date
      stats: { vocabulary: 0, grammar: 0, listening: 0, reading: 0 }
    };
    setUser(newUser);
  };

  const handleLogout = () => setUser(null);

  return (
    <div className="p-6 md:p-10 lg:p-12 max-w-4xl mx-auto pb-24 md:pb-12 animate-in fade-in duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-1">{t('userManagement')}</h2>
          <p className="text-sm text-gray-500 font-medium">{t('profilePrefs')}</p>
        </div>
        {user && (
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-all border border-red-100 text-sm">
            <SettingsIcons.Logout /> {t('logout')}
          </button>
        )}
      </header>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col min-h-[480px]">
        <nav className="flex border-b border-gray-100 bg-gray-50/50">
          {[
            { id: 'profile', label: t('profile'), Icon: SettingsIcons.Profile },
            { id: 'language', label: t('language'), Icon: SettingsIcons.Language },
            { id: 'account', label: t('account'), Icon: SettingsIcons.Account }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-all relative
                ${activeTab === tab.id ? 'text-red-600' : 'text-gray-400'}`}
            >
              <tab.Icon active={activeTab === tab.id} />
              <span className="text-sm">{tab.label}</span>
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />}
            </button>
          ))}
        </nav>

        <div className="p-8 md:p-10">
            {activeTab === 'profile' && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                    {user ? (
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 p-6 bg-red-50 rounded-2xl border border-red-50">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">{user.avatar}</div>
                                <div>
                                    <h4 className="text-xl font-black text-gray-900">{user.name}</h4>
                                    <p className="text-xs text-red-600 font-bold uppercase tracking-widest">{t('levelBadge', { n: user.level })}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('name')}</label>
                                    <input type="text" value={user.name} disabled className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-400" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('emailAddress')}</label>
                                    <input type="email" value={user.email} disabled className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-400" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('joinedDateLabel')}</label> {/* New key */}
                                    <input type="text" value={user.joinedDate} disabled className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-400" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <button onClick={() => setActiveTab('account')} className="px-8 py-3 bg-red-600 text-white rounded-xl font-black shadow-lg">{t('loginToSync')}</button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'language' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in">
                    {languages.map(lang => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`flex items-center justify-between p-4 rounded-2xl border-2 font-bold transition-all
                                ${language === lang ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-50 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                        >
                            <span className="text-sm">{(translations[lang] as any).langName}</span>
                            {language === lang && <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">✓</span>}
                        </button>
                    ))}
                </div>
            )}

            {activeTab === 'account' && (
                <div className="animate-in fade-in">
                    <form onSubmit={handleAuth} className="space-y-4 max-w-md mx-auto">
                        <input 
                          required 
                          type="email" 
                          placeholder={t('emailAddress')} 
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" 
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                        <input 
                          required 
                          type="password" 
                          placeholder={t('password')} 
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" 
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-xl font-black shadow-lg hover:bg-black uppercase tracking-widest text-sm">{t('signIn')}</button>
                    </form>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

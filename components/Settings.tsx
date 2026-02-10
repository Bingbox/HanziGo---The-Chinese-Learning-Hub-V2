
import React, { useState } from 'react';
import { useTranslation } from '../App';
import { Language, User, StoredUser } from '../types';
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
  // Logout icon removed as per user request to simplify the button to text only.
};

const Settings: React.FC = () => {
  const { language, setLanguage, t, user, setUser } = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'language'>('profile');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const languages: Language[] = ['en', 'es', 'ja', 'de', 'ko', 'fr', 'ru', 'ar', 'zh_hk'];

  // Helper to load all users from local storage
  const loadAllUsers = (): Record<string, StoredUser> => {
    const storedUsers = localStorage.getItem('hanzigo_all_users');
    return storedUsers ? JSON.parse(storedUsers) : {};
  };

  // Helper to save all users to local storage
  const saveAllUsers = (users: Record<string, StoredUser>) => {
    localStorage.setItem('hanzigo_all_users', JSON.stringify(users));
  };

  // Generic message display handler
  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password: string) => password.length >= 6; // Simple validation

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(loginEmail) || !isValidPassword(loginPassword)) {
      showMessage('error', t('invalidCredentials'));
      return;
    }

    const allUsers = loadAllUsers();
    const storedUser = allUsers[loginEmail];

    if (storedUser && storedUser.password === loginPassword) {
      // Successfully logged in
      const userWithoutPassword: User = { ...storedUser };
      delete (userWithoutPassword as Partial<StoredUser>).password; // Remove password before setting to app state
      setUser(userWithoutPassword);
      showMessage('success', t('loginSuccess'));
      setLoginEmail('');
      setLoginPassword('');
    } else {
      showMessage('error', t('invalidCredentials'));
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName.trim()) {
      showMessage('error', `${t('userName')} ${t('is_required')}`); // Assuming a translation key 'is_required'
      return;
    }
    if (!isValidEmail(registerEmail) || !isValidPassword(registerPassword)) {
      showMessage('error', t('invalidCredentials')); // Reusing for invalid format/length
      return;
    }

    const allUsers = loadAllUsers();
    if (allUsers[registerEmail]) {
      showMessage('error', t('userExists'));
      return;
    }

    const newUser: StoredUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: registerName.trim(),
      email: registerEmail,
      avatar: registerName.trim().charAt(0).toUpperCase() || '👤',
      level: 1,
      xp: 0,
      joinedDate: new Date().toLocaleDateString(language),
      stats: { vocabulary: 0, grammar: 0, listening: 0, reading: 0 },
      password: registerPassword, // Store password for simulation
    };

    allUsers[newUser.email] = newUser;
    saveAllUsers(allUsers);

    const userWithoutPassword: User = { ...newUser };
    delete (userWithoutPassword as Partial<StoredUser>).password;
    setUser(userWithoutPassword);
    showMessage('success', t('registrationSuccess'));
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  const handleSimulateLogin = () => {
    const testEmail = 'test@hanzigo.ai';
    const testPassword = 'password'; // Simulated password

    let allUsers = loadAllUsers();
    let simulatedUser = allUsers[testEmail];

    if (!simulatedUser) {
      // Create a default simulated user if not exists
      simulatedUser = {
        id: 'sim-001',
        name: 'Test User',
        email: testEmail,
        avatar: '🤖',
        level: 5,
        xp: 7500,
        joinedDate: new Date().toLocaleDateString(language),
        stats: { vocabulary: 85, grammar: 70, listening: 60, reading: 95 },
        password: testPassword,
      };
      allUsers[testEmail] = simulatedUser;
      saveAllUsers(allUsers);
    }

    const userWithoutPassword: User = { ...simulatedUser };
    delete (userWithoutPassword as Partial<StoredUser>).password;
    setUser(userWithoutPassword);
    showMessage('success', t('loginSuccess'));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hanzigo_user'); // Clear current user from local storage
    showMessage('success', t('logout'));
  };

  return (
    <div className="p-6 md:p-10 lg:p-12 max-w-4xl mx-auto pb-24 md:pb-12 animate-in fade-in duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-1">{t('userManagement')}</h2>
          <p className="text-sm text-gray-500 font-medium">{t('profilePrefs')}</p>
        </div>
        {user && (
          <button 
            onClick={handleLogout} 
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-black text-xs hover:bg-red-600 transition-all uppercase tracking-widest"
          >
            {t('logout')}
          </button>
        )}
      </header>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col min-h-[480px]">
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
                            <div className="flex items-center gap-6 p-6 bg-red-50 rounded-xl border border-red-50">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">{user.avatar}</div>
                                <div>
                                    <h4 className="text-xl font-black text-gray-900">{user.name}</h4>
                                    <p className="text-xs text-red-600 font-bold uppercase tracking-widest">{t('levelBadge', { n: user.level })}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('name')}</label>
                                    <input type="text" value={user.name} disabled className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg font-bold text-gray-400" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('emailAddress')}</label>
                                    <input type="email" value={user.email} disabled className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg font-bold text-gray-400" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('joinedDateLabel')}</label>
                                    <input type="text" value={user.joinedDate} disabled className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg font-bold text-gray-400" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <button onClick={() => setActiveTab('account')} className="px-8 py-3 bg-red-600 text-white rounded-lg font-black shadow-lg">{t('loginToSync')}</button>
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
                            className={`flex items-center justify-between p-4 rounded-xl border-2 font-bold transition-all
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
                    {message && (
                      <div className={`mb-4 px-4 py-3 rounded-lg text-sm text-center font-bold ${message.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                      </div>
                    )}

                    {!user ? (
                      <div className="space-y-8">
                          {authMode === 'login' ? (
                            <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto">
                                <input 
                                  required 
                                  type="email" 
                                  placeholder={t('emailAddress')} 
                                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" 
                                  value={loginEmail}
                                  onChange={(e) => setLoginEmail(e.target.value)}
                                />
                                <input 
                                  required 
                                  type="password" 
                                  placeholder={t('password')} 
                                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" 
                                  value={loginPassword}
                                  onChange={(e) => setLoginPassword(e.target.value)}
                                />
                                <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-lg font-black shadow-lg hover:bg-black uppercase tracking-widest text-sm">{t('signIn')}</button>
                                <p className="text-center text-sm text-gray-500 mt-4">
                                  {t('dontHaveAccount')} <button type="button" onClick={() => setAuthMode('register')} className="text-red-600 font-bold hover:underline">{t('register')}</button>
                                </p>
                            </form>
                          ) : (
                            <form onSubmit={handleRegisterSubmit} className="space-y-4 max-w-md mx-auto">
                                <input 
                                  required 
                                  type="text" 
                                  placeholder={t('userName')} 
                                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" 
                                  value={registerName}
                                  onChange={(e) => setRegisterName(e.target.value)}
                                />
                                <input 
                                  required 
                                  type="email" 
                                  placeholder={t('emailAddress')} 
                                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" 
                                  value={registerEmail}
                                  onChange={(e) => setRegisterEmail(e.target.value)}
                                />
                                <input 
                                  required 
                                  type="password" 
                                  placeholder={t('password')} 
                                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" 
                                  value={registerPassword}
                                  onChange={(e) => setRegisterPassword(e.target.value)}
                                />
                                <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-lg font-black shadow-lg hover:bg-red-700 uppercase tracking-widest text-sm">{t('register')}</button>
                                <p className="text-center text-sm text-gray-500 mt-4">
                                  {t('alreadyHaveAccount')} <button type="button" onClick={() => setAuthMode('login')} className="text-red-600 font-bold hover:underline">{t('signIn')}</button>
                                </p>
                            </form>
                          )}
                          <div className="text-center border-t border-gray-100 pt-8 mt-8">
                              <button onClick={handleSimulateLogin} className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-black shadow-md hover:bg-gray-300 transition-colors uppercase tracking-widest text-sm">
                                {t('simulateLogin')}
                              </button>
                          </div>
                      </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-xl font-black text-gray-900 mb-4">{t('loginSuccess')}</p>
                            <p className="text-gray-500 text-sm">{t('welcome', { name: user.name })}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
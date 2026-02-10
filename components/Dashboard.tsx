
import React, { useState, useMemo } from 'react';
import { View, Unit } from '../types';
import { useTranslation } from '../App';

interface DashboardProps {
  setView: (view: View) => void;
}

const MasteryBadge: React.FC<{ level: number }> = ({ level }) => (
  <div className="w-24 h-24 relative flex items-center justify-center group shrink-0">
    <div className="absolute inset-0 bg-red-600 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform shadow-xl shadow-red-100"></div>
    <div className="absolute inset-0 bg-gray-900 rounded-2xl -rotate-6 group-hover:rotate-0 transition-transform"></div>
    <div className="relative z-10 text-center">
      <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-0.5">HSK</p>
      <p className="text-4xl font-black text-white">{level}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const { t, user, allUnits, setActiveUnitId } = useTranslation();
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDay() - 1);

  const randomModules = useMemo(() => {
    const available = allUnits.filter(u => !u.locked);
    return [...available].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [allUnits]);

  const weeklyData = useMemo(() => [
    { day: t('dayM'), xp: 450, percent: 45 },
    { day: t('dayT'), xp: 720, percent: 72 },
    { day: t('dayW'), xp: 300, percent: 30 },
    { day: t('dayTh'), xp: 950, percent: 95 },
    { day: t('dayF'), xp: 600, percent: 60 },
    { day: t('dayS'), xp: 850, percent: 85 },
    { day: t('daySu'), xp: 200, percent: 20 },
  ], [t]);

  const coreSkills = useMemo(() => [
    { name: t('vocabulary'), key: 'vocabulary', color: 'bg-red-500' },
    { name: t('grammar'), key: 'grammar', color: 'bg-blue-500' },
    { name: t('listening'), key: 'listening', color: 'bg-emerald-500' },
    { name: t('reading'), key: 'reading', color: 'bg-orange-500' },
  ], [t]);

  const handleModuleClick = (unit: Unit) => {
    setActiveUnitId(unit.id);
    setView(View.LEARN);
  };

  return (
    <div className="p-6 md:p-10 lg:p-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="flex items-center gap-10">
          <MasteryBadge level={user?.level || 1} />
          <div className="space-y-3">
            <div className="flex items-center gap-3">
               <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black rounded-md uppercase tracking-[0.2em] shadow-lg shadow-red-100">
                  {t('premium')}
               </span>
               <span className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">
                  {t('pathProgress', { level: user?.level || 4, day: 124 })}
               </span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tight leading-none">
              {t('welcome', { name: user?.name?.split(' ')[0] || t('user') })}
            </h2>
          </div>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
            {/* Streak Card */}
            <div className="flex-1 lg:flex-none bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 min-w-[160px] group transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-orange-600 relative z-10">
                        <path d="M12 2.25c0 4.142-2.583 6.666-4.5 8.166-.948.74-2.25 1.55-2.25 3.584 0 3.728 3.022 6.75 6.75 6.75s6.75-3.022 6.75-6.75c0-3.142-2.144-4.757-4.125-6.141-1.332-.932-2.625-1.838-2.625-5.609Z" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{t('streak')}</p>
                    <p className="text-2xl font-black text-gray-900 leading-none">12</p>
                </div>
            </div>

            {/* XP Card */}
            <div className="flex-1 lg:flex-none bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 min-w-[160px] group transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-blue-600 relative z-10">
                        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.833l2.015-7.179H3.75a.75.75 0 0 1-.548-1.262L13.702 1.75a.75.75 0 0 1 .913-.155Z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{t('xp')}</p>
                    <p className="text-2xl font-black text-gray-900 leading-none">{user?.xp || '1,240'}</p>
                </div>
            </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl flex flex-col min-h-[460px]">
            <div className="relative z-10 flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black mb-3">{t('weeklyMastery')}</h3>
                  <p className="text-gray-400 text-base font-medium opacity-60">{t('productivityPeak')}</p>
                </div>
                {selectedDay !== null && (
                  <div className="text-right bg-white/5 px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1.5">{t('selectedDetail')}</p>
                    <p className="text-3xl font-black">{weeklyData[selectedDay].xp} XP</p>
                  </div>
                )}
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-end">
                <div className="absolute left-0 right-0 bottom-[60%] border-t border-dashed border-white/10 z-0">
                   <span className="absolute -top-6 right-0 text-[10px] font-black text-white/20 uppercase tracking-widest">{t('dailyGoal')} (600 XP)</span>
                </div>

                <div className="flex items-end gap-4 h-48 md:gap-6 relative z-10">
                    {weeklyData.map((item, i) => (
                        <div 
                          key={i} 
                          className="flex-1 flex flex-col items-center gap-5 group cursor-pointer"
                          onClick={() => setSelectedDay(i)}
                        >
                            <div className="w-full bg-white/5 rounded-xl relative flex items-end overflow-hidden h-full border border-white/5 shadow-inner transition-colors group-hover:bg-white/10">
                                <div 
                                    className={`w-full rounded-t-lg transition-all duration-700 ease-out shadow-lg
                                      ${selectedDay === i ? 'bg-gradient-to-t from-red-700 to-red-500' : 'bg-white/10'}`} 
                                    style={{ height: `${item.percent}%` }}
                                ></div>
                            </div>
                            <span className={`text-[10px] font-black tracking-widest transition-colors ${selectedDay === i ? 'text-red-500' : 'text-gray-500'}`}>
                              {item.day}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-8 mt-10 pt-8 border-t border-white/5">
                <div className="text-center">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-3">{t('avgDaily')}</p>
                    <p className="text-2xl font-black">581 XP</p>
                </div>
                <div className="text-center border-x border-white/5">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-3">{t('weeklyGoal')}</p>
                    <p className="text-2xl font-black text-emerald-400">82%</p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-3">{t('bestDay')}</p>
                    <p className="text-2xl font-black text-red-500">{weeklyData[3].day}</p>
                </div>
            </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl p-12 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
                <h4 className="text-2xl font-black mb-10 tracking-tight">{t('skillRadar')}</h4>
                <div className="space-y-10">
                    {coreSkills.map((skill) => (
                        <div key={skill.key}>
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-4">
                                <span className="text-gray-400">{skill.name}</span>
                                <span className="text-gray-900">{(user?.stats as any)?.[skill.key] || 0}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden p-0.5 border border-gray-50 shadow-inner">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 delay-300 ${skill.color} shadow-lg shadow-red-100`} 
                                  style={{ width: `${(user?.stats as any)?.[skill.key] || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button 
                onClick={() => setView(View.LEARN)}
                className="w-full py-6 bg-gray-900 text-white rounded-xl font-black text-lg hover:bg-black active:scale-95 transition-all mt-12 shadow-xl shadow-gray-200 uppercase tracking-widest"
            >
                {t('resumeTraining')}
            </button>
        </div>
      </section>

      <section className="space-y-10">
        <div className="flex items-center justify-between">
            <h3 className="text-4xl font-black text-gray-900 tracking-tight">{t('deepLearningModules')}</h3>
            <button 
              onClick={() => setView(View.LEARN)}
              className="text-xs font-black text-red-600 uppercase tracking-[0.4em] hover:underline"
            >
              {t('exploreAll')}
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {randomModules.map((unit) => (
                <div 
                  key={unit.id} 
                  onClick={() => handleModuleClick(unit)}
                  className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group flex flex-col h-full"
                >
                    <div className={`w-16 h-16 aspect-square ${unit.color} rounded-xl flex items-center justify-center text-4xl mb-8 group-hover:rotate-12 transition-transform shadow-xl border-4 border-white`}>
                        {unit.icon}
                    </div>
                    <div className="mb-4">
                       <h4 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-red-600 transition-colors tracking-tight">{unit.title}</h4>
                    </div>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-6">{unit.focus}</p>
                    <p className="text-base text-gray-400 font-medium leading-relaxed italic opacity-80 flex-1">"{unit.description}"</p>
                </div>
            ))}
        </div>
      </section>

      <div 
        onClick={() => setView(View.DICTIONARY)}
        className="bg-red-600 rounded-3xl p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 cursor-pointer hover:bg-red-700 transition-all shadow-2xl brand-shadow group overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-40 -translate-y-40 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left relative z-10">
          <div className="w-24 h-24 aspect-square bg-white/20 rounded-2xl flex items-center justify-center relative border-2 border-white/20 shadow-2xl group-hover:rotate-12 transition-transform">
             <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white">
                <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.627 1.11.651 1.174.06 2.335.257 3.447.584a2.25 2.25 0 0 1 1.634 2.106V16.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 16.5V9.123a2.25 2.25 0 0 1 1.634-2.106c1.112-.327 2.273-.524 3.447-.584.465-.024.87-.268 1.11-.65l.822-1.318a2.923 2.923 0 0 1 2.331-1.394Z" clipRule="evenodd" />
             </svg>
          </div>
          <div>
            <h4 className="text-3xl font-black mb-2 tracking-tight">{t('snapTranslateTitle')}</h4>
            <p className="text-red-100 text-lg font-medium opacity-80">{t('snapTranslateDesc')}</p>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); setView(View.DICTIONARY); }}
          className="px-12 py-5 bg-white text-red-600 rounded-xl font-black hover:scale-105 transition-transform text-sm uppercase tracking-[0.2em] shadow-2xl"
        >
          {t('launchCamera')}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useMemo } from 'react';
import { View, Unit } from '../types';
import { useExam } from '../App';
import { PRESET_CULTURE_CONTENT } from '../cultureData';

interface DashboardProps {
  setView: (view: View) => void;
}

const MasteryBadge: React.FC<{ level: number }> = ({ level }) => (
  <div className="w-16 h-16 relative flex items-center justify-center group shrink-0">
    <div className="absolute inset-0 bg-[#BD1023] rounded-xl rotate-6 group-hover:rotate-0 transition-all duration-300 shadow-md shadow-[#BD1023]/10"></div>
    <div className="absolute inset-0 bg-white rounded-xl border-2 border-[#BD1023] -rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
    <div className="relative z-10 text-center">
      <p className="text-[8px] font-black text-[#BD1023] uppercase tracking-widest -mb-0.5">HSK</p>
      <p className="text-2xl font-black text-[#1A1A1A] leading-none">{level}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const { t, user, allUnits, setActiveUnitId, setActiveCultureTopic } = useExam();
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDay() - 1);

  const featuredModules = useMemo(() => {
    const available = allUnits.filter(u => !u.locked);
    return [...available].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [allUnits]);

  const cultureSpotlights = useMemo(() => {
    const keys = Object.keys(PRESET_CULTURE_CONTENT);
    const shuffled = keys.sort(() => 0.5 - Math.random());
    return [PRESET_CULTURE_CONTENT[shuffled[0]], PRESET_CULTURE_CONTENT[shuffled[1]]];
  }, []);

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
    { name: t('skillVocab'), key: 'vocabulary', color: 'bg-[#BD1023]', glow: 'shadow-red-50' },
    { name: t('skillGrammar'), key: 'grammar', color: 'bg-[#1A1A1A]', glow: 'shadow-gray-100' },
    { name: t('skillListening'), key: 'listening', color: 'bg-[#2D8C61]', glow: 'shadow-emerald-50' },
    { name: t('skillReading'), key: 'reading', color: 'bg-[#E9C46A]', glow: 'shadow-yellow-50' },
  ], [t]);

  const handleModuleClick = (unit: Unit) => {
    setActiveUnitId(unit.id);
    setView(View.LEARN);
  };

  const handleCultureSpotlightClick = (topicId: string) => {
    setActiveCultureTopic(topicId);
    setView(View.CULTURE);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 animate-in fade-in duration-700 max-w-7xl mx-auto">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-2xl border border-[#f0ede5] shadow-sm">
        <div className="flex items-center gap-5">
          <MasteryBadge level={user?.level || 1} />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               <span className="px-1.5 py-0.5 bg-[#BD1023] text-white text-[8px] font-black rounded uppercase tracking-widest shadow-sm">
                  {t('premium')}
               </span>
               <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  {t('pathProgress', { level: user?.level || 4, day: 124 })}
               </span>
            </div>
            <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tight leading-none">
              {t('welcome', { name: user?.name?.split(' ')[0] || t('user') })}
            </h2>
          </div>
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none bg-white p-3 rounded-xl shadow-sm border border-[#f0ede5] flex items-center gap-3 min-w-[130px] group transition-all hover:shadow-md">
                <div className="w-9 h-9 bg-[#fdf2f2] rounded-lg flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#BD1023]">
                        <path d="M12 2.25c0 4.142-2.583 6.666-4.5 8.166-.948.74-2.25 1.55-2.25 3.584 0 3.728 3.022 6.75 6.75 6.75s6.75-3.022 6.75-6.75c0-3.142-2.144-4.757-4.125-6.141-1.332-.932-2.625-1.838-2.625-5.609Z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest">{t('streak')}</p>
                    <p className="text-lg font-black text-[#1A1A1A] leading-none">12</p>
                </div>
            </div>

            <div className="flex-1 lg:flex-none bg-white p-3 rounded-xl shadow-sm border border-[#f0ede5] flex items-center gap-3 min-w-[130px] group transition-all hover:shadow-md">
                <div className="w-9 h-9 bg-[#fcf9ed] rounded-lg flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#E9C46A]">
                        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.833l2.015-7.179H3.75a.75.75 0 0 1-.548-1.262L13.702 1.75a.75.75 0 0 1 .913-.155Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest">{t('xp')}</p>
                    <p className="text-lg font-black text-[#1A1A1A] leading-none">{user?.xp || '1,240'}</p>
                </div>
            </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-red-50/50 rounded-2xl p-6 text-[#1A1A1A] relative overflow-hidden shadow-sm border border-red-100/50 flex flex-col min-h-[350px]">
            
            
            <div className="relative z-10 flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-black mb-0.5 tracking-tight text-red-900">{t('weeklyMastery')}</h3>
                  <p className="text-red-900/40 text-[10px] font-black uppercase tracking-widest">{t('productivityPeak')}</p>
                </div>
                {selectedDay !== null && (
                  <div className="text-right bg-white/60 px-4 py-2 rounded-lg border border-red-100/50 transition-all">
                    <p className="text-[7px] font-black text-red-900/50 uppercase tracking-widest mb-0.5">{t('selectedDetail')}</p>
                    <p className="text-lg font-black text-[#1A1A1A]">{weeklyData[selectedDay].xp} XP</p>
                  </div>
                )}
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-end mt-4">
                <div className="absolute left-0 right-0 bottom-[60%] border-t border-dashed border-red-200/50 z-0">
                   <span className="absolute -top-4 right-0 text-[7px] font-black text-red-900/30 uppercase tracking-widest">{t('dailyGoal')}</span>
                </div>

                <div className="flex items-end gap-3 h-32 md:gap-4 relative z-10">
                    {weeklyData.map((item, i) => (
                        <div 
                          key={i} 
                          className="flex-1 flex flex-col items-center gap-3 group cursor-pointer"
                          onClick={() => setSelectedDay(i)}
                        >
                            <div className="w-full bg-red-100/30 rounded-xl relative flex items-end overflow-hidden h-full border border-red-100/50 transition-all group-hover:bg-red-100/60">
                                <div 
                                    className={`w-full rounded-t-md transition-all duration-700 ease-out
                                      ${selectedDay === i ? 'bg-gradient-to-t from-red-600 to-red-400 shadow-md shadow-red-100' : 'bg-red-200/50 group-hover:bg-red-300/50'}`}  
                                    style={{ height: `${item.percent}%` }}
                                ></div>
                            </div>
                            <span className={`text-[8px] font-black tracking-widest transition-colors ${selectedDay === i ? 'text-red-800' : 'text-red-900/40'}`}>
                              {item.day}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-red-200/50">
                <div className="text-center">
                    <p className="text-[8px] text-red-900/40 font-black uppercase mb-1">{t('avgDaily')}</p>
                    <p className="text-base font-black text-[#1A1A1A]">581 XP</p>
                </div>
                <div className="text-center border-x border-red-200/50">
                    <p className="text-[8px] text-red-900/40 font-black uppercase mb-1">{t('weeklyGoal')}</p>
                    <p className="text-base font-black text-[#2D8C61]">82%</p>
                </div>
                <div className="text-center">
                    <p className="text-[8px] text-red-900/40 font-black uppercase mb-1">{t('bestDay')}</p>
                    <p className="text-base font-black text-red-800">{weeklyData[3].day}</p>
                </div>
            </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#f0ede5] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#e2dfd5_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
            <div className="relative z-10">
                <h4 className="text-xl font-black mb-8 tracking-tight">{t('skillRadar')}</h4>
                <div className="space-y-6">
                    {coreSkills.map((skill) => (
                        <div key={skill.key}>
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1.5">
                                <span className="text-gray-400">{skill.name}</span>
                                <span className="text-[#1A1A1A]">{(user?.stats as any)?.[skill.key] || 0}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-[#f9f7f2] rounded-full overflow-hidden p-0.5 border border-[#f0ede5]">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 delay-300 ${skill.color} shadow-sm ${skill.glow}`} 
                                  style={{ width: `${(user?.stats as any)?.[skill.key] || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button 
                onClick={() => setView(View.LEARN)}
                className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-black text-sm hover:bg-[#BD1023] transition-all mt-10 shadow-lg shadow-gray-200 uppercase tracking-widest relative z-10"
            >
                {t('resumeTraining')}
            </button>
        </div>
      </section>

      <section className="space-y-6 bg-white p-6 md:p-10 rounded-2xl border border-[#f0ede5] shadow-sm">
        <div className="flex items-center gap-4">
            <h3 className="text-lg font-black text-[#1A1A1A] uppercase tracking-widest leading-none shrink-0">{t('learn')}</h3>
            <div className="h-px flex-1 bg-[#f0ede5]" />
            <button 
              onClick={() => setView(View.LEARN)}
              className="text-[10px] font-black text-[#BD1023] uppercase tracking-widest hover:underline"
            >
              {t('exploreAll')}
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModules.map((unit) => (
                <div 
                  key={unit.id} 
                  onClick={() => handleModuleClick(unit)}
                  className="bg-[#f9f7f2] p-6 rounded-2xl border border-[#f0ede5] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer group flex flex-col h-full min-h-[240px] relative overflow-hidden"
                >
                    <div className="flex items-start gap-4 mb-4 relative z-10">
                      <div className={`w-12 h-12 shrink-0 aspect-square ${unit.color} rounded-xl flex items-center justify-center text-2xl shadow-md transition-all group-hover:scale-110 border-2 border-white`}>
                        {unit.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-black text-[#1A1A1A] leading-tight group-hover:text-[#BD1023] transition-colors tracking-tight text-wrap">{unit.title}</h4>
                        <div className="inline-flex px-2 py-0.5 bg-[#f9f7f2] rounded mt-2 border border-[#f0ede5]">
                          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none">{unit.focus}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 font-medium mb-6 flex-1 leading-relaxed text-sm italic relative z-10">"{unit.description}"</p>
                    <div className="mt-auto pt-4 border-t border-[#f0ede5] flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#BD1023] transition-colors relative z-10">
                      {t('resumeTraining')}
                      <span className="text-[#BD1023] opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">→</span>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <section className="space-y-6 bg-white p-6 md:p-10 rounded-2xl border border-[#f0ede5] shadow-sm">
        <div className="flex items-center gap-4">
            <h3 className="text-lg font-black text-[#1A1A1A] uppercase tracking-widest leading-none shrink-0">{t('explore')}</h3>
            <div className="h-px flex-1 bg-[#f0ede5]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cultureSpotlights.map((spotlight) => (
            <div 
              key={spotlight.id}
              onClick={() => handleCultureSpotlightClick(spotlight.id)}
              className="bg-[#f9f7f2] rounded-2xl p-6 border border-[#f0ede5] shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 p-4 text-8xl font-black text-[#BD1023]/5 chinese-font select-none pointer-events-none group-hover:scale-105 transition-transform duration-700">
                 {spotlight.chineseTitle.charAt(0)}
              </div>
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 bg-[#fdf0f1] rounded-lg flex items-center justify-center text-2xl shadow-md border-2 border-white shrink-0 group-hover:rotate-6 transition-transform duration-500">
                    {spotlight.icon}
                  </span>
                  <div>
                    <span className="text-[8px] font-black text-[#BD1023] uppercase tracking-[0.2em]">Culture Spotlight</span>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">{spotlight.pinyinTitle}</p>
                  </div>
                </div>
                <h4 className="text-xl font-black text-[#1A1A1A] tracking-tight group-hover:text-[#BD1023] transition-colors mb-2">
                  {spotlight.chineseTitle} • {t(spotlight.id)}
                </h4>
                <p className="text-gray-500 font-medium text-sm max-w-3xl leading-relaxed line-clamp-3">
                  {t(spotlight.summary)}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#f0ede5] flex items-center justify-end gap-2 text-[#BD1023] font-black text-xs uppercase tracking-widest relative z-10">
                {t('readDeepDive')}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div 
        onClick={() => setView(View.DICTIONARY)}
        className="bg-[#1A1A1A] rounded-3xl p-6 md:p-10 lg:p-12 border border-[#BD1023]/20 flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer hover:shadow-2xl hover:shadow-[#BD1023]/10 transition-all group overflow-hidden relative"
      >
        {/* Subtle radial glow to add depth without being too flashy */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#BD1023]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative z-10">
          <div className="w-16 h-16 aspect-square bg-gradient-to-br from-[#BD1023] to-[#8E0C1B] rounded-2xl flex items-center justify-center relative border border-white/20 shadow-xl group-hover:scale-110 transition-all duration-500">
             <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.627 1.11.651 1.174.06 2.335.257 3.447.584a2.25 2.25 0 0 1 1.634 2.106V16.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 16.5V9.123a2.25 2.25 0 0 1 1.634-2.106c1.112-.327 2.273-.524 3.447-.584.465-.024.87-.268 1.11-.65l.822-1.318a2.923 2.923 0 0 1 2.331-1.394Z" clipRule="evenodd" />
             </svg>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2">
               <span className="px-2 py-0.5 bg-[#E9C46A] text-[#1A1A1A] text-[9px] font-black rounded uppercase tracking-widest shadow-sm">AI Vision</span>
               <h4 className="text-2xl font-black tracking-tight text-white">{t('snapTranslateTitle')}</h4>
            </div>
            <p className="text-gray-400 text-base font-medium max-w-sm">{t('snapTranslateDesc')}</p>
          </div>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); setView(View.DICTIONARY); }}
          className="px-10 py-4 bg-[#BD1023] text-white rounded-xl font-black hover:bg-[#8E0C1B] hover:scale-105 transition-all text-xs uppercase tracking-widest shadow-xl shadow-black/40 border border-white/10 relative z-10"
        >
          {t('launchCamera')}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
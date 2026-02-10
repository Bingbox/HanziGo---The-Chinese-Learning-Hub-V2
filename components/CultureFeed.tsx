
import React, { useState, useMemo, useEffect } from 'react';
import { generateCulturalDeepDive, translateCultureArticle } from '../services/geminiService';
import { useTranslation } from '../App';
import { PRESET_CULTURE_CONTENT } from '../cultureData';

interface CulturalCategory {
  id: string;
  title: string;
  desc: string;
  overviewKey: string;
  icon: string;
  color: string;
  subTopics: string[]; // Translation keys
}

const CultureFeed: React.FC = () => {
  const { language, t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CulturalCategory | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const categories: CulturalCategory[] = useMemo(() => [
    { 
      id: 'philosophy', title: t('catPhilosophy'), desc: t('descPhilosophy'), overviewKey: 'overviewPhilosophy', icon: '☯️', color: 'bg-slate-900',
      subTopics: ['confucianism', 'taoism', 'mohism', 'chinese_buddhism', 'neo_confucianism'] 
    },
    { 
      id: 'history', title: t('catHistory'), desc: t('descHistory'), overviewKey: 'overviewHistory', icon: '📜', color: 'bg-amber-800',
      subTopics: ['dynasties_timeline', 'silk_road', 'forbidden_city', 'great_wall', 'civil_exams'] 
    },
    { 
      id: 'language', title: t('catLanguage'), desc: t('descLanguage'), overviewKey: 'overviewLanguage', icon: '🖌️', color: 'bg-red-700',
      subTopics: ['evolution_hanzi', 'calligraphy_styles', 'famous_idioms', 'chinese_poetry', 'classical_lit'] 
    },
    { 
      id: 'art', title: t('catArt'), desc: t('descArt'), overviewKey: 'overviewArt', icon: '🎭', color: 'bg-indigo-700',
      subTopics: ['peking_opera', 'trad_painting', 'folk_music', 'sculpture', 'dance'] 
    },
    { 
      id: 'aesthetics', title: t('catAesthetics'), desc: t('descAesthetics'), overviewKey: 'overviewAesthetics', icon: '🍵', color: 'bg-emerald-800',
      subTopics: ['tea_culture', 'suzhou_gardens', 'porcelain_arts', 'color_symbolism', 'ink_aesthetics'] 
    },
    { 
      id: 'festivals', title: t('catFestivals'), desc: t('descFestivals'), overviewKey: 'overviewFestivals', icon: '🏮', color: 'bg-orange-600',
      subTopics: ['lunar_new_year', 'mid_autumn', 'dragon_boat', 'lantern_festival', 'qingming'] 
    },
    { 
      id: 'food', title: t('catFood'), desc: t('descFoodCat'), overviewKey: 'overviewFood', icon: '🥟', color: 'bg-yellow-600',
      subTopics: ['eight_cuisines', 'dim_sum', 'dumplings', 'tea_pairing', 'street_food'] 
    },
    { 
      id: 'crafts', title: t('catCrafts'), desc: t('descCrafts'), overviewKey: 'overviewCrafts', icon: '🏺', color: 'bg-teal-700',
      subTopics: ['silk_weaving', 'paper_cutting', 'cloisonne', 'jade_carving', 'woodwork'] 
    },
    { 
      id: 'architecture', title: t('catArchitecture'), desc: t('descArchitecture'), overviewKey: 'overviewArchitecture', icon: '🏯', color: 'bg-stone-800',
      subTopics: ['feng_shui', 'courtyards', 'pagodas', 'bridges', 'imperial_palaces'] 
    },
    { 
      id: 'ethics', title: t('catEthics'), desc: t('descEthics'), overviewKey: 'overviewEthics', icon: '🧧', color: 'bg-rose-700',
      subTopics: ['filial_piety', 'hospitality', 'etiquette', 'loyalty', 'humility'] 
    },
    { 
      id: 'medicine', title: t('catMedicine'), desc: t('descMedicine'), overviewKey: 'overviewMedicine', icon: '🌿', color: 'bg-green-700',
      subTopics: ['tcm_fundamentals', 'acupuncture', 'yin_yang', 'herbs', 'qi_gong'] 
    },
    { 
      id: 'martial_arts', title: t('catMartialArts'), desc: t('descMartialArts'), overviewKey: 'overviewMartialArts', icon: '🥋', color: 'bg-blue-900',
      subTopics: ['shaolin_kungfu', 'tai_chi', 'wuxia_culture', 'weapons', 'wing_chun'] 
    }
  ], [t]);

  const fetchContent = async (topicId: string) => {
    setLoading(true);
    setContent(null);

    const preset = PRESET_CULTURE_CONTENT[topicId];
    try {
      if (preset) {
        const localizedArticle = await translateCultureArticle(preset, language);
        setContent({
          title: localizedArticle.chineseTitle,
          pinyinTitle: localizedArticle.pinyinTitle,
          contentChinese: localizedArticle.fullContentChinese,
          contentTranslated: localizedArticle.fullContentTranslated,
          vocabulary: localizedArticle.keyConcepts,
          reflection: localizedArticle.reflection,
          isPreset: true
        });
      } else {
        const topicName = t(topicId);
        const data = await generateCulturalDeepDive(topicName, language);
        setContent({
          title: data.chineseTitle,
          pinyinTitle: data.pinyinTitle,
          contentChinese: data.fullContentChinese,
          contentTranslated: data.fullContentTranslated,
          vocabulary: data.keyConcepts,
          reflection: data.reflection,
          isPreset: false
        });
      }
    } catch (e) {
      console.error(e);
      // Fallback to English content if translation fails for generated content
      // For preset content, `translateCultureArticle` should handle fallback
      setContent({
        title: "Error",
        pinyinTitle: "Cuòwù",
        contentChinese: "未能加载内容。",
        contentTranslated: t('errorLoadingContent'),
        vocabulary: [],
        reflection: t('errorReflection'),
        isPreset: false
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTopicId) {
      fetchContent(selectedTopicId);
    }
  }, [language, selectedTopicId]); // Added selectedTopicId to dependency array

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
  };

  const handleBack = () => {
    if (content || selectedTopicId) {
        setContent(null);
        setSelectedTopicId(null);
    } else {
        setSelectedCategory(null);
    }
  };

  const SecondaryHeader = ({ title, onClose, label }: { title: string, onClose: () => void, label?: string }) => (
    <header className="relative mb-8 pt-4">
      <div className="flex justify-between items-start mb-6">
        <div className="animate-in slide-in-from-left duration-500">
          <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-1">{label || t('exploreCulture')}</p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">{title}</h2>
        </div>
        <button onClick={onClose} className="group flex items-center gap-3 pl-4 pr-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-red-600 transition-all shadow-xl shadow-gray-200">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-xs font-black uppercase tracking-widest">{t('back')}</span>
        </button>
      </div>
    </header>
  );

  if (!selectedCategory) {
    return (
      <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
        <header className="max-w-3xl">
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">{t('culturePageTitle')}</h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">{t('exploreWelcomeDesc')}</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} onClick={() => setSelectedCategory(cat)} className="group cursor-pointer bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden">
              <div className={`w-16 h-16 ${cat.color} rounded-xl flex items-center justify-center text-3xl mb-8 group-hover:rotate-12 transition-transform text-white border-4 border-white shadow-xl`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-4">{cat.desc}</p>
              <div className="flex flex-wrap gap-1.5 opacity-60">
                {cat.subTopics.slice(0, 3).map(stId => (
                  <span key={stId} className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[8px] font-black uppercase text-gray-500">
                    {t(stId).split('(')[0]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto pb-32 animate-in slide-in-from-right duration-500">
      <SecondaryHeader 
        title={selectedTopicId ? t(selectedTopicId) : selectedCategory.title} 
        onClose={handleBack} 
        label={selectedTopicId ? `${selectedCategory.title} • ${t(selectedTopicId)}` : t('exploreCulture')} 
      />
      
      {!selectedTopicId ? (
        <div className="space-y-12 animate-in fade-in duration-700">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
             <div className={`w-32 h-32 aspect-square ${selectedCategory.color} rounded-3xl flex items-center justify-center text-6xl shadow-2xl shrink-0 text-white border-4 border-white`}>
                {selectedCategory.icon}
             </div>
             <div className="flex-1">
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                   {t(selectedCategory.overviewKey)}
                </p>
                <div className="mt-6 flex items-center gap-2">
                   <span className="w-8 h-px bg-red-600"></span>
                   <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">{t('curatedExpert')}</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCategory.subTopics.map((topicId) => (
              <div 
                key={topicId} 
                onClick={() => handleTopicSelect(topicId)} 
                className="group p-8 bg-white border border-gray-100 rounded-3xl hover:border-red-600 hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between aspect-square md:aspect-auto min-h-[220px]"
              >
                <div>
                  <h4 className="text-2xl font-black text-gray-900 group-hover:text-red-600 transition-colors tracking-tight">{t(topicId)}</h4>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose mt-2">
                    {/* Resolution logic: t('desc_' + topicId) will look for a translated description string */}
                    {t('desc_' + topicId) !== ('desc_' + topicId) ? t('desc_' + topicId) : t('exploreGenericTopic')}
                  </p>
                </div>
                <div className="flex justify-end mt-10">
                  <span className="px-5 py-2 bg-gray-50 text-gray-400 font-black text-[9px] uppercase tracking-widest rounded-lg group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                    {t('readDeepDive')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-10">
              <div className="w-24 h-24 bg-red-600 text-white rounded-3xl flex items-center justify-center text-6xl shadow-2xl animate-pulse chinese-font border-4 border-white">文</div>
              <div className="text-center">
                <p className="text-gray-900 font-black text-xl mb-2 tracking-tight">{t('curating')}</p>
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">{t(selectedTopicId)}</p>
              </div>
            </div>
          ) : content && (
            <article className="animate-in fade-in duration-1000 space-y-24">
              <header className="text-center">
                <h2 className="text-6xl font-black text-gray-900 leading-tight tracking-tight mb-2 chinese-font">{content.title}</h2>
                <p className="text-red-600 font-black tracking-[0.3em] uppercase text-sm mb-8">{content.pinyinTitle}</p>
                <div className="h-1.5 w-40 bg-gray-900 rounded-full mx-auto shadow-sm"></div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="bg-white p-12 rounded-3xl border-2 border-gray-50 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-red-600/5 text-9xl chinese-font font-black pointer-events-none group-hover:scale-110 transition-transform">原</div>
                  <h4 className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-10 flex items-center gap-2 relative z-10">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span> {t('collectionOriginal')}
                  </h4>
                  <div className="text-3xl text-gray-900 leading-[2] font-black chinese-font drop-cap-red relative z-10">{content.contentChinese}</div>
                </div>
                
                <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100 italic relative group">
                  <div className="absolute top-0 right-0 p-8 text-gray-300/10 text-9xl chinese-font font-black pointer-events-none group-hover:scale-110 transition-transform">譯</div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-2 relative z-10">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span> {t('localizedInsight')}
                  </h4>
                  <p className="text-2xl text-gray-600 leading-[1.8] font-medium relative z-10">{content.contentTranslated}</p>
                </div>
              </div>

              <style>{`.drop-cap-red::first-letter { float: left; font-size: 6rem; line-height: 1; font-weight: 900; margin-right: 1.5rem; color: #ef4444; font-family: 'Noto Sans SC', sans-serif; }`}</style>
              
              {content.vocabulary && content.vocabulary.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-7 bg-white p-12 rounded-3xl border border-gray-100 shadow-xl">
                    <h4 className="font-black text-gray-900 text-xl mb-12 flex items-center gap-4">
                      <span className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white text-sm chinese-font font-black shadow-lg border-2 border-white">詞</span> 
                      {t('keyVocab')}
                    </h4>
                    <div className="grid grid-cols-1 gap-10">
                      {content.vocabulary.map((v: any, i: number) => (
                        <div key={i} className="flex items-start gap-8 group cursor-help p-4 hover:bg-gray-50 rounded-xl transition-colors">
                          <div className="chinese-font text-5xl font-black text-gray-900 shrink-0 group-hover:text-red-600 transition-colors aspect-square">{v.word}</div>
                          <div>
                            <div className="text-xs text-red-600 font-black uppercase tracking-widest mb-1.5">{v.pinyin}</div>
                            <div className="text-lg text-gray-600 font-medium leading-relaxed">{v.meaning}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="bg-gray-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                      <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-6 relative z-10">{t('masterReflect')}</h4>
                      <p className="text-xl font-bold leading-relaxed italic relative z-10">"{content.reflection}"</p>
                    </div>

                    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center text-center">
                       <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-2xl mb-6 chinese-font font-black text-red-600 border border-white shadow-sm">書</div>
                       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{t('masterChallenge')}</h4>
                       <p className="text-lg font-bold text-gray-700 mb-8 leading-relaxed">
                         {t('challengePrompt', { word: content.vocabulary[0]?.word || '...' })}
                       </p>
                       <button onClick={() => handleBack()} className="w-full py-4 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-red-600 transition-all shadow-lg active:scale-95">
                         {t('startPractice')}
                       </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          )}
        </div>
      )}
    </div>
  );
};

export default CultureFeed;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, ChevronLeft, Layout, BookOpen, Compass, ClipboardList, HelpCircle, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Exercise {
  id: string;
  type: 'SELECT' | 'READ' | 'LISTEN' | 'SPEAK' | 'WRITE';
  question: string;
  chinese: string;
  pinyin: string;
  answer: string;
  options?: string[];
  difficulty: number;
  meaning: string;
}

interface HskLevel {
  level: number;
  description: string;
  disabled: boolean;
}

interface HskCategory {
  title: string;
  levels: HskLevel[];
}

interface Question {
  id: string;
  level: number;
  type: string;
  question: Record<string, string>;
  options?: Record<string, string[]>;
  correctAnswer?: string | boolean | Record<string, string>;
  correctAnswers?: string[] | Record<string, string[]>;
  score: number;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  locked: boolean;
  lessons: number;
  completed: number;
  focus: string;
  category: string;
}

interface ExploreCategory {
  id: string;
  title: string;
  desc: string;
  overviewKey: string;
  icon: string;
  color: string;
  subTopics: string[];
}

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'learn' | 'explore' | 'exam' | 'questions'>('learn');
  const [learnContent, setLearnContent] = useState<Unit[]>([]);
  const [exploreContent, setExploreContent] = useState<ExploreCategory[]>([]);
  const [examCategories, setExamCategories] = useState<HskCategory[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  
  // Drill-down state
  const [drilledId, setDrilledId] = useState<string | null>(null);
  const [subContent, setSubContent] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!drilledId) {
      fetchData();
    } else {
      fetchSubData();
    }
  }, [activeTab, selectedLevel, drilledId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'exam') {
        const res = await fetch('/api/content/exams');
        const data = await res.json();
        setExamCategories(data);
      } else if (activeTab === 'questions') {
        const res = await fetch(`/api/questions/${selectedLevel}`);
        const data = await res.json();
        setQuestions(data);
      } else {
        const res = await fetch(`/api/content/${activeTab}`);
        const data = await res.json();
        if (activeTab === 'learn') setLearnContent(data);
        else setExploreContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubData = async () => {
    if (!drilledId) return;
    setLoading(true);
    try {
      let url = '';
      if (activeTab === 'learn') url = `/api/exercises/${drilledId}`;
      else if (activeTab === 'explore') url = `/api/culture/topics/${drilledId}`;
      
      if (url) {
        const res = await fetch(url);
        const data = await res.json();
        setSubContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch sub-data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let data;
      let url = `/api/content/${activeTab}`;
      
      if (drilledId) {
        data = subContent;
        if (activeTab === 'learn') url = `/api/exercises/${drilledId}`;
        else if (activeTab === 'explore') url = `/api/culture/topics/${drilledId}`;
      } else {
        if (activeTab === 'exam') {
          data = examCategories;
          url = '/api/content/exams';
        } else if (activeTab === 'questions') {
          data = questions;
          url = `/api/questions/${selectedLevel}`;
        } else if (activeTab === 'learn') {
          data = learnContent;
        } else {
          data = exploreContent;
        }
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Content saved successfully!');
      } else {
        alert('Failed to save content.');
      }
    } catch (error) {
      console.error('Failed to save data:', error);
    } finally {
      setSaving(false);
    }
  };

  const addItem = () => {
    if (drilledId) {
      if (activeTab === 'learn') {
        const newEx: Exercise = {
          id: `ex_${Date.now()}`,
          type: 'SELECT',
          question: 'qSelect',
          chinese: '你好',
          pinyin: 'nǐ hǎo',
          answer: 'Hello',
          options: ['Hello', 'Goodbye', 'Thanks', 'Sorry'],
          difficulty: 1,
          meaning: 'Hello'
        };
        setSubContent([...subContent, newEx]);
      } else if (activeTab === 'explore') {
        const newTopic = {
          id: `topic_${Date.now()}`,
          icon: '🏮',
          chineseTitle: '新话题',
          pinyinTitle: 'Xīn Huàtí',
          summary: 'Summary here',
          fullContentChinese: 'Chinese content here',
          fullContentTranslated: 'Translated content here',
          keyConcepts: [],
          reflection: 'Reflection here'
        };
        setSubContent([...subContent, newTopic]);
      }
      return;
    }

    if (activeTab === 'questions') {
      const newQ: Question = {
        id: `q_${Date.now()}`,
        level: selectedLevel,
        type: 'SingleChoice',
        question: { zh: '新题目', en: 'New Question' },
        options: { zh: ['选项A', '选项B'], en: ['Option A', 'Option B'] },
        correctAnswer: '选项A',
        score: 2
      };
      setQuestions([...questions, newQ]);
      return;
    }

    if (activeTab === 'learn') {
      const newUnit: Unit = {
        id: `u_${Date.now()}`,
        title: 'New Unit',
        description: 'New Description',
        icon: '📚',
        color: 'bg-blue-500',
        locked: false,
        lessons: 5,
        completed: 0,
        focus: 'General',
        category: 'General'
      };
      setLearnContent([...learnContent, newUnit]);
    } else if (activeTab === 'explore') {
      const newCat: ExploreCategory = {
        id: `cat_${Date.now()}`,
        title: 'New Category',
        desc: 'New Description',
        overviewKey: 'overviewGeneric',
        icon: '🌍',
        color: 'bg-slate-900',
        subTopics: []
      };
      setExploreContent([...exploreContent, newCat]);
    }
  };

  const removeItem = (id: string) => {
    if (drilledId) {
      setSubContent(subContent.filter(i => i.id !== id));
      return;
    }
    if (activeTab === 'learn') setLearnContent(learnContent.filter(i => i.id !== id));
    else if (activeTab === 'explore') setExploreContent(exploreContent.filter(i => i.id !== id));
    else if (activeTab === 'questions') setQuestions(questions.filter(q => q.id !== id));
  };

  const updateLearn = (id: string, field: keyof Unit, value: any) => {
    setLearnContent(learnContent.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const updateExplore = (id: string, field: keyof ExploreCategory, value: any) => {
    setExploreContent(exploreContent.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const updateSubContent = (id: string, field: string, value: any) => {
    setSubContent(subContent.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateExamLevel = (catIdx: number, levelIdx: number, field: keyof HskLevel, value: any) => {
    const newCats = [...examCategories];
    newCats[catIdx].levels[levelIdx] = { ...newCats[catIdx].levels[levelIdx], [field]: value };
    setExamCategories(newCats);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Layout className="text-blue-400" size={24} />
              HSK CMS
            </h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-2">
          <TabButton 
            active={activeTab === 'learn'} 
            onClick={() => setActiveTab('learn')}
            icon={<BookOpen size={18} />}
            label="Learn"
          />
          <TabButton 
            active={activeTab === 'explore'} 
            onClick={() => setActiveTab('explore')}
            icon={<Compass size={18} />}
            label="Explore"
          />
          <TabButton 
            active={activeTab === 'exam'} 
            onClick={() => setActiveTab('exam')}
            icon={<ClipboardList size={18} />}
            label="Exam Levels"
          />
          <TabButton 
            active={activeTab === 'questions'} 
            onClick={() => setActiveTab('questions')}
            icon={<HelpCircle size={18} />}
            label="Questions"
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {drilledId && (
                    <button 
                      onClick={() => setDrilledId(null)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <h2 className="text-2xl font-bold capitalize">
                    {drilledId ? (activeTab === 'learn' ? 'Unit Exercises' : 'Sub-Topics') : activeTab} Management
                  </h2>
                  {activeTab === 'questions' && !drilledId && (
                    <select 
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(Number(e.target.value))}
                      className="bg-slate-800 border border-slate-700 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                    >
                      {[1,2,3,4,5,6,7,8,9].map(l => (
                        <option key={l} value={l}>Level {l}</option>
                      ))}
                    </select>
                  )}
                </div>
                {activeTab !== 'exam' && (
                  <button
                    onClick={addItem}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-sm transition-colors"
                  >
                    <Plus size={16} /> Add {drilledId ? 'Content' : 'Item'}
                  </button>
                )}
              </div>

              {drilledId ? (
                <div className="grid gap-6">
                  {activeTab === 'learn' ? (
                    subContent.map((ex: Exercise) => (
                      <div key={ex.id} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <select 
                            value={ex.type}
                            onChange={(e) => updateSubContent(ex.id, 'type', e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-blue-400"
                          >
                            <option value="SELECT">SELECT</option>
                            <option value="READ">READ</option>
                            <option value="LISTEN">LISTEN</option>
                            <option value="SPEAK">SPEAK</option>
                            <option value="WRITE">WRITE</option>
                          </select>
                          <button onClick={() => removeItem(ex.id)} className="text-slate-500 hover:text-red-400"><Trash2 size={16}/></button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <input 
                            type="text" value={ex.chinese} placeholder="Chinese"
                            onChange={(e) => updateSubContent(ex.id, 'chinese', e.target.value)}
                            className="bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                          />
                          <input 
                            type="text" value={ex.pinyin} placeholder="Pinyin"
                            onChange={(e) => updateSubContent(ex.id, 'pinyin', e.target.value)}
                            className="bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <input 
                          type="text" value={ex.answer} placeholder="Answer"
                          onChange={(e) => updateSubContent(ex.id, 'answer', e.target.value)}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                        {ex.type === 'SELECT' && (
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-slate-500">Options (comma separated)</label>
                            <input 
                              type="text" value={ex.options?.join(', ') || ''} placeholder="Option 1, Option 2, Option 3, Option 4"
                              onChange={(e) => updateSubContent(ex.id, 'options', e.target.value.split(',').map(s => s.trim()))}
                              className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    subContent.map((topic) => (
                      <div key={topic.id} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" value={topic.icon}
                              onChange={(e) => updateSubContent(topic.id, 'icon', e.target.value)}
                              className="w-10 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-center"
                            />
                            <input 
                              type="text" value={topic.chineseTitle} placeholder="Chinese Title"
                              onChange={(e) => updateSubContent(topic.id, 'chineseTitle', e.target.value)}
                              className="bg-transparent font-bold border-b border-transparent focus:border-blue-500 px-1"
                            />
                            <input 
                              type="text" value={topic.pinyinTitle} placeholder="Pinyin Title"
                              onChange={(e) => updateSubContent(topic.id, 'pinyinTitle', e.target.value)}
                              className="bg-transparent font-medium text-slate-400 border-b border-transparent focus:border-blue-500 px-1"
                            />
                          </div>
                          <button onClick={() => removeItem(topic.id)} className="text-slate-500 hover:text-red-400"><Trash2 size={16}/></button>
                        </div>
                        <input 
                          type="text" value={topic.summary} placeholder="Summary"
                          onChange={(e) => updateSubContent(topic.id, 'summary', e.target.value)}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                        <textarea 
                          value={topic.fullContentChinese}
                          placeholder="Chinese Content"
                          onChange={(e) => updateSubContent(topic.id, 'fullContentChinese', e.target.value)}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm h-24 focus:outline-none focus:border-blue-500"
                        />
                        <textarea 
                          value={topic.fullContentTranslated}
                          placeholder="Translated Content"
                          onChange={(e) => updateSubContent(topic.id, 'fullContentTranslated', e.target.value)}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm h-24 focus:outline-none focus:border-blue-500"
                        />
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-slate-500">Key Concepts (JSON Array)</label>
                          <textarea 
                            value={typeof topic.keyConcepts === 'string' ? topic.keyConcepts : JSON.stringify(topic.keyConcepts || [], null, 2)}
                            placeholder='[{"word": "汉字", "pinyin": "hànzì", "meaning": "Chinese characters"}]'
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                updateSubContent(topic.id, 'keyConcepts', parsed);
                              } catch (err) {
                                // If invalid JSON, just store the string temporarily
                                updateSubContent(topic.id, 'keyConcepts', e.target.value);
                              }
                            }}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm h-32 font-mono focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <input 
                          type="text" value={topic.reflection} placeholder="Reflection Prompt"
                          onChange={(e) => updateSubContent(topic.id, 'reflection', e.target.value)}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    ))
                  )}
                </div>
              ) : activeTab === 'exam' ? (
                <div className="space-y-8">
                  {examCategories.map((cat, catIdx) => (
                    <div key={cat.title} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
                      <h3 className="text-lg font-semibold mb-4 text-blue-400">{cat.title}</h3>
                      <div className="space-y-4">
                        {cat.levels.map((level, levelIdx) => (
                          <div key={level.level} className="grid grid-cols-[80px_1fr_100px_auto] gap-4 items-center p-3 bg-slate-800/30 rounded-lg">
                            <span className="font-mono text-slate-400">Level {level.level}</span>
                            <input 
                              type="text"
                              value={level.description}
                              onChange={(e) => updateExamLevel(catIdx, levelIdx, 'description', e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                            />
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                checked={level.disabled}
                                onChange={(e) => updateExamLevel(catIdx, levelIdx, 'disabled', e.target.checked)}
                                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-xs text-slate-400">Disabled</span>
                            </label>
                            <button 
                              onClick={() => { setActiveTab('questions'); setSelectedLevel(level.level); }}
                              className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                              title="Edit Questions"
                            >
                              <Settings size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'questions' ? (
                <div className="grid gap-6">
                  {questions.map((q) => (
                    <div key={q.id} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-slate-500 uppercase">{q.type}</span>
                          <span className="text-xs font-mono text-slate-500">Score: {q.score}</span>
                        </div>
                        <button 
                          onClick={() => removeItem(q.id)}
                          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-slate-500">Question (ZH)</label>
                          <input 
                            type="text"
                            value={q.question.zh}
                            onChange={(e) => updateQuestion(q.id, 'question', { ...q.question, zh: e.target.value })}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-slate-500">Question (EN)</label>
                          <input 
                            type="text"
                            value={q.question.en}
                            onChange={(e) => updateQuestion(q.id, 'question', { ...q.question, en: e.target.value })}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                      {q.type === 'SingleChoice' && q.options && (
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-slate-500">Options (ZH, comma separated)</label>
                          <input 
                            type="text"
                            value={q.options.zh.join(', ')}
                            onChange={(e) => updateQuestion(q.id, 'options', { ...q.options, zh: e.target.value.split(',').map(s => s.trim()) })}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : activeTab === 'learn' ? (
                <div className="grid gap-6">
                  {learnContent.map((item) => (
                    <div key={item.id} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <input 
                            type="text"
                            value={item.title}
                            onChange={(e) => updateLearn(item.id, 'title', e.target.value)}
                            className="bg-transparent text-lg font-bold border-b border-transparent hover:border-slate-700 focus:border-blue-500 focus:outline-none px-1 transition-colors"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setDrilledId(item.id)}
                            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                            title="Edit Exercises"
                          >
                            <Settings size={18} />
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text"
                          value={item.description}
                          placeholder="Description"
                          onChange={(e) => updateLearn(item.id, 'description', e.target.value)}
                          className="bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                        <input 
                          type="text"
                          value={item.category}
                          placeholder="Category"
                          onChange={(e) => updateLearn(item.id, 'category', e.target.value)}
                          className="bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'explore' ? (
                <div className="grid gap-6">
                  {exploreContent.map((item) => (
                    <div key={item.id} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <input 
                            type="text"
                            value={item.title}
                            onChange={(e) => updateExplore(item.id, 'title', e.target.value)}
                            className="bg-transparent text-lg font-bold border-b border-transparent hover:border-slate-700 focus:border-blue-500 focus:outline-none px-1 transition-colors"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setDrilledId(item.id)}
                            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                            title="Edit Sub-Topics"
                          >
                            <Settings size={18} />
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <input 
                        type="text"
                        value={item.desc}
                        placeholder="Description"
                        onChange={(e) => updateExplore(item.id, 'desc', e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-500 text-center py-20">Select a tab to manage content</div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

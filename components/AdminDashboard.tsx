import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, ChevronLeft, Layout, BookOpen, Compass, ClipboardList } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ContentItem {
  id: string;
  title: string;
  description: string;
  content: string;
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

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'learn' | 'explore' | 'exam'>('learn');
  const [learnContent, setLearnContent] = useState<ContentItem[]>([]);
  const [exploreContent, setExploreContent] = useState<ContentItem[]>([]);
  const [examCategories, setExamCategories] = useState<HskCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'exam') {
        const res = await fetch('/api/content/exams');
        const data = await res.json();
        setExamCategories(data);
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

  const handleSave = async () => {
    setSaving(true);
    try {
      let data;
      let type = activeTab;
      if (activeTab === 'exam') {
        data = examCategories;
        type = 'exams';
      } else if (activeTab === 'learn') {
        data = learnContent;
      } else {
        data = exploreContent;
      }

      const res = await fetch(`/api/content/${type}`, {
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
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: 'New Item',
      description: 'Description here',
      content: 'Content here',
    };
    if (activeTab === 'learn') setLearnContent([...learnContent, newItem]);
    else if (activeTab === 'explore') setExploreContent([...exploreContent, newItem]);
  };

  const removeItem = (id: string) => {
    if (activeTab === 'learn') setLearnContent(learnContent.filter(i => i.id !== id));
    else if (activeTab === 'explore') setExploreContent(exploreContent.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof ContentItem, value: string) => {
    if (activeTab === 'learn') {
      setLearnContent(learnContent.map(i => i.id === id ? { ...i, [field]: value } : i));
    } else if (activeTab === 'explore') {
      setExploreContent(exploreContent.map(i => i.id === id ? { ...i, [field]: value } : i));
    }
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
                <h2 className="text-2xl font-bold capitalize">{activeTab} Management</h2>
                {activeTab !== 'exam' && (
                  <button
                    onClick={addItem}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-sm transition-colors"
                  >
                    <Plus size={16} /> Add Item
                  </button>
                )}
              </div>

              {activeTab === 'exam' ? (
                <div className="space-y-8">
                  {examCategories.map((cat, catIdx) => (
                    <div key={cat.title} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
                      <h3 className="text-lg font-semibold mb-4 text-blue-400">{cat.title}</h3>
                      <div className="space-y-4">
                        {cat.levels.map((level, levelIdx) => (
                          <div key={level.level} className="grid grid-cols-[80px_1fr_100px] gap-4 items-center p-3 bg-slate-800/30 rounded-lg">
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
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6">
                  {(activeTab === 'learn' ? learnContent : exploreContent).map((item) => (
                    <div key={item.id} className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <input 
                          type="text"
                          value={item.title}
                          onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                          className="bg-transparent text-lg font-bold border-b border-transparent hover:border-slate-700 focus:border-blue-500 focus:outline-none px-1 transition-colors"
                        />
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <input 
                        type="text"
                        value={item.description}
                        placeholder="Short description..."
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                      <textarea 
                        value={item.content}
                        placeholder="Detailed content..."
                        onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm h-32 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
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

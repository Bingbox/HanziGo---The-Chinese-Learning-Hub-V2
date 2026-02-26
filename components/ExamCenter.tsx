
import React, { useState, useMemo } from 'react';
import { HSKQuestion } from '../types';
import { hskQuestionBankService } from '../services/hskQuestionBankService';
import { useExam } from '../App';
import { hskLevels, HSKLevelData } from '../src/data/hskData';
import { BookOpen, BarChart3, Zap } from 'lucide-react';

const BrandLoader: React.FC<{ size?: string }> = ({ size = "w-24 h-24" }) => (
  <div className={`${size} relative animate-bounce`}>
    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-500 rounded-full shadow-2xl border-4 border-white"></div>
    <svg viewBox="0 0 100 100" className="absolute inset-0 p-5 fill-white">
      <path d="M25 20h10v60H25z M65 20h10v60H65z M35 45h30v10H35z" />
    </svg>
  </div>
);

const ExamCenter: React.FC = () => {
  const { language, t, examHistory, addExamRecord } = useExam();
  const [selectedLevel, setSelectedLevel] = useState<HSKLevelData | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<HSKQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resultsMode, setResultsMode] = useState(false);

  const startTest = async (level: HSKLevelData) => {
    setLoading(true);
    setSelectedLevel(level);
    try {
      const qs = hskQuestionBankService.getQuestionsForLevel(level.level, level.questionCount);
      if (qs && qs.length > 0) {
        setQuestions(qs);
        setTestStarted(true);
        setCurrentIdx(0);
        setAnswers({});
        setResultsMode(false);
      } else {
        throw new Error("No questions generated");
      }
    } catch (err) {
      console.error(err);
      alert(t('errorLoadingQuestions')); 
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const finishTest = () => {
    const score = questions.filter(q => answers[q.id] === q.answer).length;
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    addExamRecord({
      level: selectedLevel!.level,
      score,
      totalQuestions,
      percentage,
    });

    setResultsMode(true);
  };

  const categorizedLevels = useMemo(() => ({
    beginner: hskLevels.filter(l => l.categoryKey === 'beginner'),
    intermediate: hskLevels.filter(l => l.categoryKey === 'intermediate'),
    advanced: hskLevels.filter(l => l.categoryKey === 'advanced'),
  }), []);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-12 text-center">
        <BrandLoader />
        <h3 className="text-2xl font-black text-gray-900 mb-4 mt-12 tracking-tight">{t('preparingExam')}</h3>
        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] max-w-sm leading-relaxed">
          {t('preparingGuidance', { level: selectedLevel?.level, lang: t('langName') })}
        </p>
      </div>
    );
  }

  if (testStarted && !resultsMode) {
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen flex flex-col bg-white animate-in slide-in-from-right duration-500">
        <header className="flex flex-col mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-red-100">
                {selectedLevel?.level}
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">HSK {selectedLevel?.level} {t('mockExamLabel')}</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('officialSimulation')}</p>
              </div>
            </div>
            <button 
              onClick={() => setTestStarted(false)} 
              className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-black text-[10px] hover:bg-gray-900 hover:text-white transition-all uppercase tracking-widest active:scale-95 shadow-sm"
            >
              {t('quit')}
            </button>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between mt-2">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('question')} {currentIdx + 1} / {questions.length}</span>
             <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{Math.round(progress)}% {t('complete')}</span>
          </div>
        </header>

        <div className="flex-1 space-y-10">
          <div className="bg-gray-50 p-10 md:p-14 rounded-3xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-8xl font-black text-gray-200/20 select-none">试</div>
            <h3 className="text-lg font-black text-red-600 uppercase tracking-widest mb-6">{t(q.questionKey)}</h3>
            {q.content && (
              <p className="text-4xl md:text-5xl font-black text-gray-900 leading-relaxed chinese-font">
                {q.content}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {q.options.map((opt: string, i: number) => {
                const translatedOpt = t(opt);
                return (
              <button
                key={i}
                onClick={() => handleSelectOption(q.id, opt)}
                className={`w-full p-6 rounded-xl border-2 text-left flex items-center justify-between group transition-all
                  ${answers[q.id] === opt 
                    ? 'border-red-600 bg-red-50 text-red-700 shadow-xl' 
                    : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}
              >
                <span className="font-black text-xl">{translatedOpt}</span>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                  ${answers[q.id] === opt ? 'border-red-600 bg-white' : 'border-gray-200'}`}>
                   {answers[q.id] === opt && <div className="w-4 h-4 bg-red-600 rounded-full animate-in zoom-in duration-200" />}
                </div>
              </button>
            )}
            )}
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-50 flex justify-between items-center">
          <button 
            onClick={() => setCurrentIdx(prev => prev - 1)} 
            disabled={currentIdx === 0} 
            className="px-8 py-4 text-gray-400 font-black uppercase tracking-widest text-xs disabled:opacity-0 transition-opacity"
          >
            ← {t('back')}
          </button>
          
          <button 
            onClick={currentIdx === questions.length - 1 ? finishTest : () => setCurrentIdx(prev => prev + 1)} 
            disabled={!answers[q.id]}
            className="px-12 py-5 bg-gray-900 text-white rounded-xl font-black shadow-2xl hover:bg-red-600 transition-all disabled:opacity-20 active:scale-95 uppercase tracking-[0.2em] text-sm"
          >
            {currentIdx === questions.length - 1 ? t('finishExam') : t('nextQuestion')}
          </button>
        </footer>
      </div>
    );
  }

  if (resultsMode) {
    const score = questions.filter(q => answers[q.id] === q.answer).length;
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="max-w-4xl mx-auto p-6 md:p-12 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block p-8 bg-white rounded-full shadow-2xl border border-gray-100 mb-4">
             <div className={`text-7xl font-black ${percentage >= 80 ? 'text-emerald-500' : percentage >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
               {percentage}%
             </div>
          </div>
          <h2 className="text-4xl font-black text-gray-900">{t('examComplete')}</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            {t('scoreDetail', { score, total: totalQuestions })}
          </p>
        </div>

        <div className="space-y-12 mb-20">
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
             <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
             {t('pedagogicalAnalysis')}
          </h3>
          
          {questions.map((q, i) => {
            const isCorrect = answers[q.id] === q.answer;
            return (
              <div key={q.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className={`w-2 md:w-4 ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <div className="p-10 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('questionLabel')} {i + 1}</span>
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
                      ${isCorrect ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {isCorrect ? t('correct') : t('hskIncorrectStatus')}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-gray-900 mb-4 chinese-font">{q.content ? q.content : t(q.answer)}</p>
                  <p className="text-sm text-gray-500 mb-8 italic">{t(q.questionKey)}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 p-8 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('yourResponse')}</h4>
                      <p className={`text-lg font-black ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>{t(answers[q.id])}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('correctAnswer')}</h4>
                      <p className="text-lg font-black text-gray-900">{t(q.answer)}</p>
                    </div>
                    <div className="md:col-span-2 pt-6 border-t border-gray-200">
                      <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3">{t('teacherInsight')}</h4>
                      <p className="text-gray-700 leading-relaxed font-medium">
                        {t(q.explanation)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={() => { setResultsMode(false); setTestStarted(false); }} 
            className="px-12 py-5 bg-gray-900 text-white rounded-xl font-black shadow-xl hover:bg-red-600 transition-all uppercase tracking-widest text-xs"
          >
            {t('returnToExamHub')}
          </button>
          <button 
            onClick={() => startTest(selectedLevel!)} 
            className="px-12 py-5 bg-white text-gray-900 border border-gray-200 rounded-xl font-black shadow-sm hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
          >
            {t('retryTest')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">{t('examCenter')}</h2>
          <p className="text-xl text-gray-500 leading-relaxed font-medium">
            {t('hskWelcomeDesc')}
          </p>
        </div>
        
      </header>

            <div className="space-y-12">
        {Object.entries(categorizedLevels).map(([category, levels]) => (
          <div key={category}>
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight border-l-4 border-red-500 pl-4">{t(category)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(levels as HSKLevelData[]).map((h) => (
                <div 
                  key={h.level} 
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col text-left overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 p-4 text-9xl font-black text-gray-50/80 group-hover:text-red-50/80 transition-colors pointer-events-none">
                    {h.level}
                  </div>
                  
                  <div className="flex-1 flex flex-col w-full relative z-10">
                    <div className="mb-4">
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">{t(h.categoryKey)}</p>
                        <h4 className="text-2xl font-black text-gray-900 mb-2">{t(h.titleKey)}</h4>
                        <p className="text-gray-500 text-sm font-medium h-12">{t(h.descriptionKey)}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 w-full my-6 text-center">
                       <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <p className="text-gray-400 font-black text-[8px] uppercase mb-1 flex items-center justify-center gap-1"><BookOpen size={10}/> {t('vocabCount')}</p>
                          <p className="text-base font-black text-gray-900">{h.vocab.toLocaleString()}</p>
                       </div>
                       <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <p className="text-gray-400 font-black text-[8px] uppercase mb-1 flex items-center justify-center gap-1"><BarChart3 size={10}/> {t('estTime')}</p>
                          <p className="text-base font-black text-gray-900">45m</p>
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => startTest(h)} 
                    className="w-full mt-auto py-4 bg-gray-900 text-white rounded-xl font-black hover:bg-red-600 transition-all shadow-xl active:scale-95 uppercase tracking-[0.2em] text-xs relative z-10 flex items-center justify-center gap-2"
                  >
                     <Zap size={14}/> {t('startMock')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {examHistory.length > 0 && (
          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight border-l-4 border-red-500 pl-4">{t('examHistory')}</h3>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-2">
              {examHistory.slice(0, 5).map(record => (
                <div key={record.id} className="flex justify-between items-center py-3 px-5 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <p className="font-black text-gray-900">HSK {record.level} {t('mockExamLabel')}</p>
                    <p className="text-xs text-gray-400 font-bold">{new Date(record.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`text-2xl font-black ${record.percentage >= 80 ? 'text-emerald-500' : record.percentage >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
                    {record.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamCenter;

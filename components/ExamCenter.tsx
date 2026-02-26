
import React, { useState, useMemo, useEffect } from 'react';
import { HSKQuestion, QuestionType, ExamRecord } from '../types';
import { ExamService } from '../src/services/ExamService';
import { useExam } from '../App';
import { hskLevels, HSKLevelData } from '../src/data/hskData';
import { BookOpen, BarChart3, Zap, ArrowLeft, CheckCircle2, XCircle, HelpCircle, ChevronLeft, ChevronRight, Send } from 'lucide-react';

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
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [resultsMode, setResultsMode] = useState(false);

  const startTest = async (level: HSKLevelData) => {
    setLoading(true);
    setSelectedLevel(level);
    try {
      const exam = ExamService.generateMockExam(level.level, level.questionCount);
      if (exam.questions && exam.questions.length > 0) {
        setQuestions(exam.questions as any);
        setTestStarted(true);
        setCurrentIdx(0);
        setAnswers({});
        setResultsMode(false);
      } else {
        throw new Error("No questions generated");
      }
    } catch (err) {
      console.error(err);
      alert("该级别题库正在扩充中，请稍后再试！"); 
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (qId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const finishTest = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (ExamService.gradeObjectiveQuestion(q as any, answers[q.id])) {
        correctCount++;
      }
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    addExamRecord({
      level: selectedLevel!.level,
      score: correctCount,
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

  const renderQuestionInput = (q: HSKQuestion) => {
    const currentAnswer = answers[q.id];
    const lang = language === 'zh' ? 'zh' : (language === 'ko' ? 'ko' : 'en');

    switch (q.type) {
      case QuestionType.SingleChoice:
        return (
          <div className="grid grid-cols-1 gap-4 mt-8">
            {(q.options?.[lang] || q.options?.['zh'] || []).map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => handleAnswer(q.id, opt)}
                className={`w-full p-6 rounded-xl border-2 text-left flex items-center justify-between group transition-all
                  ${currentAnswer === opt 
                    ? 'border-red-600 bg-red-50 text-red-700 shadow-xl' 
                    : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}
              >
                <span className="font-black text-xl">{opt}</span>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                  ${currentAnswer === opt ? 'border-red-600 bg-white' : 'border-gray-200'}`}>
                   {currentAnswer === opt && <div className="w-4 h-4 bg-red-600 rounded-full animate-in zoom-in duration-200" />}
                </div>
              </button>
            ))}
          </div>
        );

      case QuestionType.MultipleSelect:
        const selected = (currentAnswer as string[]) || [];
        return (
          <div className="grid grid-cols-1 gap-4 mt-8">
            {(q.options?.[lang] || q.options?.['zh'] || []).map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => {
                  const next = selected.includes(opt) 
                    ? selected.filter(s => s !== opt)
                    : [...selected, opt];
                  handleAnswer(q.id, next);
                }}
                className={`w-full p-6 rounded-xl border-2 text-left flex items-center justify-between group transition-all
                  ${selected.includes(opt) 
                    ? 'border-red-600 bg-red-50 text-red-700 shadow-xl' 
                    : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}
              >
                <span className="font-black text-xl">{opt}</span>
                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all
                  ${selected.includes(opt) ? 'border-red-600 bg-white' : 'border-gray-200'}`}>
                   {selected.includes(opt) && <div className="w-4 h-4 bg-red-600 rounded-sm animate-in zoom-in duration-200" />}
                </div>
              </button>
            ))}
          </div>
        );

      case QuestionType.TrueFalse:
        return (
          <div className="grid grid-cols-2 gap-6 mt-8">
            {[true, false].map((val) => (
              <button
                key={val.toString()}
                onClick={() => handleAnswer(q.id, val)}
                className={`p-10 rounded-3xl border-2 flex flex-col items-center justify-center gap-4 transition-all
                  ${currentAnswer === val 
                    ? 'border-red-600 bg-red-50 text-red-700 shadow-xl' 
                    : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}
              >
                {val ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                <span className="font-black text-2xl">{val ? "正确 (True)" : "错误 (False)"}</span>
              </button>
            ))}
          </div>
        );

      case QuestionType.FillInTheBlank:
        const blanks = q.blanks?.[lang] || q.blanks?.['zh'] || [];
        const currentBlanks = (currentAnswer as string[]) || blanks.map(() => '');
        return (
          <div className="space-y-6 mt-8">
            {blanks.map((hint, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-gray-100 focus-within:border-red-600 transition-all">
                <span className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-black">{i + 1}</span>
                <input 
                  type="text"
                  placeholder={hint}
                  value={currentBlanks[i]}
                  onChange={(e) => {
                    const next = [...currentBlanks];
                    next[i] = e.target.value;
                    handleAnswer(q.id, next);
                  }}
                  className="flex-1 bg-transparent border-none focus:ring-0 font-black text-xl chinese-font"
                />
              </div>
            ))}
          </div>
        );

      case QuestionType.ShortAnswer:
      case QuestionType.Analysis:
        return (
          <div className="mt-8">
            <textarea 
              rows={8}
              placeholder="请在此输入您的回答..."
              value={currentAnswer || ''}
              onChange={(e) => handleAnswer(q.id, e.target.value)}
              className="w-full p-8 rounded-3xl border-2 border-gray-100 focus:border-red-600 focus:ring-0 font-medium text-xl chinese-font bg-white shadow-sm"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-12 text-center">
        <BrandLoader />
        <h3 className="text-2xl font-black text-gray-900 mb-4 mt-12 tracking-tight">正在准备试卷...</h3>
        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] max-w-sm leading-relaxed">
          正在为您生成 HSK {selectedLevel?.level} 级模拟试题，请稍候
        </p>
      </div>
    );
  }

  if (testStarted && !resultsMode) {
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;
    const lang = language === 'zh' ? 'zh' : (language === 'ko' ? 'ko' : 'en');

    return (
      <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-screen flex flex-col bg-white animate-in slide-in-from-right duration-500">
        <header className="flex flex-col mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-red-100">
                {selectedLevel?.level}
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">HSK {selectedLevel?.level} 模拟考试</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">官方标准仿真测试</p>
              </div>
            </div>
            <button 
              onClick={() => setTestStarted(false)} 
              className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-black text-[10px] hover:bg-gray-900 hover:text-white transition-all uppercase tracking-widest active:scale-95 shadow-sm"
            >
              退出考试
            </button>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between mt-2">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">题目 {currentIdx + 1} / {questions.length}</span>
             <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{Math.round(progress)}% 已完成</span>
          </div>
        </header>

        <div className="flex-1 space-y-10">
          <div className="bg-gray-50 p-10 md:p-14 rounded-3xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-8xl font-black text-gray-200/20 select-none">试</div>
            <h3 className="text-lg font-black text-red-600 uppercase tracking-widest mb-6">
              {q.question?.[lang] || q.question?.['zh']}
            </h3>
            <div className="flex items-center gap-3">
               <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                 {q.type}
               </span>
               <span className="px-3 py-1 bg-gray-200 text-gray-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                 {q.score} 分
               </span>
            </div>
          </div>

          {renderQuestionInput(q)}
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-50 flex justify-between items-center">
          <button 
            onClick={() => setCurrentIdx(prev => prev - 1)} 
            disabled={currentIdx === 0} 
            className="flex items-center gap-2 px-8 py-4 text-gray-900 font-black uppercase tracking-widest text-xs disabled:opacity-0 transition-opacity"
          >
            <ChevronLeft size={16}/> 上一题
          </button>
          
          <button 
            onClick={currentIdx === questions.length - 1 ? finishTest : () => setCurrentIdx(prev => prev + 1)} 
            className="flex items-center gap-2 px-12 py-5 bg-gray-900 text-white rounded-xl font-black shadow-2xl hover:bg-red-600 transition-all active:scale-95 uppercase tracking-[0.2em] text-sm"
          >
            {currentIdx === questions.length - 1 ? (
              <><Send size={16}/> 提交试卷</>
            ) : (
              <>下一题 <ChevronRight size={16}/></>
            )}
          </button>
        </footer>
      </div>
    );
  }

  if (resultsMode) {
    let correctCount = 0;
    questions.forEach(q => {
      if (ExamService.gradeObjectiveQuestion(q as any, answers[q.id])) {
        correctCount++;
      }
    });
    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const lang = language === 'zh' ? 'zh' : (language === 'ko' ? 'ko' : 'en');

    return (
      <div className="max-w-4xl mx-auto p-6 md:p-12 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block p-8 bg-white rounded-full shadow-2xl border border-gray-100 mb-4">
             <div className={`text-7xl font-black ${percentage >= 80 ? 'text-emerald-500' : percentage >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
               {percentage}%
             </div>
          </div>
          <h2 className="text-4xl font-black text-gray-900">考试完成！</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            您答对了 {correctCount} 道题，共 {totalQuestions} 道题
          </p>
        </div>

        <div className="space-y-12 mb-20">
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
             <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
             详细解析
          </h3>
          
          {questions.map((q, i) => {
            const isCorrect = ExamService.gradeObjectiveQuestion(q as any, answers[q.id]);
            const isSubjective = q.type === QuestionType.ShortAnswer || q.type === QuestionType.Analysis;

            return (
              <div key={q.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className={`w-2 md:w-4 ${isSubjective ? 'bg-blue-500' : (isCorrect ? 'bg-emerald-500' : 'bg-red-500')}`} />
                <div className="p-10 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">题目 {i + 1} ({q.type})</span>
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
                      ${isSubjective ? 'bg-blue-50 text-blue-600 border-blue-100' : (isCorrect ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100')}`}>
                      {isSubjective ? "待评分" : (isCorrect ? "正确" : "错误")}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-gray-900 mb-4 chinese-font">
                    {q.question?.[lang] || q.question?.['zh']}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 p-8 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">您的回答</h4>
                      <p className={`text-lg font-black ${isSubjective ? 'text-blue-600' : (isCorrect ? 'text-emerald-600' : 'text-red-600')}`}>
                        {Array.isArray(answers[q.id]) ? answers[q.id].join(', ') : String(answers[q.id] || '未回答')}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">正确答案 / 参考答案</h4>
                      <p className="text-lg font-black text-gray-900">
                        {q.correctAnswer !== undefined ? String(q.correctAnswer) : 
                         (q.correctAnswers ? q.correctAnswers.join(', ') : 
                          (q.referenceAnswer?.[lang] || q.referenceAnswer?.['zh'] || '无'))}
                      </p>
                    </div>
                    {(q.scoringCriteria || q.referenceAnswer) && (
                      <div className="md:col-span-2 pt-6 border-t border-gray-200">
                        <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3">解析与标准</h4>
                        <p className="text-gray-700 leading-relaxed font-medium">
                          {q.scoringCriteria?.[lang] || q.scoringCriteria?.['zh'] || q.referenceAnswer?.[lang] || q.referenceAnswer?.['zh']}
                        </p>
                      </div>
                    )}
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
            返回考试中心
          </button>
          <button 
            onClick={() => startTest(selectedLevel!)} 
            className="px-12 py-5 bg-white text-gray-900 border border-gray-200 rounded-xl font-black shadow-sm hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
          >
            重新测试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">考试中心</h2>
          <p className="text-xl text-gray-500 leading-relaxed font-medium">
            基于 HSK 3.0 标准的仿真模拟测试系统。涵盖 1-9 级全级别题库，支持多种题型，助您精准评估汉语水平。
          </p>
        </div>
      </header>

      <div className="space-y-12">
        {Object.entries(categorizedLevels).map(([category, levels]) => (
          <div key={category}>
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight border-l-4 border-red-500 pl-4">
              {category === 'beginner' ? "初级 (Level 1-3)" : category === 'intermediate' ? "中级 (Level 4-6)" : "高级 (Level 7-9)"}
            </h3>
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
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">HSK {h.level}</p>
                        <h4 className="text-2xl font-black text-gray-900 mb-2">
                          {h.level <= 3 ? "初级模拟卷" : h.level <= 6 ? "中级模拟卷" : "高级模拟卷"}
                        </h4>
                        <p className="text-gray-500 text-sm font-medium h-12">
                          包含听力、阅读、写作、翻译及口语综合评估。
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 w-full my-6 text-center">
                       <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <p className="text-gray-400 font-black text-[8px] uppercase mb-1 flex items-center justify-center gap-1"><BookOpen size={10}/> 词汇量</p>
                          <p className="text-base font-black text-gray-900">{h.vocab.toLocaleString()}</p>
                       </div>
                       <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <p className="text-gray-400 font-black text-[8px] uppercase mb-1 flex items-center justify-center gap-1"><BarChart3 size={10}/> 预计用时</p>
                          <p className="text-base font-black text-gray-900">45m</p>
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => startTest(h)} 
                    className="w-full mt-auto py-4 bg-gray-900 text-white rounded-xl font-black hover:bg-red-600 transition-all shadow-xl active:scale-95 uppercase tracking-[0.2em] text-xs relative z-10 flex items-center justify-center gap-2"
                  >
                     <Zap size={14}/> 开始模拟考试
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {examHistory.length > 0 && (
          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight border-l-4 border-red-500 pl-4">考试历史</h3>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-2">
              {examHistory.slice(0, 5).map(record => (
                <div key={record.id} className="flex justify-between items-center py-3 px-5 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <p className="font-black text-gray-900">HSK {record.level} 模拟考试</p>
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

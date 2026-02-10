
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Unit, Exercise, ExerciseType } from '../types';
import { useTranslation } from '../App';
import { evaluatePronunciation, generateLessonSpeech, recognizeImage, decodeBase64, decodeAudioData } from '../services/geminiService';

const Learn: React.FC = () => {
  const { language, t, allUnits, activeUnitId, setActiveUnitId } = useTranslation();
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [userSelection, setUserSelection] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [unitExercises, setUnitExercises] = useState<Exercise[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const UNIT_EXERCISES_MAP: Record<string, Exercise[]> = useMemo(() => ({
    u1: [
      { id: 'u1e1', type: 'LISTEN', question: t('exListenHello'), options: ['你好', '谢谢', '再见'], answer: '你好', pinyin: 'Nǐ hǎo', chinese: '你好' },
      { id: 'u1e2', type: 'SPEAK', question: t('exSayHello'), answer: '你好', pinyin: 'Nǐ hǎo', chinese: '你好' },
      { id: 'u1e3', type: 'WRITE', question: t('exWritePerson'), answer: '人', pinyin: 'Rén', chinese: '人' },
    ],
    u8: [
      { id: 'u8e1', type: 'READ', question: t('exCharThree'), options: ['一', '二', '三'], answer: '三', pinyin: 'Sān', chinese: '三' },
      { id: 'u8e2', type: 'LISTEN', question: t('exListenEight'), options: ['六', '七', '八'], answer: '八', pinyin: 'Bā', chinese: '八' },
      { id: 'u8e3', type: 'READ', question: t('exSay10'), options: ['十点', '九点', '八点'], answer: '十点', pinyin: 'Shí diǎn', chinese: '十点' },
    ],
    u4: [
      { id: 'u4e1', type: 'SELECT', question: t('exWakeUp'), options: [t('optionWakeUp'), t('optionSleep'), t('optionEat')], answer: t('optionWakeUp'), pinyin: 'Qǐchuáng', chinese: '起床' },
      { id: 'u4e2', type: 'SPEAK', question: t('exSayWork'), answer: '我去上班', pinyin: 'Wǒ qù shàngbān', chinese: '我去上班' },
      { id: 'u4e3', type: 'READ', question: t('exWhatIsSleep'), options: [t('optionSleep'), t('optionEat'), t('optionRun')], answer: t('optionSleep'), pinyin: 'Shuìjiào', chinese: '睡觉' },
    ],
    u2: [
      { id: 'u2e1', type: 'LISTEN', question: t('exListenHello'), options: ['你好', '谢谢', '再见'], answer: '你好', pinyin: 'Nǐ hǎo', chinese: '你好' },
      { id: 'u2e2', type: 'READ', question: t('exWhatIsSleep'), options: [t('optionSleep'), t('optionEat'), t('optionRun')], answer: t('optionSleep'), pinyin: 'Shuìjiào', chinese: '睡觉' },
      { id: 'u2e3', type: 'SPEAK', question: t('exSayHello'), answer: '你好', pinyin: 'Nǐ hǎo', chinese: '你好' },
    ],
    u5: [
      { id: 'u5e1', type: 'READ', question: t('exWhatIsExpensive'), options: [t('optionTooExpensive'), t('optionVeryCheap'), t('optionHowMuch')], answer: t('optionTooExpensive'), pinyin: 'Tài guì le', chinese: '太贵了' },
      { id: 'u5e2', type: 'SPEAK', question: t('exSayHowMuch'), answer: '多少钱', pinyin: 'Duōshǎo qián', chinese: '多少钱' },
      { id: 'u5e3', type: 'LISTEN', question: t('exListenCheap'), options: ['便宜', '贵', '打折'], answer: '便宜', pinyin: 'Piányí', chinese: '便宜' },
    ],
    u6: [
      { id: 'u6e1', type: 'READ', question: t('exWhichFriend'), options: ['朋友', '老师', '同事'], answer: '朋友', pinyin: 'Péngyǒu', chinese: '朋友' },
      { id: 'u6e2', type: 'SPEAK', question: t('exSayNiceToMeet'), answer: '很高兴认识你', pinyin: 'Hěn gāoxìng rènshí nǐ', chinese: '很高兴认识你' },
      { id: 'u6e3', type: 'LISTEN', question: t('exListenFamily'), options: ['朋友', '家人', '同学'], answer: '家人', pinyin: 'Jiārén', chinese: '家人' },
    ],
    u3: [
      { id: 'u3e1', type: 'LISTEN', question: t('exIdentifySubway'), options: ['地铁站', '飞机场', '火车站'], answer: '地铁站', pinyin: 'Dìtiě zhàn', chinese: '地铁站' },
      { id: 'u3e2', type: 'READ', question: t('exWhatIsAirport'), options: [t('optionAirport'), t('optionHotel'), t('optionTaxi')], answer: t('optionAirport'), pinyin: 'Fēijī chǎng', chinese: '飞机场' },
      { id: 'u3e3', type: 'WRITE', question: t('exWriteExit'), answer: '出', pinyin: 'Chū', chinese: '出' },
    ],
    u7: [
      { id: 'u7e1', type: 'READ', question: t('exWhatIsRedEnvelope'), options: [t('optionRedEnvelope'), t('optionLantern'), t('optionTeaCup')], answer: t('optionRedEnvelope'), pinyin: 'Hóngbāo', chinese: '红包' },
      { id: 'u7e2', type: 'SPEAK', question: t('exSayHappyNewYear'), answer: '新年快乐', pinyin: 'Xīnnián kuàilè', chinese: '新年快乐' },
      { id: 'u7e3', type: 'LISTEN', question: t('exListenCalligraphy'), options: ['書法', '繪畫', '武術'], answer: '書法', pinyin: 'Shūfǎ', chinese: '书法' },
    ]
  }), [language, t]); // Add t to dependency array

  useEffect(() => {
    if (activeUnitId) {
      const unit = allUnits.find(u => u.id === activeUnitId);
      if (unit && !unit.locked) {
        startLesson(unit);
      }
      setActiveUnitId(null);
    }
  }, [activeUnitId, allUnits, setActiveUnitId]);

  const CATEGORIES = useMemo(() => [
    { id: 'Foundation', name: t('foundation'), units: allUnits.filter(u => u.category === 'Foundation') },
    { id: 'Lifestyle', name: t('lifestyle'), units: allUnits.filter(u => u.category === 'Lifestyle') },
    { id: 'Interaction', name: t('interaction'), units: allUnits.filter(u => u.category === 'Interaction') },
    { id: 'Immersion', name: t('immersion'), units: allUnits.filter(u => u.category === 'Immersion') }
  ], [allUnits, t]);

  const startLesson = (unit: any) => {
    const exercises = UNIT_EXERCISES_MAP[unit.id] || UNIT_EXERCISES_MAP['u1'];
    setUnitExercises(exercises);
    setActiveUnit(unit);
    setCurrentExerciseIdx(0);
    resetState();
  };

  const resetState = () => {
    setUserSelection('');
    setIsCorrect(null);
    setFeedback('');
    setLoading(false);
    // Clear canvas for WRITE exercises
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const playAudio = async (text: string) => {
    setLoading(true);
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      const base64Audio = await generateLessonSpeech(text);
      if (base64Audio) {
        const decoded = decodeBase64(base64Audio);
        const buffer = await decodeAudioData(decoded, ctx);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const startDrawing = (e: any) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.moveTo(x, y);
  };

  const draw = (e: any) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const handleWriteCheck = async () => {
    setLoading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      const result = await recognizeImage(base64);
      const target = unitExercises[currentExerciseIdx].answer; // This is the Chinese character for WRITE type
      const correct = result.includes(target);
      setIsCorrect(correct);
      setFeedback(correct ? t('perfectStroke') : `${t('detected')}: "${result}". ${t('target')}: "${target}"`);
    } catch (e) { setFeedback(t('recognitionError')); } finally { setLoading(false); }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        setLoading(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          const result = await evaluatePronunciation(base64, unitExercises[currentExerciseIdx].chinese, language);
          setIsCorrect(result.isCorrect);
          setFeedback(`${t('score')}: ${result.score} - ${result.feedback}`);
          setLoading(false);
        };
      };
      recorder.start();
      setIsRecording(true);
    } catch (e) { setFeedback(t('micError')); }
  };

  const checkAnswer = () => {
    const ex = unitExercises[currentExerciseIdx];
    // For SELECT/READ/LISTEN, the answer and options are translation keys, so we need to translate them for comparison
    const translatedAnswer = t(ex.answer);
    const translatedUserSelection = t(userSelection); // User selection will be the key
    const correct = translatedUserSelection === translatedAnswer;
    
    setIsCorrect(correct);
    setFeedback(correct ? t('correct') : `${t('wrong')}. ${t('correctAnswer')}: "${translatedAnswer}"`);
  };

  const nextQuestion = () => {
    if (currentExerciseIdx < unitExercises.length - 1) {
      setCurrentExerciseIdx(prev => prev + 1);
      resetState();
    } else { setActiveUnit(null); } // End of unit
  };

  const SecondaryHeader = ({ title, onClose, progress, current, total }: { title: string, onClose: () => void, progress?: number, current: number, total: number }) => (
    <header className="relative mb-8 pt-4 px-2">
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-6">
           <div className="animate-in slide-in-from-left duration-500">
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-1">{t('immersionSession')}</p>
              <h2 className="text-3xl font-black text-gray-900 leading-tight text-wrap">{title}</h2> {/* Added text-wrap */}
           </div>
           
           <button 
             onClick={onClose} 
             className="group flex items-center gap-3 pl-4 pr-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-red-600 transition-all shadow-xl shadow-gray-200 transform hover:scale-105 active:scale-95 animate-in slide-in-from-right duration-500"
           >
             <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
             <span className="text-xs font-black uppercase tracking-widest">{t('back')}</span>
           </button>
        </div>
        
        <div className="flex justify-between items-end mb-1 px-1">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('progressLabel', { current, total })}</p>
        </div>
        {progress !== undefined && (
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000 ease-out rounded-full" 
              style={{ width: `${progress * 100}%` }} 
            />
          </div>
        )}
      </div>
    </header>
  );

  if (activeUnit) {
    const ex = unitExercises[currentExerciseIdx];
    return (
      <div className="fixed inset-0 z-[300] bg-white flex flex-col p-6 animate-in slide-in-from-right duration-300 overflow-y-auto">
        <div className="max-w-xl mx-auto w-full flex flex-col h-full">
          <SecondaryHeader 
            title={activeUnit.title} 
            onClose={() => setActiveUnit(null)} 
            progress={(currentExerciseIdx + 1) / unitExercises.length}
            current={currentExerciseIdx + 1}
            total={unitExercises.length}
          />

          <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
            <div className="mb-10 w-full animate-in zoom-in duration-500">
              <div className="inline-block px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black rounded-md uppercase tracking-widest mb-6 shadow-sm">
                {ex.type === 'LISTEN' && t('exerciseTypeListen')}
                {ex.type === 'SPEAK' && t('exerciseTypeSpeak')}
                {ex.type === 'WRITE' && t('exerciseTypeWrite')}
                {(ex.type === 'SELECT' || ex.type === 'READ') && t('exerciseTypeSelectRead')}
              </div>
              <h2 className="text-2xl font-black text-gray-900 leading-relaxed text-wrap">{ex.question}</h2> {/* Added text-wrap */}
            </div>
            
            {ex.type === 'LISTEN' && (
              <div className="w-full space-y-12 animate-in fade-in duration-500">
                <button 
                  onClick={() => playAudio(ex.chinese)} 
                  className="w-28 h-28 aspect-square bg-red-600 text-white rounded-xl flex items-center justify-center text-5xl shadow-2xl mx-auto hover:scale-110 active:scale-90 transition-all border-4 border-white"
                >
                  🔊
                </button>
                <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto">
                  {ex.options?.map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => setUserSelection(opt)} 
                      className={`p-6 rounded-xl border-2 font-black transition-all text-2xl chinese-font text-left flex flex-wrap justify-between items-center ${userSelection === opt ? 'border-red-600 bg-red-50 text-red-700 shadow-xl' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      {t(opt)} {/* Translate the option */}
                      {userSelection === opt && <span className="text-sm bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {ex.type === 'SPEAK' && (
              <div className="space-y-12 w-full animate-in fade-in duration-500">
                <div className="bg-gray-50 p-10 rounded-xl border border-gray-100 shadow-inner relative overflow-hidden flex flex-col justify-center items-center"> {/* Changed p-14 to p-10 */}
                  <div className="absolute -top-10 -right-10 text-9xl text-gray-200/50 chinese-font select-none">听</div>
                  <div className="text-8xl font-black chinese-font text-gray-900 mb-4 relative z-10 text-wrap">{ex.chinese}</div> {/* Added text-wrap */}
                  <div className="text-2xl text-red-600 font-black tracking-[0.2em] uppercase relative z-10 text-wrap">{ex.pinyin}</div> {/* Added text-wrap */}
                </div>
                <div className="flex flex-col items-center gap-6">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">{isRecording ? t('analyzingSpeech') : t('holdToSpeak')}</p>
                  <button 
                    onMouseDown={startRecording} 
                    onMouseUp={() => mediaRecorderRef.current?.stop()} 
                    onTouchStart={startRecording}
                    onTouchEnd={() => mediaRecorderRef.current?.stop()}
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all mx-auto ${isRecording ? 'bg-red-600 animate-pulse text-white scale-125' : 'bg-gray-900 text-white hover:scale-110'}`}
                  >
                    🎤
                  </button>
                </div>
              </div>
            )}

            {ex.type === 'WRITE' && (
              <div className="w-full space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-end px-4">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{t('canvasTrace')}</p>
                    <div className="text-7xl font-black chinese-font text-gray-200 select-none text-wrap">{ex.chinese}</div> {/* Added text-wrap */}
                  </div>
                  <button onClick={() => canvasRef.current?.getContext('2d')?.clearRect(0, 0, 400, 400)} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black hover:bg-gray-200 transition-colors uppercase tracking-[0.2em]">{t('clearBoard')}</button>
                </div>
                <div className="relative aspect-square w-full max-w-[400px] mx-auto group">
                   <canvas ref={canvasRef} width={400} height={400} className="bg-gray-50 rounded-xl border-4 border-gray-50 w-full h-full touch-none cursor-crosshair shadow-2xl" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => isDrawing.current = false} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={() => isDrawing.current = false} />
                </div>
              </div>
            )}

            {(ex.type === 'SELECT' || ex.type === 'READ') && (
              <div className="w-full space-y-12 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <div className="text-9xl font-black chinese-font text-gray-900 text-wrap">{ex.chinese}</div> {/* Added text-wrap */}
                  <div className="text-2xl text-gray-400 font-black tracking-widest uppercase text-wrap">{ex.pinyin}</div> {/* Added text-wrap */}
                </div>
                <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                  {ex.options?.map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => setUserSelection(opt)} 
                      className={`p-6 rounded-xl border-2 font-black text-left flex flex-wrap justify-between items-center transition-all ${userSelection === opt ? 'border-red-600 bg-red-50 text-red-700 shadow-xl' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      <span className="text-xl">{t(opt)}</span> {/* Translate the option */}
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${userSelection === opt ? 'border-red-600 bg-white shadow-inner' : 'border-gray-200'}`}>
                        {userSelection === opt && <div className="w-4 h-4 bg-red-600 rounded-full animate-in zoom-in duration-200" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="h-32 mt-10 w-full flex flex-col items-center justify-center">
              {loading ? (
                 <div className="flex items-center gap-4">
                   <div className="w-4 h-4 bg-red-600 rounded-full animate-bounce"></div>
                   <div className="w-4 h-4 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-4 h-4 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 </div>
              ) : feedback && (
                <div className={`p-6 rounded-xl w-full max-w-md font-black text-sm text-center animate-in slide-in-from-top-6 duration-500 shadow-xl ${isCorrect ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {isCorrect ? `✨ ${t('fantastic')} ` : `💡 ${t('keepTrying')} `}{feedback}
                </div>
              )}
            </div>
          </div>

          <footer className="mt-auto py-10 bg-white border-t border-gray-50 -mx-6 px-10">
            {isCorrect === null ? (
              <button 
                onClick={ex.type === 'WRITE' || ex.type === 'SPEAK' ? (ex.type === 'WRITE' ? handleWriteCheck : startRecording) : checkAnswer} 
                disabled={(!userSelection && ex.type !== 'WRITE' && ex.type !== 'SPEAK') || loading || (ex.type === 'SPEAK' && isRecording)} 
                className="w-full py-7 bg-gray-900 text-white rounded-xl font-black text-xl shadow-2xl disabled:opacity-10 active:scale-95 transition-all transform hover:-translate-y-1 uppercase tracking-widest"
              >
                {ex.type === 'SPEAK' && isRecording ? t('recording') : t('checkAnswer')} {/* Update recording state text */}
              </button>
            ) : (
              <button 
                onClick={isCorrect ? nextQuestion : () => setIsCorrect(null)} 
                className={`w-full py-7 rounded-xl font-black text-xl text-white shadow-2xl transition-all active:scale-95 transform hover:-translate-y-1 uppercase tracking-widest ${isCorrect ? 'bg-green-600' : 'bg-red-600'}`}
              >
                {isCorrect ? t('nextStep') : t('tryAgain')}
              </button>
            )}
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 pb-24">
      <header className="mb-16 flex items-center justify-between">
        <div className="animate-in slide-in-from-left duration-700">
          <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">{t('learn')}</h2>
          <div className="flex items-center gap-3">
             <div className="w-3.5 h-3.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_#ef4444]"></div>
             <p className="text-xs text-gray-500 font-black uppercase tracking-[0.4em]">{t('personalPath')}</p>
          </div>
        </div>
        <div className="text-right hidden sm:block animate-in slide-in-from-right duration-700">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('currentMilestone')}</p>
           <p className="text-2xl font-black text-gray-900">{t('milestoneText')}</p>
        </div>
      </header>

      <div className="space-y-32">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className="space-y-12 animate-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center gap-10">
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-widest leading-none flex-shrink-0 text-wrap">{cat.name}</h3> {/* Added flex-shrink-0 and text-wrap */}
                <div className="h-1.5 flex-1 bg-gradient-to-r from-gray-100 via-gray-50 to-transparent rounded-full shadow-inner" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {cat.units.map((unit: any) => {
                const progressPercent = Math.round((unit.completed / unit.lessons) * 100);
                return (
                  <div 
                    key={unit.id}
                    onClick={() => !unit.locked && startLesson(unit)}
                    className={`bg-white p-10 rounded-xl border border-gray-100 shadow-sm transition-all flex flex-col h-full relative group overflow-hidden
                      ${unit.locked ? 'opacity-30 cursor-not-allowed scale-95 grayscale' : 'hover:shadow-2xl hover:-translate-y-4 cursor-pointer active:scale-[0.98]'}`}
                  >
                    {unit.locked && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="bg-white/90 p-5 rounded-xl text-gray-400 border border-gray-100 shadow-2xl backdrop-blur-sm transform scale-125 animate-in zoom-in duration-300">
                          <span className="text-4xl">🔒</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-8 mb-10">
                      <div className={`w-20 h-20 aspect-square ${unit.color} rounded-xl flex items-center justify-center text-5xl shadow-2xl transition-all group-hover:rotate-12 group-hover:scale-110 border-4 border-white`}>
                        {unit.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-black text-gray-900 leading-tight mb-3 group-hover:text-red-600 transition-colors tracking-tight text-wrap">{unit.title}</h4> {/* Added text-wrap */}
                        <div className="inline-flex px-3 py-1.5 bg-gray-50 rounded-md border border-gray-100">
                          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none text-wrap">{unit.focus}</p> {/* Added text-wrap */}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 font-medium mb-10 flex-1 leading-relaxed text-base italic text-wrap">"{unit.description}"</p> {/* Added text-wrap */}
                    
                    <div className="space-y-6 mt-auto pb-6">
                      <div className="flex justify-between items-end px-1">
                         <div className="max-w-[140px]">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('levelMastery')}</p>
                            <span className="text-lg font-black text-gray-900 truncate block">{t('doneUnit', { completed: unit.completed, lessons: unit.lessons })}</span>
                         </div>
                      </div>
                      <div className="h-3 w-[80%] bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-50 p-0.5">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-1000 rounded-full" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Learn;

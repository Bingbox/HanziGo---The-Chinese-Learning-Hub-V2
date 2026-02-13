import React, { useState, useRef, useEffect } from 'react';
import { Unit, Exercise } from '../types';
import { useTranslation } from '../App';
import { evaluatePronunciation, generateLessonSpeech, recognizeImage, decodeBase64, decodeAudioData } from '../services/geminiService';

const BrandLoader: React.FC<{ size?: string }> = ({ size = "w-12 h-12" }) => (
  <div className={`${size} relative animate-bounce`}>
    <div className="absolute inset-0 bg-gradient-to-br from-[#BD1023] to-[#8E0C1B] rounded-full shadow-lg border-2 border-white"></div>
    <svg viewBox="0 0 100 100" className="absolute inset-0 p-2.5 fill-white">
      <path d="M25 20h10v60H25z M65 20h10v60H65z M35 45h30v10H35z" />
    </svg>
  </div>
);

const UNIT_EXERCISES_MAP: Record<string, Exercise[]> = {
  'u1': [
    { id: 'u1e1', type: 'LISTEN', question: 'exListenHello', chinese: '你好', pinyin: 'nǐ hǎo', answer: '你好', options: ['你好', '谢谢', '再见'] },
    { id: 'u1e2', type: 'SPEAK', question: 'exSayHello', chinese: '你好', pinyin: 'nǐ hǎo', answer: '你好' },
    { id: 'u1e3', type: 'WRITE', question: 'exWritePerson', chinese: '人', pinyin: 'rén', answer: '人' }
  ],
  'u8': [
    { id: 'u8e1', type: 'SELECT', question: 'exCharThree', chinese: '三', pinyin: 'sān', answer: '三', options: ['一', '二', '三', '四'] },
    { id: 'u8e2', type: 'LISTEN', question: 'exListenEight', chinese: '八', pinyin: 'bā', answer: '八', options: ['六', '七', '八', '九'] },
    { id: 'u8e3', type: 'SPEAK', question: 'exSay10', chinese: '十点', pinyin: 'shí diǎn', answer: '十点' }
  ],
  'u4': [
    { id: 'u4e1', type: 'SELECT', question: 'exWakeUp', chinese: '起床', pinyin: 'qǐchuáng', answer: '起床', options: ['睡觉', '起床', '吃饭'] },
    { id: 'u4e2', type: 'SPEAK', question: 'exSayWork', chinese: '我去上班', pinyin: 'wǒ qù shàngbān', answer: '我去上班' },
    { id: 'u4e3', type: 'READ', question: 'exWhatIsSleep', chinese: '睡觉', pinyin: 'shuìjiào', answer: 'optionSleep', options: ['optionSleep', 'optionEat', 'optionRun'] }
  ],
  'u2': [
    { id: 'u2e1', type: 'SELECT', question: 'exWhatIsSleep', chinese: '吃饭', pinyin: 'chī fàn', answer: 'optionEat', options: ['optionSleep', 'optionEat', 'optionRun'] },
    { id: 'u2e2', type: 'LISTEN', question: 'exListenHello', chinese: '好喝', pinyin: 'hǎohē', answer: '好喝', options: ['好吃', '好喝', '好闻'] },
    { id: 'u2e3', type: 'SPEAK', question: 'exSayHello', chinese: '我想吃饭', pinyin: 'wǒ xiǎng chīfàn', answer: '我想吃饭' }
  ],
  'u5': [
    { id: 'u5e1', type: 'READ', question: 'exWhatIsExpensive', chinese: '太贵了', pinyin: 'tài guì le', answer: 'optionTooExpensive', options: ['optionTooExpensive', 'optionVeryCheap', 'optionHowMuch'] },
    { id: 'u5e2', type: 'SPEAK', question: 'exSayHowMuch', chinese: '多少钱？', pinyin: 'duōshǎo qián?', answer: '多少钱？' },
    { id: 'u5e3', type: 'LISTEN', question: 'exListenCheap', chinese: '便宜', pinyin: 'piányi', answer: '便宜', options: ['便宜', '贵', '打折'] }
  ],
  'u6': [
    { id: 'u6e1', type: 'SELECT', question: 'exWhichFriend', chinese: '朋友', pinyin: 'péngyou', answer: '朋友', options: ['老师', '学生', '朋友'] },
    { id: 'u6e2', type: 'SPEAK', question: 'exSayNiceToMeet', chinese: '很高兴认识你', pinyin: 'hěn gāoxìng rènshi nǐ', answer: '很高兴认识你' },
    { id: 'u6e3', type: 'LISTEN', question: 'exListenFamily', chinese: '家人', pinyin: 'jiārén', answer: '家人', options: ['朋友', '老师', '家人'] }
  ],
  'u3': [
    { id: 'u3e1', type: 'SELECT', question: 'exIdentifySubway', chinese: '地铁站', pinyin: 'dìtiě zhàn', answer: '地铁站', options: ['火车站', '地铁站', '飞机场'] },
    { id: 'u3e2', type: 'READ', question: 'exWhatIsAirport', chinese: '飞机场', pinyin: 'fēijī chǎng', answer: 'optionAirport', options: ['optionAirport', 'optionHotel', 'optionTaxi'] },
    { id: 'u3e3', type: 'WRITE', question: 'exWriteExit', chinese: '出', pinyin: 'chū', answer: '出' }
  ],
  'u7': [
    { id: 'u7e1', type: 'READ', question: 'exWhatIsRedEnvelope', chinese: '红包', pinyin: 'hóngbāo', answer: 'optionRedEnvelope', options: ['optionRedEnvelope', 'optionLantern', 'optionTeaCup'] },
    { id: 'u7e2', type: 'SPEAK', question: 'exSayHappyNewYear', chinese: '新年快乐', pinyin: 'xīnnián kuàilè', answer: '新年快乐' },
    { id: 'u7e3', type: 'LISTEN', question: 'exListenCalligraphy', chinese: '书法', pinyin: 'shūfǎ', answer: '书法', options: ['国画', '书法', '京剧'] }
  ]
};

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

  useEffect(() => {
    if (activeUnitId) {
      const unit = allUnits.find(u => u.id === activeUnitId);
      if (unit && !unit.locked) startLesson(unit);
      setActiveUnitId(null);
    }
  }, [activeUnitId, allUnits, setActiveUnitId]);

  const startLesson = (unit: any) => {
    const exercises = (UNIT_EXERCISES_MAP as any)[unit.id] || (UNIT_EXERCISES_MAP as any)['u1'];
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
  };

  const playAudio = async (text: string) => {
    setLoading(true);
    try {
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume();
      const base64Audio = await generateLessonSpeech(text);
      if (base64Audio) {
        const decoded = decodeBase64(base64Audio);
        const buffer = await decodeAudioData(decoded, audioContextRef.current);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.start();
      }
    } catch (e) {} finally { setLoading(false); }
  };

  const handleWriteCheck = async () => {
    setLoading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      const result = await recognizeImage(base64);
      const target = unitExercises[currentExerciseIdx].chinese;
      const correct = result.includes(target);
      setIsCorrect(correct);
      setFeedback(correct ? t('perfectStroke') : `${t('detected')}: "${result}". ${t('target')}: "${target}"`);
    } catch (e) { setFeedback(t('recognitionError')); } finally { setLoading(false); }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        setLoading(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          try {
            const result = await evaluatePronunciation(base64, unitExercises[currentExerciseIdx].chinese, language, mimeType);
            setIsCorrect(result.isCorrect);
            setFeedback(`${t('score')}: ${result.score} - ${result.feedback}`);
          } catch (e) { setFeedback(t('micError')); } finally { setLoading(false); }
        };
        stream.getTracks().forEach(track => track.stop());
      };
      recorder.start();
      setIsRecording(true);
    } catch (e) { setFeedback(t('micError')); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSelectOption = (opt: string) => {
    setUserSelection(opt);
    const correct = opt === unitExercises[currentExerciseIdx].answer;
    setIsCorrect(correct);
    setFeedback(correct ? t('fantastic') : t('keepTrying'));
  };

  const draw = (e: any) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  if (activeUnit) {
    const ex = unitExercises[currentExerciseIdx];
    return (
      <div className="fixed inset-0 z-[300] bg-[#f9f7f2] flex flex-col p-6 animate-in slide-in-from-right duration-300 overflow-y-auto">
        <div className="max-w-xl mx-auto w-full flex flex-col h-full">
          <header className="flex justify-between items-center mb-8">
            <button onClick={() => setActiveUnit(null)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] transition-colors">✕</button>
            <div className="flex-1 px-8">
              <div className="h-2 w-full bg-[#f0ede5] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#BD1023] to-[#E9C46A] transition-all duration-500 ease-out" 
                  style={{ width: `${((currentExerciseIdx + 1) / unitExercises.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{currentExerciseIdx + 1} / {unitExercises.length}</div>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
            <h3 className="text-sm font-black text-[#BD1023] uppercase tracking-[0.2em] mb-4">{t('exerciseType' + (ex.type === 'SELECT' || ex.type === 'READ' ? 'SelectRead' : ex.type))}</h3>
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-12 tracking-tight">{t(ex.question)}</h2>

            {(ex.type === 'SELECT' || ex.type === 'READ' || ex.type === 'LISTEN') && (
              <div className="w-full space-y-4">
                {ex.type === 'LISTEN' && (
                  <button onClick={() => playAudio(ex.chinese)} className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-[#fdf0f1] mx-auto mb-10 hover:scale-105 transition-transform group">
                    <span className="group-hover:scale-125 transition-transform">🔊</span>
                  </button>
                )}
                {ex.type === 'READ' && (
                  <div className="bg-white p-10 rounded-xl border border-[#f0ede5] shadow-inner mb-10">
                    <div className="text-7xl font-black chinese-font text-[#1A1A1A] mb-2">{ex.chinese}</div>
                    <div className="text-xl text-[#BD1023] font-bold tracking-[0.2em] uppercase">{ex.pinyin}</div>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4">
                  {ex.options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-6 rounded-2xl border-2 font-black text-xl transition-all
                        ${userSelection === opt 
                          ? (isCorrect ? 'border-[#2D8C61] bg-[#eefaf3] text-[#2D8C61]' : 'border-[#BD1023] bg-[#fdf0f1] text-[#BD1023]') 
                          : 'border-[#f0ede5] bg-white hover:border-gray-200 shadow-sm'}`}
                    >
                      {t(opt) !== opt ? t(opt) : opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {ex.type === 'SPEAK' && (
              <div className="space-y-12 w-full animate-in fade-in duration-500">
                <div className="bg-white p-10 rounded-xl border border-[#f0ede5] shadow-inner relative overflow-hidden flex flex-col justify-center items-center">
                  <div className="text-8xl font-black chinese-font text-[#1A1A1A] mb-4 relative z-10 text-wrap">{ex.chinese}</div>
                  <div className="text-2xl text-[#BD1023] font-black tracking-[0.2em] uppercase relative z-10 text-wrap">{ex.pinyin}</div>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">{isRecording ? t('analyzingSpeech') : t('holdToSpeak')}</p>
                  <button 
                    onMouseDown={startRecording} 
                    onMouseUp={stopRecording} 
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all mx-auto ${isRecording ? 'bg-[#BD1023] animate-pulse text-white scale-125' : 'bg-[#1A1A1A] text-white hover:scale-110'}`}
                  >
                    🎤
                  </button>
                </div>
              </div>
            )}

            {ex.type === 'WRITE' && (
              <div className="w-full space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('canvasTrace')}</p>
                    <p className="text-4xl font-black chinese-font text-[#1A1A1A]">{ex.answer}</p>
                  </div>
                  <button onClick={() => { const ctx = canvasRef.current?.getContext('2d'); ctx?.clearRect(0,0,500,500); }} className="px-4 py-2 bg-[#f0ede5] text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-lg hover:bg-gray-200">{t('clearBoard')}</button>
                </div>
                <div className="aspect-square w-full bg-white border-4 border-[#f0ede5] rounded-3xl shadow-inner relative cursor-crosshair overflow-hidden">
                   <canvas
                    ref={canvasRef}
                    width={500}
                    height={500}
                    onMouseDown={(e) => { isDrawing.current = true; draw(e); }}
                    onMouseMove={draw}
                    onMouseUp={() => { isDrawing.current = false; canvasRef.current?.getContext('2d')?.beginPath(); }}
                    className="w-full h-full touch-none"
                   />
                </div>
              </div>
            )}

            {isCorrect !== null && (
              <div className={`mt-10 p-6 rounded-2xl w-full animate-in zoom-in duration-300 border-2 ${isCorrect ? 'bg-[#eefaf3] border-[#2D8C61]/20 text-[#2D8C61]' : 'bg-[#fdf0f1] border-[#BD1023]/20 text-[#BD1023]'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${isCorrect ? 'bg-[#2D8C61] text-white' : 'bg-[#BD1023] text-white'}`}>
                    {isCorrect ? '✓' : '✕'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase tracking-widest mb-1">{isCorrect ? t('fantastic') : t('keepTrying')}</p>
                    <p className="text-xs font-medium opacity-80">{feedback}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-auto py-10 bg-[#f9f7f2] border-t border-[#f0ede5] -mx-6 px-10">
            {isCorrect === null ? (
              <button 
                onClick={ex.type === 'WRITE' ? handleWriteCheck : () => {}} 
                disabled={(!userSelection && ex.type !== 'WRITE' && ex.type !== 'SPEAK') || loading || (ex.type === 'SPEAK' && isRecording)} 
                className="w-full py-7 bg-[#1A1A1A] text-white rounded-xl font-black text-xl shadow-2xl disabled:opacity-10 active:scale-95 transition-all transform hover:-translate-y-1 uppercase tracking-widest"
              >
                {ex.type === 'SPEAK' && isRecording ? t('recording') : t('checkAnswer')}
              </button>
            ) : (
              <button 
                onClick={isCorrect ? () => { if (currentExerciseIdx < unitExercises.length - 1) { setCurrentExerciseIdx(p => p + 1); resetState(); } else { setActiveUnit(null); } } : () => setIsCorrect(null)} 
                className={`w-full py-7 rounded-xl font-black text-xl text-white shadow-2xl transition-all active:scale-95 transform hover:-translate-y-1 uppercase tracking-widest ${isCorrect ? 'bg-[#2D8C61]' : 'bg-[#BD1023]'}`}
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
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black text-[#1A1A1A] mb-4 tracking-tight">{t('personalPath')}</h2>
          <div className="flex items-center gap-4">
            <div className="px-4 py-1.5 bg-[#BD1023] text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg">{t('currentMilestone')}</div>
            <p className="text-gray-400 font-bold text-sm">{t('milestoneText')}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`w-3 h-3 rounded-full ${i <= 3 ? 'bg-[#2D8C61]' : 'bg-[#f0ede5]'}`} />
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allUnits.map((unit) => (
          <div 
            key={unit.id}
            onClick={() => !unit.locked && startLesson(unit)}
            className={`group p-8 rounded-3xl border transition-all relative overflow-hidden flex flex-col min-h-[300px]
              ${unit.locked ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed' : 'bg-white border-[#f0ede5] hover:border-[#BD1023] hover:shadow-2xl cursor-pointer'}`}
          >
            <div className="absolute top-0 right-0 p-6">
               {unit.locked ? (
                 <span className="text-2xl opacity-20">🔒</span>
               ) : (
                 <div className="w-12 h-12 rounded-xl bg-[#f9f7f2] flex items-center justify-center text-xs font-black text-gray-300 group-hover:bg-[#fdf0f1] group-hover:text-[#BD1023] transition-colors">
                    {Math.round((unit.completed / unit.lessons) * 100)}%
                 </div>
               )}
            </div>

            <div className={`w-16 h-16 ${unit.color} rounded-2xl flex items-center justify-center text-4xl mb-8 shadow-xl border-4 border-white transition-transform group-hover:scale-110 group-hover:rotate-6`}>
              {unit.icon}
            </div>

            <div className="flex-1">
              <h3 className={`text-2xl font-black mb-2 tracking-tight ${unit.locked ? 'text-gray-400' : 'text-[#1A1A1A] group-hover:text-[#BD1023] transition-colors'}`}>{unit.title}</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{unit.category} • {unit.focus}</p>
              <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-2">"{unit.description}"</p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#f0ede5] flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('doneUnit', { completed: unit.completed, lessons: unit.lessons })}</span>
              {!unit.locked && (
                <span className="text-[#BD1023] font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  {t('resumeTraining')} →
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
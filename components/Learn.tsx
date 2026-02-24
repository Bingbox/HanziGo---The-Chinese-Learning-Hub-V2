import React, { useState, useRef, useEffect } from 'react';
import { Unit, Exercise } from '../types';
import { useTranslation } from '../App';
import { evaluatePronunciation, generateLessonSpeech, recognizeImage, decodeBase64, decodeAudioData } from '../services/geminiService';
import { questionBankService } from '../services/questionBankService';

const BrandLoader: React.FC<{ size?: string }> = ({ size = "w-12 h-12" }) => (
  <div className={`${size} relative animate-bounce`}>
    <div className="absolute inset-0 bg-gradient-to-br from-[#BD1023] to-[#8E0C1B] rounded-full shadow-lg border-2 border-white"></div>
    <svg viewBox="0 0 100 100" className="absolute inset-0 p-2.5 fill-white">
      <path d="M25 20h10v60H25z M65 20h10v60H65z M35 45h30v10H35z" />
    </svg>
  </div>
);

const Learn: React.FC = () => {
  const { language, t, allUnits, activeUnitId, setActiveUnitId } = useTranslation();
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [userSelection, setUserSelection] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [speakingLoading, setSpeakingLoading] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [unitExercises, setUnitExercises] = useState<Exercise[]>([]);
  const [sessionResults, setSessionResults] = useState<boolean[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const nextTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (isCorrect === true) {
      nextTimerRef.current = setTimeout(() => {
        handleNextStep();
      }, 1500);
    }
    return () => {
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    };
  }, [isCorrect]);

  useEffect(() => {
    if (unitExercises.length > 0 && unitExercises[currentExerciseIdx]?.type === 'LISTEN') {
      playAudio(unitExercises[currentExerciseIdx].chinese);
    }
  }, [currentExerciseIdx, unitExercises]);

  const handleNextStep = () => {
    if (currentExerciseIdx < unitExercises.length - 1) {
      setCurrentExerciseIdx(p => p + 1);
      resetState();
    } else {
      setShowSummary(true);
    }
  };

  const startLesson = (unit: any) => {
    const completionPercent = (unit.completed / unit.lessons) * 100;
    const exercises = questionBankService.getSessionExercises(unit.id, 10, completionPercent);
    setUnitExercises(exercises);
    setSessionResults([]);
    setShowSummary(false);
    setActiveUnit(unit);
    setCurrentExerciseIdx(0);
    resetState();
  };

  const resetState = () => {
    setUserSelection('');
    setIsCorrect(null);
    setFeedback('');
    setLoading(false);
    setAudioLoading(false);
    setSpeakingLoading(false);
  };

  const playAudio = async (text: string) => {
    if (!text) return;
    setAudioLoading(true);
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      const base64Audio = await generateLessonSpeech(text);
      if (base64Audio) {
        const decoded = decodeBase64(base64Audio);
        const buffer = await decodeAudioData(decoded, audioContextRef.current);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.start();
      } else {
        console.warn("No audio data received from AI");
      }
    } catch (e) {
      console.error("Audio playback failed", e);
    } finally {
      setAudioLoading(false);
    }
  };

  const handleWriteCheck = async () => {
    setLoading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      const target = unitExercises[currentExerciseIdx].chinese;
      const result = await recognizeImage(base64, target);
      const correct = result === target;
      setIsCorrect(correct);
      setSessionResults(prev => {
        const next = [...prev];
        next[currentExerciseIdx] = correct;
        return next;
      });
      setFeedback(correct ? t('perfectStroke') : `${t('detected')}: "${result}". ${t('target')}: "${target}" (${unitExercises[currentExerciseIdx].pinyin})`);
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
        setSpeakingLoading(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          try {
            const result = await evaluatePronunciation(base64, unitExercises[currentExerciseIdx].chinese, language, mimeType);
            setIsCorrect(result.isCorrect);
            setSessionResults(prev => {
              const next = [...prev];
              next[currentExerciseIdx] = result.isCorrect;
              return next;
            });
            setFeedback(`${t('score')}: ${result.score} - ${result.feedback}`);
          } catch (e) { 
            setFeedback(t('micError')); 
          } finally { 
            setSpeakingLoading(false); 
          }
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
    const ex = unitExercises[currentExerciseIdx];
    const correct = opt === ex.answer;
    setIsCorrect(correct);
    setSessionResults(prev => {
      const next = [...prev];
      next[currentExerciseIdx] = correct;
      return next;
    });
    
    if (correct) {
      setFeedback(t('fantastic'));
    } else {
      let hintText = t('keepTrying');
      if (ex.type === 'READ') {
        hintText = `${t('keepTrying')} ${t('hint')}: ${ex.pinyin}`;
      } else if (ex.type === 'LISTEN') {
        hintText = `${t('keepTrying')} ${t('hint')}: ${t(ex.meaning)}`;
      } else if (ex.type === 'SELECT') {
        hintText = `${t('keepTrying')} ${t('hint')}: ${ex.pinyin}`;
      }
      setFeedback(hintText);
    }
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
    if (showSummary) {
      const score = sessionResults.filter(r => r).length;
      return (
        <div className="fixed inset-0 z-[300] bg-[#f9f7f2] flex flex-col p-6 animate-in slide-in-from-right duration-300 overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full flex flex-col h-full">
            <header className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-black text-[#1A1A1A]">{t('sessionSummary')}</h2>
              <button onClick={() => setActiveUnit(null)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] transition-colors">✕</button>
            </header>

            <div className="flex-1 space-y-8">
              <div className="bg-white p-12 rounded-[2.5rem] border border-[#f0ede5] shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#BD1023] via-[#E9C46A] to-[#2D8C61]" />
                <div className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4">{t('totalScore')}</div>
                <div className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-[#1A1A1A] to-[#666666] mb-6">{Math.round((score / unitExercises.length) * 100)}%</div>
                <p className="text-gray-500 font-bold text-lg">{t('scoreDesc', { correct: score, total: unitExercises.length })}</p>
              </div>

              <div className="space-y-6 pb-12">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] px-4">{t('reviewAnswers')}</h3>
                {unitExercises.map((ex, idx) => (
                  <div key={ex.id} className="bg-white p-8 rounded-3xl border border-[#f0ede5] flex items-center gap-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 shadow-inner ${sessionResults[idx] ? 'bg-[#eefaf3] text-[#2D8C61]' : 'bg-[#fdf0f1] text-[#BD1023]'}`}>
                      {sessionResults[idx] ? '✓' : '✕'}
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t(ex.question)}</p>
                      <div className="flex items-baseline gap-4">
                        <span className="text-2xl font-black text-[#1A1A1A] chinese-font">{ex.chinese}</span>
                        <span className="text-sm font-medium text-gray-500 italic">{ex.pinyin}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('correctAnswer')}</p>
                      <p className="text-base font-black text-[#BD1023] bg-[#fdf0f1] px-3 py-1 rounded-lg">{t(ex.answer) !== ex.answer ? t(ex.answer) : ex.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <footer className="py-10 bg-[#f9f7f2] border-t border-[#f0ede5] -mx-6 px-10 sticky bottom-0 z-20">
              <button 
                onClick={() => setActiveUnit(null)} 
                className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-black text-xs hover:bg-[#BD1023] transition-colors shadow-lg active:scale-95 uppercase tracking-widest"
              >
                {t('finishLesson')}
              </button>
            </footer>
          </div>
        </div>
      );
    }

    const ex = unitExercises[currentExerciseIdx];
    return (
      <div className="fixed inset-0 z-[300] bg-[#f9f7f2] flex flex-col p-6 animate-in slide-in-from-right duration-300 overflow-y-auto">
        <div className="max-w-xl mx-auto w-full flex flex-col h-full">
          <header className="flex justify-between items-center mb-8">
            <button onClick={() => setActiveUnit(null)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#1A1A1A] transition-colors">✕</button>
            <div className="flex-1 px-8">
              <div className="h-3 w-full bg-[#f0ede5] rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-[#BD1023] via-[#E9C46A] to-[#2D8C61] transition-all duration-700 ease-out shadow-lg" 
                  style={{ width: `${((currentExerciseIdx + 1) / unitExercises.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{currentExerciseIdx + 1} / {unitExercises.length}</div>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
            <h3 className="text-sm font-black text-[#BD1023] uppercase tracking-[0.2em] mb-4">{t('exerciseType' + (ex.type === 'SELECT' || ex.type === 'READ' ? 'SelectRead' : ex.type))}</h3>
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-12 tracking-tight">
              {t(ex.question, { meaning: t(ex.meaning), chinese: ex.chinese })}
            </h2>

            {(ex.type === 'SELECT' || ex.type === 'READ' || ex.type === 'LISTEN') && (
              <div className="w-full space-y-4">
                {ex.type === 'LISTEN' && (
                  <button 
                    onClick={() => !audioLoading && playAudio(ex.chinese)} 
                    className={`w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-[#fdf0f1] mx-auto mb-10 transition-all group ${audioLoading ? 'opacity-50 cursor-wait' : 'hover:scale-105'}`}
                  >
                    <span className={`${audioLoading ? 'animate-spin' : 'group-hover:scale-125 transition-transform'}`}>
                      {audioLoading ? '⏳' : '🔊'}
                    </span>
                  </button>
                )}
                {ex.type === 'READ' && (
                  <div className="bg-white p-10 rounded-xl border border-[#f0ede5] shadow-inner mb-10">
                    <div className="text-7xl font-black chinese-font text-[#1A1A1A] mb-2">{ex.chinese}</div>
                    <div className="text-xl text-[#BD1023] font-bold tracking-[0.2em] uppercase">{ex.pinyin}</div>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3 w-full">
                  {ex.options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(opt)}
                      className={`group p-4 rounded-xl border border-[#f0ede5] font-black text-base transition-all duration-200 flex items-center justify-between
                        ${userSelection === opt 
                          ? (isCorrect ? 'border-[#2D8C61] bg-[#eefaf3] text-[#2D8C61] shadow-sm' : 'border-[#BD1023] bg-[#fdf0f1] text-[#BD1023] shadow-sm') 
                          : 'bg-white hover:border-gray-300 active:scale-[0.98]'}`}
                    >
                      <span className="flex-1 text-center">{t(opt) !== opt ? t(opt) : opt}</span>
                      {userSelection === opt && (
                        <span className="text-lg animate-in zoom-in duration-200">
                          {isCorrect ? '✓' : '✕'}
                        </span>
                      )}
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
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">
                    {speakingLoading ? t('analyzingSpeech') : (isRecording ? t('recording') : t('holdToSpeak'))}
                  </p>
                  <button 
                    onMouseDown={startRecording} 
                    onMouseUp={stopRecording} 
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    disabled={speakingLoading}
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all mx-auto ${speakingLoading ? 'bg-gray-200 cursor-wait' : (isRecording ? 'bg-[#BD1023] animate-pulse text-white scale-125' : 'bg-[#1A1A1A] text-white hover:scale-110')}`}
                  >
                    {speakingLoading ? '⏳' : '🎤'}
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
              <div className={`mt-8 p-4 rounded-xl w-full animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center gap-4 ${isCorrect ? 'text-[#2D8C61]' : 'text-[#BD1023]'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm shrink-0 ${isCorrect ? 'bg-[#2D8C61] text-white' : 'bg-[#BD1023] text-white'}`}>
                  {isCorrect ? '✓' : '✕'}
                </div>
                <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-widest">{isCorrect ? t('fantastic') : t('keepTrying')}</p>
                  <p className="text-[10px] font-medium opacity-70 leading-tight">{feedback}</p>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-auto py-8 bg-[#f9f7f2] border-t border-[#f0ede5] -mx-6 px-10">
            {isCorrect === null ? (
              <button 
                onClick={ex.type === 'WRITE' ? handleWriteCheck : () => {}} 
                disabled={(!userSelection && ex.type !== 'WRITE' && ex.type !== 'SPEAK') || loading || audioLoading || speakingLoading || (ex.type === 'SPEAK' && isRecording)} 
                className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-black text-xs hover:bg-[#BD1023] transition-colors shadow-lg active:scale-95 uppercase tracking-widest disabled:opacity-20"
              >
                {speakingLoading ? t('analyzingSpeech') : (ex.type === 'SPEAK' && isRecording ? t('recording') : t('checkAnswer'))}
              </button>
            ) : (
              <button 
                onClick={isCorrect ? handleNextStep : () => setIsCorrect(null)} 
                className={`w-full py-4 rounded-xl font-black text-xs text-white shadow-lg transition-all active:scale-95 uppercase tracking-widest ${isCorrect ? 'bg-[#2D8C61]' : 'bg-[#BD1023]'}`}
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
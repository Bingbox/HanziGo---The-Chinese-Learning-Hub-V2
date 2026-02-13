
import React, { useState, useRef, useEffect } from 'react';
import { getAITutorResponseStream, generateLessonSpeech, decodeBase64, decodeAudioData, transcribeAudio } from '../services/geminiService';
import { ChatMessage, TutorSession, TutorMode } from '../types';
import { useTranslation } from '../App';

// 统一的图标组件库
const Icons = {
  Speaker: ({ active, loading }: { active?: boolean; loading?: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all duration-300 ${loading ? 'animate-spin opacity-50' : active ? 'fill-red-600 scale-110' : 'fill-gray-400 group-hover:fill-gray-600'}`}>
      {loading ? (
        <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M7.757 16.243l-2.121 2.121M16.243 16.243l2.121 2.121M7.757 7.757L5.636 5.636" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      ) : (
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.5A2.25 2.25 0 0 0 2.25 9.75v4.5a2.25 2.25 0 0 0 2.25 2.25h2l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.75 12c0-1.72-.94-3.21-2.33-4a.75.75 0 0 0-.75 1.299c.86.49 1.45 1.41 1.45 2.47s-.59 1.98-1.45 2.47a.75.75 0 0 0 .75 1.3c1.39-.79 2.33-2.28 2.33-4ZM22.5 12c0-3.61-1.97-6.76-4.9-8.41a.75.75 0 0 0-.74 1.31c2.47 1.39 4.14 4.04 4.14 7.1s-1.67 5.71-4.14 7.1a.75.75 0 0 0 .74 1.31c2.93-1.65 4.9-4.8 4.9-8.41Z" />
      )}
    </svg>
  ),
  Mic: ({ active, transcribing }: { active?: boolean; transcribing?: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all duration-300 ${transcribing ? 'animate-bounce' : active ? 'fill-white scale-125' : 'fill-gray-400'}`}>
      <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
      <path d="M6 10.5a.75.75 0 0 1 .75.75 5.25 5.25 0 1 0 10.5 0 .75.75 0 0 1 1.5 0 6.75 6.75 0 0 1-6 6.709V21a.75.75 0 0 1-1.5 0v-3.041a6.75 6.75 0 0 1-6-6.709.75.75 0 0 1 .75-.75Z" />
    </svg>
  ),
  Keyboard: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gray-400">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm5.25 0c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm-4.964 5.918a.75.75 0 0 1 1.06.02 3.75 3.75 0 0 0 5.558 0 .75.75 0 1 1 1.08 1.04 5.25 5.25 0 0 1-7.718 0 .75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
    </svg>
  )
};

const MeiAvatar: React.FC = () => (
  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl shadow-lg ring-4 ring-red-50 relative overflow-hidden group">
    <div className="absolute inset-0 bg-white/10 group-hover:scale-150 transition-transform duration-700"></div>
    <svg viewBox="0 0 100 100" className="absolute inset-0 p-2.5 fill-white z-10">
      <path d="M25 20h10v60H25z M65 20h10v60H65z M35 45h30v10H35z" />
    </svg>
    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-20"></div>
  </div>
);

const AITutor: React.FC = () => {
  const { language, t } = useTranslation();
  const [mode, setMode] = useState<TutorMode>('TEXT');
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState<TutorSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => Math.random().toString(36).substr(2, 9));
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); 
  const [isMeiSpeaking, setIsMeiSpeaking] = useState(false); 
  const [isRecordingVoice, setIsRecordingVoice] = useState(false); 
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null); // 用于跟踪哪个单词或句子正在加载音频

  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 核心音频引用：管理播放队列
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingQueueRef = useRef(false);
  const lastProcessedIndexRef = useRef(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 预热音频上下文
  const ensureAudioContext = async () => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  useEffect(() => {
    const saved = localStorage.getItem('hanzigo_tutor_sessions');
    if (saved) setSessions(JSON.parse(saved));
    // 组件挂载时预热
    ensureAudioContext().catch(() => {}); 
    return () => stopCurrentAudio();
  }, []);

  useEffect(() => {
    if (sessions.length > 0) localStorage.setItem('hanzigo_tutor_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (messages.length === 0) setMessages([{ role: 'model', text: t('tutorWelcome'), timestamp: Date.now() }]);
  }, [language, t, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isTranscribing]);

  const stopCurrentAudio = () => {
    audioQueueRef.current = [];
    isPlayingQueueRef.current = false;
    setIsMeiSpeaking(false);
    setLoadingAudioId(null);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const playNextInQueue = async () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingQueueRef.current = false;
      setIsMeiSpeaking(false);
      setLoadingAudioId(null);
      return;
    }

    isPlayingQueueRef.current = true;
    setIsMeiSpeaking(true);

    const ctx = await ensureAudioContext();
    const buffer = audioQueueRef.current.shift()!;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.onended = () => playNextInQueue();
    source.start(0);
  };

  const queueSpeechChunk = async (text: string, sourceId?: string) => {
    if (sourceId) setLoadingAudioId(sourceId);
    
    try {
      const cleanText = text.replace(/\[VOCAB\][\s\S]*?\[\/VOCAB\]/g, '').replace(/\[ANALYSIS\][\s\S]*$/, '').trim();
      if (!cleanText) return;

      const base64Audio = await generateLessonSpeech(cleanText);
      if (base64Audio) {
        const ctx = await ensureAudioContext();
        const decoded = decodeBase64(base64Audio);
        const buffer = await decodeAudioData(decoded, ctx);
        audioQueueRef.current.push(buffer);
        
        if (!isPlayingQueueRef.current) {
          playNextInQueue();
        }
      }
    } catch (e) {
      console.error("Speech queue error:", e);
      setLoadingAudioId(null);
    }
  };

  const handleSpeakWord = async (text: string, idx: number) => {
    stopCurrentAudio();
    queueSpeechChunk(text, `word-${idx}`);
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    stopCurrentAudio();
    lastProcessedIndexRef.current = 0;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let fullStreamedText = '';
    const tempModelMsg: ChatMessage = { role: 'model', text: '', timestamp: Date.now() };
    setMessages(prev => [...prev, tempModelMsg]);

    try {
      const stream = getAITutorResponseStream([...messages, userMsg], language);
      
      for await (const chunk of stream) {
        fullStreamedText += chunk;
        const rawBodyText = fullStreamedText
          .replace(/\[VOCAB\][\s\S]*?\[\/VOCAB\]/g, '')
          .replace(/\[ANALYSIS\][\s\S]*$/, '')
          .trim();
        
        if (mode === 'VOICE') {
          const unprocessed = rawBodyText.slice(lastProcessedIndexRef.current);
          const sentenceEndMatch = unprocessed.match(/[。！？\n]/);
          
          if (sentenceEndMatch) {
            const endIdx = sentenceEndMatch.index! + 1;
            const sentenceToSpeak = unprocessed.slice(0, endIdx);
            queueSpeechChunk(sentenceToSpeak);
            lastProcessedIndexRef.current += endIdx;
          }
        }

        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === 'model') {
            last.text = rawBodyText;
          }
          return updated;
        });
      }

      const finalRawBody = fullStreamedText
        .replace(/\[VOCAB\][\s\S]*?\[\/VOCAB\]/g, '')
        .replace(/\[ANALYSIS\][\s\S]*$/, '')
        .trim();
      
      if (mode === 'VOICE' && lastProcessedIndexRef.current < finalRawBody.length) {
        queueSpeechChunk(finalRawBody.slice(lastProcessedIndexRef.current));
      }

      const vocabMatches = [...fullStreamedText.matchAll(/\[VOCAB\]([\s\S]*?)\[\/VOCAB\]/g)];
      const vocabItems = vocabMatches.map(m => {
        try { return JSON.parse(m[1]); } catch(e) { return null; }
      }).filter(Boolean);

      const analysisMatch = fullStreamedText.match(/\[ANALYSIS\]([\s\S]*?)\[\/ANALYSIS\]/);
      let analysisData;
      if (analysisMatch) {
        try { analysisData = JSON.parse(analysisMatch[1]); } catch (e) { console.error("Analysis parse failed", e); }
      }

      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        last.text = finalRawBody;
        last.analysis = analysisData;
        last.vocab = vocabItems;
        return updated;
      });

      setSessions(prev => {
        const sessionIdx = prev.findIndex(s => s.id === currentSessionId);
        const finalMessages = [...messages.filter(m => m.text !== ''), userMsg, { ...tempModelMsg, text: finalRawBody, analysis: analysisData, vocab: vocabItems }];
        if (sessionIdx > -1) {
          const newSessions = [...prev];
          newSessions[sessionIdx] = { ...newSessions[sessionIdx], messages: finalMessages };
          return newSessions;
        } else {
          return [{
            id: currentSessionId,
            title: textToSend.slice(0, 20) + '...',
            date: Date.now(),
            messages: finalMessages
          }, ...prev];
        }
      });

    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const startVoiceRecording = async () => {
    stopCurrentAudio();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
      mediaRecorder.onstop = async () => {
        setIsTranscribing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          try {
            const text = await transcribeAudio(base64Audio);
            if (text) handleSend(text);
          } catch (e) { console.error(e); } finally { setIsTranscribing(false); }
        };
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecordingVoice(true);
    } catch (err) { console.error(err); setIsRecordingVoice(false); }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecordingVoice) {
      mediaRecorderRef.current.stop();
      setIsRecordingVoice(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 md:p-10 relative">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <MeiAvatar /> 
          <div>
            <h3 className="text-lg font-black text-gray-900 tracking-tight leading-none mb-1">Mei</h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t('tutorRole')}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { stopCurrentAudio(); setShowHistory(!showHistory); }}
            className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:shadow-md hover:border-red-100 transition-all flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><path d="M12 6v6l4 2" strokeLinecap="round"/><circle cx="12" cy="12" r="9"/></svg>
            {t('sessionHistory')}
          </button>
        </div>
      </header>

      {showHistory && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xl animate-in fade-in duration-300 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-2xl font-black text-gray-900 tracking-tight">{t('sessionHistory')}</h4>
            <div className="flex gap-4">
              <button onClick={() => { stopCurrentAudio(); setCurrentSessionId(Math.random().toString(36).substr(2, 9)); setMessages([{ role: 'model', text: t('tutorWelcome'), timestamp: Date.now() }]); setShowHistory(false); }} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-colors">
                {t('newChat')}
              </button>
              <button onClick={() => setShowHistory(false)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">✕</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
            {sessions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 grayscale">
                 <div className="text-6xl mb-4">⌛</div>
                 <p className="font-black uppercase tracking-widest text-xs">{t('historyEmpty')}</p>
              </div>
            ) : (
              sessions.map(s => (
                <div
                  key={s.id}
                  onClick={() => { stopCurrentAudio(); setCurrentSessionId(s.id); setMessages(s.messages); setShowHistory(false); }}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between
                    ${currentSessionId === s.id ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'}`}
                >
                  <div className="flex-1 pr-4 overflow-hidden">
                    <p className="text-sm font-black text-gray-900 truncate mb-1">{s.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {new Date(s.date).toLocaleDateString()} • {s.messages.length} messages
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex-1 relative min-h-0">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-8 mb-8 pr-4 custom-scrollbar pb-10">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                <div className="flex items-start gap-3 max-w-[85%]">
                  {m.role === 'model' && (
                     <button 
                       onClick={() => { stopCurrentAudio(); queueSpeechChunk(m.text, `msg-${i}`); }}
                       disabled={loadingAudioId === `msg-${i}`}
                       className={`mt-2 w-10 h-10 rounded-full flex items-center justify-center transition-all group shrink-0 shadow-sm
                         ${isMeiSpeaking && loadingAudioId === `msg-${i}` ? 'bg-red-600 ring-4 ring-red-100 shadow-red-200' : 'bg-white border border-gray-100 hover:bg-red-50 hover:border-red-100'}`}
                     >
                       <Icons.Speaker 
                          active={isMeiSpeaking && loadingAudioId === `msg-${i}`} 
                          loading={loadingAudioId === `msg-${i}` && !isMeiSpeaking}
                       />
                     </button>
                  )}
                  <div className={`p-5 rounded-2xl text-base leading-relaxed whitespace-pre-wrap transition-all duration-500 shadow-sm ${
                    m.role === 'user' ? 'bg-gray-900 text-white rounded-br-none' : `bg-white border border-gray-100 text-gray-800 rounded-bl-none ${isMeiSpeaking && loadingAudioId === `msg-${i}` ? 'ring-2 ring-red-100' : ''}`
                  }`}>
                    {m.text || (i === messages.length - 1 && isTyping ? '...' : '')}
                  </div>
                </div>
                
                {m.vocab && m.vocab.length > 0 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2 w-full max-w-[85%] no-scrollbar">
                    {m.vocab.map((v, vIdx) => (
                      <div key={vIdx} className="flex-shrink-0 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-red-100 transition-all min-w-[150px] animate-in zoom-in duration-300 group">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-2xl font-black text-gray-900 chinese-font">{v.word}</span>
                          <button 
                            onClick={() => handleSpeakWord(v.word, vIdx)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-gray-50 group-hover:bg-red-50"
                          >
                            <Icons.Speaker 
                              active={isMeiSpeaking && loadingAudioId === `word-${vIdx}`} 
                              loading={loadingAudioId === `word-${vIdx}` && !isMeiSpeaking}
                            />
                          </button>
                        </div>
                        <p className="text-[11px] text-red-600 font-black tracking-widest uppercase mb-2">{v.pinyin}</p>
                        <p className="text-xs text-gray-500 font-medium leading-tight">{v.meaning}</p>
                      </div>
                    ))}
                  </div>
                )}

                {m.analysis && (
                  <div className="mt-4 w-full max-w-[85%] bg-blue-50/40 border border-blue-100 p-6 rounded-3xl shadow-sm animate-in zoom-in duration-300">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{t('feedbackLabel')}</span>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs text-gray-400 line-through opacity-60">{m.analysis.original}</p>
                        <p className="text-lg font-black text-gray-900 chinese-font">{m.analysis.correction}</p>
                        <p className="text-xs text-blue-600/80 font-medium italic mt-2">{m.analysis.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTranscribing && (
              <div className="flex flex-col items-end animate-in slide-in-from-bottom-2">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-br-none italic text-xs text-gray-500 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                  {t('transcribing') || 'Transcribing...'}
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="relative flex items-center gap-3 group mb-4 shrink-0">
            <button
              onClick={() => { stopCurrentAudio(); setMode(mode === 'TEXT' ? 'VOICE' : 'TEXT'); }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all shrink-0"
            >
              {mode === 'TEXT' ? <Icons.Mic active={false} /> : <Icons.Keyboard />}
            </button>
            {mode === 'TEXT' ? (
              <div className="flex-1 relative flex items-center">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input); }
                  }}
                  placeholder={t('tutorPlaceholder')}
                  className="w-full p-5 pr-24 rounded-3xl border-2 border-gray-100 shadow-xl focus:border-red-600 focus:ring-4 focus:ring-red-50 outline-none transition-all text-base font-medium resize-none bg-white/50 backdrop-blur-sm"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping || isTranscribing}
                  className="absolute right-3 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-red-600 transition-all disabled:opacity-20 uppercase tracking-widest shadow-lg"
                >
                  {t('send')}
                </button>
              </div>
            ) : (
              <div className="flex-1 flex justify-center items-center">
                <button
                  onMouseDown={startVoiceRecording}
                  onMouseUp={stopVoiceRecording}
                  onTouchStart={startVoiceRecording}
                  onTouchEnd={stopVoiceRecording}
                  disabled={isTyping || isTranscribing}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all relative
                    ${isRecordingVoice ? 'bg-red-600 scale-110 shadow-red-200' : 'bg-gray-900 text-white hover:bg-red-600'}
                    ${isTyping || isTranscribing ? 'opacity-20 grayscale' : ''}`}
                >
                  {isRecordingVoice && <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-50"></div>}
                  <Icons.Mic active={isRecordingVoice} transcribing={isTranscribing} /> 
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;

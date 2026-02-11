
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { getAITutorResponse, generateLessonSpeech, decodeBase64, decodeAudioData, transcribeAudio } from '../services/geminiService';
import { ChatMessage, TutorSession, TutorMode } from '../types';
import { useTranslation } from '../App';

// Custom circular brand logo for Mei's avatar
const MeiAvatar: React.FC = () => (
  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl shadow-lg ring-4 ring-red-50 relative">
    <svg viewBox="0 0 100 100" className="absolute inset-0 p-2.5 fill-white">
      <path d="M25 20h10v60H25z M65 20h10v60H65z M35 45h30v10H35z" />
    </svg>
    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
  </div>
);

// SF Symbols 5 Style Icons for AITutor and potentially Dictionary
export const MicIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75V19.5a2.25 2.25 0 0 1-2.25 2.25v0A2.25 2.25 0 0 1 7.5 19.5V18.75m4.5-5.625v-5.25a3.375 3.375 0 1 0-6.75 0v5.25m6.75 0H9m3.75 0H15" />
  </svg>
);

export const KeyboardIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all ${active ? 'fill-red-600' : 'fill-none stroke-gray-400 stroke-[1.8]'}`}>
    <rect x="4" y="8" width="16" height="8" rx="1.5" ry="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6.5" y1="10.5" x2="6.5" y2="10.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="9.5" y1="10.5" x2="9.5" y2="10.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12.5" y1="10.5" x2="12.5" y2="10.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="15.5" y1="10.5" x2="15.5" y2="10.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="18.5" y1="10.5" x2="18.5" y2="10.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6.5" y1="13.5" x2="6.5" y2="13.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="9.5" y1="13.5" x2="9.5" y2="13.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12.5" y1="13.5" x2="12.5" y2="13.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="15.5" y1="13.5" x2="15.5" y2="13.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="18.5" y1="13.5" x2="18.5" y2="13.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('hanzigo_tutor_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('hanzigo_tutor_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: t('tutorWelcome'), timestamp: Date.now() }]);
    }
  }, [language, t, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getAITutorResponse(updatedMessages, textToSend, language);
      const modelMsg: ChatMessage = {
        role: 'model',
        text: response.text,
        analysis: response.analysis,
        timestamp: Date.now()
      };
      const finalMessages = [...updatedMessages, modelMsg];
      setMessages(finalMessages);

      if (mode === 'VOICE') {
        handleMeiSpeak(response.text);
      }

      setSessions(prev => {
        const existingIdx = prev.findIndex(s => s.id === currentSessionId);
        if (existingIdx > -1) {
          const newSessions = [...prev];
          newSessions[existingIdx] = { ...newSessions[existingIdx], messages: finalMessages };
          return newSessions;
        } else {
          return [{
            id: currentSessionId,
            title: textToSend.slice(0, 30) + '...',
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

  const handleMeiSpeak = async (text: string) => {
    setIsMeiSpeaking(true);
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const base64Audio = await generateLessonSpeech(text);
      if (base64Audio) {
        const decoded = decodeBase64(base64Audio);
        const buffer = await decodeAudioData(decoded, audioContextRef.current);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setIsMeiSpeaking(false);
        source.start();
      }
    } catch (e) {
      console.error(e);
      setIsMeiSpeaking(false);
    }
  };

  const createNewChat = () => {
    setCurrentSessionId(Math.random().toString(36).substr(2, 9));
    setMessages([{ role: 'model', text: t('tutorWelcome'), timestamp: Date.now() }]);
    setShowHistory(false);
  };

  const loadSession = (session: TutorSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setShowHistory(false);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) createNewChat();
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setIsTyping(true); 
          try {
            const transcribedText = await transcribeAudio(base64Audio);
            if (transcribedText) {
              handleSend(transcribedText);
            }
          } catch (error) {
            console.error("Transcription failed:", error);
          } finally {
            setIsTyping(false);
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecordingVoice(true);
    } catch (err) {
      console.error("Could not start voice recording:", err);
      setIsRecordingVoice(false);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecordingVoice) {
      mediaRecorderRef.current.stop();
      setIsRecordingVoice(false);
    }
  };


  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 md:p-10 relative">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <MeiAvatar /> 
          <div>
            <h3 className="text-lg font-black text-gray-900 tracking-tight leading-none mb-1">Mei</h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t('tutorRole')}</p>
          </div>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-5 py-2.5 bg-white border border-gray-100 rounded-lg font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><path d="M12 6v6l4 2" strokeLinecap="round"/><circle cx="12" cy="12" r="9"/></svg>
          {t('sessionHistory')}
        </button>
      </header>

      {showHistory && (
        <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-xl animate-in fade-in duration-300 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-2xl font-black text-gray-900 tracking-tight">{t('sessionHistory')}</h4>
            <div className="flex gap-4">
              <button onClick={createNewChat} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-colors">
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
                  onClick={() => loadSession(s)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between
                    ${currentSessionId === s.id ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'}`}
                >
                  <div className="flex-1 pr-4 overflow-hidden">
                    <p className="text-sm font-black text-gray-900 truncate mb-1">{s.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {new Date(s.date).toLocaleDateString()} • {s.messages.length} messages
                    </p>
                  </div>
                  <button
                    onClick={(e) => deleteSession(e, s.id)}
                    className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600"
                  >
                    🗑️
                  </button>
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
                <div className={`max-w-[85%] p-5 rounded-2xl text-base leading-relaxed ${
                  m.role === 'user' ? 'bg-gray-900 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>

                {m.analysis && (
                  <div className="mt-4 w-full max-w-[85%] bg-blue-50/40 border border-blue-100 p-6 rounded-3xl shadow-sm">
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
            {isTyping && (
              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-2xl w-fit animate-pulse">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-white">
                    <path d="M25 20h10v60H25z M65 20h10v60H65z M35 45h30v10H35z" />
                  </svg>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="relative flex items-center gap-3 group mb-4">
            <button
              onClick={() => setMode(mode === 'TEXT' ? 'VOICE' : 'TEXT')}
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-gray-400 bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
            >
              {mode === 'TEXT' ? <MicIcon active={false} /> : <KeyboardIcon active={false} />}
            </button>

            {mode === 'TEXT' ? (
              <>
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(input);
                    }
                  }}
                  placeholder={t('tutorPlaceholder')}
                  className="flex-1 p-5 pr-32 rounded-3xl border-2 border-gray-100 shadow-lg focus:border-red-600 outline-none transition-all text-base font-medium resize-none bg-white/50 backdrop-blur-sm"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-7 py-2.5 rounded-xl font-black text-xs hover:bg-red-600 transition-all disabled:opacity-20 uppercase tracking-widest"
                >
                  {t('send')}
                </button>
              </>
            ) : (
              <div className="flex-1 flex justify-center items-center">
                <button
                  onMouseDown={startVoiceRecording}
                  onMouseUp={stopVoiceRecording}
                  onTouchStart={startVoiceRecording}
                  onTouchEnd={stopVoiceRecording}
                  disabled={isTyping}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all
                    ${isRecordingVoice ? 'bg-red-600 animate-pulse text-white scale-110' : 'bg-gray-900 text-white hover:bg-red-600'}`}
                >
                  <MicIcon active={isRecordingVoice} /> 
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

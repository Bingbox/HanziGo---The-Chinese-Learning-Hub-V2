
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { dictionaryLookup, recognizeImage, transcribeAudio } from '../services/geminiService';
import { WordEntry } from '../types';
import { useTranslation } from '../App';
import { MicIcon } from './AITutor'; // Import MicIcon from AITutor

const MascotHead: React.FC<{ animate?: boolean }> = ({ animate = true }) => (
  <div className={`w-24 h-24 relative ${animate ? 'animate-float' : ''}`}>
    <div className="absolute inset-0 logo-gradient rounded-[35%] brand-shadow border-4 border-white"></div>
    <svg viewBox="0 0 100 100" className="absolute inset-0 p-3 fill-white">
      <circle cx="25" cy="25" r="12" /><circle cx="75" cy="25" r="12" />
      <circle cx="50" cy="55" r="35" />
      <circle cx="35" cy="52" r="4" className="fill-gray-900" />
      <circle cx="65" cy="52" r="4" className="fill-gray-900" />
      <path d="M46 62 Q50 66 54 62" stroke="#111827" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

// SF Symbols 5 Style Icons for Dictionary
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-gray-400 stroke-[1.8]">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-gray-400 stroke-[1.8]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.351 2.25 9.25V19.5a2.25 2.25 0 0 0 2.25 2.25h15.5a2.25 2.25 0 0 0 2.25-2.25V9.25c0-.899-.75-1.669-1.874-1.921-.377-.063-.754-.121-1.134-.175a2.31 2.31 0 0 1-1.64-1.055l-.82-1.26A2.25 2.25 0 0 0 14.828 5.25h-5.656a2.25 2.25 0 0 0-1.64 1.055ZM15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const Dictionary: React.FC = () => {
  const { language, t } = useTranslation();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<WordEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSearch = useCallback(async (text: string) => {
    if (!text || !text.trim()) return;
    setLoading(true);
    try {
      const data = await dictionaryLookup(text.trim(), language);
      setResult(data);
    } catch (err) {
      console.error("Dictionary lookup failed:", err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  const handleCrossReference = (word: string) => {
    setQuery(word);
    handleSearch(word);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access denied or failed:", err);
      setShowCamera(false);
    }
  };

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Data = canvas.toDataURL('image/jpeg').split(',')[1];
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setShowCamera(false);
      setLoading(true);
      try {
        const recognizedText = await recognizeImage(base64Data);
        if (recognizedText && recognizedText !== '?') {
          setQuery(recognizedText);
          handleSearch(recognizedText);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const startRecording = async () => {
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
          setLoading(true);
          try {
            const transcribedText = await transcribeAudio(base64Audio);
            if (transcribedText) {
              setQuery(transcribedText);
              handleSearch(transcribedText);
            }
          } finally {
            setLoading(false);
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) { console.error("Microphone access denied or failed:", err); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 relative pb-32">
      {showCamera && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/20">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600 shadow-[0_0_15px_#ef4444] animate-[scan_3s_linear_infinite]" />
          </div>
          <div className="flex gap-6 mt-8">
            <button onClick={() => setShowCamera(false)} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white text-xl">✕</button>
            <button onClick={captureImage} className="w-16 h-16 bg-red-600 rounded-full border-4 border-white flex items-center justify-center text-white shadow-xl">
              <CameraIcon /> {/* Using the SVG CameraIcon */}
            </button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      <div className="max-w-2xl mx-auto mb-20">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder={t('searchPlaceholder')}
            className="w-full p-6 pl-16 pr-48 rounded-3xl bg-white border border-gray-100 shadow-2xl focus:border-red-600 outline-none transition-all text-xl font-medium"
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-30">
            <SearchIcon /> {/* Replaced emoji with SVG icon */}
          </span>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button onClick={() => setQuery('')} className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors">✕</button>
            )}
            <button 
              onMouseDown={startRecording} onMouseUp={stopRecording}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
                ${isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              <MicIcon active={isRecording} /> {/* Reused MicIcon from AITutor */}
            </button>
            <button onClick={openCamera} className="w-12 h-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
              <CameraIcon /> {/* Replaced emoji with SVG icon */}
            </button>
            <button onClick={() => handleSearch(query)} className="ml-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-red-600 transition-colors shadow-lg active:scale-95 uppercase tracking-widest">{t('go')}</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
            <MascotHead />
            <div className="mt-12 text-center">
              <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs animate-pulse">{t('linguisticAnalysis')}</p>
            </div>
        </div>
      ) : result ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl relative overflow-hidden group">
                <div className="flex justify-between items-start relative z-10">
                    <div className="flex-1">
                        <div className="flex items-baseline gap-8 mb-6">
                            <h1 className="text-9xl font-black chinese-font text-gray-900 tracking-tight leading-none">{result.simplified}</h1>
                            <div className="flex flex-col gap-3">
                                {result.hskLevel && <span className="px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest w-fit">HSK {result.hskLevel}</span>}
                                <button 
                                  onClick={() => copyToClipboard(result.simplified)}
                                  className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] hover:underline text-left"
                                >
                                  {t('copyChar')}
                                </button>
                            </div>
                        </div>
                        <p className="text-4xl font-black text-red-600 tracking-[0.3em] mb-12 uppercase">{result.pinyin}</p>
                        
                        <div className="space-y-6">
                            {result.meanings.map((m, i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <span className="text-gray-200 font-black italic text-2xl min-w-[2rem]">{i+1}</span>
                                    <p className="text-2xl text-gray-700 leading-relaxed font-medium group-hover:text-gray-900 transition-colors">{m}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-12">{t('usageExamples')}</h3>
                <div className="space-y-12">
                    {result.examples.map((ex, i) => (
                        <div key={i} className="group cursor-pointer border-l-4 border-transparent hover:border-red-600 pl-8 transition-all">
                            <p className="text-3xl font-black text-gray-900 mb-3 chinese-font leading-relaxed tracking-wide group-hover:text-red-700 transition-colors">
                              {ex.chinese}
                            </p>
                            <p className="text-xs text-gray-400 font-black uppercase tracking-[0.3em] mb-3 italic">{ex.pinyin}</p>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed">{ex.translation}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-8">{t('componentAnalysis')}</h4>
                <div className="grid grid-cols-2 gap-5">
                    {result.components.map((c, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleCrossReference(c.char)}
                          className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-2xl hover:-translate-y-2 transition-all border border-gray-100 group"
                        >
                            <div className="text-4xl font-black chinese-font text-gray-900 mb-3 group-hover:text-red-600">{c.char}</div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{c.meaning}</div>
                            {c.radical && <div className="mt-3 text-[8px] font-black text-red-500 uppercase tracking-widest">{t('radical')}</div>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-8">{t('compounds')}</h4>
                <div className="space-y-4">
                    {result.compounds.map((comp, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleCrossReference(comp.word)} 
                          className="w-full text-left p-5 rounded-xl hover:bg-red-50 hover:border-red-100 border border-transparent transition-all group"
                        >
                            <div className="text-2xl font-black chinese-font text-gray-900 mb-1 group-hover:text-red-600">{comp.word}</div>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-400 font-black uppercase tracking-[0.2em]">{comp.pinyin}</div>
                              <span className="text-gray-300 group-hover:translate-x-2 transition-transform">→</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50vh] flex flex-col items-center justify-center text-center opacity-40 animate-in fade-in zoom-in duration-1000">
            <div className="scale-150 mb-16 grayscale opacity-30">
              <MascotHead animate={false} />
            </div>
            <h3 className="text-2xl font-black text-gray-400 uppercase tracking-[0.5em]">{t('readyToSearch')}</h3>
            <p className="mt-6 text-base font-medium text-gray-400 max-w-sm leading-relaxed">{t('readyToSearchDesc')}</p>
        </div>
      )}
    </div>
  );
};

export default Dictionary;

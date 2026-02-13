
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { dictionaryLookup, recognizeImage, transcribeAudio } from '../services/geminiService';
import { WordEntry } from '../types';
import { useTranslation } from '../App';

// Fix: Removed incorrect MicIcon import from AITutor and added local definition

const BrandLoader: React.FC<{ size?: string; animate?: boolean; grayscale?: boolean }> = ({ size = "w-24 h-24", animate = true, grayscale = false }) => (
  <div className={`${size} relative ${animate ? 'animate-bounce' : ''} ${grayscale ? 'grayscale opacity-30' : ''}`}>
    <div className={`absolute inset-0 bg-gradient-to-br from-red-600 to-red-500 rounded-full shadow-2xl border-4 border-white`}></div>
    <svg viewBox="0 0 100 100" className="absolute inset-0 p-5 fill-white">
      <path d="M25 20h10v60H25z M65 20h10v60H65z M35 45h30v10H35z" />
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

// Added local MicIcon to resolve import error
const MicIcon = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all duration-300 ${active ? 'fill-white scale-110' : 'fill-gray-400'}`}>
    <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
    <path d="M6 10.5a.75.75 0 0 1 .75.75 5.25 5.25 0 1 0 10.5 0 .75.75 0 0 1 1.5 0 6.75 6.75 0 0 1-6 6.709V21a.75.75 0 0 1-1.5 0v-3.041a6.75 6.75 0 0 1-6-6.709.75.75 0 0 1 .75-.75Z" />
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
          <div className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600 shadow-[0_0_15px_#ef4444] animate-[scan_3s_linear_infinite]" />
          </div>
          <div className="flex gap-6 mt-8">
            <button onClick={() => setShowCamera(false)} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white text-xl">✕</button>
            <button onClick={captureImage} className="w-16 h-16 bg-red-600 rounded-full border-4 border-white flex items-center justify-center text-white shadow-xl">
              <CameraIcon />
            </button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      <div className="max-w-2xl mx-auto mb-16">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder={t('searchPlaceholder')}
            className="w-full p-5 pl-14 pr-44 rounded-2xl bg-white border border-gray-100 shadow-xl focus:border-red-600 outline-none transition-all text-lg font-medium"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl opacity-30">
            <SearchIcon /> 
          </span>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button onClick={() => setQuery('')} className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors">✕</button>
            )}
            <button 
              onMouseDown={startRecording} onMouseUp={stopRecording}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                ${isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              <MicIcon active={isRecording} /> 
            </button>
            <button onClick={openCamera} className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
              <CameraIcon /> 
            </button>
            <button onClick={() => handleSearch(query)} className="ml-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-xs hover:bg-red-600 transition-colors shadow-lg active:scale-95 uppercase tracking-widest">{t('go')}</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
            <BrandLoader />
            <div className="mt-10 text-center">
              <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs animate-pulse">{t('linguisticAnalysis')}</p>
            </div>
        </div>
      ) : result ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-xl relative overflow-hidden group">
                <div className="flex justify-between items-start relative z-10">
                    <div className="flex-1">
                        <div className="flex items-baseline gap-6 mb-4">
                            <h1 className="text-8xl font-black chinese-font text-gray-900 tracking-tight leading-none">{result.simplified}</h1>
                            <div className="flex flex-col gap-2">
                                {result.hskLevel && <span className="px-3 py-1 bg-gray-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest w-fit">HSK {result.hskLevel}</span>}
                                <button 
                                  onClick={() => copyToClipboard(result.simplified)}
                                  className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] hover:underline text-left"
                                >
                                  {t('copyChar')}
                                </button>
                            </div>
                        </div>
                        <p className="text-3xl font-black text-red-600 tracking-[0.3em] mb-10 uppercase">{result.pinyin}</p>
                        
                        <div className="space-y-4">
                            {result.meanings.map((m, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <span className="text-gray-200 font-black italic text-xl min-w-[1.5rem]">{i+1}</span>
                                    <p className="text-xl text-gray-700 leading-relaxed font-medium group-hover:text-gray-900 transition-colors">{m}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">{t('usageExamples')}</h3>
                <div className="space-y-10">
                    {result.examples.map((ex, i) => (
                        <div key={i} className="group cursor-pointer border-l-4 border-transparent hover:border-red-600 pl-6 transition-all">
                            <p className="text-2xl font-black text-gray-900 mb-2 chinese-font leading-relaxed tracking-wide group-hover:text-red-700 transition-colors">
                              {ex.chinese}
                            </p>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-2 italic">{ex.pinyin}</p>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">{ex.translation}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{t('componentAnalysis')}</h4>
                <div className="grid grid-cols-2 gap-4">
                    {result.components.map((c, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleCrossReference(c.char)}
                          className="bg-white p-5 rounded-xl shadow-sm text-center hover:shadow-xl hover:-translate-y-1.5 transition-all border border-gray-100 group"
                        >
                            <div className="text-3xl font-black chinese-font text-gray-900 mb-2 group-hover:text-red-600">{c.char}</div>
                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{c.meaning}</div>
                            {c.radical && <div className="mt-2 text-[8px] font-black text-red-500 uppercase tracking-widest">{t('radical')}</div>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{t('compounds')}</h4>
                <div className="space-y-3">
                    {result.compounds.map((comp, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleCrossReference(comp.word)} 
                          className="w-full text-left p-4 rounded-xl hover:bg-red-50 hover:border-red-100 border border-transparent transition-all group"
                        >
                            <div className="text-xl font-black chinese-font text-gray-900 mb-0.5 group-hover:text-red-600">{comp.word}</div>
                            <div className="flex justify-between items-center">
                              <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{comp.pinyin}</div>
                              <span className="text-gray-300 group-hover:translate-x-1.5 transition-transform text-xs">→</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[40vh] flex flex-col items-center justify-center text-center opacity-40 animate-in fade-in zoom-in duration-1000">
            <div className="scale-110 mb-12">
              <BrandLoader animate={false} grayscale={true} />
            </div>
            <h3 className="text-xl font-black text-gray-400 uppercase tracking-[0.5em]">{t('readyToSearch')}</h3>
            <p className="mt-4 text-sm font-medium text-gray-400 max-w-xs leading-relaxed">{t('readyToSearchDesc')}</p>
        </div>
      )}
    </div>
  );
};

export default Dictionary;

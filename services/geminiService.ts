
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Language } from "../types";
import { translations } from "../translations";

export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Initializing the AI client inside functions to guarantee usage of latest environment API_KEY as per instructions.

export const dictionaryLookup = async (query: string, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the Chinese word/character: "${query}". 
    Provide a professional Pleco-grade linguistic breakdown for a native ${langName} speaker. 
    IMPORTANT: All explanations, meanings, etymology descriptions, and component analysis MUST be strictly and naturally in ${langName}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          simplified: { type: Type.STRING },
          traditional: { type: Type.STRING },
          pinyin: { type: Type.STRING },
          hskLevel: { type: Type.INTEGER },
          etymology: { type: Type.STRING },
          meanings: { type: Type.ARRAY, items: { type: Type.STRING } },
          components: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { char: { type: Type.STRING }, meaning: { type: Type.STRING }, radical: { type: Type.BOOLEAN } },
              required: ["char", "meaning"]
            }
          },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { chinese: { type: Type.STRING }, pinyin: { type: Type.STRING }, translation: { type: Type.STRING } },
              required: ["chinese", "translation"]
            }
          },
          compounds: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { word: { type: Type.STRING }, pinyin: { type: Type.STRING }, meaning: { type: Type.STRING } },
              required: ["word", "meaning"]
            }
          }
        },
        required: ["simplified", "pinyin", "meanings", "components"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const generateCulturalDeepDive = async (topic: string, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a world-class cultural historian and academic researcher. 
    Generate an authoritative, scholarly deep-dive into the Chinese cultural topic: "${topic}".
    
    STRUCTURE RULES:
    1. "chineseTitle": The original Chinese name.
    2. "pinyinTitle": Official Pinyin.
    3. "fullContentChinese": A professional academic summary in Simplified Chinese (approx 150 words).
    4. "fullContentTranslated": A scholarly, high-fidelity translation strictly in ${langName}.
    5. "keyConcepts": 3 core terms with Pinyin and their meanings strictly in ${langName}.
    6. "reflection": A profound scholarly reflection strictly in ${langName}.
    
    Sourcing: Use information from authoritative sources like the "Cambridge History of China", "Classic of Poetry", or official archaeological records.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          chineseTitle: { type: Type.STRING },
          pinyinTitle: { type: Type.STRING },
          fullContentChinese: { type: Type.STRING },
          fullContentTranslated: { type: Type.STRING },
          keyConcepts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { word: { type: Type.STRING }, pinyin: { type: Type.STRING }, meaning: { type: Type.STRING } },
              required: ["word", "pinyin", "meaning"]
            }
          },
          reflection: { type: Type.STRING }
        },
        required: ["chineseTitle", "pinyinTitle", "fullContentChinese", "fullContentTranslated", "keyConcepts", "reflection"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const translateCultureArticle = async (article: any, userLang: Language = 'en') => {
  if (userLang === 'en') return article;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the English parts of this Chinese culture article into ${langName}. 
    Summary, Translation, Reflection, and Vocabulary Meanings must all be strictly and naturally in ${langName}. 
    Article: ${JSON.stringify(article)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          fullContentTranslated: { type: Type.STRING },
          reflection: { type: Type.STRING },
          vocabularyMeanings: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "fullContentTranslated", "reflection", "vocabularyMeanings"]
      }
    }
  });
  const data = JSON.parse(response.text || "{}");
  return {
    ...article,
    summary: data.summary,
    fullContentTranslated: data.fullContentTranslated,
    reflection: data.reflection,
    keyConcepts: article.keyConcepts.map((v: any, idx: number) => ({ ...v, meaning: data.vocabularyMeanings[idx] || v.meaning }))
  };
};

export const getAITutorResponse = async (history: any[], message: string, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `You are 'Mei', a professional Mandarin Teacher for a student whose native language is ${langName}. Respond in Mandarin where appropriate, but provide all help strictly and naturally in ${langName}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: { text: { type: Type.STRING }, analysis: { type: Type.OBJECT, properties: { original: { type: Type.STRING }, correction: { type: Type.STRING }, explanation: { type: Type.STRING } } } },
        required: ["text"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const generateHSKQuestions = async (level: number, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a mini-HSK Level ${level} exam. All questions and explanations must be strictly in ${langName}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: { id: { type: Type.STRING }, question: { type: Type.STRING }, content: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } }, answer: { type: Type.STRING }, explanation: { type: Type.STRING } },
          required: ["id", "question", "content", "options", "answer", "explanation"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

export const generateLessonSpeech = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
    config: { responseModalities: [Modality.AUDIO], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } } }
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const transcribeAudio = async (base64Audio: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    contents: { parts: [{ inlineData: { mimeType: 'audio/webm', data: base64Audio } }, { text: "Transcribe the Chinese." }] }
  });
  return response.text?.trim() || "";
};

export const recognizeImage = async (base64Data: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [{ inlineData: { mimeType: 'image/jpeg', data: base64Data } }, { text: "Identify characters." }] }
  });
  return response.text?.trim() || "";
};

export const evaluatePronunciation = async (base64Audio: string, targetText: string, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [{ inlineData: { mimeType: 'audio/webm', data: base64Audio } }, { text: `Evaluate "${targetText}". Feedback in ${langName}.` }] },
    config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING }, isCorrect: { type: Type.BOOLEAN } }, required: ["score", "feedback", "isCorrect"] } }
  });
  return JSON.parse(response.text || "{}");
};

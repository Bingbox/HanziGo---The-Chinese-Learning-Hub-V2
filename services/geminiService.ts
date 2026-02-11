
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Language, ChatMessage } from "../types";
import { translations } from "../translations";

/**
 * 辅助函数：从模型返回的字符串中提取纯 JSON 块
 * 防止 Markdown 代码块标记导致的解析失败
 */
const extractJson = (text: string) => {
  try {
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    return JSON.parse(text);
  } catch (e) {
    console.error("JSON extraction failed:", e, text);
    throw new Error("Invalid format from AI");
  }
};

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
  return extractJson(response.text);
};

export const generateCulturalDeepDive = async (topic: string, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a scholarly deep-dive into: "${topic}".`,
    config: {
      systemInstruction: `Act as a world-class cultural historian. Generate authoritative content in both Chinese and ${langName}.`,
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
  return extractJson(response.text);
};

export const translateCultureArticle = async (article: any, userLang: Language = 'en') => {
  if (userLang === 'en') return article;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate this Chinese culture article into ${langName}: ${JSON.stringify(article)}`,
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
  const data = extractJson(response.text);
  return {
    ...article,
    summary: data.summary,
    fullContentTranslated: data.fullContentTranslated,
    reflection: data.reflection,
    keyConcepts: article.keyConcepts.map((v: any, idx: number) => ({ ...v, meaning: data.vocabularyMeanings[idx] || v.meaning }))
  };
};

export const getAITutorResponse = async (history: ChatMessage[], message: string, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  
  // 将前端消息历史转换为 Gemini 的 contents 格式
  const contents = history.map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: contents,
    config: {
      systemInstruction: `You are 'Mei', a professional Mandarin Teacher for a student whose native language is ${langName}. 
      Respond in Mandarin but provide corrections and explanations strictly in ${langName}. 
      Always analyze the student's grammar and provide feedback if they make mistakes.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: { 
          text: { type: Type.STRING }, 
          analysis: { 
            type: Type.OBJECT, 
            properties: { 
              original: { type: Type.STRING }, 
              correction: { type: Type.STRING }, 
              explanation: { type: Type.STRING } 
            } 
          } 
        },
        required: ["text"]
      }
    }
  });
  return extractJson(response.text);
};

export const generateHSKQuestions = async (level: number, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate 5 high-quality HSK Level ${level} mock exam questions. 
    Ensure the difficulty matches official HSK standards. 
    Questions and explanations must be provided in ${langName}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: { 
            id: { type: Type.STRING }, 
            question: { type: Type.STRING, description: "Instruction like 'Select the correct character'" }, 
            content: { type: Type.STRING, description: "The actual Chinese text/sentence" }, 
            options: { type: Type.ARRAY, items: { type: Type.STRING } }, 
            answer: { type: Type.STRING }, 
            explanation: { type: Type.STRING } 
          },
          required: ["id", "question", "content", "options", "answer", "explanation"]
        }
      }
    }
  });
  return extractJson(response.text);
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
    contents: { parts: [{ inlineData: { mimeType: 'audio/webm', data: base64Audio } }, { text: "Transcribe the Chinese speech into characters." }] }
  });
  return response.text?.trim() || "";
};

export const recognizeImage = async (base64Data: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [{ inlineData: { mimeType: 'image/jpeg', data: base64Data } }, { text: "Extract and identify all Chinese characters in this image." }] }
  });
  return response.text?.trim() || "";
};

export const evaluatePronunciation = async (base64Audio: string, targetText: string, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [{ inlineData: { mimeType: 'audio/webm', data: base64Audio } }, { text: `Evaluate the pronunciation of: "${targetText}". Feedback must be in ${langName}.` }] },
    config: { 
      responseMimeType: "application/json", 
      responseSchema: { 
        type: Type.OBJECT, 
        properties: { 
          score: { type: Type.NUMBER, description: "A score from 0-100" }, 
          feedback: { type: Type.STRING }, 
          isCorrect: { type: Type.BOOLEAN } 
        }, 
        required: ["score", "feedback", "isCorrect"] 
      } 
    }
  });
  return extractJson(response.text);
};

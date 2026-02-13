
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Language, ChatMessage } from "../types";
import { translations } from "../translations";

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
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
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

/**
 * AI Tutor 流式响应函数 - 支持双语、语法纠错及名词提取
 */
export async function* getAITutorResponseStream(history: ChatMessage[], userLang: Language = 'en') {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  
  const contents = history.map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview', 
    contents: contents,
    config: {
      systemInstruction: `You are 'Mei', a professional Mandarin Teacher for a native ${langName} speaker. 
      CORE RULES:
      1. ALWAYS respond with Chinese characters first, then ${langName} translation.
      2. If the user made errors, put correction JSON in [ANALYSIS]...[/ANALYSIS] at the VERY END.
      3. KEY FEATURE: Identify 1-3 key Chinese nouns or phrases from your current response. For each, provide a mini dictionary entry in this EXACT JSON format: {"word": "...", "pinyin": "...", "meaning": "..."}.
      4. Wrap each vocab entry inside [VOCAB]...[/VOCAB] tags. Place them after the main text but before [ANALYSIS].
      Example:
      你好！很高兴认识你。
      (Hello! Nice to meet you.)
      [VOCAB]{"word": "高兴", "pinyin": "gāoxìng", "meaning": "happy / glad"}[/VOCAB]
      [ANALYSIS]{...}[/ANALYSIS]`,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  for await (const chunk of responseStream) {
    yield chunk.text;
  }
}

export const dictionaryLookup = async (query: string, userLang: Language = 'en') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the Chinese word/character: "${query}". 
    Provide a professional breakdown for a native ${langName} speaker. 
    IMPORTANT: All explanations MUST be in ${langName}.`,
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

export const generateLessonSpeech = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
    config: { 
      responseModalities: [Modality.AUDIO], 
      speechConfig: { 
        voiceConfig: { 
          prebuiltVoiceConfig: { voiceName: 'Kore' } 
        } 
      } 
    }
  });
  return response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
};

export const transcribeAudio = async (base64Audio: string, mimeType: string = 'audio/webm') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { 
      parts: [
        { inlineData: { mimeType, data: base64Audio } }, 
        { text: "Transcribe this Chinese audio precisely into simplified Chinese characters. If there is English, transcribe it as well. Return ONLY the text." }
      ] 
    }
  });
  return response.text?.trim() || "";
};

export const evaluatePronunciation = async (base64Audio: string, targetText: string, userLang: Language = 'en', mimeType: string = 'audio/webm') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const langName = translations[userLang]?.langName || 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { 
      parts: [
        { inlineData: { mimeType, data: base64Audio } }, 
        { text: `Evaluate the Mandarin pronunciation of: "${targetText}". Feedback must be in ${langName}.` }
      ] 
    },
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

export const recognizeImage = async (base64Data: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [{ inlineData: { mimeType: 'image/jpeg', data: base64Data } }, { text: "Extract and identify all Chinese characters in this image." }] }
  });
  return response.text?.trim() || "";
};

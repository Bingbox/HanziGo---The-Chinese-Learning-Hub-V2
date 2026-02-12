
import { Language, ChatMessage } from "../types";
import { translations } from "../translations";

// 获取环境变量
const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const BASE_URL = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
const MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';

/**
 * 辅助函数：解码 Base64 编码的数据
 */
export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

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

/**
 * 通过第三方中转站调用生成内容接口
 */
const callGenerateContent = async (payload: any): Promise<string> => {
  const isLocalhost = BASE_URL.includes('localhost') || BASE_URL.includes('127.0.0.1');
  const url = isLocalhost 
    ? `${BASE_URL}/chat/completions`
    : `${BASE_URL}/models/${MODEL}:generateContent?key=${API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(isLocalhost ? { 'Authorization': `Bearer ${API_KEY}` } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  
  // 处理中转站返回格式（兼容OpenAI格式和Google格式）
  if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  
  throw new Error('Unexpected API response format');
};

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
  const langName = translations[userLang]?.langName || 'English';
  const payload = {
    contents: [{
      role: "user",
      parts: [{
        text: `Analyze the Chinese word/character: "${query}". 
    Provide a professional Pleco-grade linguistic breakdown for a native ${langName} speaker. 
    IMPORTANT: All explanations, meanings, etymology descriptions, and component analysis MUST be strictly and naturally in ${langName}.`
      }]
    }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          simplified: { type: "STRING" },
          traditional: { type: "STRING" },
          pinyin: { type: "STRING" },
          hskLevel: { type: "INTEGER" },
          etymology: { type: "STRING" },
          meanings: { type: "ARRAY", items: { type: "STRING" } },
          components: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: { char: { type: "STRING" }, meaning: { type: "STRING" }, radical: { type: "BOOLEAN" } },
              required: ["char", "meaning"]
            }
          },
          examples: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: { chinese: { type: "STRING" }, pinyin: { type: "STRING" }, translation: { type: "STRING" } },
              required: ["chinese", "translation"]
            }
          },
          compounds: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: { word: { type: "STRING" }, pinyin: { type: "STRING" }, meaning: { type: "STRING" } },
              required: ["word", "meaning"]
            }
          }
        },
        required: ["simplified", "pinyin", "meanings", "components"]
      }
    }
  };
  
  const text = await callGenerateContent(payload);
  return extractJson(text);
};

export const generateCulturalDeepDive = async (topic: string, userLang: Language = 'en') => {
  const langName = translations[userLang]?.langName || 'English';
  const payload = {
    system: [{
      parts: [{
        text: `Act as a world-class cultural historian. Generate authoritative content in both Chinese and ${langName}.`
      }]
    }],
    contents: [{
      role: "user",
      parts: [{
        text: `Generate a scholarly deep-dive into: "${topic}".`
      }]
    }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          chineseTitle: { type: "STRING" },
          pinyinTitle: { type: "STRING" },
          fullContentChinese: { type: "STRING" },
          fullContentTranslated: { type: "STRING" },
          keyConcepts: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: { word: { type: "STRING" }, pinyin: { type: "STRING" }, meaning: { type: "STRING" } },
              required: ["word", "pinyin", "meaning"]
            }
          },
          reflection: { type: "STRING" }
        },
        required: ["chineseTitle", "pinyinTitle", "fullContentChinese", "fullContentTranslated", "keyConcepts", "reflection"]
      }
    }
  };

  const text = await callGenerateContent(payload);
  return extractJson(text);
};

export const translateCultureArticle = async (article: any, userLang: Language = 'en') => {
  if (userLang === 'en') return article;
  const langName = translations[userLang]?.langName || 'English';
  const payload = {
    contents: [{
      role: "user",
      parts: [{
        text: `Translate this Chinese culture article into ${langName}: ${JSON.stringify(article)}`
      }]
    }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          summary: { type: "STRING" },
          fullContentTranslated: { type: "STRING" },
          reflection: { type: "STRING" },
          vocabularyMeanings: { type: "ARRAY", items: { type: "STRING" } }
        },
        required: ["summary", "fullContentTranslated", "reflection", "vocabularyMeanings"]
      }
    }
  };
  
  const text = await callGenerateContent(payload);
  const data = extractJson(text);
  return {
    ...article,
    summary: data.summary,
    fullContentTranslated: data.fullContentTranslated,
    reflection: data.reflection,
    keyConcepts: article.keyConcepts.map((v: any, idx: number) => ({ ...v, meaning: data.vocabularyMeanings[idx] || v.meaning }))
  };
};

export const getAITutorResponse = async (history: ChatMessage[], message: string, userLang: Language = 'en') => {
  const langName = translations[userLang]?.langName || 'English';
  
  // 将前端消息历史转换为 Gemini 的 contents 格式
  const contents = history.map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  const payload = {
    system: [{
      parts: [{
        text: `You are 'Mei', a professional Mandarin Teacher for a student whose native language is ${langName}. 
      Respond in Mandarin but provide corrections and explanations strictly in ${langName}. 
      Always analyze the student's grammar and provide feedback if they make mistakes.`
      }]
    }],
    contents,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: { 
          text: { type: "STRING" }, 
          analysis: { 
            type: "OBJECT", 
            properties: { 
              original: { type: "STRING" }, 
              correction: { type: "STRING" }, 
              explanation: { type: "STRING" } 
            } 
          } 
        },
        required: ["text"]
      }
    }
  };

  const text = await callGenerateContent(payload);
  return extractJson(text);
};

export const generateHSKQuestions = async (level: number, userLang: Language = 'en') => {
  const langName = translations[userLang]?.langName || 'English';
  const payload = {
    contents: [{
      role: "user",
      parts: [{
        text: `Generate 5 high-quality HSK Level ${level} mock exam questions. 
    Ensure the difficulty matches official HSK standards. 
    Questions and explanations must be provided in ${langName}.`
      }]
    }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: { 
            id: { type: "STRING" }, 
            question: { type: "STRING", description: "Instruction like 'Select the correct character'" }, 
            content: { type: "STRING", description: "The actual Chinese text/sentence" }, 
            options: { type: "ARRAY", items: { type: "STRING" } }, 
            answer: { type: "STRING" }, 
            explanation: { type: "STRING" } 
          },
          required: ["id", "question", "content", "options", "answer", "explanation"]
        }
      }
    }
  };

  const text = await callGenerateContent(payload);
  return extractJson(text);
};


export const generateLessonSpeech = async (text: string) => {
  const payload = {
    contents: [{
      role: "user",
      parts: [{ text: `Say clearly: ${text}` }]
    }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
    }
  };

  const response = await fetch(`${BASE_URL}/models/${MODEL}:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const transcribeAudio = async (base64Audio: string) => {
  const payload = {
    contents: [{
      role: "user",
      parts: [
        { inlineData: { mimeType: 'audio/webm', data: base64Audio } }, 
        { text: "Transcribe the Chinese speech into characters." }
      ]
    }]
  };

  const text = await callGenerateContent(payload);
  return text.trim() || "";
};

export const recognizeImage = async (base64Data: string) => {
  const payload = {
    contents: [{
      role: "user",
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Data } }, 
        { text: "Extract and identify all Chinese characters in this image." }
      ]
    }]
  };

  const text = await callGenerateContent(payload);
  return text.trim() || "";
};

export const evaluatePronunciation = async (base64Audio: string, targetText: string, userLang: Language = 'en') => {
  const langName = translations[userLang]?.langName || 'English';
  const payload = {
    contents: [{
      role: "user",
      parts: [
        { inlineData: { mimeType: 'audio/webm', data: base64Audio } }, 
        { text: `Evaluate the pronunciation of: "${targetText}". Feedback must be in ${langName}.` }
      ]
    }],
    generationConfig: { 
      responseMimeType: "application/json", 
      responseSchema: { 
        type: "OBJECT", 
        properties: { 
          score: { type: "NUMBER", description: "A score from 0-100" }, 
          feedback: { type: "STRING" }, 
          isCorrect: { type: "BOOLEAN" } 
        }, 
        required: ["score", "feedback", "isCorrect"] 
      } 
    }
  };

  const text = await callGenerateContent(payload);
  return extractJson(text);
};

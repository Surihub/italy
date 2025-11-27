import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  links?: { title: string; url: string }[];
}

const SYSTEM_INSTRUCTION = `
You are "Amore AI", a romantic and helpful travel concierge for a couple on their honeymoon in Italy. 
Your tone should be warm, exciting, and practical.
Provide concise answers to travel questions.
If relevant, teach the user a simple Italian phrase related to their question.
Use emojis sparingly but effectively (🇮🇹, 🍷, 🍕).
If the user asks about locations, try to provide specific recommendations.
Format your response in simple paragraphs.
`;

export const getTravelAdvice = async (query: string): Promise<{ text: string; links: { title: string; url: string }[] }> => {
  try {
    const modelId = 'gemini-2.5-flash'; 
    const response = await ai.models.generateContent({
      model: modelId,
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }], 
      },
    });

    const text = response.text || "Mi dispiace, I couldn't find that info right now.";
    
    // Extract grounding links if available
    const links: { title: string; url: string }[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          links.push({
            title: chunk.web.title || 'Source',
            url: chunk.web.uri
          });
        }
      });
    }

    return { text, links };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "Scusi! I'm having trouble connecting to the travel network. Please check your connection or try again later.",
      links: []
    };
  }
};

export const translateText = async (text: string): Promise<{ italian: string; pronunciation: string }> => {
  try {
    const modelId = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Translate the following Korean text to natural, polite Italian for a tourist. Also provide the pronunciation written in Hangul (Korean alphabet). Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            italian: { type: Type.STRING },
            pronunciation: { type: Type.STRING }
          },
          required: ["italian", "pronunciation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Translation Error:", error);
    return { italian: "Errore...", pronunciation: "에러가 발생했습니다" };
  }
};

import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLogo = async (prompt: string, styleModifier: string): Promise<string> => {
  const ai = getAI();
  const fullPrompt = `Create a high-quality logo for a T-shirt printing business. The logo should be: ${prompt}. Style requirements: ${styleModifier}. Ensure the logo is perfectly centered and isolated on a clean white background. No mockups, just the logo itself. High resolution, professional vector quality.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image was generated in the response.");
  } catch (error) {
    console.error("Logo Generation Error:", error);
    throw error;
  }
};

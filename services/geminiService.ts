import { GoogleGenAI } from "@google/genai";
import { LogoFormValues } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLogoImage = async (values: LogoFormValues): Promise<string> => {
  const { brandName, tagline, description, style, colors } = values;

  // Construct a highly optimized prompt for logo design
  const fullPrompt = `
    Design a professional vector logo for a brand named "${brandName}".
    ${tagline ? `Tagline text: "${tagline}".` : ''}
    
    The business concept is: ${description}.
    
    Visual Style: ${style}.
    Color Palette: ${colors}.
    
    Requirements:
    - High quality, professional graphic design.
    - Vector style aesthetics (clean edges, scalable look).
    - White background.
    - Centered composition.
    - Make it unique and memorable.
    - Do not include photorealistic elements, keep it graphical and symbolic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using the standard image generation model
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        // We don't use responseMimeType for this model as per guidelines
        // We let the model determine optimal output, usually comes as inlineData
      },
    });

    // Extract the image from the response
    if (response.candidates && response.candidates.length > 0) {
      const content = response.candidates[0].content;
      if (content && content.parts) {
        for (const part of content.parts) {
          if (part.inlineData && part.inlineData.data) {
            const base64Data = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            return `data:${mimeType};base64,${base64Data}`;
          }
        }
      }
    }

    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Logo Generation Error:", error);
    throw error;
  }
};

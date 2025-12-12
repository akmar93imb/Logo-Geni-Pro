import { GoogleGenAI } from "@google/genai";
import { LogoFormValues } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' });

const generateSingleLogo = async (
  values: LogoFormValues, 
  remixImageBase64?: string
): Promise<string> => {
  const { brandName, tagline, description, style, colors, referenceImage } = values;

  // Determine which image to use (Remix takes priority, then Uploaded Reference)
  const imageToUse = remixImageBase64 || referenceImage;

  let fullPrompt = `
    Design a professional vector logo for a brand named "${brandName}".
    ${tagline ? `Tagline text: "${tagline}".` : ''}
    
    The business concept/brief is: ${description}.
    
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

  const parts: any[] = [];

  if (imageToUse) {
    if (remixImageBase64) {
      // Logic for remixing a generated result
      fullPrompt += `
        \nTASK: Create a fresh variation based on the attached reference logo.
        Keep the core brand identity and color scheme, but explore a different composition or artistic execution.
        Make it distinct from the original.
      `;
    } else {
      // Logic for uploaded reference (Revision Brief)
      fullPrompt += `
        \nTASK: Use the attached image as a visual reference, sketch, or previous logo draft.
        Analyze this reference and SOLVE its design problems based on the brief provided above.
        Revise and improve it to be more professional, balanced, and aesthetically pleasing.
        Create a new, polished version that aligns with the requirements.
      `;
    }
    
    // Extract base64 if it contains the data: prefix
    const cleanBase64 = imageToUse.includes('base64,') 
      ? imageToUse.split('base64,')[1] 
      : imageToUse;

    parts.push({
      inlineData: {
        mimeType: 'image/png', // Defaulting to PNG, GenAI handles most common types automatically
        data: cleanBase64
      }
    });
  }

  parts.push({ text: fullPrompt });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts,
      },
      config: {
        // Temperature helps with variety when generating multiple
        temperature: 1, 
      },
    });

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

export const generateLogoImages = async (
  values: LogoFormValues, 
  baseImageBase64?: string
): Promise<string[]> => {
  // If variationCount is not set, default to 1
  const count = values.variationCount || 1;
  
  // Create an array of promises to run in parallel
  const promises = Array(count).fill(null).map(() => generateSingleLogo(values, baseImageBase64));
  
  // Wait for all to finish
  return Promise.all(promises);
};

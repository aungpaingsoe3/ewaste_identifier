"use server";

import {GoogleGenAI} from '@google/genai';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export default async function getTroubleshootingGenAIResponse(
  device: string,
  issue: string
) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
contents: "As a 20 years tech expert, write a step-by-step troubleshooting guides for a " +
              device +
              " experiencing " +
              issue +
              ".\nFormat the response as follows:\nA clear heading for the issue (e.g., 'Faulty Power Source').\nStep-by-step instructions for troubleshooting.\nIf applicable, signs to look for (e.g., LED indicators, noises, physical damage)\nBe concise and straightforward\nFormat: as a guide, no communcation or greeting", 
    });
  return response.text;
}
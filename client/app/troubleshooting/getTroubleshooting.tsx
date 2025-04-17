"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
});
export default async function getTroubleshootingGenAIResponse(
  device: string,
  issue: string
) {
  const completion = await openai.chat.completions.create({
    model: "google/gemini-flash-1.5-8b-exp",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "Provide step-by-step troubleshooting guides for a " +
              device +
              " experiencing " +
              issue +
              ".\nFormat the response as follows:\nA clear heading for the issue (e.g., 'Faulty Power Source').\nStep-by-step instructions for troubleshooting.\nIf applicable, signs to look for (e.g., LED indicators, noises, physical damage)\nBe concise and straightforward",
          },
        ],
      },
    ],
  });
  // console.log("here");
  // console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "../constants/index.ts";
import { config } from "../config/gemini.config.ts";

const genAI = new GoogleGenerativeAI(config.googleApiKey);
const googleAIClient = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export function createPromptAbility(system: string) {
    async function getResult(prompt: string) {
        const result = await googleAIClient.generateContent(
            `${system}\n\n${prompt}`
        );

        const response = await result.response;
        const text = await response.text();

        return text;
    }

    return { getResult };
}

export async function getPromptResult(prompt: string) {
    const result = await googleAIClient.generateContent(
        `${SYSTEM_PROMPT}\n\n${prompt}`
    );

    const response = await result.response;
    const text = await response.text();

    return text;
}

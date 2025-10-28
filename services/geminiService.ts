
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Assume process.env.API_KEY is available in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: apiKey as string });

let chat: Chat | null = null;

function getChatSession(): Chat {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });
    }
    return chat;
}

export async function sendMessageToGemini(message: string): Promise<string> {
    if (!apiKey) {
        throw new Error("API Key not configured. Please set the API_KEY environment variable.");
    }

    try {
        const chatSession = getChatSession();
        const result = await chatSession.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        if (error instanceof Error) {
            return `Ocorreu um erro ao comunicar com a IA: ${error.message}`;
        }
        return "Ocorreu um erro desconhecido ao comunicar com a IA.";
    }
}

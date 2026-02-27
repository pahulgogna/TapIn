import { createClient } from 'redis';
import { GoogleGenerativeAI } from "@google/generative-ai";
import createSummarizingPrompt from "./prompts/summarize";
import { rawTranscript } from "@pahul100/summarizer-common"
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const client = createClient();

const prisma = new PrismaClient()

async function summarize(text: string): Promise<string> {
    const result = await model.generateContent(createSummarizingPrompt(text));
    return result.response.text();
}

async function worker() {
    while (true) {
        const data = JSON.parse((await client.blPop("summarize", 0))?.element ?? "{}");

        console.log("Received data: ", data);
        
        const parsed = rawTranscript.safeParse(data);

        if (parsed.success) {
            try{
                const { text, userId } = parsed.data;
                const summary = await summarize(text);

                await prisma.note.create({
                    data: {
                        content: summary,
                        userId: userId,
                    }
                });

                console.log("Note created.", summary);
            }
            catch(err) {
                console.error(err);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await client.rPush("summarize", JSON.stringify(data));
            }
        }
        else {
            console.error("Invalid data received: ", data, "\n\n skipping...");
        }
    }
}

async function main() {
    try {
        await client.connect();
        console.log("Connected to Redis");
        await worker();
    } catch (err) {
        console.error(err);
    }
}

main();
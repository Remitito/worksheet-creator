import { NextResponse } from "next/server";
import OpenAI from "openai";

const GenerateReading = async (
  openai: OpenAI,
  grammar: string,
  level: string,
  topic: string,
  wordCount: number
) => {
  const prompt = `I need a reading comprehension text of ${wordCount} words. I want a text about "${topic}" for ${level} level English learners. The target grammar is "${grammar}", so use lots of this in the text.`;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatCompletion["choices"][0]["message"]["content"] as string;
};

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  let { grammar, level, topic, wordCount } = await req.json();
  const readingText = await GenerateReading(
    openai,
    grammar,
    level,
    topic,
    wordCount
  );
  return new NextResponse(JSON.stringify({ readingText }));
}

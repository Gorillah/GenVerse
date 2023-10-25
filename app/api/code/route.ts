import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessage = {
  role: "assistant",
  content:
    "You are code generator. You must answer only in markdown code snippets. Use code comments for explanations",
};

export async function POST(req: Request) {
  try {
    const userId = auth();
    const { messages } = await req.json();
    // console.log("CONVERSATION", req);

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!openai)
      return new NextResponse("OpenAI API key not configured", { status: 500 });

    if (!messages)
      return new NextResponse("messages is required", { status: 400 });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });
    return NextResponse.json({
      content: completion.choices[0].message.content,
      role: completion.choices[0].message.role,
    });
  } catch (error) {
    console.log("CODE ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

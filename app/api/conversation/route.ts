import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const userId = auth();
    const { messages } = await req.json();
    const isPro = await checkSubscription();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!openai)
      return new NextResponse("OpenAI API key not configured", { status: 500 });

    if (!messages)
      return new NextResponse("messages is required", { status: 400 });

    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial limit reached", { status: 403 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    await incrementApiLimit();

    return NextResponse.json({
      content: completion.choices[0].message.content,
      role: completion.choices[0].message.role,
    });
  } catch (error) {
    console.log("CONVERSATION ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

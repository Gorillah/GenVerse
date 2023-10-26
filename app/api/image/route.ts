import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const isPro = await checkSubscription();
  try {
    const userId = auth();
    const { prompt, resolution, amount } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!openai)
      return new NextResponse("OpenAI API key not configured", { status: 500 });

    if (!prompt) return new NextResponse("prompt is required", { status: 400 });
    if (!resolution)
      return new NextResponse("resolution is required", { status: 400 });
    if (!amount) return new NextResponse("amount is required", { status: 400 });

    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial limit reached", { status: 403 });
    }

    if (!isPro) await incrementApiLimit();

    const response = await openai.images.generate({
      prompt,
      n: Number(amount),
      size: resolution,
    });

    console.log(response.data[0].url);

    return NextResponse.json({
      url: response.data,
    });
  } catch (error) {
    console.error("IMAGE ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

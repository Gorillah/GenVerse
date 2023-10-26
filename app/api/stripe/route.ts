import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { userSubscriptions, users } from "@/drizzle/schema";
import { absoluteUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) return new Response("Unauthorized", { status: 401 });
    const subscriptions = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));
    if (subscriptions && subscriptions.length > 0) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptions[0].stripeCustomerId,
        return_url: absoluteUrl("/settings"),
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "GenVerse Pro",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
      success_url: absoluteUrl("/dashboard"),
      cancel_url: absoluteUrl("/dashboard"),
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("STRIPE ERROR", error);
    return new Response("STRIPE Internal Server Error", { status: 500 });
  }
}

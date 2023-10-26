import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { userSubscriptions } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("reached");
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    return new NextResponse("webhook error", {
      status: 400,
    });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  console.log(session);

  if (!session?.metadata)
    return new NextResponse("Metadata is Not found", { status: 404 });

  // console.log(session);
  // if (!session.subscription) {
  //   console.error("Subscription ID is missing in the session object.");
  //   return new NextResponse("Subscription ID is required", { status: 400 });
  // }

  if (event.type === "checkout.session.completed") {
    console.log("checkout.session.completed");
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    if (!session?.metadata?.userId!)
      return new NextResponse("Metadata userId is Not found", { status: 404 });

    const metadataId = session?.metadata?.userId!;
    if (!metadataId) {
      return new NextResponse("userId is required", { status: 400 });
    }
    console.log("subscription", subscription);

    const response = await db.insert(userSubscriptions).values({
      userId: metadataId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
    console.log("checkout.session.completed", response);
  }

  if (event.type === "invoice.payment_succeeded") {
    console.log("invoice.payment_succeeded");
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const metadataId = session?.metadata?.userId!;
    if (metadataId) {
      return new NextResponse("userId is required", { status: 400 });
    }

    const response = await db
      .update(userSubscriptions)
      .set({
        stripeCustomerId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      })
      .where(eq(userSubscriptions.userId, metadataId));
    console.log("subscription updated", response);
  }

  return new NextResponse(null, { status: 200 });
}

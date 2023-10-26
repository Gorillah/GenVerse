import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { userSubscriptions } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const dayInMs = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) return;
  const subscriptions: any = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.userId, userId));
  if (!subscriptions) return false;
  const date = new Date(subscriptions[0]?.stripeCurrentPeriodEnd! + dayInMs);
  const isValid =
    subscriptions[0]?.stripePriceId && date > new Date(Date.now());
  return !!isValid;
};

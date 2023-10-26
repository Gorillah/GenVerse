import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { userApiLimit } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { MAX_FREE_COUNTS } from "@/constants";

export const incrementApiLimit = async () => {
  const userId = auth().userId;
  if (!userId) return;

  const apiLimit = await db
    .select()
    .from(userApiLimit)
    .where(eq(userApiLimit.userId, userId));
  if (apiLimit[0]) {
    const newLimit = apiLimit[0].apiLimit + 1;
    const res = await db
      .update(userApiLimit)
      .set({ apiLimit: newLimit })
      .where(eq(userApiLimit.userId, userId));
  } else {
    await db.insert(userApiLimit).values({
      userId,
      apiLimit: 1,
    });
  }
};

export const checkApiLimit = async () => {
  const userId = auth().userId;
  if (!userId) return;
  const apiCount = await db
    .select()
    .from(userApiLimit)
    .where(eq(userApiLimit.userId, userId));
  if (apiCount[0]?.apiLimit >= MAX_FREE_COUNTS) {
    return false;
  }
  return true;
};

export const getApiLimitCount = async () => {
  const userId = auth().userId;
  if (!userId) return;
  const apiCount = await db
    .select()
    .from(userApiLimit)
    .where(eq(userApiLimit.userId, userId));
  if (!apiCount[0]) return 0;
  return apiCount[0]?.apiLimit;
};

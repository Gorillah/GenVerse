import { config } from "dotenv";
import Stripe from "stripe";
config({ path: `.env.local` });

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

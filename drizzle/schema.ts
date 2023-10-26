import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  primaryKey,
  int,
  varchar,
  datetime,
  unique,
  serial,
  timestamp,
  tinyint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const logos = mysqlTable(
  "logos",
  {
    id: int("id").autoincrement().notNull(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    dateGenerated: datetime("date_generated", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    logoUrl: varchar("logo_url", { length: 2500 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    logoPublicId: varchar("logo_public_id", { length: 255 }),
    logoFormat: varchar("logo_format", { length: 255 }),
  },
  (table) => {
    return {
      logosId: primaryKey(table.id),
    };
  }
);

export const userApiLimit = mysqlTable(
  "user_api_limit",
  {
    id: serial("id"),
    userId: varchar("user_id", { length: 255 }).notNull(),
    apiLimit: int("api_limit").notNull(),
    createdAt: datetime("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: datetime("updated_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (table) => {
    return {
      userApiLimitId: primaryKey(table.id),
      userApiLimitUserIdUnique: unique("user_api_limit_user_id_unique").on(
        table.userId
      ),
      userApiLimitUserIdUnique2: unique("user_api_limit_user_id_unique2").on(
        table.userId
      ),
    };
  }
);

export const userSubscriptions = mysqlTable(
  "user_subscriptions",
  {
    id: serial("id").notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).notNull(),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    stripePriceId: varchar("stripe_price_id", { length: 255 }),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end", {
      mode: "date",
    }),
    subscriptionPlan: varchar("subscription_plan", { length: 255 }).default(
      "free"
    ),
  },
  (table) => {
    return {
      userSubscriptionsId: primaryKey(table.id),
      userSubscriptionsUserIdUnique: unique(
        "user_subscriptions_user_id_unique"
      ).on(table.userId),
      userSubscriptionsStripeCustomerIdUnique: unique(
        "user_subscriptions_stripe_customer_id_unique"
      ).on(table.stripeCustomerId),
      userSubscriptionsStripeSubscriptionIdUnique: unique(
        "user_subscriptions_stripe_subscription_id_unique"
      ).on(table.stripeSubscriptionId),
    };
  }
);

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    dateCreated: datetime("date_created", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    credit: tinyint("credit").default(0),
  },
  (table) => {
    return {
      usersId: primaryKey(table.id),
      email: unique("email").on(table.email),
    };
  }
);

import Heading from "@/components/Heading";
import { Settings, Zap } from "lucide-react";
import React from "react";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/subscriptonButton";

export default async function page() {
  const isPro = (await checkSubscription()) || false;
  return (
    <div>
      <Heading
        label="Settings"
        description="Manage account"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm flex flex-col gap-4">
          {isPro
            ? "You are currently subscribed"
            : "You are currently on free plan"}
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </div>
  );
}

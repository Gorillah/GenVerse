"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import axios from "axios";

export function SubscriptionButton({ isPro }: { isPro: boolean }) {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button
        onClick={onClick}
        variant={isPro ? "default" : "premium"}
        className="flex gap-x-2"
        disabled={loading}
      >
        {isPro ? "Manage Subscription" : "Upgrade"}
        {!isPro && <Zap className="h-4 w-4" />}
      </Button>
    </div>
  );
}

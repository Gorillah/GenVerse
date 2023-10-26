"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/useProModal";
import { checkSubscription } from "@/lib/subscription";

export default function FreeCounter({
  apiLimitCount,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro?: boolean;
}) {
  const ProModal = useProModal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const progressValue = (apiLimitCount / MAX_FREE_COUNTS) * 100;
  if (isPro) return null;
  return (
    <div className="p-3">
      <Card className="bg-white/10 border-0">
        <CardContent>
          <div className="text-center text-sm text-white flex flex-col space-y-4 py-5 ">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={progressValue} />
          </div>
          <Button
            onClick={() => ProModal.onOpen()}
            className="w-full flex gap-x-2"
            variant={"premium"}
          >
            <span>Upgrade</span> <Zap className="w-4 h-4 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

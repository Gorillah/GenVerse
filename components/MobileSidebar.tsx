"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export default function MobileSidebar({
  apiLimitCount,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro?: boolean;
}) {
  // FIX REHYDRATION
  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger className="md:hidden relative w-8 h-8">
        <Menu className="w-full h-full" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
}

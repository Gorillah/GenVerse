import React from "react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function Navbar({ isPro = false }: { isPro?: boolean }) {
  const apiLimitCount = (await getApiLimitCount()) || 0;
  return (
    <div className="flex items-center p-4 justify-between h-16">
      <div>
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPro = await checkSubscription();
  const apiLimitCount = (await getApiLimitCount()) || 0;
  return (
    <div className="h-full relative">
      <Navbar isPro={isPro} />
      <div className=" h-full hidden md:flex md:flex-col md:fixed md:inset-y-0 w-72">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72 py-8">{children}</main>
    </div>
  );
}

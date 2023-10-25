import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <Navbar />
      <div className=" h-full hidden md:flex md:flex-col md:fixed md:inset-y-0 z-[80] w-72">
        <Sidebar />
      </div>
      <main className="md:pl-72 py-8">{children}</main>
    </div>
  );
}

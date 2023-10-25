"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Code,
  Codesandbox,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: " text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: " text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: " text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: " text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: " text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: " text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#020617] flex-1 p-4">
      <div className="px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-1 mb-14">
          <div className="relative w-8 h-8 mr-4 flex justify-center items-center">
            <Codesandbox color="white" size={60} />
          </div>
          <h1
            className={cn(
              "text-2xl font-bold text-white",
              montserrat.className
            )}
          >
            GenVerse
          </h1>
        </Link>
      </div>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={cn(
              "flex items-center px-3 py-3 text-sm group font-medium cursor-pointer rounded-lg text-white",
              "hover:bg-slate-600",
              pathname === route.href && "bg-slate-800"
            )}
          >
            <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

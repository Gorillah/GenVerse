"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Codesandbox } from "lucide-react";

const font = Montserrat({ subsets: ["latin"], weight: ["600"] });

export default function LandingNavbar() {
  const { isSignedIn } = useAuth();
  return (
    <div className="p-4 bg-transparent flex items-center justify-between">
      <Link href={"/"} className="flex items-center flex-col">
        <div className="flex">
          <div className="relative h-10 w-10 mr-2 flex justify-center items-center">
            <Codesandbox color="white" size={60} />
          </div>
          <h1 className={cn("text-2xl font-bold text-white", font.className)}>
            GenVerse
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant={"outline"} className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <div className="flex items-center p-4 justify-between h-16">
      <div>
        <MobileSidebar />
      </div>
      <div>
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  );
}

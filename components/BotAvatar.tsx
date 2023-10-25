import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

type Props = {};

export default function BotAvatar({}: Props) {
  return (
    <div>
      <Avatar className="h-10 w-10 bg-slate-300 flex justify-center items-center">
        <Bot />
      </Avatar>
    </div>
  );
}

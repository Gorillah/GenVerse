import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-y-4">
      <div className="relative animate-spin ">
        <Loader2 size={50}/>
      </div>
      <p className="text-sm text-muted-foreground text-center">Loading</p>
    </div>
  );
}

import Image from "next/image";
import React from "react";

interface EmptyProps {
  label: string;
}

export default function Empty({ label }: EmptyProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center p-8">
      <div className="relative w-72 h-72">
        <Image src="/empty.png" alt="empty" fill />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export function CrispChat() {
  useEffect(() => {
    Crisp.configure("6316a217-2181-4b93-bc7a-6835654efb4d");
  }, []);
  return null;
}

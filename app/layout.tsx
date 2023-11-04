import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import ModalProvider from "@/components/ModalProvider";
import CrispProvider from "@/components/CrispProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenVerse",
  description: "Generated Image, Video, Music and more using AI!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <CrispProvider />
        <body className={(cn(inter.className), "bg-[#111827]")}>
          <ModalProvider />
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Devroast",
  description: "Devroast component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(jetbrainsMono.variable, "font-sans antialiased")}>
        <Navbar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

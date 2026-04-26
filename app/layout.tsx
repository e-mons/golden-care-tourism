import React from "react";
import { Inter, Playfair_Display as PlayfairFont } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AIChatWidget } from "@/components/ai-chat-widget";

const inter = Inter({ subsets: ["latin"] });
const playfair = PlayfairFont({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: { title: string; description: string } = {
  title: "Golden Care Tourism | Premium UAE Experiences",
  description: "Automated booking, fast-track visas, and luxury tours in the United Arab Emirates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body className={`${inter.className} ${playfair.variable} antialiased min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIChatWidget />
      </body>
    </html>
  );
}

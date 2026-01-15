import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DineDivine - 100% Free Social Casino Games",
  description:
    "DineDivine is the leading free-to-play entertainment platform for social casino games. Enjoy slots, dice, and wheels without any real money involvement.",
  keywords:
    "social casino, free to play, entertainment, games, slots, dice game, DineDivine",
  authors: [{ name: "DINEDIVINE VENTURES PRIVATE LIMITED" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.webp",
  },
  openGraph: {
    title: "DineDivine - 100% Free Social Casino Games",
    description:
      "The leading free-to-play entertainment platform for social casino games and social fun.",
    url: "https://www.dinedivinelive.com",
    siteName: "DineDivine",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0f1a] text-white`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

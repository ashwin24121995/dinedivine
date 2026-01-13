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
  title: "DineDivine - Free To Play Fantasy Sports Platform",
  description:
    "DineDivine is the leading free-to-play entertainment platform for fantasy sports and social fun. Play fantasy cricket and enjoy the thrill of the game without any real money involvement.",
  keywords:
    "fantasy sports, fantasy cricket, free to play, entertainment, games, DineDivine",
  authors: [{ name: "DINEDIVINE VENTURES PRIVATE LIMITED" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.webp",
  },
  openGraph: {
    title: "DineDivine - Free To Play Fantasy Sports Platform",
    description:
      "The leading free-to-play entertainment platform for fantasy sports and social fun.",
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

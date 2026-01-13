'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdBanner = pathname === "/adbanner";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdBanner && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdBanner && <Footer />}
    </div>
  );
}

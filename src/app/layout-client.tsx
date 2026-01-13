'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PromoWidget } from "@/components/PromoWidget";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdBanner = pathname === "/adbanner";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdBanner && <PromoWidget />}
      {!isAdBanner && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdBanner && <Footer />}
    </div>
  );
}

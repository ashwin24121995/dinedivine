'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AdBannerPage() {
  const whatsappLink = "http://wa.link/redypromo";

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
      <Link 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-screen flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-4xl mx-auto">
          <Image
            src="/promo-banner.webp"
            alt="Promotional Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </div>
  );
}

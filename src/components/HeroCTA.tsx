"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroCTA() {
  return null; // Buttons removed for Google Ads compliance
}

export function BottomCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setIsLoggedIn(data.success && data.user);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="w-48 h-14 bg-[#1a2332]/20 animate-pulse rounded-xl mx-auto"></div>
    );
  }

  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard/matches"
        className="inline-flex items-center justify-center gap-2 bg-[#1a2332] text-[#16a34a] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#1a2332] transition-all duration-300 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Browse Matches
      </Link>
    );
  }

  return (
    <Link
      href="/register"
      className="inline-flex items-center justify-center gap-2 bg-[#1a2332] text-[#16a34a] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#1a2332] transition-all duration-300 shadow-lg"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
      Create Free Account
    </Link>
  );
}

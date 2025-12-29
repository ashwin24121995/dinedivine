"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="w-48 h-14 bg-[#1a2332]/20 animate-pulse rounded-xl"></div>
        <div className="w-48 h-14 bg-[#1a2332]/10 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-[#22c55e]/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Dashboard
        </Link>
      ) : (
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-[#22c55e]/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Start Playing Free
        </Link>
      )}
      <Link
        href="/how-to-play"
        className="inline-flex items-center justify-center gap-2 bg-[#1a2332]/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#1a2332]/20 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Learn How To Play
      </Link>
    </div>
  );
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

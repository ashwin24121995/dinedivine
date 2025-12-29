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
        <div className="bg-white/50 text-green-700 px-8 py-3 rounded-lg font-semibold text-lg animate-pulse">
          Loading...
        </div>
        <Link
          href="/how-to-play"
          className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200 text-lg"
        >
          Learn How To Play
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 text-lg"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          href="/register"
          className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 text-lg"
        >
          Get Started - It&apos;s Free!
        </Link>
      )}
      <Link
        href="/how-to-play"
        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200 text-lg"
      >
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
      <div className="bg-white/50 text-green-700 px-8 py-3 rounded-lg font-semibold text-lg inline-block animate-pulse">
        Loading...
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard/matches"
        className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 text-lg inline-block"
      >
        Browse Matches
      </Link>
    );
  }

  return (
    <Link
      href="/register"
      className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 text-lg inline-block"
    >
      Create Free Account
    </Link>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AuthAwareCTAProps {
  // Text to show when logged out
  loggedOutText: string;
  loggedOutHref: string;
  // Text to show when logged in
  loggedInText: string;
  loggedInHref: string;
  // Styling
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function AuthAwareCTA({
  loggedOutText,
  loggedOutHref,
  loggedInText,
  loggedInHref,
  variant = "primary",
  className = "",
}: AuthAwareCTAProps) {
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

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#1a2332] text-green-700 hover:bg-green-50";
      case "secondary":
        return "bg-green-600 text-white hover:bg-green-700";
      case "outline":
        return "border-2 border-white text-white hover:bg-[#1a2332] hover:text-green-700";
      default:
        return "bg-[#1a2332] text-green-700 hover:bg-green-50";
    }
  };

  const baseClasses = `px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-lg inline-block ${getVariantClasses()} ${className}`;

  if (isLoading) {
    return (
      <span className={`${baseClasses} opacity-50 cursor-wait`}>
        Loading...
      </span>
    );
  }

  if (isLoggedIn) {
    return (
      <Link href={loggedInHref} className={baseClasses}>
        {loggedInText}
      </Link>
    );
  }

  return (
    <Link href={loggedOutHref} className={baseClasses}>
      {loggedOutText}
    </Link>
  );
}

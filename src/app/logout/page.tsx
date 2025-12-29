"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [logoutComplete, setLogoutComplete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const performLogout = async () => {
      try {
        // API call will be implemented when backend is connected
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Logout failed");
        }

        // Clear any local storage or session data
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          sessionStorage.clear();
        }

        setLogoutComplete(true);
      } catch (err) {
        // Even if API fails, clear local data and show success
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          sessionStorage.clear();
        }
        setLogoutComplete(true);
        // Optionally log the error but don't show to user
        console.error("Logout error:", err);
      } finally {
        setIsLoggingOut(false);
      }
    };

    performLogout();
  }, []);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-bold text-green-600">DineDivine</span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1a2332] py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
          {isLoggingOut ? (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Logging you out...
              </h2>
              <p className="text-gray-300">
                Please wait while we securely log you out.
              </p>
            </div>
          ) : logoutComplete ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                You&apos;ve been logged out
              </h2>
              <p className="text-gray-300 mb-8">
                Thank you for using DineDivine. We hope to see you again soon!
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleLogin}
                  className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                >
                  Sign In Again
                </button>
                <button
                  onClick={handleGoHome}
                  className="w-full py-3 px-4 border-2 border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-[#1a2332] hover:bg-[#0a0f1a] transition-colors duration-200"
                >
                  Go to Homepage
                </button>
              </div>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Logout Error
              </h2>
              <p className="text-gray-300 mb-8">{error}</p>

              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                >
                  Try Again
                </button>
                <button
                  onClick={handleGoHome}
                  className="w-full py-3 px-4 border-2 border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-[#1a2332] hover:bg-[#0a0f1a] transition-colors duration-200"
                >
                  Go to Homepage
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Info Box */}
        {logoutComplete && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 mx-4 sm:mx-0">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  For your security, please close this browser window if you are
                  using a shared computer.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        {logoutComplete && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300 mb-4">Quick Links</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/about"
                className="text-sm text-green-600 hover:text-green-500"
              >
                About Us
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/how-to-play"
                className="text-sm text-green-600 hover:text-green-500"
              >
                How To Play
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/contact"
                className="text-sm text-green-600 hover:text-green-500"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

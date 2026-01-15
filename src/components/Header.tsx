"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
  mobile: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/";
    } catch {
      console.error("Logout failed");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/how-to-play", label: "How To Play" },
    { href: "/responsible-gaming", label: "Responsible Gaming" },
    { href: "/fair-play", label: "Fair Play" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-[#0a0f1a]/95 backdrop-blur-md border-b border-[#22c55e]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/favicon.webp"
                alt="DineDivine"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-[#22c55e]">
                DineDivine
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#22c55e] font-medium transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoading ? (
              <div className="w-20 h-8 bg-gray-700 animate-pulse rounded-lg"></div>
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[#22c55e] hover:text-[#4ade80] font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-900/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-900/30 border border-red-500/30 font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#22c55e] hover:text-[#4ade80] font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-[#22c55e]/30 font-medium transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-[#22c55e] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 bg-[#111827] rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[#22c55e] font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-[#22c55e] hover:text-[#4ade80] font-medium py-2 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="bg-red-900/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-900/30 border border-red-500/30 font-medium text-center transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-[#22c55e] hover:text-[#4ade80] font-medium py-2 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white px-4 py-2 rounded-lg hover:shadow-lg font-medium text-center transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

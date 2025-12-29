import Link from "next/link";
import LiveMatchesSection from "@/components/LiveMatchesSection";
import UpcomingMatchesSection from "@/components/UpcomingMatchesSection";
import CompletedMatchesSection from "@/components/CompletedMatchesSection";
import HeroCTA, { BottomCTA } from "@/components/HeroCTA";

export const revalidate = 60; // Revalidate every 60 seconds

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to DineDivine
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            The Leading Entertainment Platform for Games & Social Fun. Play
            fantasy cricket and enjoy the thrill of the game!
          </p>
          <HeroCTA />
        </div>
      </section>

      {/* Live Matches Section - Auto-updates every 3 seconds using eCricScore API */}
      <LiveMatchesSection refreshInterval={3000} />

      {/* Upcoming Matches Section - Uses eCricScore API with ms="fixture" filter */}
      <UpcomingMatchesSection limit={6} />

      {/* Completed Matches Section - Uses eCricScore API with ms="result" filter */}
      <CompletedMatchesSection limit={6} />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose DineDivine?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                100% Free To Play
              </h3>
              <p className="text-gray-600">
                Enjoy fantasy sports without spending a single rupee. Pure
                entertainment, zero cost.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time Updates
              </h3>
              <p className="text-gray-600">
                Get live scores, match updates, and real-time statistics as the
                action unfolds.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Social Fun
              </h3>
              <p className="text-gray-600">
                Compete with friends, join contests, and be part of a vibrant
                community of cricket fans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a Match
              </h3>
              <p className="text-gray-600">
                Choose from upcoming cricket matches
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Build Your Team
              </h3>
              <p className="text-gray-600">
                Pick your dream team of 11 players
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Join Contests
              </h3>
              <p className="text-gray-600">
                Enter free contests and compete with others
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Track & Enjoy
              </h3>
              <p className="text-gray-600">
                Watch live scores and enjoy the game
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Playing?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans who are already enjoying the thrill
            of fantasy cricket on DineDivine.
          </p>
          <BottomCTA />
        </div>
      </section>
    </div>
  );
}

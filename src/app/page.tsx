import Image from "next/image";
import Link from "next/link";
import LiveMatchesSection from "@/components/LiveMatchesSection";
import UpcomingMatchesSection from "@/components/UpcomingMatchesSection";
import CompletedMatchesSection from "@/components/CompletedMatchesSection";
import HeroCTA, { BottomCTA } from "@/components/HeroCTA";

export const revalidate = 60; // Revalidate every 60 seconds

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Fantasy Cricket Stadium"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0a0f1a]/70 to-[#0a0f1a]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/logo-full.png"
              alt="DineDivine Logo"
              width={300}
              height={120}
              className="mx-auto"
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            <span className="text-[#22c55e]">Fantasy Cricket</span> Reimagined
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Build your dream team, compete with friends, and experience the thrill of fantasy cricket - 
            <span className="text-[#22c55e] font-semibold"> 100% Free to Play!</span>
          </p>
          <HeroCTA />
          
          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#22c55e]">100+</div>
              <div className="text-gray-400 text-sm mt-1">Live Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#22c55e]">Free</div>
              <div className="text-gray-400 text-sm mt-1">To Play</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#22c55e]">24/7</div>
              <div className="text-gray-400 text-sm mt-1">Live Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <LiveMatchesSection refreshInterval={3000} />

      {/* Upcoming Matches Section */}
      <UpcomingMatchesSection limit={6} />

      {/* Features Section */}
      <section className="py-20 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Why Choose <span className="text-[#22c55e]">DineDivine</span>?
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Experience the ultimate fantasy cricket platform with cutting-edge features
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Build Your Team */}
            <div className="bg-[#1a2332] p-8 rounded-2xl border border-[#22c55e]/20 hover:border-[#22c55e]/50 transition-all duration-300 group">
              <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/feature-team.png"
                  alt="Build Your Team"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Build Your Dream Team
              </h3>
              <p className="text-gray-400">
                Select from real players, assign captain & vice-captain, and create your winning fantasy XI within the budget.
              </p>
            </div>

            {/* Feature 2: Join Contests */}
            <div className="bg-[#1a2332] p-8 rounded-2xl border border-[#22c55e]/20 hover:border-[#22c55e]/50 transition-all duration-300 group">
              <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/feature-contest.png"
                  alt="Join Contests"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Compete & Win
              </h3>
              <p className="text-gray-400">
                Join free contests, compete on leaderboards, and prove your cricket knowledge against other fans.
              </p>
            </div>

            {/* Feature 3: Live Tracking */}
            <div className="bg-[#1a2332] p-8 rounded-2xl border border-[#22c55e]/20 hover:border-[#22c55e]/50 transition-all duration-300 group">
              <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/feature-live.png"
                  alt="Live Tracking"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Real-Time Updates
              </h3>
              <p className="text-gray-400">
                Track live scores, player performance, and fantasy points as the match unfolds in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Matches Section */}
      <CompletedMatchesSection limit={6} />

      {/* How It Works Section */}
      <section className="py-20 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            How It <span className="text-[#22c55e]">Works</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Get started in just 4 simple steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-[#22c55e]/30">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Select a Match
              </h3>
              <p className="text-gray-400">
                Choose from upcoming cricket matches across all major leagues
              </p>
              {/* Connector line */}
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#22c55e]/50 to-transparent"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-[#22c55e]/30">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Build Your Team
              </h3>
              <p className="text-gray-400">
                Pick your dream team of 11 players within the budget
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#22c55e]/50 to-transparent"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-[#22c55e]/30">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Join Contests
              </h3>
              <p className="text-gray-400">
                Enter free contests and compete with other cricket fans
              </p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#22c55e]/50 to-transparent"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg shadow-[#22c55e]/30">
                4
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Track & Enjoy
              </h3>
              <p className="text-gray-400">
                Watch live scores and enjoy the thrill of fantasy cricket
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#16a34a] to-[#22c55e]"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] opacity-10 bg-cover bg-center"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Playing?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of cricket fans who are already enjoying the thrill
            of fantasy cricket on DineDivine.
          </p>
          <BottomCTA />
        </div>
      </section>
    </div>
  );
}

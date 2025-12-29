import { Metadata } from "next";
import Link from "next/link";
import AuthAwareCTA from "@/components/AuthAwareCTA";

export const metadata: Metadata = {
  title: "Fantasy Cricket - DineDivine",
  description:
    "Discover fantasy cricket on DineDivine. Learn about our free-to-play fantasy cricket platform, game formats, and how to showcase your cricket knowledge.",
};

export default function FantasyCricketPage() {
  const formats = [
    {
      title: "T20 Matches",
      description:
        "Fast-paced 20-over matches where every ball counts. Perfect for quick fantasy contests with high-scoring action.",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
    },
    {
      title: "ODI Matches",
      description:
        "Classic 50-over format that tests consistency and endurance. Build balanced teams for sustained performance.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Test Matches",
      description:
        "The ultimate test of cricket knowledge. Multi-day contests that reward patience and strategic thinking.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "Real-Time Scoring",
      description:
        "Watch your fantasy points update in real-time as the match progresses. Every run, wicket, and catch is reflected instantly.",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      title: "Multiple Teams",
      description:
        "Create multiple fantasy teams for the same match. Experiment with different strategies and player combinations.",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      title: "Live Leaderboards",
      description:
        "Track your position on the leaderboard throughout the match. See how you stack up against other fantasy players.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Player Statistics",
      description:
        "Access detailed player statistics and recent form to make informed decisions when building your fantasy team.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "Free Contests",
      description:
        "All contests on DineDivine are completely free to join. No entry fees, no hidden charges - just pure entertainment.",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      title: "Easy Team Management",
      description:
        "Intuitive interface makes it easy to create, edit, and manage your fantasy teams before the match deadline.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fantasy Cricket
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Experience the thrill of cricket like never before. Build your dream
            team, showcase your cricket knowledge, and compete with fans across
            India - all for free!
          </p>
        </div>
      </section>

      {/* What is Fantasy Cricket */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                What is Fantasy Cricket?
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Fantasy cricket is an online game where you become the team
                manager. You select real cricket players to form your virtual
                team, and earn points based on how those players perform in
                actual matches.
              </p>
              <p className="text-gray-400 mb-4 leading-relaxed">
                It&apos;s a game of skill that rewards your cricket knowledge,
                analytical abilities, and understanding of the sport. The better
                you know the players, pitch conditions, and match dynamics, the
                better your fantasy team will perform.
              </p>
              <p className="text-gray-400 leading-relaxed">
                On DineDivine, fantasy cricket is completely free to play. We
                believe that the joy of the game should be accessible to
                everyone, without any financial barriers. Create your team,
                join contests, and enjoy the excitement of fantasy cricket!
              </p>
            </div>
            <div className="bg-[#22c55e]/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-green-800 mb-6">
                Key Highlights
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-0.5"
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
                  <span className="text-gray-300">
                    100% free to play - no entry fees or hidden charges
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-0.5"
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
                  <span className="text-gray-300">
                    Real-time scoring based on actual match performances
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-0.5"
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
                  <span className="text-gray-300">
                    Cover all major cricket tournaments and leagues
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-0.5"
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
                  <span className="text-gray-300">
                    Compete with cricket fans from across India
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-0.5"
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
                  <span className="text-gray-300">
                    Pure entertainment with no gambling or real money
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Match Formats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Supported Match Formats
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Play fantasy cricket across all major formats. Each format offers a
            unique challenge and requires different strategies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formats.map((format) => (
              <div
                key={format.title}
                className="bg-[#1a2332] p-8 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-[#22c55e]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#22c55e]">
                  {format.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {format.title}
                </h3>
                <p className="text-gray-400">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Platform Features
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            DineDivine offers a comprehensive fantasy cricket experience with
            features designed to enhance your gameplay.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="w-12 h-12 bg-[#22c55e]/20 rounded-lg flex items-center justify-center flex-shrink-0 text-[#22c55e]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Fantasy Points Work */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            How Fantasy Points Work
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Your fantasy team earns points based on the real-world performance
            of your selected players during the match.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-[#22c55e] mb-4">Batting</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Runs scored</li>
                <li>Boundaries (4s and 6s)</li>
                <li>Half-centuries and centuries</li>
                <li>Strike rate bonuses</li>
              </ul>
            </div>
            <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-[#22c55e] mb-4">Bowling</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Wickets taken</li>
                <li>Maiden overs</li>
                <li>Economy rate bonuses</li>
                <li>Multi-wicket hauls</li>
              </ul>
            </div>
            <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-[#22c55e] mb-4">
                Fielding
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Catches taken</li>
                <li>Stumpings</li>
                <li>Run outs (direct/indirect)</li>
              </ul>
            </div>
            <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-[#22c55e] mb-4">Bonus</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Captain: 2x points</li>
                <li>Vice-Captain: 1.5x points</li>
                <li>Player of the Match</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Covered Tournaments
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Play fantasy cricket for all major international and domestic
            cricket tournaments.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "International T20s",
              "International ODIs",
              "Test Matches",
              "IPL",
              "World Cup",
              "Asia Cup",
            ].map((tournament) => (
              <div
                key={tournament}
                className="bg-[#22c55e]/10 border border-green-200 p-4 rounded-lg text-center"
              >
                <span className="text-green-800 font-medium text-sm">
                  {tournament}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#22c55e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Fantasy Cricket Journey
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join DineDivine today and experience the excitement of fantasy
            cricket. It&apos;s free, it&apos;s fun, and it&apos;s waiting for
            you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuthAwareCTA
              loggedOutText="Create Free Account"
              loggedOutHref="/register"
              loggedInText="Browse Matches"
              loggedInHref="/dashboard/matches"
              variant="primary"
            />
            <Link
              href="/how-to-play"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#22c55e] transition-colors duration-200 text-lg"
            >
              Learn How To Play
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-yellow-800 text-sm">
            <strong>Note:</strong> DineDivine is a free-to-play fantasy sports
            platform for entertainment purposes only. No real money is involved
            in playing fantasy cricket on our platform. Users must be 18+ years
            old. Not available in Telangana, Andhra Pradesh, Assam, and Odisha.
          </p>
        </div>
      </section>
    </div>
  );
}

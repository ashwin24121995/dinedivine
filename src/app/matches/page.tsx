import { getCurrentMatches, getMatches } from "@/lib/cricketApi";
import MatchCard from "@/components/MatchCard";
import LiveMatchesSection from "@/components/LiveMatchesSection";
import { isMatchLive, isMatchUpcoming, isMatchCompleted } from "@/lib/types";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Matches - DineDivine",
  description: "View all current, upcoming, and completed cricket matches on DineDivine",
};

export default async function MatchesPage() {
  // Fetch matches from both endpoints for comprehensive data
  const [currentMatches, fixtureMatches] = await Promise.all([
    getCurrentMatches(),
    getMatches(),
  ]);

  // Combine and deduplicate matches
  const allMatchesMap = new Map();
  [...currentMatches, ...fixtureMatches].forEach((match) => {
    if (!allMatchesMap.has(match.id)) {
      allMatchesMap.set(match.id, match);
    }
  });
  const allMatches = Array.from(allMatchesMap.values());

  // Categorize matches using proper status checks
  const liveMatches = allMatches.filter((m) => isMatchLive(m));
  const upcomingMatches = allMatches.filter((m) => isMatchUpcoming(m));
  const completedMatches = allMatches.filter((m) => isMatchCompleted(m));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Cricket Matches</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Stay updated with real-time cricket matches from around the world. 
            All times are displayed in IST (Indian Standard Time).
          </p>
        </div>
      </div>

      {/* Live Matches Section - Auto-updates every 3 seconds */}
      <LiveMatchesSection initialMatches={liveMatches} refreshInterval={3000} />

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Matches</h2>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {upcomingMatches.length} Upcoming
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Completed Matches */}
      {completedMatches.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Completed Matches</h2>
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {completedMatches.length} Completed
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Matches */}
      {allMatches.length === 0 && (
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg
                className="w-20 h-20 text-gray-400 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Matches Available
              </h3>
              <p className="text-gray-600">
                Check back later for upcoming cricket matches.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

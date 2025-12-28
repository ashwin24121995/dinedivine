import LiveMatchesSection from "@/components/LiveMatchesSection";
import UpcomingMatchesSection from "@/components/UpcomingMatchesSection";
import CompletedMatchesSection from "@/components/CompletedMatchesSection";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Matches - DineDivine",
  description: "View all current, upcoming, and completed cricket matches on DineDivine",
};

export default function MatchesPage() {
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

      {/* Live Matches Section - Auto-updates every 3 seconds using eCricScore API */}
      <LiveMatchesSection refreshInterval={3000} />

      {/* Upcoming Matches Section - Uses eCricScore API with ms="fixture" filter */}
      <UpcomingMatchesSection limit={12} />

      {/* Completed Matches Section - Uses eCricScore API with ms="result" filter */}
      <CompletedMatchesSection limit={12} />
    </div>
  );
}

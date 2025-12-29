"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Contest {
  id: number;
  match_id: string;
  name: string;
  contest_name?: string;
  match_name?: string;
  series_name?: string;
  team1_name?: string;
  team2_name?: string;
  max_participants: number;
  current_participants: number;
  max_entries?: number;
  current_entries?: number;
  spots_left?: number;
  spots_filled_percent?: number;
  status: string;
}

export default function FeaturedContestsSection() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalContests: 0,
    totalParticipants: 0,
    activeMatches: 0,
  });

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const res = await fetch("/api/contests", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Contests API response:", data);

      if (data.success && data.contests && Array.isArray(data.contests)) {
        // Get unique match IDs
        const matchIds = [...new Set(data.contests.map((c: Contest) => c.match_id))];
        
        // Calculate stats - handle both old and new column names
        const totalParticipants = data.contests.reduce(
          (sum: number, c: Contest) => sum + (c.current_participants || c.current_entries || 0),
          0
        );

        setStats({
          totalContests: data.contests.length,
          totalParticipants,
          activeMatches: matchIds.length,
        });

        // Filter for upcoming/live contests and take top 6 (sorted by participants)
        const activeContests = data.contests.filter(
          (c: Contest) => c.status === "upcoming" || c.status === "live"
        );
        
        const topContests = activeContests
          .sort((a: Contest, b: Contest) => {
            const aParticipants = a.current_participants || a.current_entries || 0;
            const bParticipants = b.current_participants || b.current_entries || 0;
            return bParticipants - aParticipants;
          })
          .slice(0, 6)
          .map((contest: Contest) => ({
            ...contest,
            // Normalize field names
            max_participants: contest.max_participants || contest.max_entries || 100,
            current_participants: contest.current_participants || contest.current_entries || 0,
            spots_left: contest.spots_left || ((contest.max_entries || contest.max_participants || 100) - (contest.current_entries || contest.current_participants || 0)),
            spots_filled_percent: contest.spots_filled_percent || Math.round(((contest.current_entries || contest.current_participants || 0) / (contest.max_entries || contest.max_participants || 100)) * 100),
          }));

        setContests(topContests);
        setError(null);
      } else {
        console.error("Invalid API response:", data);
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Error fetching contests:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch contests");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#0d1320]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#0d1320]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Contests
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join exciting free-to-play contests and compete with players from around the world
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-xl p-6 border border-[#22c55e]/30 text-center">
            <div className="text-4xl font-bold text-[#22c55e] mb-2">{stats.totalContests}+</div>
            <div className="text-gray-300">Active Contests</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-6 border border-blue-500/30 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">{stats.totalParticipants}+</div>
            <div className="text-gray-300">Total Participants</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl p-6 border border-purple-500/30 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">{stats.activeMatches}+</div>
            <div className="text-gray-300">Matches with Contests</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center py-8 mb-8 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={fetchContests}
              className="mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Contests Grid */}
        {contests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="bg-[#1a2332] rounded-xl border border-[#22c55e]/20 overflow-hidden hover:border-[#22c55e]/50 transition-all hover:shadow-lg hover:shadow-[#22c55e]/10"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      contest.status === "live" 
                        ? "bg-red-500/20 text-red-400 animate-pulse" 
                        : "bg-[#22c55e]/20 text-[#22c55e]"
                    }`}>
                      {contest.status === "live" ? "🔴 LIVE" : "FREE ENTRY"}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {contest.spots_left} spots left
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white mb-1">
                    {contest.name || contest.contest_name || "Contest"}
                  </h3>
                  
                  {/* Match Info */}
                  {(contest.team1_name && contest.team2_name) && (
                    <p className="text-gray-400 text-sm mb-3">
                      {contest.team1_name} vs {contest.team2_name}
                    </p>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>{contest.current_participants} joined</span>
                      <span>{contest.max_participants} max</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#22c55e] to-emerald-400 transition-all"
                        style={{ width: `${contest.spots_filled_percent}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/matches/${contest.match_id}/contests`}
                    className="block w-full text-center bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white py-3 rounded-lg font-medium transition-all"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : !error && (
          <div className="text-center py-12 bg-[#1a2332] rounded-xl border border-[#22c55e]/20 mb-8">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">No Contests Yet</h3>
            <p className="text-gray-400 mb-6">Browse matches to find contests to join!</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/dashboard/matches"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#22c55e] text-[#22c55e] rounded-lg font-medium hover:bg-[#22c55e]/10 transition-all"
          >
            View All Matches
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

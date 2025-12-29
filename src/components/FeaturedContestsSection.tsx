"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Contest {
  id: number;
  match_id: string;
  name: string;
  max_participants: number;
  current_participants: number;
  spots_left: number;
  spots_filled_percent: number;
  status: string;
}

interface Match {
  id: string;
  name: string;
  t1: string;
  t2: string;
  t1img: string;
  t2img: string;
  dateTimeGMT: string;
}

interface ContestWithMatch extends Contest {
  match?: Match;
}

export default function FeaturedContestsSection() {
  const [contests, setContests] = useState<ContestWithMatch[]>([]);
  const [loading, setLoading] = useState(true);
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
      // Fetch all upcoming contests
      const res = await fetch("/api/contests");
      const data = await res.json();

      if (data.success && data.contests) {
        // Get unique match IDs
        const matchIds = [...new Set(data.contests.map((c: Contest) => c.match_id))];
        
        // Calculate stats
        const totalParticipants = data.contests.reduce(
          (sum: number, c: Contest) => sum + c.current_participants,
          0
        );

        setStats({
          totalContests: data.contests.length,
          totalParticipants,
          activeMatches: matchIds.length,
        });

        // Take top 6 contests (sorted by participants)
        const topContests = data.contests
          .sort((a: Contest, b: Contest) => b.current_participants - a.current_participants)
          .slice(0, 6);

        setContests(topContests);
      }
    } catch (error) {
      console.error("Error fetching contests:", error);
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
                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded-full font-medium">
                      FREE ENTRY
                    </span>
                    <span className="text-gray-400 text-sm">
                      {contest.spots_left} spots left
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white mb-2">{contest.name}</h3>

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
        ) : (
          <div className="text-center py-12 bg-[#1a2332] rounded-xl border border-[#22c55e]/20">
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

"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

interface LeaderboardEntry {
  id: number;
  user_id: number;
  username: string;
  team_name: string;
  points: number;
  rank_position: number;
}

interface Contest {
  id: number;
  name: string;
  match_name: string;
  status: string;
  max_entries: number;
  current_entries: number;
}

export default function ContestLeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: contestId } = use(params);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [contestId]);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`/api/contests/${contestId}/leaderboard`);
      const data = await res.json();
      
      if (data.success) {
        setLeaderboard(data.leaderboard || []);
        setContest(data.contest);
        setUserRank(data.userRank);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/contests" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Contests
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
              {contest && (
                <>
                  <p className="text-gray-300 mt-1">{contest.name}</p>
                  <p className="text-gray-400 text-sm">{contest.match_name}</p>
                </>
              )}
            </div>
            {contest && (
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  contest.status === "completed" 
                    ? "bg-gray-500/20 text-gray-400"
                    : contest.status === "live"
                    ? "bg-red-500/20 text-red-400 animate-pulse"
                    : "bg-[#22c55e]/20 text-[#22c55e]"
                }`}>
                  {contest.status === "completed" ? "✓ Completed" : contest.status === "live" ? "🔴 LIVE" : "Upcoming"}
                </span>
                <p className="text-gray-400 text-sm mt-2">
                  {contest.current_entries} participants
                </p>
              </div>
            )}
          </div>
        </div>

        {/* User's Rank Card */}
        {userRank && (
          <div className="bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Your Position</p>
                <p className="text-3xl font-bold text-white">{getRankBadge(userRank.rank_position)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300 text-sm">Your Team</p>
                <p className="text-lg font-medium text-white">{userRank.team_name}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 text-sm">Your Points</p>
                <p className="text-3xl font-bold text-[#22c55e]">{userRank.points || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        {leaderboard.length > 0 ? (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#22c55e]/20">
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Rank</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Player</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Team</th>
                  <th className="text-right py-4 px-6 text-gray-400 font-medium">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr 
                    key={entry.id} 
                    className={`border-b border-[#22c55e]/10 ${
                      userRank && entry.user_id === userRank.user_id 
                        ? "bg-[#22c55e]/10" 
                        : "hover:bg-[#0a0f1a]/50"
                    }`}
                  >
                    <td className="py-4 px-6">
                      <span className={`font-bold ${
                        index < 3 ? "text-2xl" : "text-lg text-gray-300"
                      }`}>
                        {getRankBadge(entry.rank_position || index + 1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-white">{entry.username}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-300">{entry.team_name}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-bold text-lg text-[#22c55e]">{entry.points || 0}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">No Rankings Yet</h3>
            <p className="text-gray-300 mb-6">
              {contest?.status === "upcoming" 
                ? "Rankings will be available once the match starts."
                : "No participants in this contest yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

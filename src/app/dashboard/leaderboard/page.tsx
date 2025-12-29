"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LeaderboardEntry {
  rank: number;
  user_id: number;
  user_name: string;
  total_points: number;
  total_contests: number;
  total_wins: number;
  level: number;
  isCurrentUser: boolean;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"global" | "weekly" | "monthly">("global");
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [activeTab]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?type=${activeTab}`);
      const data = await res.json();
      
      if (data.success) {
        setLeaderboard(data.leaderboard);
        setCurrentUserRank(data.currentUserRank);
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

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-amber-900/30 text-amber-300";
    if (rank === 2) return "bg-[#1a2332] text-white";
    if (rank === 3) return "bg-orange-100 text-orange-800";
    return "bg-[#0a0f1a] text-gray-300";
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
          <p className="text-gray-300 mt-1">See how you rank against other players</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#1a2332] rounded-lg p-1 shadow-sm border border-[#22c55e]/20 w-fit">
          <button
            onClick={() => setActiveTab("global")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "global"
                ? "bg-[#22c55e] text-white"
                : "text-gray-300 hover:bg-[#1a2332]"
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "weekly"
                ? "bg-[#22c55e] text-white"
                : "text-gray-300 hover:bg-[#1a2332]"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "monthly"
                ? "bg-[#22c55e] text-white"
                : "text-gray-300 hover:bg-[#1a2332]"
            }`}
          >
            This Month
          </button>
        </div>

        {/* Current User Rank Card */}
        {currentUserRank && (
          <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1a2332]/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {currentUserRank.user_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-green-100 text-sm">Your Rank</p>
                  <p className="text-3xl font-bold">{getRankBadge(currentUserRank.rank)}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-green-100 text-sm">Points</p>
                  <p className="text-2xl font-bold">{currentUserRank.total_points}</p>
                </div>
                <div className="text-center">
                  <p className="text-green-100 text-sm">Contests</p>
                  <p className="text-2xl font-bold">{currentUserRank.total_contests}</p>
                </div>
                <div className="text-center">
                  <p className="text-green-100 text-sm">Wins</p>
                  <p className="text-2xl font-bold">{currentUserRank.total_wins}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
          </div>
        ) : leaderboard.length > 0 ? (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#22c55e]/20 text-sm font-medium text-gray-300 bg-[#0a0f1a]">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-2 text-center">Points</div>
              <div className="col-span-2 text-center">Contests</div>
              <div className="col-span-2 text-center">Wins</div>
            </div>
            {leaderboard.map((entry) => (
              <div
                key={entry.user_id}
                className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-50 items-center ${
                  entry.isCurrentUser ? "bg-[#22c55e]/10" : ""
                }`}
              >
                <div className="col-span-1">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankColor(entry.rank)}`}>
                    {entry.rank <= 3 ? getRankBadge(entry.rank) : entry.rank}
                  </span>
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {entry.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {entry.user_name}
                      {entry.isCurrentUser && (
                        <span className="ml-2 text-xs bg-[#22c55e]/20 text-[#22c55e] px-2 py-0.5 rounded-full">You</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-300">Level {entry.level}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center font-bold text-[#22c55e]">{entry.total_points}</div>
                <div className="col-span-2 text-center text-gray-300">{entry.total_contests}</div>
                <div className="col-span-2 text-center text-gray-300">{entry.total_wins}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">No Rankings Yet</h3>
            <p className="text-gray-300 mb-6">Join contests to appear on the leaderboard!</p>
            <Link
              href="/dashboard/matches"
              className="inline-block bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Playing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

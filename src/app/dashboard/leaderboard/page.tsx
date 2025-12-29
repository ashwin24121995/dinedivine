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
    if (rank === 1) return "bg-yellow-100 text-yellow-800";
    if (rank === 2) return "bg-gray-100 text-gray-800";
    if (rank === 3) return "bg-orange-100 text-orange-800";
    return "bg-gray-50 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-green-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
          <p className="text-gray-500 mt-1">See how you rank against other players</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 shadow-sm border border-gray-100 w-fit">
          <button
            onClick={() => setActiveTab("global")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "global"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "weekly"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "monthly"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            This Month
          </button>
        </div>

        {/* Current User Rank Card */}
        {currentUserRank && (
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : leaderboard.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-sm font-medium text-gray-500 bg-gray-50">
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
                  entry.isCurrentUser ? "bg-green-50" : ""
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
                    <p className="font-medium text-gray-800">
                      {entry.user_name}
                      {entry.isCurrentUser && (
                        <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">You</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">Level {entry.level}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center font-bold text-green-600">{entry.total_points}</div>
                <div className="col-span-2 text-center text-gray-600">{entry.total_contests}</div>
                <div className="col-span-2 text-center text-gray-600">{entry.total_wins}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Rankings Yet</h3>
            <p className="text-gray-500 mb-6">Join contests to appear on the leaderboard!</p>
            <Link
              href="/dashboard/matches"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Playing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserStats {
  total_contests_joined: number;
  total_teams_created: number;
  total_points_earned: number;
  total_wins: number;
  highest_score: number;
  current_streak: number;
  best_streak: number;
  level: number;
  xp_points: number;
}

interface User {
  id: number;
  email: string;
  fullName: string;
  mobile: string;
}

interface CricScoreMatch {
  id: string;
  t1: string;
  t2: string;
  t1s: string;
  t2s: string;
  t1img: string;
  t2img: string;
  matchType: string;
  status: string;
  ms: string;
  series: string;
  dateTimeGMT: string;
}

// Series known to have squad data available
const SERIES_WITH_SQUADS = [
  "Big Bash League",
  "International League T20",
  "Syed Mushtaq Ali",
  "BBL",
  "ILT20",
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [counts, setCounts] = useState({ teams: 0, contests: 0, unreadNotifications: 0 });
  const [upcomingMatches, setUpcomingMatches] = useState<CricScoreMatch[]>([]);
  const [liveMatches, setLiveMatches] = useState<CricScoreMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchMatches();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user info
      const userRes = await fetch("/api/auth/me");
      const userData = await userRes.json();
      
      if (!userData.success) {
        router.push("/login");
        return;
      }
      setUser(userData.user);

      // Fetch user stats
      const statsRes = await fetch("/api/user/stats");
      const statsData = await statsRes.json();
      
      if (statsData.success) {
        setStats(statsData.stats);
        setCounts(statsData.counts);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      // Fetch live matches first
      const liveRes = await fetch("/api/cricscore?status=live");
      const liveData = await liveRes.json();
      if (liveData.success && liveData.data) {
        setLiveMatches(liveData.data);
      }

      // Fetch upcoming matches (already sorted by time from API)
      const upcomingRes = await fetch("/api/cricscore?status=upcoming");
      const upcomingData = await upcomingRes.json();
      if (upcomingData.success && upcomingData.data) {
        setUpcomingMatches(upcomingData.data.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const formatDateIST = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeRemaining = (dateStr: string) => {
    const matchDate = new Date(dateStr);
    const now = new Date();
    const diff = matchDate.getTime() - now.getTime();

    if (diff <= 0) return "Starting soon";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const hasSquadAvailable = (series: string): boolean => {
    return SERIES_WITH_SQUADS.some(s => series.toLowerCase().includes(s.toLowerCase()));
  };

  const getXpProgress = () => {
    if (!stats) return 0;
    const xpForNextLevel = stats.level * 500;
    return Math.min((stats.xp_points / xpForNextLevel) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.fullName?.split(" ")[0]}!</h1>
              <p className="text-white/80 mt-1">Ready to play some fantasy cricket?</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="bg-[#1a2332]/20 rounded-lg px-4 py-2">
                <p className="text-sm text-white/80">Level</p>
                <p className="text-2xl font-bold">{stats?.level || 1}</p>
              </div>
              <div className="bg-[#1a2332]/20 rounded-lg px-4 py-2">
                <p className="text-sm text-white/80">XP Points</p>
                <p className="text-2xl font-bold">{stats?.xp_points || 0}</p>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-white/80 mb-1">
              <span>Level {stats?.level || 1}</span>
              <span>Level {(stats?.level || 1) + 1}</span>
            </div>
            <div className="w-full bg-[#1a2332]/20 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getXpProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a2332] rounded-xl shadow-sm p-6 border border-[#22c55e]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Teams Created</p>
                <p className="text-3xl font-bold text-white">{counts.teams}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏏</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-xl shadow-sm p-6 border border-[#22c55e]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contests Joined</p>
                <p className="text-3xl font-bold text-white">{counts.contests}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-xl shadow-sm p-6 border border-[#22c55e]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Points</p>
                <p className="text-3xl font-bold text-white">{stats?.total_points_earned || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-xl shadow-sm p-6 border border-[#22c55e]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Wins</p>
                <p className="text-3xl font-bold text-white">{stats?.total_wins || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/dashboard/matches"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
          >
            <span className="text-3xl mb-2 block">🏏</span>
            <h3 className="font-semibold">Play Now</h3>
            <p className="text-sm text-white/80">Select a match</p>
          </Link>

          <Link
            href="/dashboard/teams"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
          >
            <span className="text-3xl mb-2 block">👥</span>
            <h3 className="font-semibold">My Teams</h3>
            <p className="text-sm text-blue-100">View your teams</p>
          </Link>

          <Link
            href="/dashboard/contests"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
          >
            <span className="text-3xl mb-2 block">🎯</span>
            <h3 className="font-semibold">My Contests</h3>
            <p className="text-sm text-purple-100">Track contests</p>
          </Link>

          <Link
            href="/dashboard/leaderboard"
            className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
          >
            <span className="text-3xl mb-2 block">🏆</span>
            <h3 className="font-semibold">Leaderboard</h3>
            <p className="text-sm text-yellow-100">See rankings</p>
          </Link>
        </div>

        {/* Live Matches Section */}
        {liveMatches.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                Live Matches
              </h2>
              <Link href="/dashboard/live-scores" className="text-[#22c55e] hover:underline text-sm">
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveMatches.map((match) => (
                <Link 
                  key={match.id} 
                  href={`/dashboard/live-scores/${match.id}`}
                  className="bg-[#1a2332] rounded-xl shadow-sm border border-red-500/30 p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 truncate max-w-[60%]">{match.series}</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium animate-pulse">
                      LIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={match.t1img} alt={match.t1} className="w-8 h-8 rounded-full" onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }} />
                      <div>
                        <p className="font-semibold text-sm">{match.t1}</p>
                        <p className="text-[#22c55e] font-bold">{match.t1s || "-"}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">VS</span>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-semibold text-sm">{match.t2}</p>
                        <p className="text-[#22c55e] font-bold">{match.t2s || "-"}</p>
                      </div>
                      <img src={match.t2img} alt={match.t2} className="w-8 h-8 rounded-full" onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">{match.status}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Matches */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Upcoming Matches</h2>
            <Link href="/dashboard/matches" className="text-[#22c55e] hover:underline text-sm">
              View All →
            </Link>
          </div>
          {upcomingMatches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingMatches.map((match) => (
                <Link
                  key={match.id}
                  href={`/dashboard/matches/${match.id}`}
                  className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-4 hover:shadow-md transition-all hover:border-[#22c55e]/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 truncate max-w-[50%]">{match.series}</span>
                    <div className="flex items-center gap-1">
                      {hasSquadAvailable(match.series) && (
                        <span className="px-2 py-0.5 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded-full font-medium">
                          Squad Ready
                        </span>
                      )}
                      <span className="px-2 py-1 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded-full font-medium uppercase">
                        {match.matchType}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <img src={match.t1img} alt={match.t1} className="w-10 h-10 rounded-full" onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }} />
                      <p className="font-semibold text-sm">{match.t1}</p>
                    </div>
                    <span className="text-gray-400 text-sm">VS</span>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{match.t2}</p>
                      <img src={match.t2img} alt={match.t2} className="w-10 h-10 rounded-full" onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">{formatDateIST(match.dateTimeGMT)} IST</span>
                      <p className="text-xs text-[#22c55e] font-medium">
                        Starts in {getTimeRemaining(match.dateTimeGMT)}
                      </p>
                    </div>
                    <span className="text-[#22c55e] font-medium">Create Team →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-8 text-center">
              <p className="text-gray-500">No upcoming matches at the moment.</p>
            </div>
          )}
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Streak & Performance */}
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Your Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="font-medium">Current Streak</p>
                    <p className="text-sm text-gray-500">Days active</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-orange-500">{stats?.current_streak || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="font-medium">Best Streak</p>
                    <p className="text-sm text-gray-500">Personal record</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-yellow-500">{stats?.best_streak || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💯</span>
                  <div>
                    <p className="font-medium">Highest Score</p>
                    <p className="text-sm text-gray-500">In a single contest</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">{stats?.highest_score || 0}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/profile"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#22c55e]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">👤</span>
                  <span className="font-medium">Edit Profile</span>
                </div>
                <span className="text-[#22c55e]">→</span>
              </Link>
              <Link
                href="/dashboard/notifications"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#22c55e]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔔</span>
                  <span className="font-medium">Notifications</span>
                  {counts.unreadNotifications > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {counts.unreadNotifications}
                    </span>
                  )}
                </div>
                <span className="text-[#22c55e]">→</span>
              </Link>
              <Link
                href="/dashboard/player-stats"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#22c55e]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <span className="font-medium">Player Stats</span>
                </div>
                <span className="text-[#22c55e]">→</span>
              </Link>
              <Link
                href="/how-to-play"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#22c55e]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">❓</span>
                  <span className="font-medium">How to Play</span>
                </div>
                <span className="text-[#22c55e]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

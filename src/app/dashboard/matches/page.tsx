"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function MatchesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "live" | "completed">("upcoming");
  const [matches, setMatches] = useState<CricScoreMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchTypeFilter, setMatchTypeFilter] = useState("all");

  useEffect(() => {
    fetchMatches();
  }, [activeTab]);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cricscore?status=${activeTab}`);
      const data = await res.json();
      if (data.success && data.data) {
        setMatches(data.data);
      } else {
        setMatches([]);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDateIST = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
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

  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.t1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.t2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.series.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      matchTypeFilter === "all" ||
      match.matchType.toLowerCase() === matchTypeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  const matchTypes = [...new Set(matches.map((m) => m.matchType))];

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Select Match</h1>
          <p className="text-gray-400 mt-1">Choose a match to create your fantasy team</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#1a2332] rounded-lg p-1 shadow-sm border border-[#22c55e]/20 w-fit">
          <button
            onClick={() => setActiveTab("live")}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === "live"
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeTab === "live" ? "bg-white" : "bg-red-500"} animate-pulse`}></span>
            Live
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "upcoming"
                ? "bg-[#22c55e] text-white"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "completed"
                ? "bg-gray-600 text-white"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by team or series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-[#22c55e]/20 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
            />
          </div>
          <select
            value={matchTypeFilter}
            onChange={(e) => setMatchTypeFilter(e.target.value)}
            className="px-4 py-3 border border-[#22c55e]/20 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
          >
            <option value="all">All Formats</option>
            {matchTypes.map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Matches Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className={`bg-[#1a2332] rounded-xl shadow-sm border p-4 hover:shadow-md transition-all ${
                  activeTab === "live" ? "border-red-200" : "border-[#22c55e]/20 hover:border-green-300"
                }`}
              >
                {/* Match Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 truncate max-w-[50%]">{match.series}</span>
                  <div className="flex items-center gap-2">
                    {hasSquadAvailable(match.series) && activeTab === "upcoming" && (
                      <span className="px-2 py-0.5 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded-full font-medium">
                        Squad Ready
                      </span>
                    )}
                    <span className="px-2 py-1 bg-gray-100 text-gray-400 text-xs rounded-full font-medium uppercase">
                      {match.matchType}
                    </span>
                    {activeTab === "live" && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      src={match.t1img}
                      alt={match.t1}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
                    />
                    <div>
                      <p className="font-semibold text-white">{match.t1}</p>
                      {(activeTab === "live" || activeTab === "completed") && match.t1s && (
                        <p className="text-[#22c55e] font-bold">{match.t1s}</p>
                      )}
                    </div>
                  </div>

                  <div className="px-4">
                    <span className="text-gray-400 font-medium">VS</span>
                  </div>

                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <div className="text-right">
                      <p className="font-semibold text-white">{match.t2}</p>
                      {(activeTab === "live" || activeTab === "completed") && match.t2s && (
                        <p className="text-[#22c55e] font-bold">{match.t2s}</p>
                      )}
                    </div>
                    <img
                      src={match.t2img}
                      alt={match.t2}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
                    />
                  </div>
                </div>

                {/* Status / Time */}
                {activeTab === "upcoming" ? (
                  <div className="flex items-center justify-between pt-3 border-t border-[#22c55e]/20">
                    <div>
                      <p className="text-sm text-gray-400">{formatDateIST(match.dateTimeGMT)} IST</p>
                      <p className="text-xs text-[#22c55e] font-medium">
                        Starts in {getTimeRemaining(match.dateTimeGMT)}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/matches/${match.id}/create-team`}
                      className="bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Create Team
                    </Link>
                  </div>
                ) : activeTab === "live" ? (
                  <div className="pt-3 border-t border-[#22c55e]/20">
                    <p className="text-sm text-center text-gray-400">{match.status}</p>
                    <div className="flex gap-2 mt-3">
                      <Link
                        href={`/dashboard/live-scores/${match.id}`}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                      >
                        Watch Live
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#22c55e]/20">
                    <p className="text-sm text-center text-gray-400">{match.status}</p>
                    <Link
                      href={`/dashboard/matches/${match.id}/results`}
                      className="block mt-3 bg-gray-100 hover:bg-gray-200 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                    >
                      View Results
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
            <p className="text-gray-400 text-lg">
              {activeTab === "upcoming"
                ? "No upcoming matches at the moment."
                : activeTab === "live"
                ? "No live matches right now."
                : "No completed matches to show."}
            </p>
            <p className="text-gray-400 text-sm mt-2">Check back later for more matches!</p>
          </div>
        )}

        {/* Match Count */}
        {!loading && filteredMatches.length > 0 && (
          <p className="text-center text-gray-400 text-sm mt-6">
            Showing {filteredMatches.length} {activeTab} match{filteredMatches.length !== 1 ? "es" : ""}
          </p>
        )}
      </div>
    </div>
  );
}

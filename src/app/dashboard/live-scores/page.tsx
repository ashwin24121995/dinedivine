"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function LiveScoresPage() {
  const [liveMatches, setLiveMatches] = useState<CricScoreMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchLiveMatches();
    
    // Auto-refresh every 3 seconds
    const interval = setInterval(() => {
      fetchLiveMatches();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchLiveMatches = async () => {
    try {
      const res = await fetch("/api/cricscore?status=live");
      const data = await res.json();
      
      if (data.success && data.data) {
        setLiveMatches(data.data);
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching live matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-3 h-3 bg-red-900/200 rounded-full animate-pulse"></span>
                Live Scores
              </h1>
              <p className="text-gray-300 mt-1">Real-time cricket match updates</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Last updated</p>
              <p className="font-medium text-gray-300">{formatTime(lastUpdated)} IST</p>
            </div>
          </div>
        </div>

        {/* Auto-refresh indicator */}
        <div className="bg-[#22c55e]/10 border border-green-500/30 rounded-lg p-3 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#22c55e]/100 rounded-full animate-pulse"></div>
          <span className="text-[#22c55e] text-sm">Auto-refreshing every 3 seconds</span>
        </div>

        {/* Live Matches */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
          </div>
        ) : liveMatches.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {liveMatches.map((match) => (
              <div
                key={match.id}
                className="bg-[#1a2332] rounded-xl shadow-sm border-2 border-red-500/30 p-6 hover:shadow-md transition-all"
              >
                {/* Match Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-300 truncate max-w-[60%]">{match.series}</span>
                  <span className="px-3 py-1 bg-red-900/30 text-red-600 text-sm rounded-full font-medium animate-pulse">
                    🔴 LIVE
                  </span>
                </div>

                {/* Teams & Scores */}
                <div className="space-y-4">
                  {/* Team 1 */}
                  <div className="flex items-center justify-between p-3 bg-[#0a0f1a] rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={match.t1img}
                        alt={match.t1}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
                      />
                      <span className="font-semibold text-white">{match.t1}</span>
                    </div>
                    <span className="text-2xl font-bold text-[#22c55e]">{match.t1s || "-"}</span>
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center justify-between p-3 bg-[#0a0f1a] rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={match.t2img}
                        alt={match.t2}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/placeholder-team.png'; }}
                      />
                      <span className="font-semibold text-white">{match.t2}</span>
                    </div>
                    <span className="text-2xl font-bold text-[#22c55e]">{match.t2s || "-"}</span>
                  </div>
                </div>

                {/* Match Status */}
                <div className="mt-4 pt-4 border-t border-[#22c55e]/20">
                  <p className="text-center text-gray-300 font-medium">{match.status}</p>
                </div>

                {/* Match Type Badge */}
                <div className="mt-4 flex justify-center">
                  <span className="px-3 py-1 bg-[#1a2332] text-gray-300 text-sm rounded-full font-medium uppercase">
                    {match.matchType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
            <div className="text-6xl mb-4">🏏</div>
            <h3 className="text-xl font-bold text-white mb-2">No Live Matches</h3>
            <p className="text-gray-300 mb-6">There are no live matches at the moment. Check back later!</p>
            <Link
              href="/dashboard/matches"
              className="inline-block bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Upcoming Matches
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

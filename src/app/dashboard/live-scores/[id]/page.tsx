"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";

interface MatchDetails {
  id: string;
  name: string;
  status: string;
  ms: string;
  t1: string;
  t2: string;
  t1img: string;
  t2img: string;
  t1s: string;
  t2s: string;
  dateTimeGMT: string;
  series: string;
  matchType: string;
  venue?: string;
  toss?: string;
}

export default function LiveMatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: matchId } = use(params);
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchMatchDetails = async () => {
    try {
      const res = await fetch(`/api/cricscore?matchId=${matchId}`);
      const data = await res.json();
      
      if (data.success && data.matches && data.matches.length > 0) {
        setMatch(data.matches[0]);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError("Match not found");
      }
    } catch (err) {
      console.error("Error fetching match:", err);
      setError("Failed to fetch match details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchDetails();
    
    // Auto-refresh every 30 seconds if enabled
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchMatchDetails, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [matchId, autoRefresh]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-2">Match Not Found</h2>
          <p className="text-gray-300 mb-6">{error || "Unable to load match details"}</p>
          <Link
            href="/dashboard/matches"
            className="inline-block bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Matches
          </Link>
        </div>
      </div>
    );
  }

  const isLive = match.ms === "live";
  const isCompleted = match.ms === "result";

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard/matches" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Matches
          </Link>
        </div>

        {/* Live Badge & Auto-refresh Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {isLive && (
              <span className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-full font-medium animate-pulse">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                LIVE
              </span>
            )}
            {isCompleted && (
              <span className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-full font-medium">
                ✓ Match Completed
              </span>
            )}
            <span className="text-gray-400 text-sm">
              {match.series}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-gray-400 text-sm">
                Last updated: {formatTime(lastUpdated)}
              </span>
            )}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                autoRefresh
                  ? "bg-[#22c55e]/20 text-[#22c55e]"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {autoRefresh ? "🔄 Auto-refresh ON" : "Auto-refresh OFF"}
            </button>
            <button
              onClick={fetchMatchDetails}
              className="px-4 py-2 bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Refresh Now
            </button>
          </div>
        </div>

        {/* Main Score Card */}
        <div className="bg-[#1a2332] rounded-2xl shadow-lg border border-[#22c55e]/20 overflow-hidden mb-6">
          {/* Match Type Banner */}
          <div className="bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/10 px-6 py-3 border-b border-[#22c55e]/20">
            <p className="text-center text-[#22c55e] font-medium">
              {match.matchType?.toUpperCase() || "CRICKET"} • {match.name}
            </p>
          </div>

          {/* Teams & Scores */}
          <div className="p-8">
            <div className="flex items-center justify-between">
              {/* Team 1 */}
              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  {match.t1img ? (
                    <Image
                      src={match.t1img}
                      alt={match.t1}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0a0f1a] rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-[#22c55e]">
                        {match.t1?.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{match.t1}</h3>
                <p className="text-4xl font-bold text-white">
                  {match.t1s || "-"}
                </p>
              </div>

              {/* VS */}
              <div className="px-8">
                <div className="w-16 h-16 rounded-full bg-[#0a0f1a] flex items-center justify-center border-2 border-[#22c55e]/30">
                  <span className="text-xl font-bold text-[#22c55e]">VS</span>
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex-1 text-center">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  {match.t2img ? (
                    <Image
                      src={match.t2img}
                      alt={match.t2}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0a0f1a] rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-[#22c55e]">
                        {match.t2?.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{match.t2}</h3>
                <p className="text-4xl font-bold text-white">
                  {match.t2s || "-"}
                </p>
              </div>
            </div>

            {/* Match Status */}
            <div className="mt-8 pt-6 border-t border-[#22c55e]/20">
              <p className="text-center text-lg text-gray-300">
                {match.status}
              </p>
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Match Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Series</p>
              <p className="text-white">{match.series || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Match Type</p>
              <p className="text-white">{match.matchType || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Date & Time</p>
              <p className="text-white">
                {new Date(match.dateTimeGMT).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Venue</p>
              <p className="text-white">{match.venue || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href={`/dashboard/matches/${matchId}/create-team`}
            className="flex-1 bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-4 rounded-xl font-medium text-center transition-colors"
          >
            Create Team
          </Link>
          <Link
            href={`/dashboard/matches/${matchId}/contests`}
            className="flex-1 bg-[#1a2332] border border-[#22c55e]/30 hover:border-[#22c55e] text-white px-6 py-4 rounded-xl font-medium text-center transition-colors"
          >
            View Contests
          </Link>
        </div>

        {/* Note about live scores */}
        {isLive && (
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-400 text-sm text-center">
              ⚡ Scores are updated every 30 seconds automatically. Click "Refresh Now" for instant updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

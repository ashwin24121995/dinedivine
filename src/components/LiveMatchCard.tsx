"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Match, formatMatchType, formatMatchTime, isMatchLive } from "@/lib/types";

interface LiveMatchCardProps {
  match: Match;
  refreshInterval?: number; // in milliseconds, default 3000 (3 seconds)
}

export default function LiveMatchCard({ match: initialMatch, refreshInterval = 3000 }: LiveMatchCardProps) {
  const [match, setMatch] = useState<Match>(initialMatch);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchLatestMatchData = useCallback(async () => {
    if (!isMatchLive(match)) return; // Only refresh if match is live
    
    try {
      setIsRefreshing(true);
      const response = await fetch(`/api/matches/${match.id}`, {
        cache: "no-store",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.match) {
          setMatch(data.data.match);
          setLastUpdated(new Date());
        }
      }
    } catch (error) {
      console.error("Error refreshing match data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [match.id, match]);

  useEffect(() => {
    // Only set up auto-refresh if match is live
    if (!isMatchLive(match)) return;

    const intervalId = setInterval(fetchLatestMatchData, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [fetchLatestMatchData, refreshInterval, match]);

  const isLive = isMatchLive(match);

  return (
    <div className="bg-[#1a2332] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 relative">
      {/* Live Indicator */}
      {isLive && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-red-900/200 text-white text-xs font-bold px-2 py-1 rounded">
            <span className="w-2 h-2 bg-[#1a2332] rounded-full animate-pulse"></span>
            LIVE
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">
            {formatMatchType(match.matchType)}
          </span>
        </div>
        {match.fantasyEnabled && (
          <span className="bg-yellow-400 text-amber-200 text-xs font-bold px-2 py-1 rounded">
            FANTASY
          </span>
        )}
      </div>

      {/* Teams and Scores */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {/* Team 1 */}
          <div className="flex-1 text-center">
            <div className="w-14 h-14 mx-auto mb-2 relative bg-[#1a2332] rounded-full overflow-hidden">
              {match.teamInfo?.[0]?.img ? (
                <Image
                  src={match.teamInfo[0].img}
                  alt={match.teamInfo[0].name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-green-600 font-bold text-lg">
                  {match.teams[0]?.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <p className="font-semibold text-gray-200 text-sm truncate">
              {match.teamInfo?.[0]?.shortname || match.teams[0]}
            </p>
            {match.score?.[0] && (
              <div className="mt-1">
                <p className="text-2xl font-bold text-white">
                  {match.score[0].r}/{match.score[0].w}
                </p>
                <p className="text-sm text-gray-500">
                  ({match.score[0].o} ov)
                </p>
              </div>
            )}
          </div>

          {/* VS */}
          <div className="px-4">
            <span className="text-gray-300 font-bold text-xl">VS</span>
          </div>

          {/* Team 2 */}
          <div className="flex-1 text-center">
            <div className="w-14 h-14 mx-auto mb-2 relative bg-[#1a2332] rounded-full overflow-hidden">
              {match.teamInfo?.[1]?.img ? (
                <Image
                  src={match.teamInfo[1].img}
                  alt={match.teamInfo[1].name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-green-600 font-bold text-lg">
                  {match.teams[1]?.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <p className="font-semibold text-gray-200 text-sm truncate">
              {match.teamInfo?.[1]?.shortname || match.teams[1]}
            </p>
            {match.score?.[1] && (
              <div className="mt-1">
                <p className="text-2xl font-bold text-white">
                  {match.score[1].r}/{match.score[1].w}
                </p>
                <p className="text-sm text-gray-500">
                  ({match.score[1].o} ov)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="text-center py-2 border-t border-gray-100">
          <p className={`text-sm font-medium ${isLive ? "text-red-600" : "text-gray-300"}`}>
            {match.status}
          </p>
        </div>

        {/* Match Info */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span>{formatMatchTime(match.dateTimeGMT)} IST</span>
          {isLive && (
            <span className="flex items-center gap-1">
              {isRefreshing && (
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Updated: {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          )}
        </div>

        {/* Venue */}
        <p className="text-xs text-gray-300 mt-2 truncate text-center">
          {match.venue}
        </p>
      </div>
    </div>
  );
}

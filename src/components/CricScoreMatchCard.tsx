"use client";

import { CricScoreMatch, formatMatchDateTime, formatMatchType, parseTeamName, getActualMatchStatus, getTimeUntilMatch } from "@/lib/types";
import Image from "next/image";

interface CricScoreMatchCardProps {
  match: CricScoreMatch;
  showSeries?: boolean;
}

export default function CricScoreMatchCard({ match, showSeries = true }: CricScoreMatchCardProps) {
  const team1 = parseTeamName(match.t1);
  const team2 = parseTeamName(match.t2);

  // Get actual status based on API status and current time
  const actualStatus = getActualMatchStatus(match.ms, match.dateTimeGMT);
  const timeUntil = getTimeUntilMatch(match.dateTimeGMT);

  // Determine status badge color based on actual status
  const getStatusBadge = () => {
    switch (actualStatus) {
      case "live":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
            LIVE
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30">
            UPCOMING
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600">
            COMPLETED
          </span>
        );
      default:
        return null;
    }
  };

  // Get countdown or status text
  const getTimeDisplay = () => {
    if (actualStatus === "live") {
      return <span className="text-red-400 font-medium">Match in Progress</span>;
    } else if (actualStatus === "completed") {
      return <span className="text-gray-300">{match.status}</span>;
    } else {
      // Upcoming
      if (timeUntil.hours > 24) {
        const days = Math.floor(timeUntil.hours / 24);
        return <span className="text-[#22c55e]">Starts in {days} day{days > 1 ? 's' : ''}</span>;
      } else if (timeUntil.hours > 0) {
        return <span className="text-[#22c55e]">Starts in {timeUntil.hours}h {timeUntil.minutes}m</span>;
      } else if (timeUntil.minutes > 0) {
        return <span className="text-orange-400 font-medium">Starts in {timeUntil.minutes} min</span>;
      } else {
        return <span className="text-red-400 font-medium animate-pulse">Starting soon</span>;
      }
    }
  };

  return (
    <div className={`bg-[#1a2332] rounded-xl p-4 border-l-4 hover:bg-[#1f2937] transition-colors ${
      actualStatus === "live" ? "border-red-500 shadow-lg shadow-red-500/10" : 
      actualStatus === "upcoming" ? "border-[#22c55e] shadow-lg shadow-[#22c55e]/10" : "border-gray-600"
    }`}>
      {/* Header: Series, Match Type, Status */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {showSeries && (
            <p className="text-xs text-gray-500 truncate mb-1">{match.series}</p>
          )}
          <span className="inline-block px-2 py-0.5 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded mr-2 border border-[#22c55e]/30">
            {formatMatchType(match.matchType)}
          </span>
        </div>
        {getStatusBadge()}
      </div>

      {/* Teams and Scores */}
      <div className="space-y-3">
        {/* Team 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {match.t1img && (
              <Image
                src={match.t1img}
                alt={team1.name}
                width={32}
                height={32}
                className="rounded-full bg-gray-700"
                unoptimized
              />
            )}
            <div>
              <p className="font-semibold text-white">{team1.name}</p>
              <p className="text-xs text-gray-500">{team1.shortname}</p>
            </div>
          </div>
          <div className="text-right">
            {match.t1s ? (
              <p className="font-bold text-lg text-white">{match.t1s}</p>
            ) : (
              <p className="text-gray-500 text-sm">-</p>
            )}
          </div>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-3 text-xs text-gray-500 font-medium">VS</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {match.t2img && (
              <Image
                src={match.t2img}
                alt={team2.name}
                width={32}
                height={32}
                className="rounded-full bg-gray-700"
                unoptimized
              />
            )}
            <div>
              <p className="font-semibold text-white">{team2.name}</p>
              <p className="text-xs text-gray-500">{team2.shortname}</p>
            </div>
          </div>
          <div className="text-right">
            {match.t2s ? (
              <p className="font-bold text-lg text-white">{match.t2s}</p>
            ) : (
              <p className="text-gray-500 text-sm">-</p>
            )}
          </div>
        </div>
      </div>

      {/* Status / Result */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <p className="text-sm">
          {getTimeDisplay()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {formatMatchDateTime(match.dateTimeGMT)} IST
        </p>
      </div>
    </div>
  );
}

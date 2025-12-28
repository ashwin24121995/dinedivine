"use client";

import Link from "next/link";
import Image from "next/image";
import { Match, getMatchStatus, formatMatchType, formatMatchDate, formatMatchTime, isMatchLive } from "@/lib/types";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const status = getMatchStatus(match);
  const isLive = isMatchLive(match);
  
  const getStatusColor = () => {
    switch (status) {
      case "live":
        return "bg-red-500";
      case "upcoming":
        return "bg-blue-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "live":
        return "LIVE";
      case "upcoming":
        return "UPCOMING";
      case "completed":
        return "COMPLETED";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={`${getStatusColor()} text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1`}>
            {isLive && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
            {getStatusText()}
          </span>
          <span className="text-white text-sm font-medium">
            {formatMatchType(match.matchType)}
          </span>
        </div>
        {match.fantasyEnabled && (
          <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
            FANTASY
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {/* Team 1 */}
          <div className="flex-1 text-center">
            <div className="w-12 h-12 mx-auto mb-2 relative bg-gray-100 rounded-full overflow-hidden">
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
            <p className="font-semibold text-gray-800 text-sm truncate">
              {match.teamInfo?.[0]?.shortname || match.teams[0]}
            </p>
            {match.score?.[0] && (
              <p className="text-lg font-bold text-gray-900">
                {match.score[0].r}/{match.score[0].w}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({match.score[0].o})
                </span>
              </p>
            )}
          </div>

          {/* VS */}
          <div className="px-4">
            <span className="text-gray-400 font-bold text-lg">VS</span>
          </div>

          {/* Team 2 */}
          <div className="flex-1 text-center">
            <div className="w-12 h-12 mx-auto mb-2 relative bg-gray-100 rounded-full overflow-hidden">
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
            <p className="font-semibold text-gray-800 text-sm truncate">
              {match.teamInfo?.[1]?.shortname || match.teams[1]}
            </p>
            {match.score?.[1] && (
              <p className="text-lg font-bold text-gray-900">
                {match.score[1].r}/{match.score[1].w}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({match.score[1].o})
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="text-center py-2 border-t border-gray-100">
          <p className={`text-sm font-medium ${isLive ? "text-red-600" : "text-gray-600"}`}>
            {match.status}
          </p>
        </div>

        {/* Match Info - Now showing IST */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span>{formatMatchDate(match.dateTimeGMT)}</span>
          <span>{formatMatchTime(match.dateTimeGMT)} IST</span>
        </div>

        {/* Venue */}
        <p className="text-xs text-gray-400 mt-2 truncate text-center">
          {match.venue}
        </p>
      </div>

      {/* Action Button */}
      {match.fantasyEnabled && status === "upcoming" && (
        <div className="px-4 pb-4">
          <Link
            href={`/contest/${match.id}`}
            className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Create Team
          </Link>
        </div>
      )}
    </div>
  );
}

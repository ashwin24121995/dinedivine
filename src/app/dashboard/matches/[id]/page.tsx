"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface MatchInfo {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: {
    name: string;
    shortname: string;
    img: string;
  }[];
  series: string;
}

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.id as string;

  const [match, setMatch] = useState<MatchInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await fetch(`/api/matches/${matchId}`);
        const data = await response.json();

        if (data.success && data.match) {
          setMatch(data.match);
        } else {
          setError("Match not found");
        }
      } catch (err) {
        setError("Failed to load match details");
      } finally {
        setLoading(false);
      }
    };

    if (matchId) {
      fetchMatchInfo();
    }
  }, [matchId]);

  // Convert GMT to IST
  const formatDateIST = (dateTimeGMT: string) => {
    const date = new Date(dateTimeGMT);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Match Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "Unable to load match details"}</p>
          <Link
            href="/dashboard/matches"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Back to Matches
          </Link>
        </div>
      </div>
    );
  }

  const team1 = match.teamInfo?.[0] || { name: match.teams?.[0] || "Team 1", shortname: "T1", img: "" };
  const team2 = match.teamInfo?.[1] || { name: match.teams?.[1] || "Team 2", shortname: "T2", img: "" };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/dashboard/matches"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          ← Back to Matches
        </Link>

        {/* Match Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Series Header */}
          <div className="bg-green-600 text-white px-6 py-4">
            <p className="text-sm opacity-90">{match.series || "Cricket Match"}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs bg-white/20 px-2 py-1 rounded uppercase">
                {match.matchType}
              </span>
              <span className="text-sm">{formatDateIST(match.dateTimeGMT)} IST</span>
            </div>
          </div>

          {/* Teams Section */}
          <div className="p-8">
            <div className="flex items-center justify-between">
              {/* Team 1 */}
              <div className="text-center flex-1">
                {team1.img && (
                  <img
                    src={team1.img}
                    alt={team1.name}
                    className="w-20 h-20 mx-auto mb-3 rounded-full object-cover bg-gray-100"
                  />
                )}
                <h3 className="font-bold text-lg text-gray-800">{team1.name}</h3>
                <p className="text-gray-500 text-sm">{team1.shortname}</p>
              </div>

              {/* VS */}
              <div className="px-8">
                <span className="text-3xl font-bold text-gray-300">VS</span>
              </div>

              {/* Team 2 */}
              <div className="text-center flex-1">
                {team2.img && (
                  <img
                    src={team2.img}
                    alt={team2.name}
                    className="w-20 h-20 mx-auto mb-3 rounded-full object-cover bg-gray-100"
                  />
                )}
                <h3 className="font-bold text-lg text-gray-800">{team2.name}</h3>
                <p className="text-gray-500 text-sm">{team2.shortname}</p>
              </div>
            </div>

            {/* Match Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Venue</p>
                  <p className="font-medium text-gray-800">{match.venue || "TBA"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-gray-800">{match.status || "Upcoming"}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <Link
                href={`/dashboard/matches/${matchId}/create-team`}
                className="block w-full bg-green-600 text-white text-center py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
              >
                🏏 Create Your Team
              </Link>

              <Link
                href={`/dashboard/matches/${matchId}/contests`}
                className="block w-full bg-white border-2 border-green-600 text-green-600 text-center py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                🎯 View Contests
              </Link>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-blue-800 mb-3">💡 Tips for Team Selection</h3>
          <ul className="text-blue-700 text-sm space-y-2">
            <li>• Select 11 players within the 100 credit budget</li>
            <li>• Choose 1 Captain (2x points) and 1 Vice-Captain (1.5x points)</li>
            <li>• Balance your team with batsmen, bowlers, all-rounders, and wicket-keepers</li>
            <li>• Check player form and recent performances</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

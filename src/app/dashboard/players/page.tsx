"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Player {
  id: string;
  name: string;
  country: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  playerImg?: string;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchPlayers = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/players?search=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      
      if (data.success && data.data) {
        setPlayers(data.data);
      } else {
        setPlayers([]);
      }
    } catch (error) {
      console.error("Error searching players:", error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchPlayers();
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "batsman":
        return "bg-blue-100 text-blue-600";
      case "bowler":
        return "bg-red-100 text-red-600";
      case "all-rounder":
        return "bg-purple-100 text-purple-600";
      case "wk-batsman":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-[#1a2332] text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Player Stats</h1>
          <p className="text-gray-400 mt-1">Search and view detailed player statistics</p>
        </div>

        {/* Search Box */}
        <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for a player (e.g., Virat Kohli, Rohit Sharma)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 pl-12 border border-[#22c55e]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={searchPlayers}
              disabled={loading || !searchQuery.trim()}
              className="bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
          </div>
        ) : hasSearched ? (
          players.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player) => (
                <Link
                  key={player.id}
                  href={`/dashboard/players/${player.id}`}
                  className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center overflow-hidden">
                      {player.playerImg ? (
                        <img
                          src={player.playerImg}
                          alt={player.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold">
                          {player.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{player.name}</h3>
                      <p className="text-sm text-gray-400">{player.country}</p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium ${getRoleBadgeColor(player.role)}`}>
                        {player.role || "Unknown"}
                      </span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No Players Found</h3>
              <p className="text-gray-400">Try searching with a different name</p>
            </div>
          )
        ) : (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
            <div className="text-6xl mb-4">🏏</div>
            <h3 className="text-xl font-bold text-white mb-2">Search for Players</h3>
            <p className="text-gray-400">Enter a player name above to view their stats and information</p>
          </div>
        )}
      </div>
    </div>
  );
}

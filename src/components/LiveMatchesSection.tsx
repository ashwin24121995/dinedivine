"use client";

import { useState, useEffect, useCallback } from "react";
import CricScoreMatchCard from "./CricScoreMatchCard";
import { CricScoreMatch } from "@/lib/types";

interface LiveMatchesSectionProps {
  refreshInterval?: number; // in milliseconds, default 3000 (3 seconds)
}

export default function LiveMatchesSection({ 
  refreshInterval = 3000 
}: LiveMatchesSectionProps) {
  const [matches, setMatches] = useState<CricScoreMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchLiveMatches = useCallback(async () => {
    try {
      // Use eCricScore API with status=live filter (ms === "live")
      const response = await fetch("/api/matches?status=live&nocache=true", {
        cache: "no-store",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMatches(data.data || []);
          setLastUpdated(new Date());
          setError(null);
        } else {
          setError(data.error || "Failed to fetch matches");
        }
      } else {
        setError("Failed to fetch live matches");
      }
    } catch (err) {
      console.error("Error fetching live matches:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchLiveMatches();
  }, [fetchLiveMatches]);

  // Auto-refresh every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchLiveMatches, refreshInterval);
    return () => clearInterval(intervalId);
  }, [fetchLiveMatches, refreshInterval]);

  if (isLoading && matches.length === 0) {
    return (
      <section className="py-12 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-white">Live Matches</h2>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#22c55e]"></div>
          </div>
          <div className="text-center text-gray-400">Loading live matches...</div>
        </div>
      </section>
    );
  }

  if (error && matches.length === 0) {
    return (
      <section className="py-12 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Live Matches</h2>
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchLiveMatches}
              className="mt-4 px-6 py-2 bg-[#22c55e] text-white rounded-lg hover:bg-[#16a34a] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (matches.length === 0) {
    return (
      <section className="py-12 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-white">Live Matches</h2>
              <span className="flex items-center gap-1 bg-[#1a2332] text-gray-400 px-3 py-1 rounded-full text-sm font-medium border border-gray-700">
                No Live Matches
              </span>
            </div>
            <p className="text-gray-400">
              There are no live matches at the moment. Check back later!
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Last checked: {lastUpdated.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-[#0a0f1a] to-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">Live Matches</h2>
            <span className="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium border border-red-500/30">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              {matches.length} Live
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {isLoading && (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>
              Auto-updating every {refreshInterval / 1000}s | Last: {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Kolkata" })} IST
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <CricScoreMatchCard 
              key={match.id} 
              match={match}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

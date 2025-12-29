"use client";

import { useState, useEffect } from "react";
import CricScoreMatchCard from "./CricScoreMatchCard";
import { CricScoreMatch } from "@/lib/types";

interface CompletedMatchesSectionProps {
  limit?: number; // Maximum number of matches to show
}

export default function CompletedMatchesSection({ limit = 6 }: CompletedMatchesSectionProps) {
  const [matches, setMatches] = useState<CricScoreMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompletedMatches = async () => {
      try {
        // Use eCricScore API with status=completed filter (ms === "result")
        const response = await fetch("/api/matches?status=completed");
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Sort by date (most recent first) and limit
            const sortedMatches = (data.data || [])
              .sort((a: CricScoreMatch, b: CricScoreMatch) => 
                new Date(b.dateTimeGMT).getTime() - new Date(a.dateTimeGMT).getTime()
              )
              .slice(0, limit);
            setMatches(sortedMatches);
            setError(null);
          } else {
            setError(data.error || "Failed to fetch matches");
          }
        } else {
          setError("Failed to fetch completed matches");
        }
      } catch (err) {
        console.error("Error fetching completed matches:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedMatches();
  }, [limit]);

  if (isLoading) {
    return (
      <section className="py-12 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-white">Recent Results</h2>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
          </div>
          <div className="text-center text-gray-300">Loading recent results...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Results</h2>
            <p className="text-red-400">{error}</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Recent Results</h2>
            <p className="text-gray-300">No recent match results available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">Recent Results</h2>
            <span className="flex items-center gap-1 bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-600">
              {matches.length} Completed
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

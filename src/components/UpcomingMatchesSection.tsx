"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CricScoreMatchCard from "./CricScoreMatchCard";
import { CricScoreMatch } from "@/lib/types";

interface UpcomingMatchesSectionProps {
  limit?: number; // Maximum number of matches to show
}

export default function UpcomingMatchesSection({ limit = 6 }: UpcomingMatchesSectionProps) {
  const [matches, setMatches] = useState<CricScoreMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      try {
        // Use eCricScore API with status=upcoming filter (ms === "fixture")
        const response = await fetch("/api/matches?status=upcoming");
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Sort by date and limit
            const sortedMatches = (data.data || [])
              .sort((a: CricScoreMatch, b: CricScoreMatch) => 
                new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime()
              )
              .slice(0, limit);
            setMatches(sortedMatches);
            setError(null);
          } else {
            setError(data.error || "Failed to fetch matches");
          }
        } else {
          setError("Failed to fetch upcoming matches");
        }
      } catch (err) {
        console.error("Error fetching upcoming matches:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingMatches();
  }, [limit]);

  if (isLoading) {
    return (
      <section className="py-12 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-white">Upcoming Matches</h2>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#22c55e]"></div>
          </div>
          <div className="text-center text-gray-400">Loading upcoming matches...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Upcoming Matches</h2>
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (matches.length === 0) {
    return (
      <section className="py-12 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Upcoming Matches</h2>
            <p className="text-gray-400">No upcoming matches scheduled at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">Upcoming Matches</h2>
            <span className="flex items-center gap-1 bg-[#22c55e]/20 text-[#22c55e] px-3 py-1 rounded-full text-sm font-medium border border-[#22c55e]/30">
              {matches.length} Scheduled
            </span>
          </div>
          <Link 
            href="/dashboard/matches"
            className="text-[#22c55e] hover:text-[#4ade80] font-medium flex items-center gap-1 transition-colors"
          >
            View All Matches
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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

"use client";

import { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { Match } from "@/lib/types";

interface MatchesListProps {
  initialMatches?: Match[];
  showFilters?: boolean;
  title?: string;
  maxItems?: number;
}

export default function MatchesList({
  initialMatches,
  showFilters = true,
  title = "Matches",
  maxItems,
}: MatchesListProps) {
  const [matches, setMatches] = useState<Match[]>(initialMatches || []);
  const [loading, setLoading] = useState(!initialMatches);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "completed">("all");

  useEffect(() => {
    if (!initialMatches) {
      fetchMatches();
    }
  }, [initialMatches]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/matches");
      const data = await response.json();
      
      if (data.success) {
        setMatches(data.data);
      } else {
        setError(data.error || "Failed to fetch matches");
      }
    } catch (err) {
      setError("Failed to fetch matches. Please try again.");
      console.error("Error fetching matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = matches.filter((match) => {
    if (filter === "all") return true;
    if (filter === "live") return match.matchStarted && !match.matchEnded;
    if (filter === "upcoming") return !match.matchStarted;
    if (filter === "completed") return match.matchEnded;
    return true;
  });

  const displayMatches = maxItems ? filteredMatches.slice(0, maxItems) : filteredMatches;

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchMatches}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          
          {showFilters && (
            <div className="flex gap-2 flex-wrap">
              {(["all", "live", "upcoming", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === f
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                  {f === "live" && (
                    <span className="ml-1 w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {displayMatches.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg">No matches found</p>
            <p className="text-gray-400 text-sm mt-2">
              Check back later for upcoming matches
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}

        {maxItems && filteredMatches.length > maxItems && (
          <div className="text-center mt-8">
            <a
              href="/matches"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              View All Matches
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Contest {
  id: number;
  match_id: string;
  contest_name: string;
  contest_type: string;
  max_participants: number;
  current_participants: number;
  status: string;
  team_name: string;
  team_points: number;
  rank: number;
  joined_at: string;
}

export default function MyContestsPage() {
  const router = useRouter();
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "completed">("active");

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const res = await fetch("/api/contests/my");
      const data = await res.json();
      
      if (!data.success && data.error === "Not authenticated") {
        router.push("/login");
        return;
      }
      
      if (data.success) {
        setContests(data.contests);
      }
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContests = contests.filter((contest) => {
    if (activeTab === "active") return contest.status === "live";
    if (activeTab === "upcoming") return contest.status === "upcoming";
    return contest.status === "completed";
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-green-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Contests</h1>
              <p className="text-gray-500 mt-1">Track your contest entries and rankings</p>
            </div>
            <Link
              href="/dashboard/matches"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Join New Contest
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 shadow-sm border border-gray-100 w-fit">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === "active"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeTab === "active" ? "bg-white" : "bg-red-500"} animate-pulse`}></span>
            Live
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "upcoming"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "completed"
                ? "bg-gray-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Contests List */}
        {filteredContests.length > 0 ? (
          <div className="space-y-4">
            {filteredContests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{contest.contest_name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        contest.status === "live" ? "bg-red-100 text-red-600" :
                        contest.status === "upcoming" ? "bg-green-100 text-green-600" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {contest.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Team: <span className="font-medium text-gray-700">{contest.team_name}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Participants</p>
                      <p className="font-bold text-lg">{contest.current_participants}/{contest.max_participants}</p>
                    </div>
                    {contest.status !== "upcoming" && (
                      <>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Points</p>
                          <p className="font-bold text-lg text-green-600">{contest.team_points}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Rank</p>
                          <p className="font-bold text-lg">#{contest.rank}</p>
                        </div>
                      </>
                    )}
                    <Link
                      href={`/dashboard/contests/${contest.id}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No {activeTab === "active" ? "Live" : activeTab === "upcoming" ? "Upcoming" : "Completed"} Contests
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "upcoming" 
                ? "Join a contest to see it here!"
                : "Check back later for more contests."}
            </p>
            {activeTab === "upcoming" && (
              <Link
                href="/dashboard/matches"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Matches
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

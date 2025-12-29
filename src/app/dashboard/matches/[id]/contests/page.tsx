"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Contest {
  id: number;
  name: string;
  contest_name?: string;
  contest_type?: string;
  max_participants: number;
  current_participants: number;
  max_entries?: number;
  current_entries?: number;
  spots_left?: number;
  spots_filled_percent?: number;
  status: string;
}

interface Team {
  id: number;
  team_name: string;
  player_count: number;
}

interface ContestEntry {
  id: number;
  contest_id: number;
  team_id: number;
  points: number;
  rank_position: number;
  contest_name: string;
}

export default function MatchContestsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: matchId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTeamId = searchParams.get("teamId");

  const [contests, setContests] = useState<Contest[]>([]);
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [userEntries, setUserEntries] = useState<ContestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningContestId, setJoiningContestId] = useState<number | null>(null);
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [activeTab, setActiveTab] = useState<"available" | "joined">("available");

  useEffect(() => {
    fetchContests();
    fetchUserTeams();
    fetchUserEntries();
  }, [matchId]);

  const fetchContests = async () => {
    try {
      // First trigger a sync to update contest statuses
      await fetch(`/api/contests/sync?action=status`);
      
      let res = await fetch(`/api/contests?matchId=${matchId}`);
      let data = await res.json();
      
      // If no contests exist, seed them first
      if (data.success && (!data.contests || data.contests.length === 0)) {
        await fetch(`/api/contests/seed?matchId=${matchId}`);
        // Fetch again after seeding
        res = await fetch(`/api/contests?matchId=${matchId}`);
        data = await res.json();
      }
      
      if (data.success) {
        setContests(data.contests || []);
      }
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTeams = async () => {
    try {
      const res = await fetch(`/api/teams?matchId=${matchId}`);
      const data = await res.json();
      
      if (data.success) {
        setUserTeams(data.teams);
      }
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  const fetchUserEntries = async () => {
    try {
      const res = await fetch(`/api/contests/my-entries?matchId=${matchId}`);
      const data = await res.json();
      
      if (data.success) {
        setUserEntries(data.entries || []);
      }
    } catch (error) {
      console.error("Error fetching user entries:", error);
    }
  };

  const handleJoinContest = (contest: Contest) => {
    if (userTeams.length === 0) {
      router.push(`/dashboard/matches/${matchId}/create-team`);
      return;
    }
    
    if (selectedTeamId) {
      joinContest(contest.id, parseInt(selectedTeamId));
    } else if (userTeams.length === 1) {
      joinContest(contest.id, userTeams[0].id);
    } else {
      setSelectedContest(contest);
      setShowTeamSelector(true);
    }
  };

  const joinContest = async (contestId: number, teamId: number) => {
    setJoiningContestId(contestId);
    try {
      const res = await fetch("/api/contests/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contestId, teamId }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        fetchContests();
        fetchUserEntries();
        setShowTeamSelector(false);
        alert("Successfully joined the contest!");
      } else {
        alert(data.error || "Failed to join contest");
      }
    } catch (error) {
      console.error("Error joining contest:", error);
      alert("Failed to join contest");
    } finally {
      setJoiningContestId(null);
    }
  };

  const isJoined = (contestId: number) => {
    return userEntries.some(entry => entry.contest_id === contestId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium animate-pulse">🔴 LIVE</span>;
      case "completed":
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full font-medium">✓ Completed</span>;
      default:
        return <span className="px-2 py-1 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded-full font-medium">FREE</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const availableContests = contests.filter(c => c.status !== "completed" && !isJoined(c.id));
  const joinedContests = contests.filter(c => isJoined(c.id));

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/matches" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Matches
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Contests</h1>
              <p className="text-gray-300 mt-1">Join free contests and compete</p>
            </div>
            <Link
              href={`/dashboard/matches/${matchId}/create-team`}
              className="bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create Team
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("available")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "available"
                ? "bg-[#22c55e] text-white"
                : "bg-[#1a2332] text-gray-300 hover:bg-[#22c55e]/20"
            }`}
          >
            Available ({availableContests.length})
          </button>
          <button
            onClick={() => setActiveTab("joined")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "joined"
                ? "bg-[#22c55e] text-white"
                : "bg-[#1a2332] text-gray-300 hover:bg-[#22c55e]/20"
            }`}
          >
            My Contests ({joinedContests.length})
          </button>
        </div>

        {/* User Teams Info */}
        {userTeams.length > 0 && activeTab === "available" && (
          <div className="bg-[#22c55e]/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-[#22c55e]">
              You have <strong>{userTeams.length}</strong> team(s) for this match. 
              {selectedTeamId && ` Using team: ${userTeams.find(t => t.id === parseInt(selectedTeamId))?.team_name}`}
            </p>
          </div>
        )}

        {/* Available Contests */}
        {activeTab === "available" && (
          <>
            {availableContests.length > 0 ? (
              <div className="space-y-4">
                {availableContests.map((contest) => {
                  const maxP = contest.max_entries || contest.max_participants || 100;
                  const currentP = contest.current_entries || contest.current_participants || 0;
                  const spotsLeft = maxP - currentP;
                  
                  return (
                    <div
                      key={contest.id}
                      className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-white">{contest.name || contest.contest_name}</h3>
                            {getStatusBadge(contest.status)}
                          </div>
                          <p className="text-gray-300 text-sm">
                            {spotsLeft} spots left
                          </p>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-gray-300">Spots Left</p>
                            <p className="font-bold text-lg text-white">
                              {spotsLeft}
                              <span className="text-gray-300 font-normal">/{maxP}</span>
                            </p>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-24">
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#22c55e] transition-all"
                                style={{
                                  width: `${(currentP / maxP) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-300 mt-1 text-center">
                              {Math.round((currentP / maxP) * 100)}% filled
                            </p>
                          </div>

                          <button
                            onClick={() => handleJoinContest(contest)}
                            disabled={joiningContestId === contest.id || currentP >= maxP || contest.status === "completed"}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                              currentP >= maxP || contest.status === "completed"
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white"
                            }`}
                          >
                            {joiningContestId === contest.id
                              ? "Joining..."
                              : currentP >= maxP
                              ? "Full"
                              : contest.status === "completed"
                              ? "Ended"
                              : "Join"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">No Available Contests</h3>
                <p className="text-gray-300 mb-6">
                  {joinedContests.length > 0 
                    ? "You've joined all available contests for this match!"
                    : "Contests for this match will be available soon!"}
                </p>
                {joinedContests.length > 0 && (
                  <button
                    onClick={() => setActiveTab("joined")}
                    className="inline-block bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    View My Contests
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Joined Contests */}
        {activeTab === "joined" && (
          <>
            {joinedContests.length > 0 ? (
              <div className="space-y-4">
                {joinedContests.map((contest) => {
                  const entry = userEntries.find(e => e.contest_id === contest.id);
                  const maxP = contest.max_entries || contest.max_participants || 100;
                  const currentP = contest.current_entries || contest.current_participants || 0;
                  
                  return (
                    <div
                      key={contest.id}
                      className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-white">{contest.name || contest.contest_name}</h3>
                            {getStatusBadge(contest.status)}
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">
                              ✓ Joined
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {currentP} participants
                          </p>
                        </div>

                        <div className="flex items-center gap-6">
                          {/* Points & Rank for completed contests */}
                          {contest.status === "completed" && entry && (
                            <>
                              <div className="text-center">
                                <p className="text-xs text-gray-300">Your Points</p>
                                <p className="font-bold text-lg text-[#22c55e]">
                                  {entry.points || 0}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-gray-300">Your Rank</p>
                                <p className="font-bold text-lg text-yellow-400">
                                  #{entry.rank_position || "-"}
                                </p>
                              </div>
                            </>
                          )}
                          
                          {/* For live contests */}
                          {contest.status === "live" && (
                            <div className="text-center">
                              <p className="text-xs text-gray-300">Status</p>
                              <p className="font-bold text-lg text-red-400 animate-pulse">
                                Match Live
                              </p>
                            </div>
                          )}

                          {/* For upcoming contests */}
                          {contest.status === "upcoming" && (
                            <div className="text-center">
                              <p className="text-xs text-gray-300">Status</p>
                              <p className="font-bold text-lg text-[#22c55e]">
                                Waiting
                              </p>
                            </div>
                          )}

                          <Link
                            href={`/dashboard/contests/${contest.id}/leaderboard`}
                            className="px-6 py-2 rounded-lg font-medium transition-colors bg-[#22c55e]/20 text-[#22c55e] hover:bg-[#22c55e]/30"
                          >
                            Leaderboard
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">No Contests Joined</h3>
                <p className="text-gray-300 mb-6">You haven't joined any contests for this match yet.</p>
                <button
                  onClick={() => setActiveTab("available")}
                  className="inline-block bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Browse Contests
                </button>
              </div>
            )}
          </>
        )}

        {/* Team Selector Modal */}
        {showTeamSelector && selectedContest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1a2332] rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Select a Team</h3>
              <p className="text-gray-300 mb-4">Choose which team to use for {selectedContest.name || selectedContest.contest_name}</p>
              
              <div className="space-y-2 mb-6">
                {userTeams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => joinContest(selectedContest.id, team.id)}
                    disabled={joiningContestId !== null}
                    className="w-full p-4 border border-[#22c55e]/20 rounded-lg hover:border-green-500 hover:bg-[#22c55e]/10 transition-all text-left"
                  >
                    <p className="font-medium text-white">{team.team_name}</p>
                    <p className="text-sm text-gray-300">{team.player_count} players</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowTeamSelector(false)}
                  className="flex-1 px-4 py-2 border border-[#22c55e]/20 rounded-lg text-gray-300 hover:bg-[#0a0f1a]"
                >
                  Cancel
                </button>
                <Link
                  href={`/dashboard/matches/${matchId}/create-team`}
                  className="flex-1 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-center hover:shadow-lg hover:shadow-[#22c55e]/30"
                >
                  Create New Team
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

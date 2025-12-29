"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Contest {
  id: number;
  contest_name: string;
  contest_type: string;
  max_participants: number;
  current_participants: number;
  status: string;
}

interface Team {
  id: number;
  team_name: string;
  player_count: number;
}

export default function MatchContestsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: matchId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTeamId = searchParams.get("teamId");

  const [contests, setContests] = useState<Contest[]>([]);
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningContestId, setJoiningContestId] = useState<number | null>(null);
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);

  useEffect(() => {
    fetchContests();
    fetchUserTeams();
  }, [matchId]);

  const fetchContests = async () => {
    try {
      const res = await fetch(`/api/contests?matchId=${matchId}`);
      const data = await res.json();
      
      if (data.success) {
        setContests(data.contests);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-white">Join a Contest</h1>
              <p className="text-gray-400 mt-1">Select a free contest to join</p>
            </div>
            <Link
              href={`/dashboard/matches/${matchId}/create-team`}
              className="bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create Team
            </Link>
          </div>
        </div>

        {/* User Teams Info */}
        {userTeams.length > 0 && (
          <div className="bg-[#22c55e]/10 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-[#22c55e]">
              You have <strong>{userTeams.length}</strong> team(s) for this match. 
              {selectedTeamId && ` Using team: ${userTeams.find(t => t.id === parseInt(selectedTeamId))?.team_name}`}
            </p>
          </div>
        )}

        {/* Contests List */}
        {contests.length > 0 ? (
          <div className="space-y-4">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-white">{contest.contest_name}</h3>
                      <span className="px-2 py-1 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded-full font-medium">
                        FREE
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {contest.contest_type.charAt(0).toUpperCase() + contest.contest_type.slice(1)} Contest
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Spots Left</p>
                      <p className="font-bold text-lg">
                        {contest.max_participants - contest.current_participants}
                        <span className="text-gray-400 font-normal">/{contest.max_participants}</span>
                      </p>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-24">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#22c55e]/100 transition-all"
                          style={{
                            width: `${(contest.current_participants / contest.max_participants) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-center">
                        {Math.round((contest.current_participants / contest.max_participants) * 100)}% filled
                      </p>
                    </div>

                    <button
                      onClick={() => handleJoinContest(contest)}
                      disabled={joiningContestId === contest.id || contest.current_participants >= contest.max_participants}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        contest.current_participants >= contest.max_participants
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white"
                      }`}
                    >
                      {joiningContestId === contest.id
                        ? "Joining..."
                        : contest.current_participants >= contest.max_participants
                        ? "Full"
                        : "Join"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">No Contests Available</h3>
            <p className="text-gray-400 mb-6">Contests for this match will be available soon!</p>
            <Link
              href="/dashboard/matches"
              className="inline-block bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Other Matches
            </Link>
          </div>
        )}

        {/* Team Selector Modal */}
        {showTeamSelector && selectedContest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1a2332] rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Select a Team</h3>
              <p className="text-gray-400 mb-4">Choose which team to use for {selectedContest.contest_name}</p>
              
              <div className="space-y-2 mb-6">
                {userTeams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => joinContest(selectedContest.id, team.id)}
                    disabled={joiningContestId !== null}
                    className="w-full p-4 border border-[#22c55e]/20 rounded-lg hover:border-green-500 hover:bg-[#22c55e]/10 transition-all text-left"
                  >
                    <p className="font-medium text-white">{team.team_name}</p>
                    <p className="text-sm text-gray-400">{team.player_count} players</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowTeamSelector(false)}
                  className="flex-1 px-4 py-2 border border-[#22c55e]/20 rounded-lg text-gray-400 hover:bg-[#0a0f1a]"
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

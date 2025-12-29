"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Team {
  id: number;
  match_id: string;
  team_name: string;
  total_credits_used: number;
  total_points: number;
  created_at: string;
  player_count: number;
}

export default function MyTeamsPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/teams");
      const data = await res.json();
      
      if (!data.success && data.error === "Not authenticated") {
        router.push("/login");
        return;
      }
      
      if (data.success) {
        setTeams(data.teams);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Teams</h1>
              <p className="text-gray-400 mt-1">View and manage your fantasy teams</p>
            </div>
            <Link
              href="/dashboard/matches"
              className="bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create New Team
            </Link>
          </div>
        </div>

        {/* Teams List */}
        {teams.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-white">{team.team_name}</h3>
                  <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] text-sm rounded-full font-medium">
                    {team.player_count} Players
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Credits Used</span>
                    <span className="font-medium">{team.total_credits_used}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Points Earned</span>
                    <span className="font-medium text-[#22c55e]">{team.total_points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created</span>
                    <span className="font-medium">{formatDate(team.created_at)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#22c55e]/20 flex gap-2">
                  <Link
                    href={`/dashboard/teams/${team.id}`}
                    className="flex-1 bg-[#1a2332] hover:bg-gray-200 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    View Team
                  </Link>
                  <Link
                    href={`/dashboard/matches/${team.match_id}/contests?teamId=${team.id}`}
                    className="flex-1 bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    Join Contest
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
            <div className="text-6xl mb-4">🏏</div>
            <h3 className="text-xl font-bold text-white mb-2">No Teams Yet</h3>
            <p className="text-gray-400 mb-6">Create your first fantasy team to start playing!</p>
            <Link
              href="/dashboard/matches"
              className="inline-block bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create Your First Team
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

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
              <h1 className="text-3xl font-bold text-gray-800">My Teams</h1>
              <p className="text-gray-500 mt-1">View and manage your fantasy teams</p>
            </div>
            <Link
              href="/dashboard/matches"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-800">{team.team_name}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full font-medium">
                    {team.player_count} Players
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Credits Used</span>
                    <span className="font-medium">{team.total_credits_used}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Points Earned</span>
                    <span className="font-medium text-green-600">{team.total_points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium">{formatDate(team.created_at)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <Link
                    href={`/dashboard/teams/${team.id}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    View Team
                  </Link>
                  <Link
                    href={`/dashboard/matches/${team.match_id}/contests?teamId=${team.id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    Join Contest
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">🏏</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Teams Yet</h3>
            <p className="text-gray-500 mb-6">Create your first fantasy team to start playing!</p>
            <Link
              href="/dashboard/matches"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create Your First Team
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

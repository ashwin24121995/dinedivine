"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country: string;
  playerImg?: string;
  credits: number;
  isSelected: boolean;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

interface MatchInfo {
  id: string;
  name: string;
  t1: string;
  t2: string;
  t1img: string;
  t2img: string;
  matchType: string;
  dateTimeGMT: string;
  series: string;
}

interface TeamSquad {
  teamName: string;
  shortname: string;
  img: string;
  players: Player[];
}

const ROLE_LIMITS = {
  WK: { min: 1, max: 4, label: "Wicket Keeper" },
  BAT: { min: 3, max: 6, label: "Batsman" },
  AR: { min: 1, max: 4, label: "All Rounder" },
  BOWL: { min: 3, max: 6, label: "Bowler" },
};

const TOTAL_PLAYERS = 11;
const TOTAL_CREDITS = 100;

export default function CreateTeamPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.id as string;

  const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(null);
  const [squads, setSquads] = useState<TeamSquad[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [captain, setCaptain] = useState<Player | null>(null);
  const [viceCaptain, setViceCaptain] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"select" | "captain" | "preview">("select");
  const [activeTeamTab, setActiveTeamTab] = useState(0);
  const [activeRoleTab, setActiveRoleTab] = useState("ALL");
  const [saving, setSaving] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [squadNotAvailable, setSquadNotAvailable] = useState(false);
  const [squadMessage, setSquadMessage] = useState("");

  useEffect(() => {
    fetchMatchData();
  }, [matchId]);

  const fetchMatchData = async () => {
    try {
      // Fetch match info
      const matchRes = await fetch(`/api/matches/${matchId}`);
      const matchData = await matchRes.json();
      
      if (matchData.success) {
        setMatchInfo(matchData.match);
      }

      // Fetch squad data
      const squadRes = await fetch(`/api/matches/${matchId}/squad`);
      const squadData = await squadRes.json();
      
      if (squadData.success) {
        if (squadData.squadNotAvailable) {
          setSquadNotAvailable(true);
          setSquadMessage(squadData.message || "Squad not announced yet. Check back closer to match time.");
        } else if (squadData.squads && squadData.squads.length > 0) {
          // Add credits to players based on role
          const squadsWithCredits = squadData.squads.map((squad: TeamSquad) => ({
            ...squad,
            players: squad.players.map((player: Player) => ({
              ...player,
              credits: player.credits || getPlayerCredits(player.role),
              isSelected: false,
              isCaptain: false,
              isViceCaptain: false,
            })),
          }));
          setSquads(squadsWithCredits);
        } else {
          setSquadNotAvailable(true);
          setSquadMessage("Squad not announced yet. Check back closer to match time.");
        }
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPlayerCredits = (role: string): number => {
    const roleCredits: { [key: string]: number } = {
      WK: 8.5,
      BAT: 9,
      AR: 9.5,
      BOWL: 8,
    };
    return roleCredits[role] || 8;
  };

  const getRoleFromPlayer = (role: string): string => {
    const roleLower = role.toLowerCase();
    // Check for Wicket Keeper - API returns "WK-Batsman"
    if (roleLower.includes("wk") || roleLower.includes("keeper") || roleLower.includes("wicket")) return "WK";
    // Check for All Rounder - API returns "Batting Allrounder" or "Bowling Allrounder"
    if (roleLower.includes("allrounder") || roleLower.includes("all-rounder") || roleLower.includes("all rounder")) return "AR";
    // Check for Bowler
    if (roleLower.includes("bowler") || roleLower === "bowling") return "BOWL";
    // Default to Batsman
    return "BAT";
  };

  const getSelectedByRole = (role: string) => {
    return selectedPlayers.filter((p) => getRoleFromPlayer(p.role) === role).length;
  };

  const getTotalCreditsUsed = () => {
    return selectedPlayers.reduce((sum, p) => sum + p.credits, 0);
  };

  const getTeamPlayerCount = (teamIndex: number) => {
    if (!squads[teamIndex]) return 0;
    return selectedPlayers.filter((p) =>
      squads[teamIndex].players.some((sp) => sp.id === p.id)
    ).length;
  };

  const canSelectPlayer = (player: Player): { can: boolean; reason: string } => {
    if (selectedPlayers.length >= TOTAL_PLAYERS) {
      return { can: false, reason: "Team is full (11 players)" };
    }

    const role = getRoleFromPlayer(player.role);
    const roleCount = getSelectedByRole(role);
    const limit = ROLE_LIMITS[role as keyof typeof ROLE_LIMITS];

    if (roleCount >= limit.max) {
      return { can: false, reason: `Max ${limit.max} ${limit.label}s allowed` };
    }

    const creditsAfter = getTotalCreditsUsed() + player.credits;
    if (creditsAfter > TOTAL_CREDITS) {
      return { can: false, reason: "Not enough credits" };
    }

    // Check team balance (max 7 from one team)
    const playerTeamIndex = squads.findIndex((s) =>
      s.players.some((p) => p.id === player.id)
    );
    if (getTeamPlayerCount(playerTeamIndex) >= 7) {
      return { can: false, reason: "Max 7 players from one team" };
    }

    return { can: true, reason: "" };
  };

  const togglePlayer = (player: Player) => {
    const isSelected = selectedPlayers.some((p) => p.id === player.id);

    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
      if (captain?.id === player.id) setCaptain(null);
      if (viceCaptain?.id === player.id) setViceCaptain(null);
    } else {
      const { can, reason } = canSelectPlayer(player);
      if (can) {
        setSelectedPlayers([...selectedPlayers, { ...player, isSelected: true }]);
      } else {
        alert(reason);
      }
    }
  };

  const canProceedToCaptain = (): { can: boolean; reason: string } => {
    if (selectedPlayers.length !== TOTAL_PLAYERS) {
      return { can: false, reason: `Select ${TOTAL_PLAYERS} players (${selectedPlayers.length}/11)` };
    }

    for (const [role, limit] of Object.entries(ROLE_LIMITS)) {
      const count = getSelectedByRole(role);
      if (count < limit.min) {
        return { can: false, reason: `Need at least ${limit.min} ${limit.label}` };
      }
    }

    return { can: true, reason: "" };
  };

  const handleSaveTeam = async () => {
    if (!captain || !viceCaptain) {
      alert("Please select Captain and Vice Captain");
      return;
    }

    if (!teamName.trim()) {
      alert("Please enter a team name");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId,
          teamName: teamName.trim(),
          players: selectedPlayers.map((p) => ({
            playerId: p.id,
            playerName: p.name,
            role: p.role,
            credits: p.credits,
            isCaptain: p.id === captain.id,
            isViceCaptain: p.id === viceCaptain.id,
          })),
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/dashboard/matches/${matchId}/contests?teamId=${data.teamId}`);
      } else {
        alert(data.error || "Failed to save team");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const getAllPlayers = () => {
    const allPlayers: (Player & { teamIndex: number })[] = [];
    squads.forEach((squad, index) => {
      squad.players.forEach((player) => {
        allPlayers.push({ ...player, teamIndex: index });
      });
    });
    return allPlayers;
  };

  const getFilteredPlayers = () => {
    let players = getAllPlayers();

    // Filter by team
    if (activeTeamTab > 0) {
      players = players.filter((p) => p.teamIndex === activeTeamTab - 1);
    }

    // Filter by role
    if (activeRoleTab !== "ALL") {
      players = players.filter((p) => getRoleFromPlayer(p.role) === activeRoleTab);
    }

    return players;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (squadNotAvailable) {
    return (
      <div className="min-h-screen bg-[#0a0f1a]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white py-4">
          <div className="max-w-7xl mx-auto px-4">
            <Link href={`/dashboard/matches/${matchId}`} className="text-white/80 hover:text-white flex items-center gap-2 mb-2">
              ← Back to Match
            </Link>
            <h1 className="text-2xl font-bold">Create Your Team</h1>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-[#1a2332] rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🏏</div>
            <h2 className="text-2xl font-bold text-white mb-4">Squad Not Available</h2>
            <p className="text-gray-400 mb-6">{squadMessage}</p>
            <p className="text-sm text-gray-400 mb-8">
              Teams are usually announced 1-2 hours before the match starts. Please check back later.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href={`/dashboard/matches/${matchId}`}
                className="bg-gray-200 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                ← Back to Match
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="bg-[#22c55e] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#22c55e]/30 transition"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/dashboard/matches" className="text-green-100 hover:text-white text-sm mb-2 inline-block">
            ← Back to Matches
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Create Your Team</h1>
              <p className="text-green-100 text-sm">{matchInfo?.series}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{matchInfo?.t1} vs {matchInfo?.t2}</p>
              <p className="text-green-100 text-sm">{matchInfo?.matchType?.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-[#22c55e]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === "select" ? "text-[#22c55e]" : "text-gray-400"}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "select" ? "bg-[#22c55e] text-white" : "bg-gray-200"}`}>1</span>
              <span className="font-medium">Select Players</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step === "captain" ? "text-[#22c55e]" : "text-gray-400"}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "captain" ? "bg-[#22c55e] text-white" : "bg-gray-200"}`}>2</span>
              <span className="font-medium">Choose C & VC</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step === "preview" ? "text-[#22c55e]" : "text-gray-400"}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "preview" ? "bg-[#22c55e] text-white" : "bg-gray-200"}`}>3</span>
              <span className="font-medium">Save Team</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-[#22c55e]/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-gray-400">Players</p>
                <p className="font-bold text-lg">{selectedPlayers.length}/{TOTAL_PLAYERS}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Credits Left</p>
                <p className="font-bold text-lg">{(TOTAL_CREDITS - getTotalCreditsUsed()).toFixed(1)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {Object.entries(ROLE_LIMITS).map(([role, limit]) => (
                <div key={role} className="text-center">
                  <p className="text-xs text-gray-400">{role}</p>
                  <p className={`font-bold ${getSelectedByRole(role) >= limit.min ? "text-[#22c55e]" : "text-gray-400"}`}>
                    {getSelectedByRole(role)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {step === "select" && (
          <>
            {/* Team & Role Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTeamTab(0)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTeamTab === 0 ? "bg-[#22c55e] text-white" : "bg-white text-gray-400 border"}`}
                >
                  All
                </button>
                {squads.map((squad, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTeamTab(index + 1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTeamTab === index + 1 ? "bg-[#22c55e] text-white" : "bg-white text-gray-400 border"}`}
                  >
                    {squad.shortname} ({getTeamPlayerCount(index)})
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {["ALL", "WK", "BAT", "AR", "BOWL"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setActiveRoleTab(role)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeRoleTab === role ? "bg-blue-600 text-white" : "bg-white text-gray-400 border"}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Players List */}
            <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#22c55e]/20 text-sm font-medium text-gray-400">
                <div className="col-span-5">Player</div>
                <div className="col-span-2 text-center">Role</div>
                <div className="col-span-2 text-center">Points</div>
                <div className="col-span-2 text-center">Credits</div>
                <div className="col-span-1 text-center">+</div>
              </div>
              {getFilteredPlayers().map((player) => {
                const isSelected = selectedPlayers.some((p) => p.id === player.id);
                const { can, reason } = canSelectPlayer(player);
                
                return (
                  <div
                    key={player.id}
                    onClick={() => togglePlayer(player)}
                    className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                      isSelected ? "bg-[#22c55e]/10" : can ? "hover:bg-gray-50" : "opacity-50"
                    }`}
                  >
                    <div className="col-span-5 flex items-center gap-3">
                      <img
                        src={player.playerImg || "/placeholder-player.png"}
                        alt={player.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/placeholder-player.png'; }}
                      />
                      <div>
                        <p className="font-medium text-white">{player.name}</p>
                        <p className="text-xs text-gray-400">{squads[player.teamIndex]?.shortname}</p>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="px-2 py-1 bg-gray-100 text-gray-400 text-xs rounded-full">
                        {getRoleFromPlayer(player.role)}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center text-gray-400">
                      -
                    </div>
                    <div className="col-span-2 flex items-center justify-center font-medium">
                      {player.credits}
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        isSelected ? "bg-[#22c55e] text-white" : "bg-gray-200 text-gray-400"
                      }`}>
                        {isSelected ? "✓" : "+"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#22c55e]/20 p-4">
              <div className="max-w-7xl mx-auto flex justify-end">
                <button
                  onClick={() => {
                    const { can, reason } = canProceedToCaptain();
                    if (can) {
                      setStep("captain");
                    } else {
                      alert(reason);
                    }
                  }}
                  className={`px-8 py-3 rounded-lg font-medium ${
                    canProceedToCaptain().can
                      ? "bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next: Choose Captain →
                </button>
              </div>
            </div>
          </>
        )}

        {step === "captain" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Choose Captain & Vice Captain</h2>
              <p className="text-gray-400">Captain gets 2x points, Vice Captain gets 1.5x points</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-24">
              {/* Captain Selection */}
              <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-4">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">C</span>
                  Captain (2x Points)
                </h3>
                <div className="space-y-2">
                  {selectedPlayers.map((player) => (
                    <div
                      key={player.id}
                      onClick={() => {
                        if (viceCaptain?.id === player.id) setViceCaptain(null);
                        setCaptain(player);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        captain?.id === player.id ? "bg-yellow-100 border-2 border-yellow-500" : "hover:bg-gray-50 border border-[#22c55e]/20"
                      }`}
                    >
                      <img
                        src={player.playerImg || "/placeholder-player.png"}
                        alt={player.name}
                        className="w-10 h-10 rounded-full"
                        onError={(e) => { e.currentTarget.src = '/placeholder-player.png'; }}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{player.name}</p>
                        <p className="text-xs text-gray-400">{getRoleFromPlayer(player.role)}</p>
                      </div>
                      {captain?.id === player.id && (
                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">C</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vice Captain Selection */}
              <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-4">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">VC</span>
                  Vice Captain (1.5x Points)
                </h3>
                <div className="space-y-2">
                  {selectedPlayers.map((player) => (
                    <div
                      key={player.id}
                      onClick={() => {
                        if (captain?.id === player.id) return;
                        setViceCaptain(player);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        captain?.id === player.id ? "opacity-50 cursor-not-allowed" : 
                        viceCaptain?.id === player.id ? "bg-blue-100 border-2 border-blue-500" : "hover:bg-gray-50 border border-[#22c55e]/20"
                      }`}
                    >
                      <img
                        src={player.playerImg || "/placeholder-player.png"}
                        alt={player.name}
                        className="w-10 h-10 rounded-full"
                        onError={(e) => { e.currentTarget.src = '/placeholder-player.png'; }}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{player.name}</p>
                        <p className="text-xs text-gray-400">{getRoleFromPlayer(player.role)}</p>
                      </div>
                      {viceCaptain?.id === player.id && (
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">VC</span>
                      )}
                      {captain?.id === player.id && (
                        <span className="text-xs text-gray-400">Captain</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#22c55e]/20 p-4">
              <div className="max-w-7xl mx-auto flex justify-between">
                <button
                  onClick={() => setStep("select")}
                  className="px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50"
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    if (captain && viceCaptain) {
                      setStep("preview");
                    } else {
                      alert("Please select both Captain and Vice Captain");
                    }
                  }}
                  className={`px-8 py-3 rounded-lg font-medium ${
                    captain && viceCaptain
                      ? "bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next: Preview Team →
                </button>
              </div>
            </div>
          </>
        )}

        {step === "preview" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Team Preview</h2>
              <p className="text-gray-400">Review your team before saving</p>
            </div>

            {/* Team Name */}
            <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6 mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter a name for your team"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
                maxLength={50}
              />
            </div>

            {/* Team Preview */}
            <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-6 mb-24">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedPlayers.map((player) => (
                  <div
                    key={player.id}
                    className={`text-center p-4 rounded-lg ${
                      player.id === captain?.id ? "bg-yellow-50 border-2 border-yellow-500" :
                      player.id === viceCaptain?.id ? "bg-blue-50 border-2 border-blue-500" :
                      "bg-gray-50"
                    }`}
                  >
                    <div className="relative inline-block">
                      <img
                        src={player.playerImg || "/placeholder-player.png"}
                        alt={player.name}
                        className="w-16 h-16 rounded-full mx-auto"
                        onError={(e) => { e.currentTarget.src = '/placeholder-player.png'; }}
                      />
                      {player.id === captain?.id && (
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">C</span>
                      )}
                      {player.id === viceCaptain?.id && (
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">VC</span>
                      )}
                    </div>
                    <p className="font-medium text-sm mt-2">{player.name}</p>
                    <p className="text-xs text-gray-400">{getRoleFromPlayer(player.role)} • {player.credits} cr</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#22c55e]/20 p-4">
              <div className="max-w-7xl mx-auto flex justify-between">
                <button
                  onClick={() => setStep("captain")}
                  className="px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSaveTeam}
                  disabled={saving || !teamName.trim()}
                  className={`px-8 py-3 rounded-lg font-medium ${
                    !saving && teamName.trim()
                      ? "bg-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/30 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {saving ? "Saving..." : "Save Team & Join Contest"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

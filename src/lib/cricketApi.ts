// Cricket Data API Utility Functions

import {
  Match,
  Series,
  PlayerInfo,
  MatchSquad,
  APIResponse,
  isMatchLive,
  isMatchUpcoming,
  isMatchCompleted,
  isMatchToday,
} from "./types";

const API_KEY = process.env.CRICKET_API_KEY || "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<APIResponse<T>> {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Get current matches (recent matches with scores)
export async function getCurrentMatches(offset: number = 0): Promise<Match[]> {
  try {
    const response = await fetchAPI<Match[]>("currentMatches", { offset: offset.toString() });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching current matches:", error);
    return [];
  }
}

// Get matches list (fixtures, live, and recent)
export async function getMatches(offset: number = 0): Promise<Match[]> {
  try {
    const response = await fetchAPI<Match[]>("matches", { offset: offset.toString() });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
}

// Get current series list
export async function getSeries(offset: number = 0): Promise<Series[]> {
  try {
    const response = await fetchAPI<Series[]>("series", { offset: offset.toString() });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching series:", error);
    return [];
  }
}

// Get match info by ID
export async function getMatchInfo(matchId: string): Promise<Match | null> {
  try {
    const response = await fetchAPI<Match>("match_info", { id: matchId });
    return response.data || null;
  } catch (error) {
    console.error("Error fetching match info:", error);
    return null;
  }
}

// Get match squad by ID
export async function getMatchSquad(matchId: string): Promise<MatchSquad[] | null> {
  try {
    const response = await fetchAPI<MatchSquad[]>("match_squad", { id: matchId });
    return response.data || null;
  } catch (error) {
    console.error("Error fetching match squad:", error);
    return null;
  }
}

// Get player info by ID
export async function getPlayerInfo(playerId: string): Promise<PlayerInfo | null> {
  try {
    const response = await fetchAPI<PlayerInfo>("players_info", { id: playerId });
    return response.data || null;
  } catch (error) {
    console.error("Error fetching player info:", error);
    return null;
  }
}

// Search players by name
export async function searchPlayers(name: string, offset: number = 0): Promise<PlayerInfo[]> {
  try {
    const response = await fetchAPI<PlayerInfo[]>("players", { 
      search: name, 
      offset: offset.toString() 
    });
    return response.data || [];
  } catch (error) {
    console.error("Error searching players:", error);
    return [];
  }
}

// Get LIVE matches only (matchStarted=true, matchEnded=false)
export function getLiveMatchesFromList(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchLive(match));
}

// Get TODAY's LIVE matches only (IST timezone)
export function getTodayLiveMatches(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchLive(match) && isMatchToday(match.dateTimeGMT));
}

// Get upcoming matches only
export function getUpcomingMatchesFromList(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchUpcoming(match));
}

// Get TODAY's upcoming matches only (IST timezone)
export function getTodayUpcomingMatches(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchUpcoming(match) && isMatchToday(match.dateTimeGMT));
}

// Get completed matches only
export function getCompletedMatchesFromList(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchCompleted(match));
}

// Get TODAY's completed matches only (IST timezone)
export function getTodayCompletedMatches(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchCompleted(match) && isMatchToday(match.dateTimeGMT));
}

// Get fantasy-enabled matches only
export function getFantasyEnabledMatches(matches: Match[]): Match[] {
  return matches.filter((match) => match.fantasyEnabled);
}

// Get matches with squad available
export function getMatchesWithSquad(matches: Match[]): Match[] {
  return matches.filter((match) => match.hasSquad);
}

// Filter matches by status (legacy support)
export function filterMatchesByStatus(matches: Match[], status: "upcoming" | "live" | "completed"): Match[] {
  switch (status) {
    case "live":
      return getLiveMatchesFromList(matches);
    case "upcoming":
      return getUpcomingMatchesFromList(matches);
    case "completed":
      return getCompletedMatchesFromList(matches);
    default:
      return matches;
  }
}

// Fetch live matches with no cache (for real-time updates)
export async function fetchLiveMatchesNoCache(): Promise<Match[]> {
  try {
    const url = new URL(`${BASE_URL}/currentMatches`);
    url.searchParams.append("apikey", API_KEY);
    url.searchParams.append("offset", "0");

    const response = await fetch(url.toString(), {
      cache: "no-store", // No caching for live data
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: APIResponse<Match[]> = await response.json();
    return getLiveMatchesFromList(data.data || []);
  } catch (error) {
    console.error("Error fetching live matches:", error);
    return [];
  }
}

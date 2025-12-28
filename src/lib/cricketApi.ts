// ============================================
// Cricket Data API Utility Functions
// All 15 API endpoints for DineDivine
// ============================================

import {
  Match,
  Series,
  SeriesInfo,
  Player,
  PlayerInfo,
  MatchSquad,
  SeriesSquad,
  MatchScorecard,
  MatchPoints,
  SeriesPointsEntry,
  APIResponse,
  CricScoreMatch,
  isCricScoreLive,
  isCricScoreUpcoming,
  isCricScoreCompleted,
  isMatchLive,
  isMatchUpcoming,
  isMatchCompleted,
  isMatchToday,
} from "./types";

const BASE_URL = "https://api.cricapi.com/v1";

// Get API key at runtime (not at build time)
function getApiKey(): string {
  return process.env.CRICKET_API_KEY || "";
}

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, params: Record<string, string> = {}, noCache: boolean = false): Promise<APIResponse<T> | null> {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.error("CRICKET_API_KEY is not configured");
      return null;
    }
    
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.append("apikey", apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });

    const fetchOptions: RequestInit = noCache 
      ? { cache: "no-store" }
      : { next: { revalidate: 30 } };

    const response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      console.error(`API request failed: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    if (data.status !== "success") {
      console.error("API returned error status:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// ============================================
// LIST APIs (7 endpoints)
// ============================================

/**
 * 1. Current Matches - Get recent matches with detailed scores
 * Endpoint: /v1/currentMatches
 */
export async function getCurrentMatches(offset: number = 0): Promise<Match[]> {
  const response = await fetchAPI<Match[]>("currentMatches", { offset: offset.toString() });
  return response?.data || [];
}

/**
 * 2. eCricScore - Get all matches with simplified data (fixture/live/result)
 * Endpoint: /v1/cricScore
 * PRIMARY endpoint for live matches display
 */
export async function getCricScore(noCache: boolean = false): Promise<CricScoreMatch[]> {
  const response = await fetchAPI<CricScoreMatch[]>("cricScore", {}, noCache);
  return response?.data || [];
}

/**
 * Get LIVE matches only (from eCricScore API)
 * Filter: ms === "live"
 */
export async function getLiveMatches(noCache: boolean = true): Promise<CricScoreMatch[]> {
  const matches = await getCricScore(noCache);
  return matches.filter(isCricScoreLive);
}

/**
 * Get UPCOMING matches only (from eCricScore API)
 * Filter: ms === "fixture"
 */
export async function getUpcomingMatches(): Promise<CricScoreMatch[]> {
  const matches = await getCricScore();
  return matches.filter(isCricScoreUpcoming);
}

/**
 * Get COMPLETED matches only (from eCricScore API)
 * Filter: ms === "result"
 */
export async function getCompletedMatches(): Promise<CricScoreMatch[]> {
  const matches = await getCricScore();
  return matches.filter(isCricScoreCompleted);
}

/**
 * Get all matches categorized by status
 */
export async function getAllMatchesCategorized(noCache: boolean = false): Promise<{
  live: CricScoreMatch[];
  upcoming: CricScoreMatch[];
  completed: CricScoreMatch[];
}> {
  const matches = await getCricScore(noCache);
  return {
    live: matches.filter(isCricScoreLive),
    upcoming: matches.filter(isCricScoreUpcoming),
    completed: matches.filter(isCricScoreCompleted),
  };
}

/**
 * 3. Series Search - Search series by name
 * Endpoint: /v1/series?search=
 */
export async function searchSeries(query: string, offset: number = 0): Promise<Series[]> {
  const response = await fetchAPI<Series[]>("series", {
    offset: offset.toString(),
    search: query,
  });
  return response?.data || [];
}

/**
 * 4. Series List - Get all series
 * Endpoint: /v1/series
 */
export async function getSeriesList(offset: number = 0): Promise<Series[]> {
  const response = await fetchAPI<Series[]>("series", { offset: offset.toString() });
  return response?.data || [];
}

/**
 * 5. Matches List - Get all matches
 * Endpoint: /v1/matches
 */
export async function getMatchesList(offset: number = 0): Promise<Match[]> {
  const response = await fetchAPI<Match[]>("matches", { offset: offset.toString() });
  return response?.data || [];
}

/**
 * 6. Players List - Get all players
 * Endpoint: /v1/players
 */
export async function getPlayersList(offset: number = 0): Promise<Player[]> {
  const response = await fetchAPI<Player[]>("players", { offset: offset.toString() });
  return response?.data || [];
}

/**
 * 7. Players Search - Search players by name
 * Endpoint: /v1/players?search=
 */
export async function searchPlayers(query: string, offset: number = 0): Promise<Player[]> {
  const response = await fetchAPI<Player[]>("players", {
    offset: offset.toString(),
    search: query,
  });
  return response?.data || [];
}

// ============================================
// CRICKET INFO APIs (3 endpoints)
// ============================================

/**
 * 8. Series Info - Get detailed series information
 * Endpoint: /v1/series_info?id=
 */
export async function getSeriesInfo(seriesId: string): Promise<{ info: SeriesInfo; matchList?: Match[] } | null> {
  const response = await fetchAPI<{ info: SeriesInfo; matchList?: Match[] }>("series_info", { id: seriesId });
  return response?.data || null;
}

/**
 * 9. Match Info - Get detailed match information
 * Endpoint: /v1/match_info?id=
 */
export async function getMatchInfo(matchId: string): Promise<Match | null> {
  const response = await fetchAPI<Match>("match_info", { id: matchId });
  return response?.data || null;
}

/**
 * 10. Player Info - Get detailed player information and stats
 * Endpoint: /v1/players_info?id=
 */
export async function getPlayerInfo(playerId: string): Promise<PlayerInfo | null> {
  const response = await fetchAPI<PlayerInfo>("players_info", { id: playerId });
  return response?.data || null;
}

// ============================================
// FANTASY APIs (5 endpoints)
// ============================================

/**
 * 11. Fantasy Squad (Match Squad) - Get team lineup for a match
 * Endpoint: /v1/match_squad?id=
 */
export async function getMatchSquad(matchId: string): Promise<MatchSquad[]> {
  const response = await fetchAPI<MatchSquad[]>("match_squad", { id: matchId });
  return response?.data || [];
}

/**
 * 12. Series Squads - Get all team squads for a series
 * Endpoint: /v1/series_squad?id=
 */
export async function getSeriesSquad(seriesId: string): Promise<SeriesSquad[]> {
  const response = await fetchAPI<SeriesSquad[]>("series_squad", { id: seriesId });
  return response?.data || [];
}

/**
 * 13. Fantasy Scorecard - Get full match scorecard
 * Endpoint: /v1/match_scorecard?id=
 */
export async function getMatchScorecard(matchId: string): Promise<MatchScorecard | null> {
  const response = await fetchAPI<MatchScorecard>("match_scorecard", { id: matchId });
  return response?.data || null;
}

/**
 * 14. Fantasy Match Points - Get fantasy points for players
 * Endpoint: /v1/match_points?id=
 */
export async function getMatchPoints(matchId: string, ruleset: number = 0): Promise<MatchPoints | null> {
  const response = await fetchAPI<MatchPoints>("match_points", {
    id: matchId,
    ruleset: ruleset.toString(),
  });
  return response?.data || null;
}

/**
 * 15. Series Point Table - Get points table for a series
 * Endpoint: /v1/series_points?id=
 */
export async function getSeriesPoints(seriesId: string): Promise<SeriesPointsEntry[]> {
  const response = await fetchAPI<SeriesPointsEntry[]>("series_points", { id: seriesId });
  return response?.data || [];
}

// ============================================
// LEGACY HELPER FUNCTIONS (for backward compatibility)
// ============================================

// Get LIVE matches from Current Matches API (legacy)
export function getLiveMatchesFromList(matches: Match[]): Match[] {
  return matches.filter(isMatchLive);
}

// Get TODAY's LIVE matches (legacy)
export function getTodayLiveMatches(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchLive(match) && isMatchToday(match.dateTimeGMT));
}

// Get upcoming matches from list (legacy)
export function getUpcomingMatchesFromList(matches: Match[]): Match[] {
  return matches.filter(isMatchUpcoming);
}

// Get TODAY's upcoming matches (legacy)
export function getTodayUpcomingMatches(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchUpcoming(match) && isMatchToday(match.dateTimeGMT));
}

// Get completed matches from list (legacy)
export function getCompletedMatchesFromList(matches: Match[]): Match[] {
  return matches.filter(isMatchCompleted);
}

// Get TODAY's completed matches (legacy)
export function getTodayCompletedMatches(matches: Match[]): Match[] {
  return matches.filter((match) => isMatchCompleted(match) && isMatchToday(match.dateTimeGMT));
}

// Get fantasy-enabled matches (legacy)
export function getFantasyEnabledMatches(matches: Match[]): Match[] {
  return matches.filter((match) => match.fantasyEnabled);
}

// Get matches with squad available (legacy)
export function getMatchesWithSquad(matches: Match[]): Match[] {
  return matches.filter((match) => match.hasSquad);
}

// Filter matches by status (legacy)
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

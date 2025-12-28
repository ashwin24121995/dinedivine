// ============================================
// Cricket API Types for DineDivine
// ============================================

// ============================================
// TIMEZONE UTILITIES (GMT to IST)
// ============================================

// IST Timezone offset (5 hours 30 minutes ahead of GMT)
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

// Convert GMT date to IST
export function convertToIST(dateString: string): Date {
  const gmtDate = new Date(dateString);
  return new Date(gmtDate.getTime() + IST_OFFSET_MS);
}

// Get current date in IST
export function getCurrentDateIST(): Date {
  const now = new Date();
  return new Date(now.getTime() + IST_OFFSET_MS);
}

// Get today's date string in IST (YYYY-MM-DD format)
export function getTodayDateStringIST(): string {
  const istNow = getCurrentDateIST();
  return istNow.toISOString().split("T")[0];
}

// Check if a match date is today in IST
export function isMatchToday(matchDateGMT: string): boolean {
  const matchDateIST = convertToIST(matchDateGMT);
  const todayIST = getCurrentDateIST();
  
  return (
    matchDateIST.getFullYear() === todayIST.getFullYear() &&
    matchDateIST.getMonth() === todayIST.getMonth() &&
    matchDateIST.getDate() === todayIST.getDate()
  );
}

// Format date for display in IST
export function formatMatchDate(dateString: string): string {
  const istDate = convertToIST(dateString);
  return istDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

// Format time for display in IST
export function formatMatchTime(dateTimeGMT: string): string {
  const istDate = convertToIST(dateTimeGMT);
  return istDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

// Format date and time together in IST
export function formatMatchDateTime(dateTimeGMT: string): string {
  const istDate = convertToIST(dateTimeGMT);
  return istDate.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

// Format match type display
export function formatMatchType(matchType: string): string {
  const types: Record<string, string> = {
    t20: "T20",
    odi: "ODI",
    test: "Test",
    t10: "T10",
  };
  return types[matchType.toLowerCase()] || matchType.toUpperCase();
}

// ============================================
// API RESPONSE WRAPPER
// ============================================

export interface APIInfo {
  hitsToday: number;
  hitsUsed: number;
  hitsLimit: number;
  credits: number;
  server: number;
  offsetRows?: number;
  totalRows?: number;
  queryTime: number;
  s: number;
  cache: number;
}

export interface APIResponse<T> {
  apikey: string;
  data: T;
  status: string;
  info: APIInfo;
}

// ============================================
// eCricScore API Types (Simplified Match Data)
// Used for: Live matches, Upcoming fixtures, Recent results
// ============================================

/**
 * Match status from eCricScore API
 * - "fixture" = Upcoming match (not started)
 * - "live" = Currently playing
 * - "result" = Completed match
 */
export type CricScoreMatchStatus = "fixture" | "live" | "result";

export interface CricScoreMatch {
  id: string;
  dateTimeGMT: string;
  matchType: string;
  status: string;
  ms: CricScoreMatchStatus;  // Match status: fixture | live | result
  t1: string;     // Team 1 name e.g., "India" or "India [IND]"
  t2: string;     // Team 2 name
  t1s: string;    // Team 1 score e.g., "185/5 (20)" or ""
  t2s: string;    // Team 2 score
  t1img: string;  // Team 1 image URL
  t2img: string;  // Team 2 image URL
  series: string; // Series name
}

// eCricScore filter functions
export function isCricScoreLive(match: CricScoreMatch): boolean {
  return match.ms === "live";
}

export function isCricScoreUpcoming(match: CricScoreMatch): boolean {
  return match.ms === "fixture";
}

export function isCricScoreCompleted(match: CricScoreMatch): boolean {
  return match.ms === "result";
}

// Parse team name from eCricScore format
export function parseTeamName(teamStr: string): { name: string; shortname: string } {
  const match = teamStr.match(/^(.+?)\s*\[([A-Z]+)\]$/);
  if (match) {
    return { name: match[1].trim(), shortname: match[2] };
  }
  return { name: teamStr, shortname: teamStr.substring(0, 3).toUpperCase() };
}

// Parse score string from eCricScore format
export function parseScore(scoreStr: string): { runs: number; wickets: number; overs: number } | null {
  if (!scoreStr || scoreStr.trim() === "") {
    return null;
  }
  const match = scoreStr.match(/(\d+)\/(\d+)\s*\((\d+(?:\.\d+)?)\)/);
  if (match) {
    return {
      runs: parseInt(match[1]),
      wickets: parseInt(match[2]),
      overs: parseFloat(match[3]),
    };
  }
  const simpleMatch = scoreStr.match(/(\d+)\/(\d+)/);
  if (simpleMatch) {
    return {
      runs: parseInt(simpleMatch[1]),
      wickets: parseInt(simpleMatch[2]),
      overs: 0,
    };
  }
  return null;
}

// ============================================
// Current Matches / Matches API Types (Detailed)
// ============================================

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number;      // Runs
  w: number;      // Wickets
  o: number;      // Overs
  inning: string; // Inning name
}

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score?: Score[];
  series_id?: string;
  fantasyEnabled?: boolean;
  bbbEnabled?: boolean;
  hasSquad?: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

// Match status helpers for Current Matches API
export type MatchStatus = "upcoming" | "live" | "completed";

export function isMatchUpcoming(match: Match): boolean {
  return !match.matchStarted && !match.matchEnded;
}

export function isMatchLive(match: Match): boolean {
  return match.matchStarted && !match.matchEnded;
}

export function isMatchCompleted(match: Match): boolean {
  return match.matchStarted && match.matchEnded;
}

export function getMatchStatus(match: Match): MatchStatus {
  if (isMatchLive(match)) return "live";
  if (isMatchCompleted(match)) return "completed";
  return "upcoming";
}

// ============================================
// Series Types
// ============================================

export interface Series {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
}

export interface SeriesInfo {
  id: string;
  name: string;
  startdate: string;
  enddate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
}

// ============================================
// Player Types
// ============================================

export interface Player {
  id: string;
  name: string;
  country: string;
}

export interface PlayerInfo {
  id: string;
  name: string;
  role: string;
  battingStyle: string;
  bowlingStyle?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  country: string;
  playerImg: string;
  stats?: PlayerStats[];
}

export interface PlayerStats {
  fn: string;       // "batting" or "bowling"
  matchtype: string;
  stat: string;
  value: string;
}

// ============================================
// Squad Types
// ============================================

export interface SquadPlayer {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country: string;
  playerImg?: string;
}

export interface MatchSquad {
  teamName: string;
  shortname: string;
  img: string;
  players: SquadPlayer[];
}

export interface SeriesSquad {
  teamName: string;
  shortname: string;
  img: string;
  players: SquadPlayer[];
}

// ============================================
// Scorecard Types
// ============================================

export interface BattingScorecard {
  batsman: {
    id: string;
    name: string;
  };
  dismissal: string;
  r: number;
  b: number;
  "4s": number;
  "6s": number;
  sr: number;
}

export interface BowlingScorecard {
  bowler: {
    id: string;
    name: string;
  };
  o: number;
  m: number;
  r: number;
  w: number;
  nb: number;
  wd: number;
  eco: number;
}

export interface InningsScorecard {
  inning: string;
  batting: BattingScorecard[];
  bowling: BowlingScorecard[];
  extras?: {
    r: number;
    b: number;
  };
  total?: {
    r: number;
    w: number;
    o: number;
  };
}

export interface MatchScorecard extends Match {
  scorecard?: InningsScorecard[];
}

// ============================================
// Fantasy Points Types
// ============================================

export interface PlayerPoints {
  id: string;
  name: string;
  altnames?: string[];
  points: number;
}

export interface InningsPoints {
  inning: string;
  batting: PlayerPoints[];
  bowling: PlayerPoints[];
}

export interface MatchPoints {
  innings: InningsPoints[];
}

// ============================================
// Series Points Table Types
// ============================================

export interface SeriesPointsEntry {
  teamname: string;
  shortname: string;
  img: string;
  matches: number;
  wins: number;
  loss: number;
  ties: number;
  nr: number;
}

// Cricket API Types

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number; // runs
  w: number; // wickets
  o: number; // overs
  inning: string;
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
  score: Score[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

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

export interface Player {
  id: string;
  name: string;
  country: string;
}

export interface PlayerInfo {
  id: string;
  name: string;
  country: string;
  dateOfBirth: string;
  placeOfBirth: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  stats: PlayerStats[];
}

export interface PlayerStats {
  fn: string; // format name
  matchtype: string;
  stat: string;
  value: string;
}

export interface SquadPlayer {
  id: string;
  name: string;
  country: string;
}

export interface MatchSquad {
  teamName: string;
  shortname: string;
  img: string;
  players: SquadPlayer[];
}

export interface APIInfo {
  hitsToday: number;
  hitsUsed: number;
  hitsLimit: number;
  credits: number;
  server: number;
  offsetRows: number;
  totalRows: number;
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

// Check if match is upcoming (not started yet)
export function isMatchUpcoming(match: Match): boolean {
  return !match.matchStarted && !match.matchEnded;
}

// Check if match is live (started but not ended)
export function isMatchLive(match: Match): boolean {
  return match.matchStarted && !match.matchEnded;
}

// Check if match is completed
export function isMatchCompleted(match: Match): boolean {
  return match.matchStarted && match.matchEnded;
}

// Match status helpers
export type MatchStatus = "upcoming" | "live" | "completed";

export function getMatchStatus(match: Match): MatchStatus {
  if (isMatchLive(match)) {
    return "live";
  } else if (isMatchCompleted(match)) {
    return "completed";
  } else {
    return "upcoming";
  }
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

# Cricket Data API Endpoints

## API Key
`1a822521-d7e0-46ff-98d3-3e51020863f3`

## Base URL
`https://api.cricapi.com/v1/`

## Available Endpoints

### 1. Current Matches
- **URL:** `https://api.cricapi.com/v1/currentMatches?apikey={apikey}&offset=0`
- **Description:** Get list of current/recent matches with scores

### 2. Current Series List
- **URL:** `https://api.cricapi.com/v1/series?apikey={apikey}&offset=0`
- **Description:** Get list of current cricket series

### 3. Fixtures / Live Matches List
- **URL:** `https://api.cricapi.com/v1/matches?apikey={apikey}&offset=0`
- **Description:** Get fixtures and live matches (+/- 7 days)

### 4. Match Info (Detailed)
- **URL:** `https://api.cricapi.com/v1/match_info?apikey={apikey}&id={match_id}`
- **Description:** Get detailed match information

### 5. Match Scorecard
- **URL:** `https://api.cricapi.com/v1/match_scorecard?apikey={apikey}&id={match_id}`
- **Description:** Get detailed scorecard for a match

### 6. Match Squad
- **URL:** `https://api.cricapi.com/v1/match_squad?apikey={apikey}&id={match_id}`
- **Description:** Get squad/players for a match

### 7. Players List
- **URL:** `https://api.cricapi.com/v1/players?apikey={apikey}&offset=0&search={name}`
- **Description:** Search for players

### 8. Player Info
- **URL:** `https://api.cricapi.com/v1/players_info?apikey={apikey}&id={player_id}`
- **Description:** Get detailed player information

## Response Structure

```json
{
  "apikey": "...",
  "data": [...],
  "status": "success",
  "info": {
    "hitsToday": 316,
    "hitsUsed": 1,
    "hitsLimit": 9999999,
    "credits": 0,
    "server": 18,
    "offsetRows": 0,
    "totalRows": 4,
    "queryTime": 13.7857,
    "s": 0,
    "cache": 1
  }
}
```

## Match Object Structure

```json
{
  "id": "f46311e6-36c5-42da-a0d0-b2fdc7bbd6ce",
  "name": "Gulf Giants vs Abu Dhabi Knight Riders, 30th Match",
  "matchType": "t20",
  "status": "Abu Dhabi Knight Riders won by 32 runs",
  "venue": "Dubai International Cricket Stadium, Dubai",
  "date": "2025-12-28",
  "dateTimeGMT": "2025-12-28T14:30:00",
  "teams": ["Gulf Giants", "Abu Dhabi Knight Riders"],
  "teamInfo": [
    {
      "name": "Abu Dhabi Knight Riders",
      "shortname": "ABD",
      "img": "https://g.cricapi.com/iapi/4145-638110225298133133.webp?w=48"
    }
  ],
  "score": [
    {
      "r": 179,
      "w": 1,
      "o": 20,
      "inning": "Abu Dhabi Knight Riders Inning 1"
    }
  ],
  "series_id": "35c5209a-781b-48f9-8675-0f57be850b4a",
  "fantasyEnabled": true,
  "bbbEnabled": false,
  "hasSquad": true,
  "matchStarted": true,
  "matchEnded": true
}
```

## Key Fields for Fantasy Cricket

- `fantasyEnabled`: Boolean - Whether fantasy is enabled for this match
- `hasSquad`: Boolean - Whether squad data is available
- `matchStarted`: Boolean - Match has started
- `matchEnded`: Boolean - Match has ended
- `score`: Array - Score details with runs (r), wickets (w), overs (o)

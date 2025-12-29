import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken, getAuthCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface LeaderboardRow {
  user_id: number;
  user_name: string;
  total_points: number;
  total_contests: number;
  total_wins: number;
  level: number;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "global";

    let currentUserId: number | null = null;
    
    // Try to get current user
    const token = await getAuthCookie();
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        currentUserId = payload.id as number;
      }
    }

    // Get leaderboard data
    const leaderboard = await query<LeaderboardRow[]>(
      `SELECT 
        us.user_id,
        u.full_name as user_name,
        us.total_points,
        us.total_contests_joined as total_contests,
        us.total_wins,
        us.level
      FROM user_stats us
      JOIN users u ON us.user_id = u.id
      ORDER BY us.total_points DESC
      LIMIT 100`
    );

    // Add rank and isCurrentUser flag
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      isCurrentUser: entry.user_id === currentUserId,
    }));

    // Get current user's rank if not in top 100
    let currentUserRank = null;
    if (currentUserId) {
      const userInTop = rankedLeaderboard.find((e) => e.isCurrentUser);
      if (userInTop) {
        currentUserRank = userInTop;
      } else {
        // Get user's actual rank
        const userStats = await query<LeaderboardRow[]>(
          `SELECT 
            us.user_id,
            u.full_name as user_name,
            us.total_points,
            us.total_contests_joined as total_contests,
            us.total_wins,
            us.level
          FROM user_stats us
          JOIN users u ON us.user_id = u.id
          WHERE us.user_id = ?`,
          [currentUserId]
        );

        if (userStats.length > 0) {
          const rankResult = await query<{ rank: number }[]>(
            `SELECT COUNT(*) + 1 as rank FROM user_stats WHERE total_points > (SELECT total_points FROM user_stats WHERE user_id = ?)`,
            [currentUserId]
          );
          
          currentUserRank = {
            ...userStats[0],
            rank: rankResult[0]?.rank || 0,
            isCurrentUser: true,
          };
        }
      }
    }

    return NextResponse.json({
      success: true,
      leaderboard: rankedLeaderboard,
      currentUserRank,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

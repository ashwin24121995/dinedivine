import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Create user_teams table if not exists
    await query(`
      CREATE TABLE IF NOT EXISTS user_teams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        match_id VARCHAR(255) NOT NULL,
        team_name VARCHAR(255) NOT NULL,
        total_credits_used DECIMAL(5,2) DEFAULT 0,
        total_points DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_match (user_id, match_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Add missing columns to user_teams if they don't exist
    try {
      await query(`ALTER TABLE user_teams ADD COLUMN total_credits_used DECIMAL(5,2) DEFAULT 0`);
    } catch (e) {
      // Column might already exist, ignore error
    }

    try {
      await query(`ALTER TABLE user_teams ADD COLUMN total_points DECIMAL(10,2) DEFAULT 0`);
    } catch (e) {
      // Column might already exist, ignore error
    }

    // Create team_players table if not exists
    await query(`
      CREATE TABLE IF NOT EXISTS team_players (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT NOT NULL,
        player_id VARCHAR(255) NOT NULL,
        player_name VARCHAR(255) NOT NULL,
        player_role VARCHAR(50) NOT NULL,
        credits DECIMAL(4,2) DEFAULT 0,
        is_captain TINYINT(1) DEFAULT 0,
        is_vice_captain TINYINT(1) DEFAULT 0,
        points DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_team (team_id),
        FOREIGN KEY (team_id) REFERENCES user_teams(id) ON DELETE CASCADE
      )
    `);

    // Create contests table if not exists
    await query(`
      CREATE TABLE IF NOT EXISTS contests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        match_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        entry_fee DECIMAL(10,2) DEFAULT 0,
        prize_pool DECIMAL(10,2) DEFAULT 0,
        max_participants INT DEFAULT 100,
        current_participants INT DEFAULT 0,
        status ENUM('upcoming', 'live', 'completed') DEFAULT 'upcoming',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_match (match_id)
      )
    `);

    // Add name column if it doesn't exist (migration for old schema)
    try {
      await query(`ALTER TABLE contests ADD COLUMN name VARCHAR(255) NOT NULL DEFAULT ''`);
    } catch (e) {
      // Column might already exist
    }

    // If old schema had contest_name, copy data to name
    try {
      await query(`UPDATE contests SET name = contest_name WHERE name = '' AND contest_name IS NOT NULL`);
    } catch (e) {
      // contest_name column might not exist
    }

    // Create contest_entries table if not exists
    await query(`
      CREATE TABLE IF NOT EXISTS contest_entries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        contest_id INT NOT NULL,
        user_id INT NOT NULL,
        team_id INT NOT NULL,
        rank_position INT DEFAULT 0,
        points_earned DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_entry (contest_id, user_id, team_id),
        FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES user_teams(id) ON DELETE CASCADE
      )
    `);

    // Check which tables exist
    const tables = await query<{ Tables_in_railway: string }[]>(
      "SHOW TABLES"
    );

    // Get columns from user_teams to verify
    const columns = await query<{ Field: string }[]>(
      "SHOW COLUMNS FROM user_teams"
    );

    // Get columns from contests to verify
    const contestColumns = await query<{ Field: string }[]>(
      "SHOW COLUMNS FROM contests"
    );

    return NextResponse.json({
      success: true,
      message: "Database tables created/verified successfully",
      tables: tables.map((t: Record<string, string>) => Object.values(t)[0]),
      user_teams_columns: columns.map((c: { Field: string }) => c.Field),
      contests_columns: contestColumns.map((c: { Field: string }) => c.Field),
    });
  } catch (error) {
    console.error("Database init error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}

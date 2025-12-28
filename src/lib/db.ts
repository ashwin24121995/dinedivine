import mysql from "mysql2/promise";

// Database connection configuration
const dbConfig = {
  uri: process.env.DATABASE_URL || "mysql://root:hesKScPnfMSIJUxgAPNemuNKGaMuSMYz@metro.proxy.rlwy.net:32817/railway",
};

// Create a connection pool for better performance
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig.uri);
  }
  return pool;
}

// Execute a query with parameters
export async function query<T>(sql: string, params: unknown[] = []): Promise<T> {
  const pool = getPool();
  const [results] = await pool.execute(sql, params);
  return results as T;
}

// Get a single connection for transactions
export async function getConnection(): Promise<mysql.PoolConnection> {
  const pool = getPool();
  return pool.getConnection();
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

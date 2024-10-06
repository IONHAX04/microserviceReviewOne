import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();
import configData from "./db_config";

let config;

if (process.env.NODE_ENV === "production") {
  config = configData.production;
} else if (process.env.NODE_ENV === "testing") {
  config = configData.testing;
} else {
  config = configData.local;
}

const pool = new Pool({
  user: config.username, // PostgreSQL username
  host: config.host.writer, // PostgreSQL host
  database: config.database, // PostgreSQL database name
  password: config.password, // Password from env
  port: 5432, // Default PostgreSQL port
  max: 500, // Max number of clients in the pool
  idleTimeoutMillis: 20000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 30000, // Time allowed for a connection to be established
});

// Pool Error Handling
pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1); // Exit if there's an issue
});

// Function to connect and query the database
const connectAndQuery = async (query: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release(); // Always release the client back to the pool after using
  }
};

// Example of exporting the pool and the query function
export { pool, connectAndQuery };

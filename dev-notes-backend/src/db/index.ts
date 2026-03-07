import { Pool } from "pg"
// Imports the 'Pool' class from the 'pg' (node-postgres) library, which manages a collection of reusable connections to your database.

import dotenv from "dotenv"
// Imports the 'dotenv' library, which allows your code to read variables from a hidden '.env' file.

dotenv.config()
// Executes the configuration function that loads all key-value pairs from your '.env' file into 'process.env', making them accessible in your code.

export const pool = new Pool({
// Creates and exports a new instance of a connection pool so other files in your project can use it to run queries.
 connectionString: process.env.DATABASE_URL
 // Tells the pool exactly where the database is located and how to log in by using the 'DATABASE_URL' variable stored safely in your environment settings.
})

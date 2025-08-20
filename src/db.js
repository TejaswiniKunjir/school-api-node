// src/db.js
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Writable on Vercel: /tmp
const isVercel = !!process.env.VERCEL;

// Where to create/open the DB file
const dbPath = isVercel
  ? "/tmp/school.db"
  : path.join(process.cwd(), "school.db");



const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS schools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;

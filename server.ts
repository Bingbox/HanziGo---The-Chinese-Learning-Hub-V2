import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "server-data");
const DB_PATH = path.join(DATA_DIR, "hanzigo.db");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR);
  }
}

function initDb() {
  const db = new Database(DB_PATH);
  
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS learn (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS exercises (
      id TEXT PRIMARY KEY,
      unit_id TEXT NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (unit_id) REFERENCES learn (id)
    );
    
    CREATE TABLE IF NOT EXISTS explore (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS culture_topics (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES explore (id)
    );
    
    CREATE TABLE IF NOT EXISTS exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      data TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      level INTEGER NOT NULL,
      type TEXT NOT NULL,
      data TEXT NOT NULL
    );
  `);
  
  return db;
}

async function startServer() {
  await ensureDataDir();
  const db = initDb();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes for Learn
  app.get("/api/content/learn", (req, res) => {
    const rows = db.prepare("SELECT data FROM learn").all();
    res.json(rows.map(row => JSON.parse(row.data)));
  });

  app.post("/api/content/learn", (req, res) => {
    const items = req.body;
    const deleteStmt = db.prepare("DELETE FROM learn");
    const insertStmt = db.prepare("INSERT INTO learn (id, data) VALUES (?, ?)");
    
    const transaction = db.transaction((data) => {
      deleteStmt.run();
      for (const item of data) {
        insertStmt.run(item.id, JSON.stringify(item));
      }
    });
    
    try {
      transaction(items);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save learn content" });
    }
  });

  // API Routes for Explore
  app.get("/api/content/explore", (req, res) => {
    const rows = db.prepare("SELECT data FROM explore").all();
    res.json(rows.map(row => JSON.parse(row.data)));
  });

  app.post("/api/content/explore", (req, res) => {
    const items = req.body;
    const deleteStmt = db.prepare("DELETE FROM explore");
    const insertStmt = db.prepare("INSERT INTO explore (id, data) VALUES (?, ?)");
    
    const transaction = db.transaction((data) => {
      deleteStmt.run();
      for (const item of data) {
        insertStmt.run(item.id, JSON.stringify(item));
      }
    });
    
    try {
      transaction(items);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save explore content" });
    }
  });

  // API Routes for Exercises
  app.get("/api/exercises/:unitId", (req, res) => {
    const { unitId } = req.params;
    const rows = db.prepare("SELECT data FROM exercises WHERE unit_id = ?").all(unitId);
    res.json(rows.map(row => JSON.parse(row.data)));
  });

  app.post("/api/exercises/:unitId", (req, res) => {
    const { unitId } = req.params;
    const items = req.body;
    const deleteStmt = db.prepare("DELETE FROM exercises WHERE unit_id = ?");
    const insertStmt = db.prepare("INSERT INTO exercises (id, unit_id, data) VALUES (?, ?, ?)");
    
    const transaction = db.transaction((data) => {
      deleteStmt.run(unitId);
      for (const item of data) {
        insertStmt.run(item.id, unitId, JSON.stringify(item));
      }
    });
    
    try {
      transaction(items);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save exercises" });
    }
  });

  // API Routes for Culture Topics
  app.get("/api/culture/topics/:categoryId", (req, res) => {
    const { categoryId } = req.params;
    const rows = db.prepare("SELECT data FROM culture_topics WHERE category_id = ?").all(categoryId);
    res.json(rows.map(row => JSON.parse(row.data)));
  });

  app.post("/api/culture/topics/:categoryId", (req, res) => {
    const { categoryId } = req.params;
    const items = req.body;
    const deleteStmt = db.prepare("DELETE FROM culture_topics WHERE category_id = ?");
    const insertStmt = db.prepare("INSERT INTO culture_topics (id, category_id, data) VALUES (?, ?, ?)");
    
    const transaction = db.transaction((data) => {
      deleteStmt.run(categoryId);
      for (const item of data) {
        insertStmt.run(item.id, categoryId, JSON.stringify(item));
      }
    });
    
    try {
      transaction(items);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save culture topics" });
    }
  });

  // API Routes for Exams (Categories)
  app.get("/api/content/exams", (req, res) => {
    const row = db.prepare("SELECT data FROM exams WHERE title = 'hsk_categories'").get();
    if (row) {
      res.json(JSON.parse(row.data));
    } else {
      res.json([]);
    }
  });

  app.post("/api/content/exams", (req, res) => {
    const data = JSON.stringify(req.body);
    const stmt = db.prepare("INSERT OR REPLACE INTO exams (title, data) VALUES ('hsk_categories', ?)");
    try {
      stmt.run(data);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save exam categories" });
    }
  });

  // API Routes for Questions
  app.get("/api/questions/:level", (req, res) => {
    const { level } = req.params;
    const rows = db.prepare("SELECT data FROM questions WHERE level = ?").all(level);
    res.json(rows.map(row => JSON.parse(row.data)));
  });

  app.post("/api/questions/:level", (req, res) => {
    const { level } = req.params;
    const questions = req.body;
    const deleteStmt = db.prepare("DELETE FROM questions WHERE level = ?");
    const insertStmt = db.prepare("INSERT INTO questions (id, level, type, data) VALUES (?, ?, ?, ?)");
    
    const transaction = db.transaction((data) => {
      deleteStmt.run(level);
      for (const q of data) {
        insertStmt.run(q.id, level, q.type, JSON.stringify(q));
      }
    });
    
    try {
      transaction(questions);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save questions" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

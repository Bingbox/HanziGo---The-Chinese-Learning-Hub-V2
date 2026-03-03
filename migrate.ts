import Database from "better-sqlite3";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "server-data");
const DB_PATH = path.join(DATA_DIR, "hanzigo.db");

async function migrate() {
  const db = new Database(DB_PATH);
  
  // Create tables
  db.exec(`
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS learn;
    DROP TABLE IF EXISTS exercises;
    DROP TABLE IF EXISTS explore;
    DROP TABLE IF EXISTS culture_topics;
    DROP TABLE IF EXISTS exams;
    DROP TABLE IF EXISTS questions;
    PRAGMA foreign_keys = ON;

    CREATE TABLE learn (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    
    CREATE TABLE exercises (
      id TEXT PRIMARY KEY,
      unit_id TEXT NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (unit_id) REFERENCES learn (id)
    );
    
    CREATE TABLE explore (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    
    CREATE TABLE culture_topics (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES explore (id)
    );
    
    CREATE TABLE exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      data TEXT NOT NULL
    );
    
    CREATE TABLE questions (
      id TEXT PRIMARY KEY,
      level INTEGER NOT NULL,
      type TEXT NOT NULL,
      data TEXT NOT NULL
    );
  `);
  
  console.log("Starting migration...");

  // Migrate Learn
  try {
    const learnData = JSON.parse(await fs.readFile(path.join(DATA_DIR, "learn.json"), "utf-8"));
    const insertLearn = db.prepare("INSERT INTO learn (id, data) VALUES (?, ?)");
    const insertEx = db.prepare("INSERT INTO exercises (id, unit_id, data) VALUES (?, ?, ?)");
    
    for (const item of learnData) {
      insertLearn.run(item.id, JSON.stringify(item));
      // Add sample exercise
      const ex = {
        id: `ex_${item.id}_1`,
        type: 'SELECT',
        question: 'qSelect',
        chinese: '你好',
        pinyin: 'nǐ hǎo',
        answer: 'Hello',
        options: ['Hello', 'Goodbye', 'Thanks', 'Sorry'],
        difficulty: 1,
        meaning: 'Hello'
      };
      insertEx.run(ex.id, item.id, JSON.stringify(ex));
    }
    console.log("Migrated Learn content");
  } catch (e) {
    console.log("Learn migration skipped or failed", e);
  }

  // Migrate Explore
  try {
    const exploreData = JSON.parse(await fs.readFile(path.join(DATA_DIR, "explore.json"), "utf-8"));
    const insertExplore = db.prepare("INSERT INTO explore (id, data) VALUES (?, ?)");
    const insertTopic = db.prepare("INSERT INTO culture_topics (id, category_id, data) VALUES (?, ?, ?)");
    
    for (const item of exploreData) {
      insertExplore.run(item.id, JSON.stringify(item));
      // Add sample topic
      const topic = {
        id: `topic_${item.id}_1`,
        icon: '🏮',
        chineseTitle: '示例话题',
        pinyinTitle: 'Shìlì Huàtí',
        summary: '这是一个示例话题的摘要。',
        fullContentChinese: '这里是详细的中文内容。',
        fullContentTranslated: 'Here is the detailed translated content.',
        keyConcepts: [],
        reflection: '思考题'
      };
      insertTopic.run(topic.id, item.id, JSON.stringify(topic));
    }
    console.log("Migrated Explore content");
  } catch (e) {
    console.log("Explore migration skipped or failed", e);
  }

  // Migrate Exams (Categories)
  try {
    const examsData = JSON.parse(await fs.readFile(path.join(DATA_DIR, "exams.json"), "utf-8"));
    db.prepare("INSERT INTO exams (title, data) VALUES ('hsk_categories', ?)").run(JSON.stringify(examsData));
    console.log("Migrated Exam categories");
  } catch (e) {
    console.log("Exam categories migration skipped or failed", e);
  }

  // Migrate Questions (Sample)
  const insertQ = db.prepare("INSERT INTO questions (id, level, type, data) VALUES (?, ?, ?, ?)");
  for (let level = 1; level <= 6; level++) {
    for (let i = 1; i <= 3; i++) {
      const q = {
        id: `q_hsk${level}_${i}`,
        level,
        type: 'SingleChoice',
        question: { zh: `HSK ${level} 题目 ${i}`, en: `HSK ${level} Question ${i}` },
        options: { zh: ['选项A', '选项B', '选项C', '选项D'], en: ['Opt A', 'Opt B', 'Opt C', 'Opt D'] },
        correctAnswer: '选项A',
        score: 5
      };
      insertQ.run(q.id, level, q.type, JSON.stringify(q));
    }
  }
  console.log("Added sample questions");

  console.log("Migration complete!");
  db.close();
}

migrate();

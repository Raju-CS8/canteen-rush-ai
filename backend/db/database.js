const sqlite3 = require("sqlite3").verbose();

let db;

function initDB() {
  db = new sqlite3.Database("canteen.db", () => {
    console.log("Database connected");

    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        items TEXT,
        status TEXT,
        createdAt TEXT,
        eta INTEGER
      )
    `);
  });
}

function getDB() {
  return db;
}

module.exports = { initDB, getDB };

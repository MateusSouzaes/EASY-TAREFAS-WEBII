// models/queries.js - Promise-based SQLite3 wrapper para operações async/await
const openDb = require('../db');

// Executa SELECT que retorna múltiplas linhas
function all(query, params = []) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Executa SELECT que retorna uma única linha
function get(query, params = []) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      db.close();
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Executa INSERT, UPDATE, DELETE com lastID e changes
function run(query, params = []) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      const lastID = this ? this.lastID : null;
      db.close();
      if (err) reject(err);
      else resolve({ lastID, changes: this ? this.changes : 0 });
    });
  });
}

module.exports = { all, get, run };

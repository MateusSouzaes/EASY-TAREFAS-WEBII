// db.js - Configuração do banco de dados SQLite3
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'taskflow.db');
const INIT_SQL = path.join(__dirname, 'migrations', '001_init.sql');
const SEED_SQL = path.join(__dirname, 'seed', 'seed.sql');

// Deleta banco anterior
function deleteDatabase() {
  if (fs.existsSync(DB_FILE)) {
    fs.unlinkSync(DB_FILE);
    console.log('✓ Banco de dados anterior deletado');
  }
}

// Cria tabelas e insere seed
function runInit() {
  if (!fs.existsSync(INIT_SQL)) {
    console.error('Arquivo de migração não encontrado:', INIT_SQL);
    process.exit(1);
  }
  const db = new sqlite3.Database(DB_FILE);
  const sql = fs.readFileSync(INIT_SQL, 'utf8');
  db.exec(sql, (err) => {
    if (err) {
      console.error('Erro ao criar tabelas:', err);
    } else {
      console.log('✓ Tabelas criadas com sucesso em', DB_FILE);
      // Insere dados seed
      if (fs.existsSync(SEED_SQL)) {
        const seed = fs.readFileSync(SEED_SQL, 'utf8');
        db.exec(seed, (e) => {
          if (e) console.error('Erro ao inserir seed:', e);
          else console.log('✓ Dados seed inseridos com sucesso');
          db.close();
        });
      } else db.close();
    }
  });
}

// Reset completo: deleta e recria
function resetDatabase() {
  console.log('🔄 Iniciando reset do banco de dados...\n');
  deleteDatabase();
  setTimeout(() => {
    runInit();
  }, 500);
}

// Processamento de argumentos CLI
if (require.main === module) {
  const arg = process.argv[2];
  if (arg === '--init') {
    console.log('Criando banco de dados...\n');
    runInit();
  } else if (arg === '--reset') {
    resetDatabase();
  } else {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║         🔧 EASY-Tarefa - Utilitários de Banco de Dados   ║
╚════════════════════════════════════════════════════════════╝

Opções disponíveis:

  node db.js --init      Criar banco de dados com seed
  node db.js --reset     Deletar banco atual e recriar do zero

Exemplos:
  npm run init-db        (usa --init)
  npm run reset-db       (usa --reset)
    `);
  }
}

// Abre conexão com banco
module.exports = function openDb() {
  return new sqlite3.Database(DB_FILE);
};

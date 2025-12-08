// Gerenciador de conexão com banco de dados SQLite
// Equivalente ao DbContext do Entity Framework (C#)

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class AppDbContext {
    static instancia = null;
    static db = null;

    // Inicializa conexão com banco de dados
    static async initialize() {
        return new Promise((resolve, reject) => {
            const caminhoDb = path.join(__dirname, '../../..', 'taskflow.db');

            AppDbContext.db = new sqlite3.Database(caminhoDb, (erro) => {
                if (erro) {
                    reject(new Error(`Erro ao conectar ao banco: ${erro.message}`));
                    return;
                }

                // Ativar chaves estrangeiras (PRAGMA foreign_keys)
                AppDbContext.db.run('PRAGMA foreign_keys = ON', (erro) => {
                    if (erro) {
                        reject(new Error(`Erro ao ativar foreign keys: ${erro.message}`));
                        return;
                    }

                    AppDbContext.db.configure('busyTimeout', 10000);

                    // Criar instância singleton
                    if (!AppDbContext.instancia) {
                        AppDbContext.instancia = new AppDbContext();
                    }

                    resolve(AppDbContext.instancia);
                });
            });
        });
    }

    /**
     * Executa uma query SELECT que retorna múltiplas linhas
     * 
     * Equivalente ao: context.Usuarios.Where(...).ToListAsync()
     * 
     * @async
     * @param {string} sql - Comando SQL (pode usar ? para parâmetros)
     * @param {Array} parametros - Valores para substituir ? na query
     * @returns {Promise<Array>} Array de objetos (linhas)
     * @throws {Error} Se query falhar
     * 
     * @example
     * const usuarios = await executarConsultaArray(
     *   'SELECT * FROM usuario WHERE email = ?',
     *   ['user@email.com']
     * );
     */
    static async executarConsultaArray(sql, parametros = []) {
        return new Promise((resolve, reject) => {
            AppDbContext.db.all(sql, parametros, (erro, linhas) => {
                if (erro) {
                    reject(new Error(`Erro na query: ${erro.message}`));
                    return;
                }
                resolve(linhas || []);
            });
        });
    }

    /**
     * Executa uma query SELECT que retorna uma única linha
     * 
     * Equivalente ao: context.Usuarios.FirstOrDefaultAsync(...)
     * 
     * @async
     * @param {string} sql - Comando SQL (pode usar ? para parâmetros)
     * @param {Array} parametros - Valores para substituir ? na query
     * @returns {Promise<Object|null>} Primeira linha ou null
     * @throws {Error} Se query falhar
     * 
     * @example
     * const usuario = await executarConsultaUnica(
     *   'SELECT * FROM usuario WHERE id_usu = ?',
     *   [1]
     * );
     */
    static async executarConsultaUnica(sql, parametros = []) {
        return new Promise((resolve, reject) => {
            AppDbContext.db.get(sql, parametros, (erro, linha) => {
                if (erro) {
                    reject(new Error(`Erro na query: ${erro.message}`));
                    return;
                }
                resolve(linha || null);
            });
        });
    }

    /**
     * Executa um comando que não retorna dados (INSERT, UPDATE, DELETE)
     * 
     * Equivalente ao: context.SaveChangesAsync()
     * 
     * @async
     * @param {string} sql - Comando SQL (pode usar ? para parâmetros)
     * @param {Array} parametros - Valores para substituir ? na query
     * @returns {Promise<Object>} Objeto com info da execução
     *   - {number} id - lastID para INSERT
     *   - {number} changes - número de linhas afetadas
     * @throws {Error} Se comando falhar
     * 
     * @example
     * // INSERT
     * const resultado = await executarComando(
     *   'INSERT INTO usuario (nome_usu, email_usu) VALUES (?, ?)',
     *   ['João', 'joao@email.com']
     * );
     * console.log(resultado.id); // ID do novo registro
     * 
     * // UPDATE
     * const resultado = await executarComando(
     *   'UPDATE usuario SET nome_usu = ? WHERE id_usu = ?',
     *   ['João Silva', 1]
     * );
     * console.log(resultado.changes); // Número de registros atualizados
     * 
     * // DELETE
     * const resultado = await executarComando(
     *   'DELETE FROM usuario WHERE id_usu = ?',
     *   [1]
     * );
     */
    static async executarComando(sql, parametros = []) {
        return new Promise((resolve, reject) => {
            AppDbContext.db.run(sql, parametros, function (erro) {
                if (erro) {
                    reject(new Error(`Erro ao executar comando: ${erro.message}`));
                    return;
                }

                resolve({
                    id: this.lastID,      // ID do último insert
                    changes: this.changes // Número de linhas afetadas
                });
            });
        });
    }

    /**
     * Fecha a conexão com banco de dados
     * 
     * Chamado ao encerrar a aplicação para liberar recursos e conexões TCP
     * 
     * @async
     * @returns {Promise<void>}
     * @throws {Error} Se falhar ao fechar
     * 
     * @example
     * await AppDbContext.fechar();
     */
    static async fechar() {
        return new Promise((resolve, reject) => {
            if (AppDbContext.db) {
                AppDbContext.db.close((erro) => {
                    if (erro) {
                        reject(new Error(`Erro ao fechar banco: ${erro.message}`));
                        return;
                    }
                    AppDbContext.db = null;
                    AppDbContext.instancia = null;
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}

module.exports = AppDbContext;

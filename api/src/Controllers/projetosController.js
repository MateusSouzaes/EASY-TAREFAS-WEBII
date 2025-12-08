// CRUD de Projetos - Rota: /projetos

const AppDbContext = require('../DataContexts/AppDbContext');
const Projeto = require('../Models/Projeto');
const CriarProjetoDto = require('../Models/Dtos/CriarProjetoDto');

class ProjetosController {
    // GET /projetos - Lista todos os projetos com filtros opcionais
    static async buscarTodos(req, res) {
        try {
            const { search, status } = req.query;

            // Construir query dinâmica
            let sql = 'SELECT * FROM projeto WHERE 1=1';
            const parametros = [];

            if (search) {
                sql += ' AND titulo LIKE ?';
                parametros.push(`%${search}%`);
            }

            if (status) {
                sql += ' AND status = ?';
                parametros.push(status);
            }

            // Executar query
            const projetos = await AppDbContext.executarConsultaArray(sql, parametros);

            res.status(200).json({
                sucesso: true,
                dados: projetos
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * GET /projetos/:id
     * 
     * Retorna um projeto específico com suas tarefas
     * 
     * @async
     * @param {Express.Request} req - Requisição HTTP
     */
    // GET /projetos/:id - Obter projeto específico com suas tarefas
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            // Validar ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID inválido'
                });
            }

            // Buscar projeto
            const projeto = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM projeto WHERE id = ?',
                [id]
            );

            if (!projeto) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Projeto não encontrado'
                });
            }

            // Buscar tarefas do projeto (include)
            const tarefas = await AppDbContext.executarConsultaArray(
                'SELECT * FROM tarefa WHERE id_projeto = ?',
                [id]
            );

            projeto.tarefas = tarefas;

            res.status(200).json({
                sucesso: true,
                dados: projeto
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    // POST /projetos - Criar novo projeto
    static async criar(req, res) {
        try {
            // Validar DTO
            const criarProjetoDto = new CriarProjetoDto(req.body);
            criarProjetoDto.validar();

            // Verificar se usuário dono existe
            const usuario = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM usuario WHERE id = ?',
                [criarProjetoDto.idUsuarioDono]
            );

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário proprietário não encontrado'
                });
            }

            // Inserir novo projeto
            const resultado = await AppDbContext.executarComando(
                'INSERT INTO projeto (titulo, descricao, id_usuario_dono) VALUES (?, ?, ?)',
                [criarProjetoDto.titulo, criarProjetoDto.descricao, criarProjetoDto.idUsuarioDono]
            );

            // Retornar novo projeto
            const novoProjeto = new Projeto({
                id: resultado.id,
                titulo: criarProjetoDto.titulo,
                descricao: criarProjetoDto.descricao,
                idUsuarioDono: criarProjetoDto.idUsuarioDono,
                tarefas: []
            });

            res.status(201).json({
                sucesso: true,
                dados: novoProjeto
            });

        } catch (erro) {
            res.status(400).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * PUT /projetos/:id
     * 
     * Atualiza um projeto existente
     * 
     * @async
     * @param {Express.Request} req - Requisição HTTP
     *   @param {number} id - ID do projeto
     * @param {Express.Response} res - Resposta HTTP
     * 
     * Request body esperado:
     * {
     *   "titulo": "string (10-100 chars)",
     *   "descricao": "string",
     *   "status": "string"
     * }
     * 
     * Resposta sucesso (200): Projeto atualizado
     * Resposta erro (404): Projeto não encontrado
     * 
     * @example
     * PUT /projetos/1
     * Content-Type: application/json
     * 
     * {
     *   "titulo": "Projeto Atualizado",
     *   "descricao": "Nova descrição",
     *   "status": "Ativo"
     * }
     */
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { titulo, descricao, status } = req.body;

            // Validar ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID inválido'
                });
            }

            // Buscar projeto
            const projeto = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM projeto WHERE id = ?',
                [id]
            );

            if (!projeto) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Projeto não encontrado'
                });
            }

            // Atualizar projeto
            await AppDbContext.executarComando(
                'UPDATE projeto SET titulo = ?, descricao = ?, status = ? WHERE id = ?',
                [titulo || projeto.titulo, descricao || projeto.descricao, status || projeto.status, id]
            );

            // Retornar projeto atualizado
            const projetoAtualizado = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM projeto WHERE id = ?',
                [id]
            );

            res.status(200).json({
                sucesso: true,
                dados: projetoAtualizado
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * DELETE /projetos/:id
     * 
     * Remove um projeto e suas tarefas relacionadas
     * 
     * @async
     * @param {Express.Request} req - Requisição HTTP
     *   @param {number} id - ID do projeto
     * @param {Express.Response} res - Resposta HTTP
     * 
     * Resposta sucesso (204): Sem conteúdo
     * Resposta erro (404): Projeto não encontrado
     * 
     * @example
     * DELETE /projetos/1
     */
    static async remover(req, res) {
        try {
            const { id } = req.params;

            // Validar ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID inválido'
                });
            }

            // Buscar projeto
            const projeto = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM projeto WHERE id = ?',
                [id]
            );

            if (!projeto) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Projeto não encontrado'
                });
            }

            // Remover tarefas relacionadas (cascade delete)
            await AppDbContext.executarComando(
                'DELETE FROM tarefa WHERE id_projeto = ?',
                [id]
            );

            // Remover projeto
            await AppDbContext.executarComando(
                'DELETE FROM projeto WHERE id = ?',
                [id]
            );

            res.status(204).send();

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }
}

module.exports = ProjetosController;

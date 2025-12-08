// CRUD de Tarefas - Rota: /tarefas

const AppDbContext = require('../DataContexts/AppDbContext');
const Tarefa = require('../Models/Tarefa');
const CriarTarefaDto = require('../Models/Dtos/CriarTarefaDto');

class TarefasController {
    // GET /tarefas - Lista todas as tarefas com filtros opcionais
    static async buscarTodas(req, res) {
        try {
            const { search, status, projeto } = req.query;

            let sql = 'SELECT * FROM tarefa WHERE 1=1';
            const parametros = [];

            if (search) {
                sql += ' AND titulo LIKE ?';
                parametros.push(`%${search}%`);
            }

            if (status) {
                sql += ' AND status = ?';
                parametros.push(status);
            }

            if (projeto) {
                sql += ' AND id_projeto = ?';
                parametros.push(projeto);
            }

            const tarefas = await AppDbContext.executarConsultaArray(sql, parametros);

            res.status(200).json({
                sucesso: true,
                dados: tarefas
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * GET /tarefas/:id
     * 
     * Retorna uma tarefa específica com seus comentários
     * 
     * @async
     * @param {Express.Request} req - Requisição HTTP
     *   @param {number} id - ID da tarefa
     * @param {Express.Response} res - Resposta HTTP
     */
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID inválido'
                });
            }

            const tarefa = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM tarefa WHERE id = ?',
                [id]
            );

            if (!tarefa) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Tarefa não encontrada'
                });
            }

            // Buscar comentários da tarefa
            const comentarios = await AppDbContext.executarConsultaArray(
                'SELECT * FROM comentario WHERE id_tarefa = ?',
                [id]
            );

            tarefa.comentarios = comentarios;

            res.status(200).json({
                sucesso: true,
                dados: tarefa
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * POST /tarefas
     * 
     * Cria uma nova tarefa
     * 
     * @async
     * @param {Express.Request} req - Requisição HTTP
     * @param {Express.Response} res - Resposta HTTP
     */
    static async criar(req, res) {
        try {
            const criarTarefaDto = new CriarTarefaDto(req.body);
            criarTarefaDto.validar();

            // Verificar se projeto existe
            const projeto = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM projeto WHERE id = ?',
                [criarTarefaDto.idProjeto]
            );

            if (!projeto) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Projeto não encontrado'
                });
            }

            // Inserir nova tarefa
            const resultado = await AppDbContext.executarComando(
                'INSERT INTO tarefa (titulo, descricao, id_projeto) VALUES (?, ?, ?)',
                [criarTarefaDto.titulo, criarTarefaDto.descricao, criarTarefaDto.idProjeto]
            );

            const novaTarefa = new Tarefa({
                id: resultado.id,
                titulo: criarTarefaDto.titulo,
                descricao: criarTarefaDto.descricao,
                idProjeto: criarTarefaDto.idProjeto,
                comentarios: []
            });

            res.status(201).json({
                sucesso: true,
                dados: novaTarefa
            });

        } catch (erro) {
            res.status(400).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * PUT /tarefas/:id
     * 
     * Atualiza uma tarefa existente
     * 
     * @async
     * @param {Express.Request} req - Requisição HTTP
     * @param {Express.Response} res - Resposta HTTP
     */
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { titulo, descricao, status } = req.body;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID inválido'
                });
            }

            const tarefa = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM tarefa WHERE id = ?',
                [id]
            );

            if (!tarefa) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Tarefa não encontrada'
                });
            }

            await AppDbContext.executarComando(
                'UPDATE tarefa SET titulo = ?, descricao = ?, status = ? WHERE id = ?',
                [titulo || tarefa.titulo, descricao || tarefa.descricao, status || tarefa.status, id]
            );

            const tarefaAtualizada = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM tarefa WHERE id = ?',
                [id]
            );

            res.status(200).json({
                sucesso: true,
                dados: tarefaAtualizada
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * DELETE /tarefas/:id
     * 
     * Remove uma tarefa e seus comentários relacionados
     * 
     * @async
     * @param {Express.Request} req - Requisição HTTP
     * @param {Express.Response} res - Resposta HTTP
     */
    static async remover(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID inválido'
                });
            }

            const tarefa = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM tarefa WHERE id = ?',
                [id]
            );

            if (!tarefa) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Tarefa não encontrada'
                });
            }

            // Remover comentários relacionados (cascade delete)
            await AppDbContext.executarComando(
                'DELETE FROM comentario WHERE id_tarefa = ?',
                [id]
            );

            // Remover tarefa
            await AppDbContext.executarComando(
                'DELETE FROM tarefa WHERE id = ?',
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

module.exports = TarefasController;

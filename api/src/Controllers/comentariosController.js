// CRUD de Comentários - Rota: /comentarios

const AppDbContext = require('../DataContexts/AppDbContext');
const Comentario = require('../Models/Comentario');

class ComentariosController {
    // GET /comentarios - Lista todos os comentários com filtros opcionais
    static async buscarTodos(req, res) {
        try {
            const { tarefa, usuario } = req.query;

            let sql = 'SELECT * FROM comentarios WHERE 1=1';
            const parametros = [];

            if (tarefa) {
                sql += ' AND id_tarefa = ?';
                parametros.push(tarefa);
            }

            if (usuario) {
                sql += ' AND id_usuario = ?';
                parametros.push(usuario);
            }

            const comentarios = await AppDbContext.executarConsultaArray(sql, parametros);

            res.status(200).json({
                sucesso: true,
                dados: comentarios
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * GET /comentarios/:id
     * 
     * Retorna um comentário específico
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

            const comentario = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM comentarios WHERE id = ?',
                [id]
            );

            if (!comentario) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Comentário não encontrado'
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: comentario
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * POST /comentarios
     * 
     * Cria um novo comentário
     */
    static async criar(req, res) {
        try {
            const { conteudo, idTarefa, idUsuario } = req.body;

            // Validações
            if (!conteudo) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Conteúdo do comentário é obrigatório'
                });
            }

            if (!idTarefa || isNaN(idTarefa)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID da tarefa é obrigatório'
                });
            }

            if (!idUsuario || isNaN(idUsuario)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID do usuário é obrigatório'
                });
            }

            // Verificar se tarefa existe
            const tarefa = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM tarefas WHERE id = ?',
                [idTarefa]
            );

            if (!tarefa) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Tarefa não encontrada'
                });
            }

            // Verificar se usuário existe
            const usuario = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM usuarios WHERE id = ?',
                [idUsuario]
            );

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado'
                });
            }

            // Inserir novo comentário
            const resultado = await AppDbContext.executarComando(
                'INSERT INTO comentarios (conteudo, id_tarefa, id_usuario) VALUES (?, ?, ?)',
                [conteudo, idTarefa, idUsuario]
            );

            const novoComentario = new Comentario({
                id: resultado.id,
                conteudo: conteudo,
                idTarefa: idTarefa,
                idUsuario: idUsuario
            });

            res.status(201).json({
                sucesso: true,
                dados: novoComentario
            });

        } catch (erro) {
            res.status(400).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

    /**
     * PUT /comentarios/:id
     * 
     * Atualiza um comentário existente
     */
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { conteudo } = req.body;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'ID inválido'
                });
            }

            const comentario = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM comentario WHERE id = ?',
                [id]
            );

            if (!comentario) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Comentário não encontrado'
                });
            }

            await AppDbContext.executarComando(
                'UPDATE comentarios SET conteudo = ? WHERE id = ?',
                [conteudo || comentario.conteudo, id]
            );

            const comentarioAtualizado = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM comentarios WHERE id = ?',
                [id]
            );

            res.status(200).json({
                sucesso: true,
                dados: comentarioAtualizado
            });

        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message
            });
        }
    }

            /**
     * DELETE /comentarios/:id
     * 
     * Remove um comentário
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

            const comentario = await AppDbContext.executarConsultaUnica(
                'SELECT * FROM comentarios WHERE id = ?',
                [id]
            );

            if (!comentario) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Comentário não encontrado'
                });
            }

            await AppDbContext.executarComando(
                'DELETE FROM comentarios WHERE id = ?',
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

module.exports = ComentariosController;

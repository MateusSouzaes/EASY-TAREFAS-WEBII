/**
 * Routes
 * 
 * Centraliza todas as definições de rotas da API
 * 
 * Equivalente ao Startup.cs ou Program.cs do projeto C#
 * 
 * Padrão de Rota:
 * POST   /api/autenticacao/login        - Login de usuário
 * GET    /api/projetos                  - Listar todos os projetos
 * GET    /api/projetos/:id              - Obter projeto específico
 * POST   /api/projetos                  - Criar novo projeto
 * PUT    /api/projetos/:id              - Atualizar projeto
 * DELETE /api/projetos/:id              - Remover projeto
 * GET    /api/tarefas                   - Listar todas as tarefas
 * GET    /api/tarefas/:id               - Obter tarefa específica
 * POST   /api/tarefas                   - Criar nova tarefa
 * PUT    /api/tarefas/:id               - Atualizar tarefa
 * DELETE /api/tarefas/:id               - Remover tarefa
 * GET    /api/comentarios               - Listar todos os comentários
 * GET    /api/comentarios/:id           - Obter comentário específico
 * POST   /api/comentarios               - Criar novo comentário
 * PUT    /api/comentarios/:id           - Atualizar comentário
 * DELETE /api/comentarios/:id           - Remover comentário
 * 
 * @swagger
 * /autenticacao/login:
 *   post:
 *     summary: Autentica usuário e retorna JWT token
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                 dados:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       400:
 *         description: Credenciais inválidas
 * 
 * /projetos:
 *   get:
 *     summary: Lista todos os projetos
 *     tags:
 *       - Projetos
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filtrar por título
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por status
 *     responses:
 *       200:
 *         description: Lista de projetos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                 dados:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Projeto'
 *   post:
 *     summary: Cria novo projeto
 *     tags:
 *       - Projetos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarProjetoDto'
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 * 
 * /projetos/{id}:
 *   get:
 *     summary: Obtém projeto específico com suas tarefas
 *     tags:
 *       - Projetos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *       404:
 *         description: Projeto não encontrado
 *   put:
 *     summary: Atualiza projeto
 *     tags:
 *       - Projetos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Projeto atualizado
 *   delete:
 *     summary: Remove projeto e suas tarefas
 *     tags:
 *       - Projetos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Projeto removido
 * 
 * /tarefas:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: projeto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *   post:
 *     summary: Cria nova tarefa
 *     tags:
 *       - Tarefas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarTarefaDto'
 *     responses:
 *       201:
 *         description: Tarefa criada
 * 
 * /tarefas/{id}:
 *   get:
 *     summary: Obtém tarefa específica com comentários
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *   put:
 *     summary: Atualiza tarefa
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *   delete:
 *     summary: Remove tarefa e seus comentários
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarefa removida
 * 
 * /comentarios:
 *   get:
 *     summary: Lista todos os comentários
 *     tags:
 *       - Comentários
 *     parameters:
 *       - in: query
 *         name: tarefa
 *         schema:
 *           type: integer
 *       - in: query
 *         name: usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentários
 *   post:
 *     summary: Cria novo comentário
 *     tags:
 *       - Comentários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conteudo
 *               - idTarefa
 *               - idUsuario
 *             properties:
 *               conteudo:
 *                 type: string
 *               idTarefa:
 *                 type: integer
 *               idUsuario:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentário criado
 * 
 * /comentarios/{id}:
 *   get:
 *     summary: Obtém comentário específico
 *     tags:
 *       - Comentários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *   put:
 *     summary: Atualiza comentário
 *     tags:
 *       - Comentários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Comentário atualizado
 *   delete:
 *     summary: Remove comentário
 *     tags:
 *       - Comentários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comentário removido
 */

const { Router } = require('express');
const AutenticacaoController = require('../Controllers/AutenticacaoController');
const ProjetosController = require('../Controllers/projetosController');
const TarefasController = require('../Controllers/tarefasController');
const ComentariosController = require('../Controllers/comentariosController');

/**
 * Factory function que cria e retorna o router com todas as rotas
 * 
 * @returns {Express.Router} Router com todas as rotas registradas
 */
function criarRotas() {
    const router = Router();

    // ========================================
    // Rotas de Autenticação
    // ========================================
    router.post('/autenticacao/login', AutenticacaoController.login);

    // ========================================
    // Rotas de Projetos
    // ========================================
    /**
     * GET /projetos
     * Query params opcionais: search, status
     */
    router.get('/projetos', ProjetosController.buscarTodos);

    /**
     * GET /projetos/:id
     */
    router.get('/projetos/:id', ProjetosController.buscarPorId);

    /**
     * POST /projetos
     * Body: { titulo, descricao, idUsuarioDono }
     */
    router.post('/projetos', ProjetosController.criar);

    /**
     * PUT /projetos/:id
     * Body: { titulo?, descricao?, status? }
     */
    router.put('/projetos/:id', ProjetosController.atualizar);

    /**
     * DELETE /projetos/:id
     */
    router.delete('/projetos/:id', ProjetosController.remover);

    // ========================================
    // Rotas de Tarefas
    // ========================================
    /**
     * GET /tarefas
     * Query params opcionais: search, status, projeto
     */
    router.get('/tarefas', TarefasController.buscarTodas);

    /**
     * GET /tarefas/:id
     */
    router.get('/tarefas/:id', TarefasController.buscarPorId);

    /**
     * POST /tarefas
     * Body: { titulo, descricao, idProjeto }
     */
    router.post('/tarefas', TarefasController.criar);

    /**
     * PUT /tarefas/:id
     * Body: { titulo?, descricao?, status? }
     */
    router.put('/tarefas/:id', TarefasController.atualizar);

    /**
     * DELETE /tarefas/:id
     */
    router.delete('/tarefas/:id', TarefasController.remover);

    // ========================================
    // Rotas de Comentários
    // ========================================
    /**
     * GET /comentarios
     * Query params opcionais: tarefa, usuario
     */
    router.get('/comentarios', ComentariosController.buscarTodos);

    /**
     * GET /comentarios/:id
     */
    router.get('/comentarios/:id', ComentariosController.buscarPorId);

    /**
     * POST /comentarios
     * Body: { conteudo, idTarefa, idUsuario }
     */
    router.post('/comentarios', ComentariosController.criar);

    /**
     * PUT /comentarios/:id
     * Body: { conteudo? }
     */
    router.put('/comentarios/:id', ComentariosController.atualizar);

    /**
     * DELETE /comentarios/:id
     */
    router.delete('/comentarios/:id', ComentariosController.remover);

    return router;
}

module.exports = criarRotas;

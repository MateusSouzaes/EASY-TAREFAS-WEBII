const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const AppDbContext = require('./src/DataContexts/AppDbContext');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/swagger', swaggerUi.serve);
app.get('/swagger', swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        persistAuthorization: true
    }
}));

app.get('/api-docs', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// ========================================
// Inicialização do Banco de Dados
// ========================================

/**
 * Função assíncrona para iniciar o servidor
 * Aguarda a conexão com banco de dados antes de iniciar
 */
const iniciarServidor = async () => {
    try {
        // Inicializa contexto do banco de dados
        await AppDbContext.initialize();
        console.log('✓ Banco de dados conectado com sucesso');

        // ========================================
        // Registro de Rotas
        // ========================================

        /**
         * Todas as rotas são definidas em src/routes/index.js
         * Padrão: /api/[recurso]/[acao]
         * 
         * Exemplos:
         * POST   /api/autenticacao/login
         * GET    /api/projetos
         * POST   /api/tarefas
         * PUT    /api/tarefas/:id
         * DELETE /api/tarefas/:id
         */
        app.use('/api', routes());

        // Tratamento de erros global
        app.use((err, req, res, next) => {
            console.error('Erro não tratado:', err);
            res.status(err.status || 500).json({
                sucesso: false,
                mensagem: err.message || 'Erro interno do servidor'
            });
        });

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════╗
║     API TAREFAS - SERVIDOR ATIVO      ║
╠════════════════════════════════════════╣
║ 🚀 Port: ${PORT}                       ${PORT < 10 ? '                   ' : '                  '}
║ 📍 URL: http://localhost:${PORT}    ${PORT < 10 ? '           ' : '          '}
║ 📚 Swagger: http://localhost:${PORT}/swagger  ║
║ 📖 OpenAPI: http://localhost:${PORT}/api-docs ║
╚════════════════════════════════════════╝
            `);
        });

    } catch (erro) {
        console.error('✗ Erro ao iniciar servidor:', erro.message);
        process.exit(1);
    }
};

// Fechar conexões ao encerrar
process.on('SIGINT', async () => {
    console.log('\n\n✓ Encerrando servidor...');
    try {
        await AppDbContext.fechar();
        console.log('✓ Conexão com banco de dados fechada');
        process.exit(0);
    } catch (erro) {
        console.error('✗ Erro ao fechar banco de dados:', erro);
        process.exit(1);
    }
});

iniciarServidor();

module.exports = app;

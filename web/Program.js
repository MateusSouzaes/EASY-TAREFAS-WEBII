const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sessões
app.use(session({
    secret: process.env.SESSION_SECRET || 'sua-chave-secreta-segura-aqui',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Views EJS
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src/public')));

/**
 * Verifica se usuário está logado
 * Se não estiver logado e acessar rota protegida, redireciona para login
 */
function verificarAutenticacao(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    next();
}

/**
 * Passa usuário para views automaticamente
 */
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    res.locals.api_base_url = process.env.API_BASE_URL || 'http://localhost:3001';
    next();
});

// Rotas

app.get('/', (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/dashboard');
    }
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.render('login', {
                title: 'Login',
                erro: 'Email e senha são obrigatórios'
            });
        }

        // Chamar API para autenticar
        const response = await fetch(
            `${res.locals.api_base_url}/api/autenticacao/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            }
        );

        const resultado = await response.json();

        if (!resultado.sucesso) {
            return res.render('login', {
                title: 'Login',
                erro: resultado.mensagem || 'Falha ao fazer login'
            });
        }

        // Armazenar token na sessão
        req.session.usuario = {
            token: resultado.dados.token,
            email: email
        };

        res.redirect('/dashboard');
    } catch (erro) {
        res.render('login', {
            title: 'Login',
            erro: 'Erro ao processar login: ' + erro.message
        });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.render('login', {
                title: 'Login',
                erro: 'Erro ao fazer logout'
            });
        }
        res.redirect('/login');
    });
});

app.get('/dashboard', verificarAutenticacao, (req, res) => {
    res.render('index', {
        title: 'Dashboard',
        usuario: req.session.usuario
    });
});

/**
 * GET /projetos
 * Página de projetos (mesma que dashboard)
 */
app.get('/projetos', verificarAutenticacao, (req, res) => {
    res.render('projetos', {
        title: 'Projetos',
        usuario: req.session.usuario
    });
});

/**
 * GET /projeto/:id
 * Página de detalhes do projeto com tarefas
 */
app.get('/projeto/:id', verificarAutenticacao, (req, res) => {
    res.render('projeto-tarefas', {
        title: 'Projeto - Tarefas',
        usuario: req.session.usuario,
        projetoId: req.params.id
    });
});

/**
 * GET /sobre
 * Página sobre
 */
app.get('/sobre', (req, res) => {
    res.render('sobre', {
        title: 'Sobre',
        usuario: req.session.usuario
    });
});

/**
 * GET /cadastro
 * Página de cadastro de novo usuário
 */
app.get('/cadastro', (req, res) => {
    res.render('cadastro', { title: 'Cadastro' });
});

/**
 * POST /cadastro
 * Processa cadastro de novo usuário
 */
app.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha, confirmaSenha } = req.body;

        // Validações básicas
        if (!nome || !email || !senha || !confirmaSenha) {
            return res.render('cadastro', {
                title: 'Cadastro',
                erro: 'Todos os campos são obrigatórios'
            });
        }

        if (senha !== confirmaSenha) {
            return res.render('cadastro', {
                title: 'Cadastro',
                erro: 'As senhas não correspondem'
            });
        }

        // TODO: Chamar API para cadastrar usuário
        // Por enquanto, apenas redireciona para login
        res.render('login', {
            title: 'Login',
            mensagem: 'Cadastro realizado com sucesso! Faça login.'
        });

    } catch (erro) {
        res.render('cadastro', {
            title: 'Cadastro',
            erro: 'Erro ao processar cadastro: ' + erro.message
        });
    }
});

// ========================================
// Manipulador de Erros 404
// ========================================

/**
 * Captura requisições para rotas não definidas
 */
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Página não encontrada',
        usuario: req.session.usuario
    });
});

// ========================================
// Iniciar Servidor
// ========================================

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║  WEB APP EASY-TAREFAS - ATIVO         ║
╠════════════════════════════════════════╣
║ 🌐 Port: ${PORT}                       ${PORT < 10 ? '                    ' : '                   '}
║ 📍 URL: http://localhost:${PORT}     ${PORT < 10 ? '            ' : '           '}
║ 🔗 API: http://localhost:3001         ║
║ 📚 Swagger API: http://localhost:3001/swagger ║
╚════════════════════════════════════════╝
    `);
});

module.exports = app;

// routes/web.js - Rotas das páginas web (renderização EJS)
const express = require('express');
const router = express.Router();
const db = require('../models/queries');

// Middleware: verifica se usuário está autenticado
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// GET /login - Exibe página de login
router.get('/login', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  res.render('login', { erro: null });
});

// POST /login - Processa login do usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await db.get('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);
    if (usuario) {
      req.session.userId = usuario.id;
      req.session.userEmail = usuario.email;
      req.session.userName = usuario.nome;
      return res.redirect('/dashboard');
    }
    res.render('login', { erro: 'Email ou senha inválidos' });
  } catch (e) {
    res.render('login', { erro: 'Erro ao fazer login' });
  }
});

// GET /cadastro - Exibe página de cadastro
router.get('/cadastro', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  res.render('cadastro', { erro: null });
});

// POST /cadastro - Cria novo usuário
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const r = await db.run('INSERT INTO usuario (nome, email, senha) VALUES (?,?,?)', [nome, email, senha]);
    req.session.userId = r.lastID;
    req.session.userEmail = email;
    req.session.userName = nome;
    res.redirect('/dashboard');
  } catch (e) {
    res.render('cadastro', { erro: 'Email já cadastrado ou erro ao criar conta' });
  }
});

// GET /logout - Destroi sessão e redireciona para login
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// GET / - Redireciona para dashboard ou login
router.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

// GET /dashboard - Dashboard com projetos e tarefas recentes (protegido)
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const projetos = await db.all(
      'SELECT p.*, u.nome as dono FROM projeto p JOIN usuario u ON p.id_usuario_dono = u.id ORDER BY p.criado_em DESC LIMIT 5'
    );
    const tarefas = await db.all(
      'SELECT t.*, p.titulo as projeto FROM tarefa t LEFT JOIN projeto p ON t.id_projeto = p.id ORDER BY t.criado_em DESC LIMIT 10'
    );
    
    res.render('index', { 
      title: 'EASY-Tarefa',
      usuario: { 
        id: req.session.userId,
        nome: req.session.userName, 
        email: req.session.userEmail 
      },
      projetos,
      tarefas 
    });
  } catch (e) {
    res.render('index', { 
      title: 'EASY-Tarefa',
      usuario: { 
        id: req.session.userId,
        nome: req.session.userName, 
        email: req.session.userEmail 
      },
      projetos: [],
      tarefas: [] 
    });
  }
});

// GET /projetos - Lista todos os projetos (protegido)
router.get('/projetos', requireAuth, async (req, res) => {
  try {
    const projetos = await db.all(
      'SELECT p.*, u.nome as dono FROM projeto p JOIN usuario u ON p.id_usuario_dono = u.id ORDER BY p.criado_em DESC'
    );
    res.render('projetos', { 
      title: 'Meus Projetos',
      usuario: { 
        id: req.session.userId,
        nome: req.session.userName, 
        email: req.session.userEmail 
      },
      projetos 
    });
  } catch (e) {
    res.render('projetos', { 
      title: 'Meus Projetos',
      usuario: { 
        id: req.session.userId,
        nome: req.session.userName, 
        email: req.session.userEmail 
      },
      projetos: [] 
    });
  }
});

// GET /projetos/:id/tarefas - Tarefas de um projeto específico (protegido)
router.get('/projetos/:id/tarefas', requireAuth, async (req, res) => {
  try {
    const projeto = await db.get(
      'SELECT p.*, u.nome as dono FROM projeto p JOIN usuario u ON p.id_usuario_dono = u.id WHERE p.id = ?', 
      [req.params.id]
    );
    const tarefas = await db.all(
      'SELECT * FROM tarefa WHERE id_projeto = ? ORDER BY criado_em DESC', 
      [req.params.id]
    );
    
    res.render('projeto-tarefas', { 
      title: projeto.titulo,
      usuario: { 
        id: req.session.userId,
        nome: req.session.userName, 
        email: req.session.userEmail 
      },
      projeto,
      tarefas 
    });
  } catch (e) {
    res.redirect('/projetos');
  }
});

// GET /sobre - Página sobre a aplicação (protegido)
router.get('/sobre', requireAuth, (req, res) => {
  const descricao = `EASY-Tarefa é uma aplicação web para gerenciamento de tarefas e projetos.
  Permite criar projetos, adicionar tarefas, comentar e gerenciar suas atividades de forma rápida e eficiente.`;
  res.render('sobre', { 
    title: 'Sobre o EASY-Tarefa', 
    descricao,
    usuario: { 
      nome: req.session.userName, 
      email: req.session.userEmail 
    }
  });
});

module.exports = router;

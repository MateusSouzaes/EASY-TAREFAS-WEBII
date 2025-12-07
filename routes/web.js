// routes/web.js
const express = require('express');
const router = express.Router();
const db = require('../models/queries');

// Middleware de autenticação
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Página de login
router.get('/login', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  res.render('login', { erro: null });
});

// Processar login
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

// Página de cadastro
router.get('/cadastro', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  res.render('cadastro', { erro: null });
});

// Processar cadastro
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

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Rota raiz - redireciona para login ou dashboard
router.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

// Página inicial (protegida)
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const tarefas = await db.all('SELECT * FROM tarefa WHERE id_projeto = 1 ORDER BY criado_em DESC');
    res.render('index', { 
      title: 'EASY-Tarefa',
      usuario: { 
        nome: req.session.userName, 
        email: req.session.userEmail 
      },
      tarefas 
    });
  } catch (e) {
    res.render('index', { 
      title: 'EASY-Tarefa',
      usuario: { 
        nome: req.session.userName, 
        email: req.session.userEmail 
      },
      tarefas: [] 
    });
  }
});

// Página sobre (protegida)
router.get('/sobre', requireAuth, (req, res) => {
  const descricao = `EASY-Tarefa é uma aplicação web simples para gerenciamento de tarefas.
  Permite adicionar, visualizar, filtrar e gerenciar suas tarefas de forma rápida e eficiente.`;
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

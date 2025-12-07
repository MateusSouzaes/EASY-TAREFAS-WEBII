// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../models/queries');

// --- USUÁRIOS ---
router.get('/usuarios', async (req, res) => {
  const rows = await db.all('SELECT id, nome, email, criado_em FROM usuario');
  res.json(rows);
});

router.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const r = await db.run('INSERT INTO usuario (nome,email,senha) VALUES (?,?,?)', [nome, email, senha]);
    res.status(201).json({ id: r.lastID });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// --- PROJETOS ---
router.get('/projetos', async (req, res) => {
  const rows = await db.all('SELECT p.*, u.nome as dono FROM projeto p JOIN usuario u ON p.id_usuario_dono = u.id');
  res.json(rows);
});

router.post('/projetos', async (req, res) => {
  const { titulo, descricao, data_inicio, data_fim, id_usuario_dono } = req.body;
  try {
    const r = await db.run('INSERT INTO projeto (titulo,descricao,data_inicio,data_fim,id_usuario_dono) VALUES (?,?,?,?,?)',
      [titulo, descricao, data_inicio, data_fim, id_usuario_dono]);
    res.status(201).json({ id: r.lastID });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// --- TAREFAS ---
// Listar todas as tarefas
router.get('/tarefas', async (req, res) => {
  const rows = await db.all('SELECT * FROM tarefa ORDER BY criado_em DESC');
  res.json(rows);
});

// Listar tarefas de um projeto específico
router.get('/projetos/:id/tarefas', async (req, res) => {
  const id = req.params.id;
  const rows = await db.all('SELECT * FROM tarefa WHERE id_projeto = ?', [id]);
  res.json(rows);
});

router.post('/tarefas', async (req, res) => {
  const { titulo, descricao, prioridade, status, prazo, id_projeto } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }
  
  try {
    // Se não informar id_projeto, usa o projeto padrão (id=1)
    const r = await db.run('INSERT INTO tarefa (titulo,descricao,prioridade,status,prazo,id_projeto) VALUES (?,?,?,?,?,?)',
      [titulo, descricao || '', prioridade || 'media', status || 'pendente', prazo || null, id_projeto || 1]);
    res.status(201).json({ id: r.lastID });
  } catch (e) { 
    console.error('Erro ao criar tarefa:', e.message);
    res.status(400).json({ error: e.message }); 
  }
});

// Deletar tarefa
router.delete('/tarefas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const r = await db.run('DELETE FROM tarefa WHERE id = ?', [id]);
    res.json({ changes: r.changes });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.patch('/tarefas/:id', async (req, res) => {
  const id = req.params.id;
  const fields = req.body;
  const updates = [];
  const params = [];
  for (const k of ['titulo','descricao','prioridade','status','prazo','id_projeto']) {
    if (fields[k] !== undefined) { updates.push(`${k} = ?`); params.push(fields[k]); }
  }
  if (updates.length === 0) return res.status(400).json({ error: 'Nenhum campo para atualizar' });
  params.push(id);
  try {
    const q = `UPDATE tarefa SET ${updates.join(', ')} WHERE id = ?`;
    const r = await db.run(q, params);
    res.json({ changes: r.changes });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// --- COMENTÁRIOS ---
router.get('/tarefas/:id/comentarios', async (req, res) => {
  const id = req.params.id;
  const rows = await db.all('SELECT c.*, u.nome as autor FROM comentario c JOIN usuario u ON c.id_usuario = u.id WHERE id_tarefa = ?', [id]);
  res.json(rows);
});

router.post('/comentarios', async (req, res) => {
  const { texto, id_tarefa, id_usuario } = req.body;
  try {
    const r = await db.run('INSERT INTO comentario (texto,id_tarefa,id_usuario) VALUES (?,?,?)', [texto, id_tarefa, id_usuario]);
    res.status(201).json({ id: r.lastID });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// --- COLABORADORES (usuario_projeto) ---
router.post('/projetos/:id/colaboradores', async (req, res) => {
  const id_projeto = req.params.id;
  const { id_usuario, role } = req.body;
  try {
    await db.run('INSERT INTO usuario_projeto (id_usuario,id_projeto,role) VALUES (?,?,?)', [id_usuario, id_projeto, role || 'colaborador']);
    res.status(201).json({ ok: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.get('/projetos/:id/colaboradores', async (req, res) => {
  const id = req.params.id;
  const rows = await db.all('SELECT up.role, u.id, u.nome, u.email FROM usuario_projeto up JOIN usuario u ON up.id_usuario = u.id WHERE up.id_projeto = ?', [id]);
  res.json(rows);
});

module.exports = router;

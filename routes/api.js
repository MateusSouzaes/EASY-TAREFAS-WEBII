// routes/api.js - API RESTful para CRUD de usuários, projetos, tarefas, comentários e colaboradores
const express = require('express');
const router = express.Router();
const db = require('../models/queries');

// ========== USUÁRIOS ==========
// GET - Lista todos os usuários
router.get('/usuarios', async (req, res) => {
  const rows = await db.all('SELECT id, nome, email, criado_em FROM usuario');
  res.json(rows);
});

// POST - Cria novo usuário
router.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const r = await db.run('INSERT INTO usuario (nome,email,senha) VALUES (?,?,?)', [nome, email, senha]);
    res.status(201).json({ id: r.lastID });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ========== PROJETOS ==========
// GET - Lista todos os projetos com dono
router.get('/projetos', async (req, res) => {
  try {
    const rows = await db.all('SELECT p.*, u.nome as dono FROM projeto p JOIN usuario u ON p.id_usuario_dono = u.id ORDER BY p.criado_em DESC');
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET - Busca projeto específico por ID
router.get('/projetos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const projeto = await db.get('SELECT p.*, u.nome as dono FROM projeto p JOIN usuario u ON p.id_usuario_dono = u.id WHERE p.id = ?', [id]);
    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    res.json(projeto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST - Cria novo projeto
router.post('/projetos', async (req, res) => {
  const { titulo, descricao, data_inicio, data_fim, id_usuario_dono } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ error: 'Título do projeto é obrigatório' });
  }
  
  try {
    const r = await db.run(
      'INSERT INTO projeto (titulo, descricao, data_inicio, data_fim, id_usuario_dono) VALUES (?,?,?,?,?)',
      [titulo, descricao || '', data_inicio || null, data_fim || null, id_usuario_dono]
    );
    res.status(201).json({ 
      id: r.lastID,
      titulo,
      descricao: descricao || '',
      data_inicio: data_inicio || null,
      data_fim: data_fim || null,
      id_usuario_dono
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PATCH - Atualiza projeto (campos opcionais)
router.patch('/projetos/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo, descricao, data_inicio, data_fim } = req.body;
  
  try {
    const updates = [];
    const params = [];
    
    if (titulo !== undefined) {
      updates.push('titulo = ?');
      params.push(titulo);
    }
    if (descricao !== undefined) {
      updates.push('descricao = ?');
      params.push(descricao);
    }
    if (data_inicio !== undefined) {
      updates.push('data_inicio = ?');
      params.push(data_inicio);
    }
    if (data_fim !== undefined) {
      updates.push('data_fim = ?');
      params.push(data_fim);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }
    
    params.push(id);
    const query = `UPDATE projeto SET ${updates.join(', ')} WHERE id = ?`;
    const r = await db.run(query, params);
    
    if (r.changes === 0) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    
    res.json({ 
      id,
      changes: r.changes,
      message: 'Projeto atualizado com sucesso'
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE - Exclui projeto (cascade: deleta tarefas, comentários, colaboradores)
router.delete('/projetos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Verifica se projeto existe
    const projeto = await db.get('SELECT id FROM projeto WHERE id = ?', [id]);
    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    
    // Deleta tarefas associadas (e seus comentários via FK cascade)
    await db.run('DELETE FROM tarefa WHERE id_projeto = ?', [id]);
    
    // Deleta colaboradores
    await db.run('DELETE FROM usuario_projeto WHERE id_projeto = ?', [id]);
    
    // Deleta projeto
    const r = await db.run('DELETE FROM projeto WHERE id = ?', [id]);
    
    res.json({ 
      id,
      changes: r.changes,
      message: 'Projeto e todas as suas tarefas foram excluídos com sucesso'
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ========== TAREFAS ==========
// GET - Lista todas as tarefas com projeto associado
router.get('/tarefas', async (req, res) => {
  try {
    const rows = await db.all('SELECT t.*, p.titulo as projeto FROM tarefa t LEFT JOIN projeto p ON t.id_projeto = p.id ORDER BY t.criado_em DESC');
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET - Lista tarefas de um projeto específico
router.get('/projetos/:id/tarefas', async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await db.all('SELECT * FROM tarefa WHERE id_projeto = ? ORDER BY criado_em DESC', [id]);
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET - Busca tarefa específica por ID
router.get('/tarefas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tarefa = await db.get('SELECT t.*, p.titulo as projeto FROM tarefa t LEFT JOIN projeto p ON t.id_projeto = p.id WHERE t.id = ?', [id]);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST - Cria nova tarefa
router.post('/tarefas', async (req, res) => {
  const { titulo, descricao, prioridade, status, prazo, id_projeto } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }
  
  try {
    // Usa projeto padrão se não informado
    const r = await db.run(
      'INSERT INTO tarefa (titulo, descricao, prioridade, status, prazo, id_projeto) VALUES (?,?,?,?,?,?)',
      [titulo, descricao || '', prioridade || 'media', status || 'pendente', prazo || null, id_projeto || 1]
    );
    res.status(201).json({ 
      id: r.lastID,
      titulo,
      descricao: descricao || '',
      prioridade: prioridade || 'media',
      status: status || 'pendente',
      prazo: prazo || null,
      id_projeto: id_projeto || 1
    });
  } catch (e) { 
    console.error('Erro ao criar tarefa:', e.message);
    res.status(400).json({ error: e.message }); 
  }
});

// PATCH - Atualiza tarefa (campos opcionais)
router.patch('/tarefas/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo, descricao, prioridade, status, prazo, id_projeto } = req.body;
  
  try {
    const updates = [];
    const params = [];
    
    if (titulo !== undefined) {
      updates.push('titulo = ?');
      params.push(titulo);
    }
    if (descricao !== undefined) {
      updates.push('descricao = ?');
      params.push(descricao);
    }
    if (prioridade !== undefined) {
      updates.push('prioridade = ?');
      params.push(prioridade);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status);
    }
    if (prazo !== undefined) {
      updates.push('prazo = ?');
      params.push(prazo);
    }
    if (id_projeto !== undefined) {
      updates.push('id_projeto = ?');
      params.push(id_projeto);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }
    
    params.push(id);
    const query = `UPDATE tarefa SET ${updates.join(', ')} WHERE id = ?`;
    const r = await db.run(query, params);
    
    if (r.changes === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.json({ 
      id,
      changes: r.changes,
      message: 'Tarefa atualizada com sucesso'
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE - Exclui tarefa (remove comentários via FK cascade)
router.delete('/tarefas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Verifica se tarefa existe
    const tarefa = await db.get('SELECT id FROM tarefa WHERE id = ?', [id]);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    // Deleta comentários associados (FK cascade)
    await db.run('DELETE FROM comentario WHERE id_tarefa = ?', [id]);
    
    // Deleta tarefa
    const r = await db.run('DELETE FROM tarefa WHERE id = ?', [id]);
    
    res.json({ 
      id,
      changes: r.changes,
      message: 'Tarefa e seus comentários foram excluídos com sucesso'
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ========== COMENTÁRIOS ==========
// GET - Lista comentários de uma tarefa com autor
router.get('/tarefas/:id/comentarios', async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await db.all('SELECT c.*, u.nome as autor FROM comentario c JOIN usuario u ON c.id_usuario = u.id WHERE c.id_tarefa = ? ORDER BY c.criado_em DESC', [id]);
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET - Busca comentário específico por ID
router.get('/comentarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const comentario = await db.get('SELECT c.*, u.nome as autor FROM comentario c JOIN usuario u ON c.id_usuario = u.id WHERE c.id = ?', [id]);
    if (!comentario) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }
    res.json(comentario);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST - Cria novo comentário
router.post('/comentarios', async (req, res) => {
  const { texto, id_tarefa, id_usuario } = req.body;
  
  if (!texto || !texto.trim()) {
    return res.status(400).json({ error: 'Texto do comentário é obrigatório' });
  }
  
  if (!id_tarefa) {
    return res.status(400).json({ error: 'ID da tarefa é obrigatório' });
  }
  
  try {
    // Verifica se tarefa existe
    const tarefa = await db.get('SELECT id FROM tarefa WHERE id = ?', [id_tarefa]);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    const r = await db.run('INSERT INTO comentario (texto, id_tarefa, id_usuario) VALUES (?, ?, ?)', [texto, id_tarefa, id_usuario || null]);
    res.status(201).json({ 
      id: r.lastID,
      texto,
      id_tarefa,
      id_usuario: id_usuario || null,
      message: 'Comentário criado com sucesso'
    });
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// PATCH - Atualiza comentário
router.patch('/comentarios/:id', async (req, res) => {
  const id = req.params.id;
  const { texto } = req.body;
  
  if (!texto || !texto.trim()) {
    return res.status(400).json({ error: 'Texto do comentário é obrigatório' });
  }
  
  try {
    // Verifica se comentário existe
    const comentario = await db.get('SELECT id FROM comentario WHERE id = ?', [id]);
    if (!comentario) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }
    
    const r = await db.run('UPDATE comentario SET texto = ? WHERE id = ?', [texto, id]);
    
    res.json({ 
      id,
      changes: r.changes,
      message: 'Comentário atualizado com sucesso'
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE - Exclui comentário
router.delete('/comentarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Verifica se comentário existe
    const comentario = await db.get('SELECT id FROM comentario WHERE id = ?', [id]);
    if (!comentario) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }
    
    const r = await db.run('DELETE FROM comentario WHERE id = ?', [id]);
    
    res.json({ 
      id,
      changes: r.changes,
      message: 'Comentário excluído com sucesso'
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ========== COLABORADORES (usuario_projeto) ==========
// GET - Lista colaboradores de um projeto
router.get('/projetos/:id/colaboradores', async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await db.all('SELECT up.role, up.criado_em, u.id, u.nome, u.email FROM usuario_projeto up JOIN usuario u ON up.id_usuario = u.id WHERE up.id_projeto = ? ORDER BY up.criado_em DESC', [id]);
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET - Busca colaborador específico em um projeto
router.get('/projetos/:id_projeto/colaboradores/:id_usuario', async (req, res) => {
  const { id_projeto, id_usuario } = req.params;
  try {
    const colaborador = await db.get('SELECT up.role, up.criado_em, u.id, u.nome, u.email FROM usuario_projeto up JOIN usuario u ON up.id_usuario = u.id WHERE up.id_projeto = ? AND up.id_usuario = ?', [id_projeto, id_usuario]);
    if (!colaborador) {
      return res.status(404).json({ error: 'Colaborador não encontrado neste projeto' });
    }
    res.json(colaborador);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST - Adiciona colaborador a um projeto
router.post('/projetos/:id/colaboradores', async (req, res) => {
  const id_projeto = req.params.id;
  const { id_usuario, role } = req.body;
  
  if (!id_usuario) {
    return res.status(400).json({ error: 'ID do usuário é obrigatório' });
  }
  
  try {
    // Verifica se projeto existe
    const projeto = await db.get('SELECT id FROM projeto WHERE id = ?', [id_projeto]);
    if (!projeto) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    
    // Verifica se usuário existe
    const usuario = await db.get('SELECT id FROM usuario WHERE id = ?', [id_usuario]);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Verifica se usuário já é colaborador
    const existe = await db.get('SELECT id_usuario FROM usuario_projeto WHERE id_projeto = ? AND id_usuario = ?', [id_projeto, id_usuario]);
    if (existe) {
      return res.status(400).json({ error: 'Usuário já é colaborador deste projeto' });
    }
    
    const r = await db.run('INSERT INTO usuario_projeto (id_usuario, id_projeto, role) VALUES (?, ?, ?)', [id_usuario, id_projeto, role || 'colaborador']);
    res.status(201).json({ 
      id_usuario,
      id_projeto,
      role: role || 'colaborador',
      message: 'Colaborador adicionado com sucesso'
    });
  } catch (e) { 
    res.status(400).json({ error: e.message }); 
  }
});

// PATCH - Atualiza role do colaborador
router.patch('/projetos/:id_projeto/colaboradores/:id_usuario', async (req, res) => {
  const { id_projeto, id_usuario } = req.params;
  const { role } = req.body;
  
  if (!role) {
    return res.status(400).json({ error: 'Role é obrigatório' });
  }
  
  try {
    const colaborador = await db.get('SELECT * FROM usuario_projeto WHERE id_projeto = ? AND id_usuario = ?', [id_projeto, id_usuario]);
    if (!colaborador) {
      return res.status(404).json({ error: 'Colaborador não encontrado neste projeto' });
    }
    
    const r = await db.run('UPDATE usuario_projeto SET role = ? WHERE id_projeto = ? AND id_usuario = ?', [role, id_projeto, id_usuario]);
    
    res.json({ 
      id_projeto,
      id_usuario,
      role,
      changes: r.changes,
      message: 'Role do colaborador atualizado com sucesso'
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE - Remove colaborador de um projeto
router.delete('/projetos/:id_projeto/colaboradores/:id_usuario', async (req, res) => {
  const { id_projeto, id_usuario } = req.params;
  
  try {
    // Verifica se colaborador existe
    const colaborador = await db.get('SELECT * FROM usuario_projeto WHERE id_projeto = ? AND id_usuario = ?', [id_projeto, id_usuario]);
    if (!colaborador) {
      return res.status(404).json({ error: 'Colaborador não encontrado neste projeto' });
    }
    
    const r = await db.run('DELETE FROM usuario_projeto WHERE id_projeto = ? AND id_usuario = ?', [id_projeto, id_usuario]);
    
    res.json({ 
      id_projeto,
      id_usuario,
      changes: r.changes,
      message: 'Colaborador removido do projeto com sucesso'
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ========== ESTATÍSTICAS ==========
// GET - Estatísticas por projeto (tarefas, status por projeto)
router.get('/estatisticas/projetos', async (req, res) => {
  try {
    const projetos = await db.all(`
      SELECT 
        p.id,
        p.titulo,
        COUNT(t.id) as total_tarefas,
        SUM(CASE WHEN t.status = 'pendente' THEN 1 ELSE 0 END) as pendentes,
        SUM(CASE WHEN t.status = 'em_andamento' THEN 1 ELSE 0 END) as em_andamento,
        SUM(CASE WHEN t.status = 'concluida' THEN 1 ELSE 0 END) as concluidas
      FROM projeto p
      LEFT JOIN tarefa t ON p.id = t.id_projeto
      GROUP BY p.id, p.titulo
      ORDER BY p.criado_em DESC
    `);
    res.json(projetos);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET - Estatísticas globais de status
router.get('/estatisticas/status', async (req, res) => {
  try {
    const stats = await db.get(`
      SELECT 
        COUNT(CASE WHEN status = 'pendente' THEN 1 END) as pendentes,
        COUNT(CASE WHEN status = 'em_andamento' THEN 1 END) as em_andamento,
        COUNT(CASE WHEN status = 'concluida' THEN 1 END) as concluidas,
        COUNT(*) as total
      FROM tarefa
    `);
    res.json(stats);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;

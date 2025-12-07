// projeto-tarefas.js - Gerenciamento de tarefas e comentários
let filtroAtual = 'todas'; // Filtro ativo (todas, pendente, em_andamento, concluida)
let tarefaAtualId = null;  // ID da tarefa aberta no modal

// Inicializa listeners ao carregar página
document.addEventListener('DOMContentLoaded', function() {
  // Listener para botão de adicionar tarefa
  const btnAdicionar = document.getElementById('btnAdicionarTarefa');
  if (btnAdicionar) {
    btnAdicionar.addEventListener('click', addTarefa);
  }
  
  // Listeners para filtros de status
  document.querySelectorAll('.btn-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      filtrarTarefas(this.dataset.filter);
    });
  });
  
  // Listeners para modal de comentários (fechar com X e click fora)
  const closeModal = document.querySelector('.close');
  if (closeModal) {
    closeModal.addEventListener('click', fecharModalComentarios);
  }
  
  const btnAdicionarComentario = document.getElementById('btnAdicionarComentario');
  if (btnAdicionarComentario) {
    btnAdicionarComentario.addEventListener('click', adicionarComentario);
  }
  
  window.addEventListener('click', function(e) {
    const modal = document.getElementById('modalComentarios');
    if (e.target === modal) {
      fecharModalComentarios();
    }
  });
  
  carregar();
});

// Carrega tarefas do projeto via API e exibe lista
async function carregar() {
  try {
    const res = await fetch(`/api/projetos/${projetoId}/tarefas`);
    const tarefas = await res.json();

    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    // Aplica filtro ao array de tarefas
    const tarefasFiltradas = filtroAtual === 'todas' 
      ? tarefas 
      : tarefas.filter(t => t.status === filtroAtual);

    if (tarefasFiltradas.length === 0) {
      lista.innerHTML = '<p class="no-tasks">Nenhuma tarefa encontrada</p>';
      return;
    }

    // Renderiza cada tarefa como card com badges e botões
    tarefasFiltradas.forEach(t => {
      const prioridadeClass = `prioridade-${t.prioridade}`;
      const statusClass = `status-${t.status}`;
      const statusText = {
        'pendente': 'Pendente',
        'em_andamento': 'Em Andamento',
        'concluida': 'Concluída'
      }[t.status] || t.status;

      const taskCard = document.createElement('div');
      taskCard.className = `task-card ${prioridadeClass} ${statusClass}`;
      taskCard.innerHTML = `
        <div class="task-header">
          <h3>${t.titulo}</h3>
          <div class="task-badges">
            <span class="badge badge-prioridade">${t.prioridade}</span>
            <span class="badge badge-status">${statusText}</span>
          </div>
        </div>
        ${t.descricao ? `<p class="task-desc">${t.descricao}</p>` : ''}
        <div class="task-actions">
          <select class="select-status" data-task-id="${t.id}">
            <option value="pendente" ${t.status === 'pendente' ? 'selected' : ''}>Pendente</option>
            <option value="em_andamento" ${t.status === 'em_andamento' ? 'selected' : ''}>Em Andamento</option>
            <option value="concluida" ${t.status === 'concluida' ? 'selected' : ''}>Concluída</option>
          </select>
          <button class="btn btn-secondary" data-task-id="${t.id}">💬 Comentários</button>
          <button class="btn btn-delete" data-task-id="${t.id}">Excluir</button>
        </div>
      `;
      
      // Listeners para select de status e botões
      const selectStatus = taskCard.querySelector('.select-status');
      selectStatus.addEventListener('change', function() {
        atualizarStatus(this.dataset.taskId, this.value);
      });
      
      const btnComentarios = taskCard.querySelector('.btn-secondary');
      btnComentarios.addEventListener('click', function() {
        abrirModalComentarios(this.dataset.taskId, t.titulo);
      });
      
      const btnDelete = taskCard.querySelector('.btn-delete');
      btnDelete.addEventListener('click', function() {
        remover(this.dataset.taskId);
      });
      
      lista.appendChild(taskCard);
    });
  } catch (e) {
    console.error('Erro ao carregar tarefas:', e);
    document.getElementById('lista').innerHTML = '<p class="error">Erro ao carregar tarefas</p>';
  }
}

// Cria nova tarefa no projeto
async function addTarefa() {
  const tituloEl = document.getElementById('titulo');
  const descricaoEl = document.getElementById('descricao');
  const prioridadeEl = document.getElementById('prioridade');
  
  if (!tituloEl || !descricaoEl || !prioridadeEl) {
    console.error('Elementos do formulário não encontrados');
    return;
  }
  
  const titulo = tituloEl.value.trim();
  const descricao = descricaoEl.value.trim();
  const prioridade = prioridadeEl.value;
  
  if (!titulo) {
    alert('Por favor, digite o nome da tarefa');
    return;
  }

  try {
    const res = await fetch('/api/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        titulo, 
        descricao, 
        prioridade,
        status: 'pendente',
        id_projeto: projetoId
      })
    });

    if (!res.ok) {
      const error = await res.json();
      alert('Erro ao adicionar tarefa: ' + error.error);
      return;
    }

    // Limpa campos e recarrega lista
    tituloEl.value = '';
    descricaoEl.value = '';
    prioridadeEl.value = 'media';
    carregar();
  } catch (e) {
    alert('Erro ao adicionar tarefa: ' + e.message);
  }
}

// Atualiza status de uma tarefa via API
async function atualizarStatus(id, novoStatus) {
  try {
    const res = await fetch(`/api/tarefas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus })
    });

    if (!res.ok) {
      alert('Erro ao atualizar status');
      return;
    }

    carregar();
  } catch (e) {
    alert('Erro ao atualizar status: ' + e.message);
  }
}

// Exclui tarefa após confirmação
async function remover(id) {
  if (!confirm('Deseja realmente excluir esta tarefa?')) {
    return;
  }

  try {
    const res = await fetch('/api/tarefas/' + id, { method: 'DELETE' });
    
    if (!res.ok) {
      alert('Erro ao excluir tarefa');
      return;
    }

    carregar();
  } catch (e) {
    alert('Erro ao excluir tarefa: ' + e.message);
  }
}

// Filtra tarefas por status e recarrega exibição
function filtrarTarefas(filtro) {
  filtroAtual = filtro;
  
  // Atualiza botão ativo
  document.querySelectorAll('.btn-filter').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`btn-${filtro}`).classList.add('active');
  
  carregar();
}

// Abre modal de comentários com dados da tarefa
async function abrirModalComentarios(tarefaId, tituloTarefa) {
  tarefaAtualId = tarefaId;
  document.getElementById('modalTitulo').textContent = `Comentários - ${tituloTarefa}`;
  document.getElementById('novoComentario').value = '';
  
  await carregarComentarios(tarefaId);
  document.getElementById('modalComentarios').style.display = 'block';
}

// Fecha modal de comentários
function fecharModalComentarios() {
  document.getElementById('modalComentarios').style.display = 'none';
  tarefaAtualId = null;
}

// Carrega e exibe comentários da tarefa via API
async function carregarComentarios(tarefaId) {
  try {
    const res = await fetch(`/api/tarefas/${tarefaId}/comentarios`);
    const comentarios = await res.json();
    
    const lista = document.getElementById('listaComentarios');
    lista.innerHTML = '';
    
    if (comentarios.length === 0) {
      lista.innerHTML = '<p class="no-tasks">Nenhum comentário ainda. Seja o primeiro a comentar!</p>';
      return;
    }
    
    // Renderiza cada comentário com autor e data
    comentarios.forEach(c => {
      const comentarioDiv = document.createElement('div');
      comentarioDiv.className = 'comentario-item';
      comentarioDiv.innerHTML = `
        <div class="comentario-header">
          <strong>${c.autor}</strong>
          <span class="comentario-data">${new Date(c.data).toLocaleString('pt-BR')}</span>
        </div>
        <p class="comentario-texto">${c.texto}</p>
      `;
      lista.appendChild(comentarioDiv);
    });
  } catch (e) {
    console.error('Erro ao carregar comentários:', e);
  }
}

// Adiciona novo comentário à tarefa
async function adicionarComentario() {
  const textoEl = document.getElementById('novoComentario');
  const texto = textoEl.value.trim();
  
  if (!texto) {
    alert('Por favor, digite um comentário');
    return;
  }
  
  if (!tarefaAtualId) {
    alert('Erro: tarefa não identificada');
    return;
  }
  
  try {
    const res = await fetch('/api/comentarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        texto,
        id_tarefa: tarefaAtualId,
        id_usuario: usuarioId
      })
    });
    
    if (!res.ok) {
      const error = await res.json();
      alert('Erro ao adicionar comentário: ' + error.error);
      return;
    }
    
    // Limpa e recarrega comentários
    textoEl.value = '';
    await carregarComentarios(tarefaAtualId);
  } catch (e) {
    alert('Erro ao adicionar comentário: ' + e.message);
  }
}

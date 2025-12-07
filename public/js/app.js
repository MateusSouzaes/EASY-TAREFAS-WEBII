let filtroAtual = 'todas';

// Aguardar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
  // Adicionar event listeners
  const btnAdicionar = document.getElementById('btnAdicionarTarefa');
  if (btnAdicionar) {
    btnAdicionar.addEventListener('click', addTarefa);
  }
  
  // Filtros
  document.querySelectorAll('.btn-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      filtrarTarefas(this.dataset.filter);
    });
  });
  
  // Carregar tarefas
  carregar();
});

async function carregar() {
  try {
    const res = await fetch("/api/tarefas");
    const tarefas = await res.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const tarefasFiltradas = filtroAtual === 'todas' 
      ? tarefas 
      : tarefas.filter(t => t.status === filtroAtual);

    if (tarefasFiltradas.length === 0) {
      lista.innerHTML = '<p class="no-tasks">Nenhuma tarefa encontrada</p>';
      return;
    }

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
          <button class="btn btn-delete" data-task-id="${t.id}">Excluir</button>
        </div>
      `;
      
      // Event listeners
      const selectStatus = taskCard.querySelector('.select-status');
      selectStatus.addEventListener('change', function() {
        atualizarStatus(this.dataset.taskId, this.value);
      });
      
      const btnDelete = taskCard.querySelector('.btn-delete');
      btnDelete.addEventListener('click', function() {
        remover(this.dataset.taskId);
      });
      
      lista.appendChild(taskCard);
    });
  } catch (e) {
    console.error('Erro ao carregar tarefas:', e);
    document.getElementById("lista").innerHTML = '<p class="error">Erro ao carregar tarefas</p>';
  }
}

async function addTarefa() {
  const tituloEl = document.getElementById("titulo");
  const descricaoEl = document.getElementById("descricao");
  const prioridadeEl = document.getElementById("prioridade");
  
  if (!tituloEl || !descricaoEl || !prioridadeEl) {
    console.error("Elementos do formulário não encontrados");
    return;
  }
  
  const titulo = tituloEl.value.trim();
  const descricao = descricaoEl.value.trim();
  const prioridade = prioridadeEl.value;
  
  if (!titulo) {
    alert("Por favor, digite o nome da tarefa");
    return;
  }

  try {
    const res = await fetch("/api/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        titulo, 
        descricao, 
        prioridade,
        status: 'pendente'
      })
    });

    if (!res.ok) {
      const error = await res.json();
      alert("Erro ao adicionar tarefa: " + error.error);
      return;
    }

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prioridade").value = "media";
    carregar();
  } catch (e) {
    alert("Erro ao adicionar tarefa: " + e.message);
  }
}

async function atualizarStatus(id, novoStatus) {
  try {
    const res = await fetch(`/api/tarefas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus })
    });

    if (!res.ok) {
      alert("Erro ao atualizar status");
      return;
    }

    carregar();
  } catch (e) {
    alert("Erro ao atualizar status: " + e.message);
  }
}

async function remover(id) {
  if (!confirm("Deseja realmente excluir esta tarefa?")) {
    return;
  }

  try {
    const res = await fetch("/api/tarefas/" + id, { method: "DELETE" });
    
    if (!res.ok) {
      alert("Erro ao excluir tarefa");
      return;
    }

    carregar();
  } catch (e) {
    alert("Erro ao excluir tarefa: " + e.message);
  }
}

function filtrarTarefas(filtro) {
  filtroAtual = filtro;
  
  // Atualizar botões ativos
  document.querySelectorAll('.btn-filter').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`btn-${filtro}`).classList.add('active');
  
  carregar();
}

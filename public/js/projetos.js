// projetos.js - Gerenciamento de projetos (criar, editar, excluir)
let projetoEmEdicao = null; // ID do projeto sendo editado

// Inicializa listeners para botões de projeto
document.addEventListener('DOMContentLoaded', function() {
  const btnCriar = document.getElementById('btnCriarProjeto');
  if (btnCriar) {
    btnCriar.addEventListener('click', criarProjeto);
  }
  
  // Listeners para botões editar (data-attributes com id, titulo, descricao, datas)
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.projetoId;
      const titulo = this.dataset.titulo;
      const descricao = this.dataset.descricao;
      const dataInicio = this.dataset.dataInicio;
      const dataFim = this.dataset.dataFim;
      abrirModalEditar(id, titulo, descricao, dataInicio, dataFim);
    });
  });
  
  // Listeners para botões excluir
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      excluirProjeto(this.dataset.projetoId);
    });
  });
  
  // Fecha modal ao clicar fora
  const modal = document.getElementById('modalEditarProjeto');
  if (modal) {
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        fecharModalEditar();
      }
    });
  }
});

// Abre modal com dados do projeto para edição
function abrirModalEditar(id, titulo, descricao, dataInicio, dataFim) {
  projetoEmEdicao = id;
  document.getElementById('editTituloProjeto').value = titulo;
  document.getElementById('editDescricaoProjeto').value = descricao;
  document.getElementById('editDataInicio').value = dataInicio;
  document.getElementById('editDataFim').value = dataFim;
  document.getElementById('modalEditarProjeto').style.display = 'block';
}

// Fecha modal de edição
function fecharModalEditar() {
  document.getElementById('modalEditarProjeto').style.display = 'none';
  projetoEmEdicao = null;
}

// Atualiza projeto via API PATCH
async function salvarEdicaoProjeto() {
  if (!projetoEmEdicao) {
    alert('Erro: Projeto não selecionado');
    return;
  }
  
  const titulo = document.getElementById('editTituloProjeto').value.trim();
  const descricao = document.getElementById('editDescricaoProjeto').value.trim();
  const dataInicio = document.getElementById('editDataInicio').value;
  const dataFim = document.getElementById('editDataFim').value;
  
  if (!titulo) {
    alert('Por favor, digite o nome do projeto');
    return;
  }
  
  try {
    const response = await fetch(`/api/projetos/${projetoEmEdicao}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        descricao,
        data_inicio: dataInicio || null,
        data_fim: dataFim || null
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      alert('Erro ao atualizar projeto: ' + error.error);
      return;
    }
    
    alert('Projeto atualizado com sucesso!');
    fecharModalEditar();
    window.location.reload();
  } catch (e) {
    alert('Erro ao atualizar projeto: ' + e.message);
  }
}

// Cria novo projeto via API POST
async function criarProjeto() {
  const tituloEl = document.getElementById('tituloProjeto');
  const descricaoEl = document.getElementById('descricaoProjeto');
  const dataInicioEl = document.getElementById('dataInicio');
  const dataFimEl = document.getElementById('dataFim');
  
  if (!tituloEl || !descricaoEl) {
    console.error('Elementos do formulário não encontrados');
    return;
  }
  
  const titulo = tituloEl.value.trim();
  const descricao = descricaoEl.value.trim();
  const dataInicio = dataInicioEl.value;
  const dataFim = dataFimEl.value;
  
  if (!titulo) {
    alert('Por favor, digite o nome do projeto');
    return;
  }

  try {
    // Busca ID do usuário da sessão via API
    const res = await fetch('/api/usuarios');
    const usuarios = await res.json();
    const usuarioId = usuarios[0]?.id || 1;

    const response = await fetch('/api/projetos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        titulo, 
        descricao,
        data_inicio: dataInicio || null,
        data_fim: dataFim || null,
        id_usuario_dono: usuarioId
      })
    });

    if (!response.ok) {
      const error = await response.json();
      alert('Erro ao criar projeto: ' + error.error);
      return;
    }

    alert('Projeto criado com sucesso!');
    window.location.reload();
  } catch (e) {
    alert('Erro ao criar projeto: ' + e.message);
  }
}

// Exclui projeto com confirmação (delete em cascata)
async function excluirProjeto(id) {
  if (!confirm('Deseja realmente excluir este projeto? Todas as tarefas associadas serão excluídas.')) {
    return;
  }

  try {
    const res = await fetch(`/api/projetos/${id}`, { method: 'DELETE' });
    
    if (!res.ok) {
      alert('Erro ao excluir projeto');
      return;
    }

    alert('Projeto excluído com sucesso!');
    window.location.reload();
  } catch (e) {
    alert('Erro ao excluir projeto: ' + e.message);
  }
}

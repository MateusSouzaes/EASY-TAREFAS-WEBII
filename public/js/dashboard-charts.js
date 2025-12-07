// dashboard-charts.js - Inicializa gráficos Chart.js do dashboard
let statusChart = null;       // Gráfico de status (donut)
let projectsChart = null;     // Gráfico de projetos (barras)
let distributionChart = null; // Gráfico de distribuição (stacked)

// Carrega dados ao carregar página
document.addEventListener('DOMContentLoaded', function() {
  carregarEstatisticas();
});

// Busca estatísticas da API e atualiza cards e gráficos
async function carregarEstatisticas() {
  try {
    // Busca dados de status e projetos em paralelo
    const resStatus = await fetch('/api/estatisticas/status');
    const statusData = await resStatus.json();

    const resProjetos = await fetch('/api/estatisticas/projetos');
    const projetosData = await resProjetos.json();

    // Atualiza cards de estatísticas (contadores)
    document.getElementById('statPendentes').textContent = statusData.pendentes || 0;
    document.getElementById('statEmAndamento').textContent = statusData.em_andamento || 0;
    document.getElementById('statConcluidas').textContent = statusData.concluidas || 0;

    // Renderiza os 3 gráficos
    criarGraficoStatus(statusData);
    criarGraficoProjetosBarras(projetosData);
    criarGraficoDistribuicao(projetosData);
  } catch (e) {
    console.error('Erro ao carregar estatísticas:', e);
  }
}

// Gráfico donut com distribuição de status das tarefas
function criarGraficoStatus(data) {
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;

  if (statusChart) {
    statusChart.destroy(); // Destrói gráfico anterior se existir
  }

  statusChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pendentes', 'Em Andamento', 'Concluídas'],
      datasets: [{
        data: [data.pendentes || 0, data.em_andamento || 0, data.concluidas || 0],
        backgroundColor: [
          '#95a5a6',
          '#3498db',
          '#27ae60'
        ],
        borderColor: [
          '#7f8c8d',
          '#2980b9',
          '#229954'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 13,
              weight: 600
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              return label + ': ' + value + ' tarefa(s)';
            }
          }
        }
      }
    }
  });
}

// Gráfico de barras horizontais: tarefas por projeto
function criarGraficoProjetosBarras(data) {
  const ctx = document.getElementById('projectsChart');
  if (!ctx) return;

  if (projectsChart) {
    projectsChart.destroy();
  }

  const projetos = data.slice(0, 8); // Limita a 8 projetos
  const labels = projetos.map(p => p.titulo.length > 15 ? p.titulo.substring(0, 12) + '...' : p.titulo);
  const totais = projetos.map(p => p.total_tarefas || 0);

  projectsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Tarefas por Projeto',
        data: totais,
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#4facfe',
          '#00f2fe',
          '#43e97b',
          '#fa709a',
          '#fee140'
        ],
        borderColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#4facfe',
          '#00f2fe',
          '#43e97b',
          '#fa709a',
          '#fee140'
        ],
        borderWidth: 0,
        borderRadius: 5
      }]
    },
    options: {
      indexAxis: 'y', // Barras horizontais
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        y: {
          ticks: {
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

// Gráfico stacked: distribuição de status por projeto
function criarGraficoDistribuicao(projetosData) {
  const ctx = document.getElementById('distributionChart');
  if (!ctx) return;

  if (distributionChart) {
    distributionChart.destroy();
  }

  const projetos = projetosData.slice(0, 6); // Limita a 6 projetos
  const labels = projetos.map(p => p.titulo.length > 15 ? p.titulo.substring(0, 12) + '...' : p.titulo);

  const datasets = [
    {
      label: 'Pendentes',
      data: projetos.map(p => p.pendentes || 0),
      backgroundColor: '#95a5a6'
    },
    {
      label: 'Em Andamento',
      data: projetos.map(p => p.em_andamento || 0),
      backgroundColor: '#3498db'
    },
    {
      label: 'Concluídas',
      data: projetos.map(p => p.concluidas || 0),
      backgroundColor: '#27ae60'
    }
  ];

  distributionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12,
              weight: 600
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            font: {
              size: 11
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  });
}

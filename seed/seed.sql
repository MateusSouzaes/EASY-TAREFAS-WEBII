-- ============================================
-- SEED DATA - EASY-Tarefa Sistema de Tarefas
-- ============================================

-- ============================================
-- USUÁRIOS
-- ============================================
INSERT OR IGNORE INTO usuario (nome, email, senha) VALUES
-- Usuários principais
('João Silva', 'joao@example.com', 'senha123'),
('Maria Santos', 'maria@example.com', 'senha123'),
('Pedro Oliveira', 'pedro@example.com', 'senha123'),
('Ana Costa', 'ana@example.com', 'senha123'),
('Carlos Souza', 'carlos@example.com', 'senha123'),
('Julia Mendes', 'julia@example.com', 'senha123'),
('Ricardo Alves', 'ricardo@example.com', 'senha123'),
('Fernanda Lima', 'fernanda@example.com', 'senha123');

-- ============================================
-- PROJETOS
-- ============================================
INSERT OR IGNORE INTO projeto (titulo, descricao, data_inicio, data_fim, id_usuario_dono) VALUES
-- Projeto 1: Sistema Web
('Desenvolvimento de Sistema Web', 
 'Sistema completo de gerenciamento com autenticação, dashboard e API REST. Implementação de CRUD para usuarios, projetos e tarefas.',
 '2025-01-01', '2025-06-30', 1),

-- Projeto 2: App Mobile
('Aplicativo Mobile iOS/Android',
 'Aplicativo nativo para gerenciamento de tarefas com sincronização em nuvem. Suporte offline-first com banco local.',
 '2025-02-15', '2025-08-31', 2),

-- Projeto 3: Redesign UI/UX
('Redesign da Interface Gráfica',
 'Modernização visual completa da plataforma. Implementação de novo design system com componentes reutilizáveis.',
 '2025-03-01', '2025-05-31', 3),

-- Projeto 4: Documentação
('Documentação Técnica do Projeto',
 'Criar documentação técnica completa, guias de uso, API documentation e video tutoriais para usuarios.',
 '2025-01-15', '2025-07-15', 4),

-- Projeto 5: Integração com Terceiros
('Integrações com Serviços Externos',
 'Conectar com Gmail, Google Calendar, Slack e outros serviços populares para melhorar fluxo de trabalho.',
 '2025-04-01', '2025-09-30', 5);

-- ============================================
-- ASSOCIAÇÕES USUARIO-PROJETO
-- ============================================
INSERT OR IGNORE INTO usuario_projeto (id_usuario, id_projeto, role) VALUES
-- Projeto 1 - Desenvolvimento Web
(1, 1, 'dono'),
(2, 1, 'colaborador'),
(3, 1, 'colaborador'),

-- Projeto 2 - App Mobile
(2, 2, 'dono'),
(4, 2, 'colaborador'),
(5, 2, 'colaborador'),

-- Projeto 3 - Redesign UI/UX
(3, 3, 'dono'),
(6, 3, 'colaborador'),
(7, 3, 'colaborador'),

-- Projeto 4 - Documentação
(4, 4, 'dono'),
(1, 4, 'colaborador'),
(8, 4, 'colaborador'),

-- Projeto 5 - Integrações
(5, 5, 'dono'),
(2, 5, 'colaborador'),
(3, 5, 'colaborador');

-- ============================================
-- TAREFAS - PROJETO 1 (Sistema Web)
-- ============================================
INSERT OR IGNORE INTO tarefa (titulo, descricao, prioridade, status, prazo, id_projeto) VALUES
('Configurar Banco de Dados',
 'Criar schema SQL com todas as tabelas necessarias: usuarios, projetos, tarefas, comentarios, usuario_projeto. Incluir foreign keys e constraints.',
 'alta', 'concluida', '2025-01-15', 1),

('Implementar Autenticação',
 'Sistema de login e registro com sessões. Incluir validação de email, criptografia de senha e middleware de proteção.',
 'alta', 'concluida', '2025-01-25', 1),

('Criar API REST',
 'Endpoints para CRUD de usuarios, projetos e tarefas. Incluir validação, tratamento de erros e documentação.',
 'alta', 'em_andamento', '2025-02-28', 1),

('Desenvolver Frontend Dashboard',
 'Interface com visualização de tarefas, filtros por status e prioridade. Incluir gráficos interativos com Chart.js.',
 'alta', 'em_andamento', '2025-03-15', 1),

('Implementar Sistema de Comentários',
 'Adicionar funcionalidade de comentarios nas tarefas com CRUD completo e suporte a múltiplos usuarios.',
 'media', 'pendente', '2025-03-31', 1),

('Testes Unitários',
 'Criar testes para todas as funcoes criticas. Usar Jest ou Mocha para testes automatizados.',
 'media', 'pendente', '2025-04-15', 1),

('Documentação API',
 'Documentar todos os endpoints com exemplos de requisição/resposta. Usar Swagger ou Postman.',
 'media', 'pendente', '2025-04-30', 1),

('Deploy em Produção',
 'Configurar servidor, SSL, ambiente de produção e CI/CD pipeline.',
 'alta', 'pendente', '2025-06-01', 1);

-- ============================================
-- TAREFAS - PROJETO 2 (App Mobile)
-- ============================================
INSERT OR IGNORE INTO tarefa (titulo, descricao, prioridade, status, prazo, id_projeto) VALUES
('Configurar Projeto React Native',
 'Setup inicial com Expo, estrutura de pastas, dependencias e configuracoes basicas.',
 'alta', 'concluida', '2025-02-20', 2),

('Implementar Autenticação Mobile',
 'Login/Register com armazenamento local seguro de credenciais. Suportar biometria (fingerprint/face).',
 'alta', 'em_andamento', '2025-03-20', 2),

('Sincronização com Servidor',
 'Implementar sistema de sync com API REST. Suportar offline-first com fila de requisições pendentes.',
 'alta', 'pendente', '2025-04-15', 2),

('Notificações Push',
 'Configurar notificacoes push para lembretes de tarefas. Integrar com Firebase Cloud Messaging.',
 'media', 'pendente', '2025-05-01', 2),

('Testes Mobile',
 'Testes em dispositivos reais (iOS e Android). Validar performance e consumo de bateria.',
 'media', 'pendente', '2025-06-15', 2);

-- ============================================
-- TAREFAS - PROJETO 3 (Redesign UI/UX)
-- ============================================
INSERT OR IGNORE INTO tarefa (titulo, descricao, prioridade, status, prazo, id_projeto) VALUES
('Pesquisa de Competitors',
 'Analisar interfaces de concorrentes. Estudar tendencias atuais de design e UX patterns.',
 'media', 'concluida', '2025-03-10', 3),

('Criar Design System',
 'Definir cores, tipografia, componentes reutilizaveis, ícones e spacing guidelines.',
 'alta', 'em_andamento', '2025-04-10', 3),

('Mockups Alta Fidelidade',
 'Criar designs detalhados em Figma para todas as telas da aplicacao.',
 'alta', 'em_andamento', '2025-04-30', 3),

('Teste de Usabilidade',
 'Realizar testes com usuarios reais. Coletar feedback e identificar pontos de melhoria.',
 'media', 'pendente', '2025-05-15', 3),

('Implementar Novo Design',
 'Converter designs em HTML/CSS. Garantir responsividade e acessibilidade.',
 'alta', 'pendente', '2025-05-31', 3);

-- ============================================
-- TAREFAS - PROJETO 4 (Documentação)
-- ============================================
INSERT OR IGNORE INTO tarefa (titulo, descricao, prioridade, status, prazo, id_projeto) VALUES
('Documentação de Instalação',
 'Guia passo-a-passo para instalação e configuracao inicial. Incluir troubleshooting comum.',
 'media', 'concluida', '2025-01-30', 4),

('Documentação de Uso',
 'Manual completo de como usar a aplicacao. Incluir screenshots e exemplos praticos.',
 'media', 'em_andamento', '2025-03-15', 4),

('Documentação API Técnica',
 'Documentacao detalhada de todos os endpoints, parametros, respostas e codigos de erro.',
 'alta', 'pendente', '2025-04-15', 4),

('Criar Video Tutoriais',
 'Gravar videos mostrando como usar os recursos principais da aplicacao.',
 'media', 'pendente', '2025-05-31', 4),

('FAQ e Troubleshooting',
 'Compilar perguntas frequentes e solucoes para problemas comuns encontrados por usuarios.',
 'baixa', 'pendente', '2025-06-30', 4);

-- ============================================
-- TAREFAS - PROJETO 5 (Integrações)
-- ============================================
INSERT OR IGNORE INTO tarefa (titulo, descricao, prioridade, status, prazo, id_projeto) VALUES
('Integração com Gmail',
 'Sincronizar tarefas com Gmail. Permitir criar tarefas a partir de emails.',
 'media', 'pendente', '2025-05-01', 5),

('Integração com Google Calendar',
 'Exibir tarefas no Google Calendar. Sincronizar prazos automaticamente.',
 'media', 'pendente', '2025-05-31', 5),

('Integração com Slack',
 'Bot do Slack para criar/atualizar tarefas. Notificacoes de tarefas importantes no Slack.',
 'alta', 'pendente', '2025-06-30', 5),

('Integração com Trello',
 'Sincronizar tarefas bidirecionalmente com Trello boards.',
 'baixa', 'pendente', '2025-07-31', 5),

('Integração com Jira',
 'Conectar com Jira para projetos que usam essa plataforma.',
 'media', 'pendente', '2025-08-31', 5);

-- ============================================
-- COMENTÁRIOS
-- ============================================
INSERT OR IGNORE INTO comentario (texto, id_tarefa, id_usuario) VALUES
-- Comentários Projeto 1
('Excelente trabalho! Database pronto para produção.', 1, 2),
('Lembrem de adicionar indices para melhorar performance.', 1, 3),
('Autenticação implementada com sucesso. Todos os testes passando!', 2, 1),
('Vamos precisar adicionar suporte a 2FA depois.', 2, 2),
('Implementei os primeiros endpoints. Precisa de review.', 3, 1),
('Que tal adicionar rate limiting na API?', 3, 3),
('Dashboard ficou lindo com os gráficos!', 4, 2),
('Precisamos de mais testes de carga.', 4, 1),

-- Comentários Projeto 2
('Setup React Native concluído com sucesso.', 9, 4),
('Usando Redux para gerenciamento de estado.', 9, 5),
('Autenticação mobile pronta para testes.', 10, 2),
('Precisamos testar fingerprint em diferentes devices.', 10, 4),

-- Comentários Projeto 3
('Análise competitiva bem feita. Boas referências.', 14, 6),
('Design system deve considerar acessibilidade WCAG 2.1.', 15, 7),
('Mockups aprovados! Podemos começar a implementar.', 16, 3),

-- Comentários Projeto 4
('Instalação bem documentada. Muito claro!', 19, 8),
('Vamos adicionar mais screenshots nos tutoriais.', 20, 1),
('Documentação API completa e bem estruturada.', 21, 4),

-- Comentários Projeto 5
('Gmail sync será muito útil para produtividade.', 24, 5),
('Slack bot vai melhorar muito o fluxo de trabalho.', 26, 2);

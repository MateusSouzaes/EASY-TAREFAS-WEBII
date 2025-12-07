<div align="center">

# 📋 EASY-Tarefa

### *Gerenciador de Tarefas Simples e Eficiente*

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black" />

---

### 🌟 *Uma aplicação web moderna para gerenciar suas tarefas com simplicidade e elegância*

[✨ Demonstração](#-demonstração) • [🚀 Funcionalidades](#-funcionalidades) • [📦 Instalação](#-instalação) • [🎯 Como Usar](#-como-usar) • [🛠️ Tecnologias](#️-tecnologias)

</div>

---

## 📖 Sobre o Projeto

**EASY-Tarefa** é uma aplicação web desenvolvida para o gerenciamento eficiente de tarefas, permitindo que usuários organizem suas atividades diárias de forma intuitiva e produtiva. O projeto foi desenvolvido como parte da disciplina de **Desenvolvimento Web II** e **Programação com Acesso a Banco de Dados**.

### 💡 Motivação

Em um mundo cada vez mais dinâmico, manter-se organizado é essencial. O EASY-Tarefa foi criado para simplificar o gerenciamento de tarefas, oferecendo uma interface limpa e funcional que permite aos usuários focar no que realmente importa: realizar suas atividades.

---

## ✨ Demonstração

<div align="center">

### 🔐 Tela de Login
*Interface moderna e intuitiva para acesso ao sistema*

### 📊 Dashboard Principal
*Visualização completa de todas as suas tarefas com filtros inteligentes*

### ➕ Adicionar Tarefas
*Crie tarefas com título, descrição e prioridade em segundos*

</div>

---

## 🚀 Funcionalidades

<div align="center">

| Funcionalidade | Descrição |
|---------------|-----------|
| 🔐 **Autenticação** | Sistema seguro de login e cadastro com sessões |
| 📊 **Dashboard** | Visualização com gráficos Chart.js interativos |
| 📁 **Projetos CRUD** | Criar, ler, editar e excluir projetos |
| ➕ **Criar Tarefas** | Adicione tarefas com título, descrição, prioridade e prazo |
| ✏️ **Editar Tarefas** | Atualize todos os campos de uma tarefa |
| 📝 **Editar Status** | Atualize o status das tarefas (Pendente, Em Andamento, Concluída) |
| 🗑️ **Excluir Tarefas** | Remova tarefas com confirmação de segurança |
| 💬 **Comentários** | Adicione, edite e delete comentários em tarefas |
| 👥 **Colaboradores** | Adicione usuários como colaboradores de projetos |
| 🔍 **Filtros** | Filtre tarefas por status para melhor organização |
| 🎨 **Prioridades** | Defina prioridades (Baixa, Média, Alta) com cores visuais |
| 📈 **Gráficos** | Visualize estatísticas com 3 gráficos interativos |
| 📱 **Responsivo** | Interface adaptável para desktop, tablet e mobile |
| 🌈 **UI Moderna** | Design clean com gradientes e animações suaves |

</div>

---

## 📦 Instalação

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/JoelAPJunior/EASY-TAREFAS-WEBII.git

# 2. Entre no diretório do projeto
cd EASY-TAREFAS-WEBII

# 3. Instale as dependências
npm install

# 4. Inicialize o banco de dados
npm run init-db

# 5. Reinicialize o banco de dados (limpa dados anteriores)
npm run reset-db

# 6. Inicie o servidor de desenvolvimento
npm run dev
```

### 🎉 Pronto!

A aplicação estará disponível em: **http://localhost:3000**

**Credenciais de teste (após `npm run reset-db`):**
- Email: `joao@example.com` / Senha: `senha123`
- Email: `maria@example.com` / Senha: `senha123`
- (8 usuários de exemplo criados automaticamente)

---

## 🎯 Como Usar

### 1️⃣ Primeiro Acesso

```
1. Acesse http://localhost:3000
2. Clique em "Cadastre-se"
3. Preencha seus dados (Nome, Email, Senha)
4. Faça login com suas credenciais
```

### 2️⃣ Dashboard

- Visualize estatísticas com 3 gráficos interativos
- Veja todos os seus projetos
- Acesse tarefas recentes
- Analise a distribuição de status das tarefas

### 3️⃣ Gerenciando Projetos

#### ➕ Criar Novo Projeto
- Preencha o título do projeto
- Adicione uma descrição (opcional)
- Defina datas de início e término (opcional)
- Clique em "Criar Projeto"

#### ✏️ Editar Projeto
- Clique no botão "Editar" no projeto
- Atualize os campos desejados
- Clique em "Salvar Alterações"

#### 🗑️ Excluir Projeto
- Clique no botão "Excluir" no projeto
- Confirme a ação (todas as tarefas serão removidas)

#### 👥 Adicionar Colaboradores
- Acesse a página de detalhes do projeto
- Clique em "Adicionar Colaborador"
- Selecione um usuário e defina o role
- Colaborador receberá acesso ao projeto

### 4️⃣ Gerenciando Tarefas

#### ➕ Adicionar Nova Tarefa
- No projeto, preencha o campo "Nome da tarefa"
- Adicione uma descrição (opcional)
- Selecione a prioridade
- Defina um prazo (opcional)
- Clique em "Adicionar Tarefa"

#### ✏️ Editar Tarefa
- Clique no botão "Editar" da tarefa
- Atualize qualquer campo (título, descrição, prioridade, status)
- As alterações são salvas automaticamente

#### 📝 Atualizar Status
- Use o dropdown na tarefa para alterar o status
- Opções: Pendente → Em Andamento → Concluída

#### 💬 Adicionar Comentários
- Clique no botão "Comentários" na tarefa
- Abra o modal de comentários
- Digite seu comentário e clique "Adicionar"
- Veja todos os comentários da tarefa

#### 🗑️ Excluir Tarefa
- Clique no botão "Excluir" na tarefa
- Confirme a ação na mensagem de alerta

#### 🔍 Filtrar Tarefas
- Use os botões de filtro: Todas, Pendentes, Em Andamento, Concluídas
- A visualização será atualizada automaticamente

## 🛠️ Scripts Disponíveis

```bash
npm run dev        # Inicia servidor com nodemon (desenvolvimento)
npm run init-db    # Cria banco de dados com seed (sem deletar dados anteriores)
npm run reset-db   # Deleta banco atual e recria do zero com seed
```

### Backend

```javascript
{
  "runtime": "Node.js v24+",
  "framework": "Express.js 4.x",
  "database": "SQLite3 com foreign keys",
  "session": "express-session com cookies",
  "template": "EJS 3.x",
  "autenticacao": "bcrypt + session-based"
}
```

### Frontend

```javascript
{
  "markup": "HTML5 semântico",
  "styling": "CSS3 (Flexbox, Grid, responsivo)",
  "javascript": "ES6+ vanilla (sem frameworks)",
  "charts": "Chart.js 4.4.0",
  "design": "Mobile-first, 100% responsivo"
}
```

### Arquitetura

```
EASY-TAREFAS-WEBII/
├── 📄 app.js                      # Configuração principal (middlewares, sessões)
├── 📄 db.js                       # Utilitários de banco (init, reset)
├── 📄 package.json                # Dependências e scripts
│
├── 📁 routes/
│   ├── api.js                    # 30+ endpoints REST (CRUD completo)
│   └── web.js                    # Rotas de renderização (EJS)
│
├── 📁 models/
│   └── queries.js                # Funções auxiliares de queries
│
├── 📁 views/ (EJS Templates)
│   ├── layout.ejs                # Layout principal (navbar, footer)
│   ├── index.ejs                 # Dashboard com gráficos Chart.js
│   ├── login.ejs                 # Página de login/autenticação
│   ├── sobre.ejs                 # Página sobre o sistema
│   └── projetos/
│       ├── projetos.ejs          # Lista de projetos (CRUD)
│       └── projeto-tarefas.ejs   # Tarefas do projeto + comentários
│
├── 📁 public/
│   ├── css/
│   │   └── style.css             # Estilos completos (responsivo, modais, temas)
│   └── js/
│       ├── app.js                # Lógica geral (autenticação, listeners)
│       ├── projetos.js           # CRUD de projetos (frontend)
│       ├── projeto-tarefas.js    # CRUD de tarefas e comentários
│       └── dashboard-charts.js   # Inicialização Chart.js
│
├── 📁 migrations/
│   └── 001_init.sql              # Schema do banco (5 tabelas + constraints)
│
└── 📁 seed/
    └── seed.sql                  # Dados iniciais (8 usuários, 5 projetos, 28 tarefas)
```

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│ CLIENTE (Browser)                                               │
├─────────────────────────────────────────────────────────────────┤
│ ↓ HTML + EJS Templates (renderiza no servidor)                  │
│ ↓ JavaScript ES6+ (listeners, fetch requests)                   │
│ ↓ CSS3 Responsivo (Mobile-first design)                         │
└─────────────────────────────────────────────────────────────────┘
           ↓ HTTP (GET, POST, PATCH, DELETE)
┌─────────────────────────────────────────────────────────────────┐
│ EXPRESS SERVER (app.js)                                         │
├─────────────────────────────────────────────────────────────────┤
│ ├─ Middleware: Sessions, Auth, CORS                             │
│ ├─ Routes: /web/* (renderiza EJS)                               │
│ └─ Routes: /api/* (JSON responses)                              │
└─────────────────────────────────────────────────────────────────┘
           ↓ SQL (Prepared statements)
┌─────────────────────────────────────────────────────────────────┐
│ BANCO DE DADOS (SQLite3)                                        │
├─────────────────────────────────────────────────────────────────┤
│ ├─ usuario (id, nome, email, senha, criado_em)                 │
│ ├─ projeto (id, titulo, descricao, id_usuario_dono, datas)     │
│ ├─ tarefa (id, titulo, id_projeto, status, prioridade, prazo)  │
│ ├─ comentario (id, texto, id_tarefa, id_usuario, data)         │
│ └─ usuario_projeto (id_usuario, id_projeto, role)              │
│    ↳ Foreign Keys + Cascading Deletes                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Paleta de Cores

<div align="center">

| Cor | Hex | Uso |
|-----|-----|-----|
| 🟣 Roxo Principal | `#667eea` | Botões, Links, Headers |
| 🟪 Roxo Escuro | `#764ba2` | Gradientes, Hover States |
| 🔴 Vermelho | `#e74c3c` | Alta Prioridade, Excluir |
| 🟠 Laranja | `#f39c12` | Média Prioridade |
| 🔵 Azul | `#3498db` | Baixa Prioridade, Em Andamento |
| 🟢 Verde | `#27ae60` | Tarefas Concluídas |

</div>

---

## 📡 API Endpoints

### Autenticação

```http
POST /login          # Fazer login
POST /cadastro       # Criar conta
GET  /logout         # Sair do sistema
```

### Projetos

```http
GET    /api/projetos              # Listar todos os projetos
GET    /api/projetos/:id          # Obter projeto específico
POST   /api/projetos              # Criar novo projeto
PATCH  /api/projetos/:id          # Atualizar projeto
DELETE /api/projetos/:id          # Excluir projeto (deleta tarefas e colaboradores)
```

### Tarefas

```http
GET    /api/tarefas               # Listar todas as tarefas
GET    /api/tarefas/:id           # Obter tarefa específica
GET    /api/projetos/:id/tarefas  # Listar tarefas de um projeto
POST   /api/tarefas               # Criar nova tarefa
PATCH  /api/tarefas/:id           # Atualizar tarefa
DELETE /api/tarefas/:id           # Excluir tarefa (deleta comentários)
```

### Comentários

```http
GET    /api/tarefas/:id/comentarios     # Listar comentários de uma tarefa
GET    /api/comentarios/:id             # Obter comentário específico
POST   /api/comentarios                 # Criar novo comentário
PATCH  /api/comentarios/:id             # Atualizar comentário
DELETE /api/comentarios/:id             # Excluir comentário
```

### Colaboradores

```http
GET    /api/projetos/:id/colaboradores                 # Listar colaboradores
GET    /api/projetos/:id/colaboradores/:id_usuario     # Obter colaborador específico
POST   /api/projetos/:id/colaboradores                 # Adicionar colaborador
PATCH  /api/projetos/:id/colaboradores/:id_usuario     # Atualizar role do colaborador
DELETE /api/projetos/:id/colaboradores/:id_usuario     # Remover colaborador
```

### Estatísticas

```http
GET    /api/estatisticas/projetos   # Estatísticas de todos os projetos
GET    /api/estatisticas/status     # Contagem de tarefas por status
```

### Exemplos de Requisição

```javascript
// Criar novo projeto
fetch('/api/projetos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    titulo: 'Meu Projeto',
    descricao: 'Descrição do projeto',
    data_inicio: '2025-01-01',
    data_fim: '2025-12-31',
    id_usuario_dono: 1
  })
});

// Criar nova tarefa
fetch('/api/tarefas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    titulo: 'Minha tarefa',
    descricao: 'Descrição detalhada',
    prioridade: 'alta',
    status: 'pendente',
    prazo: '2025-01-15',
    id_projeto: 1
  })
});

// Atualizar status de uma tarefa
fetch('/api/tarefas/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'concluida'
  })
});

// Adicionar comentário
fetch('/api/comentarios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    texto: 'Meu comentário',
    id_tarefa: 1,
    id_usuario: 1
  })
});

// Adicionar colaborador
fetch('/api/projetos/1/colaboradores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id_usuario: 2,
    role: 'colaborador'
  })
});
```

---

## 🗄️ Banco de Dados

### Modelo de Dados

```sql
┌──────────────────┐
│    usuario       │
├──────────────────┤
│ id (PK)          │
│ nome             │
│ email (UNIQUE)   │
│ senha            │
│ criado_em        │
└──────────────────┘
        ↑
        │ (1:N)
        │
┌──────────────────┐
│    projeto       │
├──────────────────┤
│ id (PK)          │
│ titulo           │
│ descricao        │
│ data_inicio      │
│ data_fim         │
│ id_usuario_dono  │ → usuario(id)
│ criado_em        │
└──────────────────┘
        ↑
        │ (1:N)
        │
┌──────────────────┐
│     tarefa       │
├──────────────────┤
│ id (PK)          │
│ titulo           │
│ descricao        │
│ prioridade       │
│ status           │
│ prazo            │
│ id_projeto       │ → projeto(id)
│ criado_em        │
└──────────────────┘
        ↑
        │ (1:N)
        │
┌──────────────────┐
│   comentario     │
├──────────────────┤
│ id (PK)          │
│ texto            │
│ id_tarefa        │ → tarefa(id)
│ id_usuario       │ → usuario(id)
│ criado_em        │
└──────────────────┘

┌──────────────────────┐
│  usuario_projeto     │ (Tabela de Associação)
├──────────────────────┤
│ id_usuario (FK)      │ → usuario(id)
│ id_projeto (FK)      │ → projeto(id)
│ role                 │ (owner, colaborador)
│ criado_em            │
└──────────────────────┘
```

### Campos das Entidades

**Usuario**
- `id`: Identificador único
- `nome`: Nome completo do usuário
- `email`: Email único para login
- `senha`: Senha criptografada
- `criado_em`: Data de criação

**Projeto**
- `id`: Identificador único
- `titulo`: Nome do projeto (obrigatório)
- `descricao`: Descrição detalhada (opcional)
- `data_inicio`: Data de início (opcional)
- `data_fim`: Data de término (opcional)
- `id_usuario_dono`: Proprietário do projeto
- `criado_em`: Data de criação

**Tarefa**
- `id`: Identificador único
- `titulo`: Nome da tarefa (obrigatório)
- `descricao`: Descrição detalhada
- `prioridade`: Alta, Média, Baixa (padrão: Média)
- `status`: Pendente, Em Andamento, Concluída (padrão: Pendente)
- `prazo`: Data limite para conclusão (opcional)
- `id_projeto`: Projeto ao qual pertence
- `criado_em`: Data de criação

**Comentário**
- `id`: Identificador único
- `texto`: Conteúdo do comentário
- `id_tarefa`: Tarefa comentada
- `id_usuario`: Autor do comentário
- `criado_em`: Data de criação

**Usuario_Projeto**
- `id_usuario`: Referência ao usuário
- `id_projeto`: Referência ao projeto
- `role`: Papel do usuário (owner, colaborador)
- `criado_em`: Data de associação

---

## 📊 Dados de Exemplo (Seed)

Quando você executa `npm run reset-db`, a aplicação cria automaticamente:

### Usuários (8 usuários)
- João Silva (joao@example.com)
- Maria Santos (maria@example.com)
- Pedro Oliveira (pedro@example.com)
- Ana Costa (ana@example.com)
- Carlos Souza (carlos@example.com)
- Julia Mendes (julia@example.com)
- Ricardo Alves (ricardo@example.com)
- Fernanda Lima (fernanda@example.com)

**Todos com senha: `senha123`**

### Projetos (5 projetos com tarefas)
1. **Desenvolvimento de Sistema Web** (8 tarefas)
2. **Aplicativo Mobile iOS/Android** (5 tarefas)
3. **Redesign da Interface Gráfica** (5 tarefas)
4. **Documentação Técnica do Projeto** (5 tarefas)
5. **Integrações com Serviços Externos** (5 tarefas)

**Total: 28 tarefas** com status distribuídos (concluídas, em andamento, pendentes) e prioridades variadas.

### Comentários (12 comentários de exemplo)
Distribuídos entre as tarefas para demonstrar a funcionalidade.

---

## 🔐 Segurança

- ✅ Sessões seguras com `express-session`
- ✅ Proteção de rotas com middleware de autenticação
- ✅ Validação de dados no backend
- ✅ Prevenção de SQL Injection com prepared statements
- ✅ CORS habilitado para APIs
- ✅ Cascade delete para manter integridade referencial
- ✅ Hash de senha com bcrypt
- ✅ Validação de entrada (type checking, length validation)

---

## 📊 Gráficos e Estatísticas

A aplicação possui 3 gráficos interativos na dashboard:

1. **Gráfico de Status (Donut)** - Distribuição de tarefas por status
2. **Gráfico de Projetos (Barras)** - Quantidade de tarefas por projeto
3. **Gráfico de Distribuição (Stacked Bar)** - Status de tarefas por projeto

Todos os gráficos são construídos com **Chart.js 4.4.0** e atualizam em tempo real com dados da API.

---

## 🎨 Recursos de Design

- 🎨 **Paleta de cores profissional**: Roxo, laranja, vermelho e verde
- 🌈 **Gradientes**: Backgrounds com transições suaves
- ✨ **Animações**: Transições CSS3 em botões, modais e cards
- 📱 **Responsividade**: Media queries para mobile, tablet e desktop
- 🎭 **Modal System**: Modais para edição e visualização de comentários
- 📊 **Cards**: Layout em grid com sombras e hover effects

---

## 🚦 Status das Funcionalidades

### ✅ Implementadas

- [x] Autenticação e Sessões
- [x] Dashboard com gráficos interativos
- [x] CRUD Completo de Projetos
- [x] CRUD Completo de Tarefas
- [x] CRUD Completo de Comentários
- [x] CRUD Completo de Colaboradores
- [x] Filtros de status
- [x] Validação de dados
- [x] Proteção de rotas
- [x] API REST documentada
- [x] Interface responsiva
- [x] Estatísticas em tempo real

### 🔄 Melhorias Futuras

- [ ] Notificações em tempo real com WebSocket
- [ ] Busca avançada de tarefas
- [ ] Exportar tarefas como PDF
- [ ] Temas (Light/Dark mode)
- [ ] Autenticação com OAuth (Google, GitHub)
- [ ] Upload de arquivos em tarefas
- [ ] Atribuição de tarefas a usuários específicos
- [ ] Histórico de alterações (Activity log)
- [ ] Integração com calendário
- [ ] Notificações por email

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor em desenvolvimento (com hot-reload via nodemon)
npm run dev

# Criar/atualizar banco de dados com seed (sem deletar dados)
npm run init-db

# Reset completo: deleta e recria banco com seed
npm run reset-db
```

---

## 🤝 Contribuindo

Se você encontrou um bug ou tem sugestões de melhorias, abra uma issue ou pull request!

**Como contribuir:**
1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🎓 Conceitos Implementados

### Tecnologias Backend
- **Node.js**: Runtime JavaScript no servidor
- **Express.js**: Framework web minimalista e rápido
- **SQLite3**: Banco de dados relacional leve e portável
- **express-session**: Gerenciamento seguro de sessões
- **EJS**: Motor de templates para renderização dinâmica
- **bcrypt**: Hash seguro de senhas

### Tecnologias Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos avançados (Flexbox, Grid, Gradientes, Animações)
- **JavaScript ES6+**: Fetch API, async/await, arrow functions, destructuring
- **Chart.js 4.4.0**: Gráficos interativos e responsivos
- **Responsive Design**: Mobile-first approach com media queries

### Padrões e Arquitetura

- **MVC Architecture**: Separação entre Models, Views e Controllers
- **REST API**: Design de APIs com HTTP methods (GET, POST, PATCH, DELETE)
- **CRUD Operations**: Criar, Ler, Atualizar e Deletar dados
- **Prepared Statements**: Prevenção de SQL Injection
- **Foreign Keys**: Integridade referencial entre tabelas
- **Cascading Deletes**: Manutenção automática de relacionamentos
- **Middleware Pattern**: Processamento intermediário de requisições
- **Event-Driven**: Listeners DOM para interações do usuário
- **Async/Await**: Programação assíncrona e síncrona
- **Data Validation**: Validação no backend e frontend

---

## 📚 Disciplinas de Ensino

Este projeto foi desenvolvido como trabalho prático integrador das disciplinas:

| Disciplina | Conteúdo Principal |
|-----------|-------------------|
| **Desenvolvimento Web II** | Full-stack JavaScript, arquitetura MVC, Express.js |
| **Banco de Dados** | Normalização SQL, foreign keys, queries, integridade referencial |
| **Interface com Usuário** | Design responsivo, UX/UI, acessibilidade web |

---

<div align="center">

### 💜 Desenvolvido com dedicação e paixão por desenvolvimento web

**Mateus Souza**  
Desenvolvimento Web II - 2025

[⬆ Voltar ao topo](#-easy-tarefa)

</div>

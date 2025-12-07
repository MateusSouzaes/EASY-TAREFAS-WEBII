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

**EASY-Tarefa** é uma aplicação web desenvolvida para o gerenciamento eficiente de tarefas, permitindo que usuários organizem suas atividades diárias de forma intuitiva e produtiva. O projeto foi desenvolvido como parte da disciplina de **Desenvolvimento Web II**.

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
| ➕ **Criar Tarefas** | Adicione tarefas com título, descrição e prioridade |
| 📝 **Editar Status** | Atualize o status das tarefas (Pendente, Em Andamento, Concluída) |
| 🗑️ **Excluir Tarefas** | Remova tarefas com confirmação de segurança |
| 🔍 **Filtros** | Filtre tarefas por status para melhor organização |
| 🎨 **Prioridades** | Defina prioridades (Baixa, Média, Alta) com cores visuais |
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

# 5. Inicie o servidor
npm start
```

### 🎉 Pronto!

Acesse a aplicação em: **http://localhost:3000**

---

## 🎯 Como Usar

### 1️⃣ Primeiro Acesso

```
1. Acesse http://localhost:3000
2. Clique em "Cadastre-se"
3. Preencha seus dados (Nome, Email, Senha)
4. Faça login com suas credenciais
```

### 2️⃣ Gerenciando Tarefas

#### ➕ Adicionar Nova Tarefa
- Preencha o campo "Nome da tarefa"
- Adicione uma descrição (opcional)
- Selecione a prioridade
- Clique em "Adicionar Tarefa"

#### 📝 Atualizar Status
- Use o dropdown na tarefa para alterar o status
- Opções: Pendente → Em Andamento → Concluída

#### 🗑️ Excluir Tarefa
- Clique no botão "Excluir" na tarefa
- Confirme a ação na mensagem de alerta

#### 🔍 Filtrar Tarefas
- Use os botões de filtro: Todas, Pendentes, Em Andamento, Concluídas
- A visualização será atualizada automaticamente

---

## 🛠️ Tecnologias

### Backend

```javascript
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "SQLite3",
  "session": "express-session",
  "template": "EJS"
}
```

### Frontend

```javascript
{
  "html": "HTML5",
  "css": "CSS3",
  "javascript": "ES6+",
  "responsive": "Mobile-First Design"
}
```

### Arquitetura

```
├── 📁 app.js                 # Configuração principal do Express
├── 📁 db.js                  # Configuração do banco de dados
├── 📁 server.js              # Inicialização do servidor
├── 📁 routes/
│   ├── api.js               # Rotas da API REST
│   └── web.js               # Rotas das páginas web
├── 📁 models/
│   └── queries.js           # Queries do banco de dados
├── 📁 views/
│   ├── layout.ejs           # Layout principal
│   ├── index.ejs            # Dashboard
│   ├── login.ejs            # Página de login
│   ├── cadastro.ejs         # Página de cadastro
│   └── sobre.ejs            # Sobre o sistema
├── 📁 public/
│   ├── css/style.css        # Estilos
│   └── js/app.js            # JavaScript frontend
├── 📁 migrations/
│   └── 001_init.sql         # Schema do banco
└── 📁 seed/
    └── seed.sql             # Dados iniciais
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

### Tarefas

```http
GET    /api/tarefas           # Listar todas as tarefas
POST   /api/tarefas           # Criar nova tarefa
PATCH  /api/tarefas/:id       # Atualizar tarefa
DELETE /api/tarefas/:id       # Excluir tarefa
```

### Exemplo de Requisição

```javascript
// Criar nova tarefa
fetch('/api/tarefas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    titulo: 'Minha tarefa',
    descricao: 'Descrição detalhada',
    prioridade: 'alta',
    status: 'pendente'
  })
});
```

---

## 🗄️ Banco de Dados

### Modelo de Dados

```sql
┌──────────────┐
│   usuario    │
├──────────────┤
│ id           │
│ nome         │
│ email        │
│ senha        │
│ criado_em    │
└──────────────┘

┌──────────────┐
│   projeto    │
├──────────────┤
│ id           │
│ titulo       │
│ descricao    │
│ data_inicio  │
│ data_fim     │
│ id_usuario   │
│ criado_em    │
└──────────────┘

┌──────────────┐
│   tarefa     │
├──────────────┤
│ id           │
│ titulo       │
│ descricao    │
│ prioridade   │
│ status       │
│ prazo        │
│ id_projeto   │
│ criado_em    │
└──────────────┘
```

---

## 🔐 Segurança

- ✅ Sessões seguras com `express-session`
- ✅ Proteção de rotas com middleware de autenticação
- ✅ Validação de dados no backend
- ✅ Prevenção de SQL Injection com prepared statements
- ✅ CORS habilitado para APIs

---

## 🚦 Status do Projeto

<div align="center">

✅ **Concluído e Funcional**

O projeto está completo e pronto para uso!

</div>

---

## 📝 Scripts Disponíveis

```bash
# Iniciar em modo de produção
npm start

# Iniciar em modo de desenvolvimento (com hot-reload)
npm run dev

# Inicializar/Resetar banco de dados
npm run init-db
```

---

## 👨‍💻 Autor

<div align="center">

**Joel AP Junior**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JoelAPJunior)

</div>

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Encontrou algum problema ou tem sugestões? 

- 🐛 [Abra uma issue](https://github.com/JoelAPJunior/EASY-TAREFAS-WEBII/issues)
- 💬 Entre em contato

---

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido como trabalho da disciplina de **Desenvolvimento Web II**, demonstrando conhecimentos em:

- Desenvolvimento Full Stack com Node.js
- Arquitetura MVC
- REST APIs
- Autenticação e Sessões
- Banco de Dados Relacional
- Frontend Responsivo
- Boas práticas de código

---

<div align="center">

### ⭐ Se este projeto foi útil para você, considere dar uma estrela!

**Desenvolvido com 💜 por Joel AP Junior**

</div>

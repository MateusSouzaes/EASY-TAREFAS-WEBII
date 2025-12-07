<div align="center">

# 📋 EASY-Tarefa

**Gerenciador de Tarefas - Node.js + Express + SQLite**

<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chart.js&logoColor=white" />

</div>

---

## 🚀 Iniciar Rápido

```bash
# Instalar dependências
npm install

# Resetar banco com dados de exemplo
npm run reset-db

# Iniciar servidor (http://localhost:3000)
npm run dev
```

**Credenciais de teste:** joao@example.com / senha123

---

## ✨ Funcionalidades

- ✅ Autenticação com sessão segura
- ✅ CRUD completo (Projetos, Tarefas, Comentários)
- ✅ Dashboard com 3 gráficos interativos (Chart.js)
- ✅ Filtros por status (Pendente, Em Andamento, Concluída)
- ✅ Prioridades (Baixa, Média, Alta) com cores visuais
- ✅ Colaboradores em projetos
- ✅ 100% responsivo (Mobile, Tablet, Desktop)

---

## 🛠️ Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| **Backend** | Node.js, Express.js |
| **Banco** | SQLite3 com Foreign Keys |
| **Template** | EJS |
| **Frontend** | HTML5, CSS3, ES6+ |
| **Gráficos** | Chart.js 4.4.0 |

---

## 📊 Dados de Exemplo

Ao executar `npm run reset-db`:
- **8 usuários** de teste criados
- **5 projetos** com tarefas relacionadas
- **28 tarefas** distribuídas entre projetos
- **12 comentários** de exemplo

---

## 📁 Estrutura

```
├── app.js                      # Configuração Express
├── db.js                       # Utilitários de banco (init/reset)
├── routes/
│   ├── api.js                 # 30+ endpoints REST
│   └── web.js                 # Renderização de páginas
├── views/
│   ├── index.ejs              # Dashboard com gráficos
│   ├── login.ejs              # Autenticação
│   └── projetos/              # CRUD de projetos e tarefas
├── public/
│   ├── css/style.css          # Estilos responsivos
│   └── js/
│       ├── app.js             # Lógica geral
│       ├── projetos.js        # CRUD projetos
│       ├── projeto-tarefas.js # CRUD tarefas/comentários
│       └── dashboard-charts.js # Gráficos
├── migrations/
│   └── 001_init.sql           # Schema do banco
└── seed/
    └── seed.sql               # Dados iniciais
```

---

## 📡 API Endpoints

### Autenticação
```http
POST   /login              # Fazer login
POST   /cadastro           # Criar conta
GET    /logout             # Sair
```

### Projetos
```http
GET    /api/projetos              # Listar
POST   /api/projetos              # Criar
PATCH  /api/projetos/:id          # Atualizar
DELETE /api/projetos/:id          # Deletar
GET    /api/projetos/:id/tarefas  # Tarefas do projeto
```

### Tarefas
```http
GET    /api/tarefas        # Listar
POST   /api/tarefas        # Criar
PATCH  /api/tarefas/:id    # Atualizar
DELETE /api/tarefas/:id    # Deletar
```

### Comentários
```http
GET    /api/comentarios            # Listar
POST   /api/comentarios            # Criar
PATCH  /api/comentarios/:id        # Atualizar
DELETE /api/comentarios/:id        # Deletar
```

---

## 🎨 Paleta de Cores

| Status | Cor |
|--------|-----|
| Alta Prioridade | 🔴 Vermelho (#e74c3c) |
| Média Prioridade | 🟠 Laranja (#f39c12) |
| Baixa Prioridade | 🔵 Azul (#3498db) |
| Concluída | 🟢 Verde (#27ae60) |
| Principal | 🟣 Roxo (#667eea) |

---

## 🔐 Segurança

- ✅ Sessions seguras com express-session
- ✅ Prepared statements (prevenção SQL Injection)
- ✅ Foreign keys com cascading deletes
- ✅ Validação de entrada no backend
- ✅ Hash de senha com bcrypt

---

## 🎓 Conceitos Implementados

- **MVC Architecture**: Separação Models, Views, Controllers
- **REST API**: GET, POST, PATCH, DELETE com JSON
- **CRUD Operations**: Criar, Ler, Atualizar, Deletar
- **Session Management**: Autenticação baseada em sessão
- **Responsive Design**: Mobile-first com CSS3
- **Async/Await**: Programação assíncrona
- **Data Validation**: Backend + Frontend

---

## 📝 Scripts

```bash
npm run dev        # Iniciar com nodemon (desenvolvimento)
npm run init-db    # Criar banco (sem deletar dados)
npm run reset-db   # Resetar banco com seed
```

---

## 📚 Disciplinas

Projeto desenvolvido para:
- Desenvolvimento Web II
- Programação com Acesso a Banco de Dados

---

---

<div align="center">

## 👨‍💻 Desenvolvedores

| | |
|---|---|
| **Joel de Araújo Pereira Junior** | **Mateus Souza e Silva** |

**2025** | IFRO - Instituto Federal de Ensino e Tecnologia de Rondônia - Campus Ji-Paraná

---


</div>

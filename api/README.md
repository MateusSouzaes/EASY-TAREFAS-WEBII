# API - EASY-Tarefas

REST API seguindo padrão C# .NET (Controllers, Models, DTOs, DataContext).

## 🚀 Início

```bash
npm install
npm start  # Porta 3001
```

**URLs:**
- API: http://localhost:3001
- Swagger: http://localhost:3001/swagger
- OpenAPI: http://localhost:3001/api-docs

---

## 📁 Estrutura

```
api/
├── Program.js              # Entry point
└── src/
    ├── Controllers/        # Lógica de requisições
    ├── Models/            # Entidades + DTOs
    ├── DataContexts/      # Abstração SQLite
    ├── routes/            # Endpoints
    └── config/            # Swagger
```

---

## 🔌 Endpoints

### Autenticação
```http
POST /api/autenticacao/login
Body: { "email": "user@example.com", "senha": "pass123" }
```

### Projetos
```http
GET    /api/projetos
POST   /api/projetos
GET    /api/projetos/:id
PUT    /api/projetos/:id
DELETE /api/projetos/:id
```

### Tarefas
```http
GET    /api/tarefas
POST   /api/tarefas
GET    /api/tarefas/:id
PUT    /api/tarefas/:id
DELETE /api/tarefas/:id
```

### Comentários
```http
GET    /api/comentarios
POST   /api/comentarios
GET    /api/comentarios/:id
PUT    /api/comentarios/:id
DELETE /api/comentarios/:id
```

---

## 🏗️ Padrão C# .NET

**Controllers** → Recebem requisições HTTP  
**Models** → Entidades de domínio  
**DTOs** → Validação de entrada  
**DataContext** → Abstração do banco (SQLite)

---

## 📚 Swagger

Acesse http://localhost:3001/swagger para:
- Visualizar todos os endpoints
- Testar requisições (Try it out)
- Ver schemas de request/response

---

## 👥 Autores

**Joel de Araújo Pereira Junior**  
**Mateus Souza e Silva**

IFRO - Campus Ji-Paraná | 2025

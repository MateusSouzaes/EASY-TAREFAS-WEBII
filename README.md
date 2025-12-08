# 📋 EASY-Tarefas

Sistema de gerenciamento de tarefas e projetos com arquitetura separada Web/API.

[![Node.js](https://img.shields.io/badge/Node.js-24.0-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-blue.svg)](https://www.sqlite.org/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-green.svg)](https://swagger.io/)

## 🚀 Início Rápido

```bash
# Via Terminal
cd api && npm install && npm start    # Terminal 1 - Porta 3001
cd web && npm install && npm start    # Terminal 2 - Porta 3000
```

**Acesso:**
- Web: http://localhost:3000
- API: http://localhost:3001
- Swagger: http://localhost:3001/swagger

**Credenciais:** `joao@example.com` / `senha123`

---

## 📁 Estrutura

```
├── api/           # REST API (C# .NET pattern)
├── web/           # Interface web (Express + EJS)
├── taskflow.db    # Banco SQLite
```

---

## 🛠️ Tecnologias

**Backend API:** Node.js, Express, JWT, Swagger/OpenAPI  
**Frontend Web:** Express, EJS, Sessions  
**Banco:** SQLite3  
**Padrão:** Controllers, Models, DTOs, DataContext

---

## ✨ Funcionalidades

- Autenticação JWT + Sessions
- CRUD completo (Projetos, Tarefas, Comentários)
- Dashboard com gráficos
- Filtros e prioridades
- API documentada (Swagger)
- Responsivo

---

## 📡 API Endpoints

```
POST   /api/autenticacao/login
GET    /api/projetos
POST   /api/projetos
PUT    /api/projetos/:id
DELETE /api/projetos/:id
GET    /api/tarefas
POST   /api/tarefas
PUT    /api/tarefas/:id
DELETE /api/tarefas/:id
GET    /api/comentarios
POST   /api/comentarios
PUT    /api/comentarios/:id
DELETE /api/comentarios/:id
```

---

## 👥 Autores

**Joel de Araújo Pereira Junior**  
**Mateus Souza e Silva**

IFRO - Campus Ji-Paraná | 2025

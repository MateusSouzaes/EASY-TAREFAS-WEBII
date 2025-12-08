# 🏗️ ARQUITETURA DO PROJETO

## Visão Geral

EASY-TAREFAS é uma aplicação de gerenciamento de tarefas com arquitetura de **microserviços** separando Web Frontend e API Backend, seguindo padrões de desenvolvimento C# .NET em Node.js.

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA APRESENTAÇÃO                      │
│                     Web App (3000)                          │
│              Express.js + EJS + Sessions                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP Requests
                     │ Form Submissions
                     │ AJAX Calls
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    CAMADA API                               │
│                     REST (3001)                             │
│        Controllers + Models + DTOs + DataContext            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ SQL Queries
                     │ Prepared Statements
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   CAMADA DADOS                              │
│                    SQLite3                                  │
│               taskflow.db                                   │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. CAMADA WEB (Frontend) - Port 3000

### Tecnologias
- **Framework**: Express.js
- **Template Engine**: EJS
- **Autenticação**: express-session
- **Logging**: Morgan
- **Frontend**: HTML5 + CSS3 + ES6+

### Responsabilidades
1. Servir interface web (templates EJS)
2. Gerenciar sessões de usuário
3. Fazer requisições para API
4. Renderizar dados em HTML
5. Validação de entrada no frontend

### Fluxo de Requisição Web
```
1. User interage com interface (click, submit)
   ↓
2. JavaScript captura evento e faz AJAX para /login ou usa formulário
   ↓
3. Express recebe em POST /login
   ↓
4. Valida dados (email, senha)
   ↓
5. Faz fetch() para API: POST http://localhost:3001/api/autenticacao/login
   ↓
6. Armazena token/sessão em req.session
   ↓
7. Redireciona para dashboard
```

### Estrutura de Rotas Web
```javascript
// Program.js - Web Routes

GET  /              → Redireciona a /login ou /dashboard
GET  /login         → Exibe página de login
POST /login         → Processa login via API
GET  /logout        → Destrói sessão
GET  /dashboard     → Página principal (requer autenticação)
GET  /projetos      → Lista projetos
GET  /projeto/:id   → Detalhes do projeto com tarefas
GET  /cadastro      → Página de cadastro
POST /cadastro      → Processa cadastro
```

---

## 2. CAMADA API (Backend) - Port 3001

### Arquitetura C# .NET Pattern

#### 2.1 CONTROLLERS
Recebem requisições HTTP e orquestram a lógica:

```javascript
// api/src/Controllers/ProjetosController.js

class ProjetosController {
  async listar(req, res) {
    // GET /api/projetos
    // Busca todos os projetos com tarefas (Include pattern)
  }
  
  async criar(req, res) {
    // POST /api/projetos
    // Valida com DTO
    // Cria novo projeto
  }
  
  async atualizar(req, res) {
    // PUT /api/projetos/:id
    // Valida dados
    // Atualiza projeto
  }
  
  async deletar(req, res) {
    // DELETE /api/projetos/:id
    // Deleta projeto e relacionamentos
  }
}
```

**Controllers do Sistema:**
1. **AutenticacaoController** → Login, JWT Token
2. **ProjetosController** → CRUD Projetos
3. **TarefasController** → CRUD Tarefas
4. **ComentariosController** → CRUD Comentários

#### 2.2 MODELS (Entidades de Domínio)

```javascript
// api/src/Models/Projeto.js

class Projeto {
  constructor(id, titulo, descricao, idUsuarioDono, dataCriacao) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.idUsuarioDono = idUsuarioDono;
    this.dataCriacao = dataCriacao;
    this.tarefas = []; // Include pattern
  }
  
  toJSON() {
    // Remove senhas, dados sensíveis
    return {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      // ... não retorna senhas
    };
  }
}
```

#### 2.3 DTOs (Data Transfer Objects)

```javascript
// api/src/Models/Dtos/CriarProjetoDto.js

class CriarProjetoDto {
  constructor(titulo, descricao) {
    this.titulo = titulo;
    this.descricao = descricao;
  }
  
  validar() {
    const erros = [];
    
    if (!this.titulo || this.titulo.length < 3) {
      erros.push('Título deve ter no mínimo 3 caracteres');
    }
    
    if (!this.descricao || this.descricao.length < 10) {
      erros.push('Descrição deve ter no mínimo 10 caracteres');
    }
    
    return erros;
  }
}
```

#### 2.4 DATA CONTEXT (Abstração de Banco)

```javascript
// api/src/DataContexts/AppDbContext.js

class AppDbContext {
  constructor() {
    this.db = new sqlite3.Database('taskflow.db');
  }
  
  // Retorna múltiplos registros
  async executarConsultaArray(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows || []);
      });
    });
  }
  
  // Retorna um registro único
  async executarConsultaUnica(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        resolve(row || null);
      });
    });
  }
  
  // Executa INSERT, UPDATE, DELETE
  async executarComando(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }
}
```

#### 2.5 ROUTES (Endpoints)

```javascript
// api/src/routes/index.js

module.exports = (app) => {
  const autController = new AutenticacaoController();
  const projController = new ProjetosController();
  const tarefController = new TarefasController();
  const comController = new ComentariosController();
  
  // Autenticação
  app.post('/api/autenticacao/login', async (req, res) => {
    await autController.login(req, res);
  });
  
  // Projetos
  app.get('/api/projetos', async (req, res) => {
    await projController.listar(req, res);
  });
  
  // ... mais endpoints
};
```

---

## 3. CAMADA DADOS - SQLite3

### Esquema do Banco

```sql
-- Usuários (autenticação)
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Projetos (grupo de tarefas)
CREATE TABLE projetos (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  id_usuario_dono INTEGER NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(id_usuario_dono) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tarefas (itens de trabalho)
CREATE TABLE tarefas (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'pendente',
  prioridade TEXT DEFAULT 'media',
  data_vencimento DATE,
  id_projeto INTEGER NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(id_projeto) REFERENCES projetos(id) ON DELETE CASCADE
);

-- Comentários (discussão)
CREATE TABLE comentarios (
  id INTEGER PRIMARY KEY,
  conteudo TEXT NOT NULL,
  id_tarefa INTEGER NOT NULL,
  id_usuario INTEGER NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(id_tarefa) REFERENCES tarefas(id) ON DELETE CASCADE,
  FOREIGN KEY(id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

### Relacionamentos
```
usuarios (1) ──────────────────→ (N) projetos
   │
   └─────────────────────────→ (N) comentarios

projetos (1) ──────────────────→ (N) tarefas

tarefas (1) ──────────────────→ (N) comentarios
```

---

## 4. FLUXO DE REQUISIÇÃO COMPLETO

### Exemplo: Listar Projetos com Tarefas

```
[Web App - Browser]
1. User clica em "Projetos"
        ↓
2. JavaScript: fetch('http://localhost:3001/api/projetos')
        ↓
[Network]
3. HTTP GET request → localhost:3001/api/projetos
        ↓
[API Backend]
4. Express router: match GET /api/projetos
        ↓
5. ProjetosController.listar(req, res)
        ↓
6. AppDbContext.executarConsultaArray('SELECT * FROM projetos')
        ↓
[Database - SQLite]
7. SQL Query executa, retorna array de projetos
        ↓
[API Backend]
8. Loop projetos, carrega tarefas se include=tarefas
        ↓
9. Transforma em JSON com toJSON()
        ↓
10. res.json({ sucesso: true, dados: projetos })
        ↓
[Network]
11. HTTP Response (JSON) → Browser
        ↓
[Web App - Browser]
12. JavaScript recebe response
        ↓
13. Renderiza projetos em HTML
        ↓
14. User vê lista de projetos na tela
```

---

## 5. PADRÕES DE DESIGN IMPLEMENTADOS

### 5.1 MVC (Model-View-Controller)
- **Model**: Projeto.js, Tarefa.js (Entidades)
- **View**: index.ejs, projeto-tarefas.ejs (Templates)
- **Controller**: ProjetosController.js (Lógica)

### 5.2 DTO Pattern
- Validação centralizada
- Separação entre dados de entrada e modelo

### 5.3 Repository Pattern (Data Context)
- Abstração do banco de dados
- Métodos reutilizáveis para CRUD

### 5.4 Separation of Concerns
- Controllers lidam com requisições
- Models representam dados
- DataContext acessa banco
- DTOs validam entrada

### 5.5 Include Pattern (EagerLoading)
```javascript
GET /api/projetos?include=tarefas,comentarios
// Carrega projetos com tarefas e comentários relacionados
```

---

## 6. VALIDAÇÃO DE DADOS

### Fluxo de Validação

```
1. Cliente envia dados
        ↓
2. Controller recebe
        ↓
3. Cria DTO com dados
        ↓
4. DTO.validar() retorna array de erros
        ↓
5. Se erros:
   └─ res.json({ sucesso: false, erros: [...] })
   
6. Se válido:
   └─ Processa dados no banco
   └─ res.json({ sucesso: true, dados: {...} })
```

### Exemplo: Criar Projeto
```javascript
// POST /api/projetos
const dto = new CriarProjetoDto(req.body.titulo, req.body.descricao);
const erros = dto.validar();

if (erros.length > 0) {
  return res.status(400).json({
    sucesso: false,
    erros: erros
  });
}

// Processa...
```

---

## 7. AUTENTICAÇÃO E AUTORIZAÇÃO

### Web App (Sessions)
```javascript
// Login via POST /login
// Armazena em req.session.usuario
// Middleware verificarAutenticacao() redireciona se não logado
```

### API (JWT)
```javascript
// Login via POST /api/autenticacao/login
// Retorna JWT token
// Cliente envia: Authorization: Bearer token
// API verifica token em cada requisição
```

---

## 8. SWAGGER/OpenAPI DOCUMENTATION

### Como Funciona

1. **swagger.js** define especificação OpenAPI 3.0
2. **JSDoc comments** em routes/index.js descrevem endpoints
3. **swagger-jsdoc** combina ambos
4. **swagger-ui-express** renderiza interface

```javascript
/**
 * @swagger
 * /api/projetos:
 *   get:
 *     summary: Listar projetos
 *     responses:
 *       200:
 *         description: Array de projetos
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Projeto'
 */
```

---

## 9. TRATAMENTO DE ERROS CENTRALIZADO

Todas as respostas de erro seguem padrão:

```javascript
{
  sucesso: false,
  mensagem: "Descrição do erro",
  erro: "CODIGO_DO_ERRO",
  erros: [...] // Validação
}
```

---

## 10. SEGURANÇA IMPLEMENTADA

✅ **SQL Injection**: Prepared statements com SQLite
✅ **CORS**: Habilitado para requisições cross-origin
✅ **Senhas**: Não retornadas em JSON (removidas por toJSON())
✅ **Validação**: DTOs validam entrada
✅ **Foreign Keys**: Cascading deletes
✅ **JWT**: Tokens para API authentication
✅ **Sessions**: express-session para Web

---

## Conclusão

A arquitetura implementa separação clara de responsabilidades, permitindo:
- ✅ Código testável e modular
- ✅ Fácil manutenção e evolução
- ✅ Documentação automática (Swagger)
- ✅ Escalabilidade horizontal
- ✅ Independência entre frontend e backend

Este é o padrão profissional usado em aplicações enterprise modernas.

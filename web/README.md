# WEB - EASY-Tarefas

Interface web para gerenciamento de tarefas.

## 🚀 Início

```bash
npm install
npm start  # Porta 3000
```

**Acesso:** http://localhost:3000  
**Credenciais:** `joao@example.com` / `senha123`

---

## 📁 Estrutura

```
web/
├── Program.js          # Entry point Express
├── .env                # Variáveis de ambiente
└── src/
    ├── views/          # Templates EJS
    └── public/         # CSS + JS
```

---

## 🔐 Variáveis (.env)

```env
PORT=3000
API_BASE_URL=http://localhost:3001
SESSION_SECRET=sua-chave-secreta
NODE_ENV=development
```

---

## 🌐 Rotas

```
GET  /              → Redireciona login/dashboard
GET  /login         → Página de login
POST /login         → Processa login
GET  /logout        → Encerra sessão
GET  /dashboard     → Dashboard principal
GET  /projetos      → Lista projetos
GET  /projeto/:id   → Detalhes + tarefas
GET  /sobre         → Página sobre
```

---

## 🔗 Integração API

A web app consome a API REST em `http://localhost:3001`.

**Exemplo:**
```javascript
const response = await fetch(`${API_BASE_URL}/api/projetos`);
const projetos = await response.json();
```

---

## 👥 Autores

**Joel de Araújo Pereira Junior**  
**Mateus Souza e Silva**

IFRO - Campus Ji-Paraná | 2025

// app.js - Configuração principal do Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const app = express();

// Configuração de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Middlewares
app.use(morgan('dev')); // Logger HTTP
app.use(cors()); // Habilita CORS
app.use(bodyParser.json()); // Parse JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos

// Configuração de sessão
app.use(session({
  secret: 'easy-tarefas-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // Expira em 24 horas
}));

// Rotas da aplicação
app.use('/api', apiRoutes); // API REST
app.use('/', webRoutes); // Rotas web

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Servidor rodando em http://localhost:${PORT}`);
});

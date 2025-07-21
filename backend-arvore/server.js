// backend-arvore/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const dicionarioRouter = require('./router/dicionario');

const app = express();
const PORT = process.env.PORT || 3003; // Nova porta para não ter conflito

// Middlewares
app.use(cors());
app.use(express.json());

// Montando as rotas do dicionário
app.use('/api/dicionario', dicionarioRouter);

app.listen(PORT, () => {
    console.log(`--- Servidor da Árvore de Busca rodando na porta ${PORT} ---`);
});
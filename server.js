require('dotenv').config(); // Carrega as variáveis do .env no início

const express = require('express');
const cors = require('cors');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

// Middleware
app.use(cors({ origin: '*' })); 
app.use(express.json()); 

// Rotas
app.use('/api', pedidoRoutes);

const PORT = process.env.PORT || 8080;  // Railway define a porta dinamicamente
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
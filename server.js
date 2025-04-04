require('dotenv').config(); // Carrega as variáveis do .env no início

const express = require('express');
const cors = require('cors');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Rotas
app.use('/api', pedidoRoutes);

const PORT = process.env.PORT || 3000;  // Railway define a porta dinamicamente
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
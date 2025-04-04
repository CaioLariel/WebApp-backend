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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

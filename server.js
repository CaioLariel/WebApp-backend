require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const pedidoRoutes = require('./routes/pedidoRoutes');
const itemRoutes = require('./routes/itemRoutes');
const app = express(); 

app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Rotas
app.use('/api', pedidoRoutes);
app.use('/api', itemRoutes);


const PORT = process.env.PORT || 3000;  // Railway define a porta dinamicamente
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const pedidoRoutes = require('./routes/pedidoRoutes');
const dotenv = require('dotenv');

// Configurar variáveis de ambiente
dotenv.config();


const app = express();

// Middleware
app.use(cors());  
app.use(express.json());  

// Rotas
app.use('/api', pedidoRoutes);

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

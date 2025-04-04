require('dotenv').config(); 
const mysql = require('mysql2');

// Criação da conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('✅ Conectado ao banco de dados');
});

module.exports = connection;

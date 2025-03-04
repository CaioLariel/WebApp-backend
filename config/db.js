const mysql = require('mysql2');

// Criação da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'www.thyagoquintas.com.br',
    user: 'engenharia_40',
    password: 'lontragigante',
    database: 'engenharia_40',
    port: 3306
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit();
    }
    console.log('Conectado ao banco de dados');
});

module.exports = connection;

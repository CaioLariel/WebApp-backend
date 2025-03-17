const db = require('../config/db');  // Importa a conexão com o banco

exports.getPedidos = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM pedidos';
        db.query(query, (err, results) => {
            if (err) {
                reject('Erro ao buscar pedidos: ' + err);
            } else {
                resolve(results); // Retorna a lista de pedidos
            }
        });
    });
};
// Função para pegar um pedido pelo ID
exports.getPedidoPorId = (pedidoId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM pedidos WHERE id = ?';
        db.query(query, [pedidoId], (err, results) => {
            if (err) {
                reject('Erro ao buscar pedido: ' + err);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);  // Retorna o pedido encontrado
                } else {
                    resolve(null);  // Retorna null se o pedido não for encontrado
                }
            }
        });
    });
};

// Função para confirmar a entrega de um pedido
exports.confirmarEntrega = (pedidoId) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE pedidos SET status = "entregue" WHERE id = ?';
        db.query(query, [pedidoId], (err, results) => {
            if (err) {
                reject('Erro ao confirmar entrega: ' + err);
            } else {
                resolve(results);  // Retorna os resultados da atualização
            }
        });
    });
};

// Função para alterar o status de um pedido
exports.alterarStatus = (pedidoId, status) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE pedidos SET status = ? WHERE id = ?';
        db.query(query, [status, pedidoId], (err, results) => {
            if (err) {
                reject('Erro ao alterar status: ' + err);
            } else {
                resolve(results);  // Retorna os resultados da atualização
            }
        });
    });
};

// Função para criar um pedido
const gerarCodigoConfirmacao = () => {
  return Math.random().toString(36).substr(2, 4).toUpperCase();  
};
exports.criarPedido = (nome_cliente, nome_produto, quantidade, valor) => {
    return new Promise((resolve, reject) => {
        const codigo_entrega = gerarCodigoConfirmacao();
        const query = `INSERT INTO pedidos (nome_cliente, nome_produto, quantidade, valor, status, codigo_entrega) 
                       VALUES (?, ?, ?, ?, 'em espera', ?)`;
        
        db.query(query, [nome_cliente, nome_produto, quantidade, valor, codigo_entrega], (err, results) => {
            if (err) {
                reject('Erro ao criar pedido: ' + err);
            } else {
                resolve({ pedidoId: results.insertId, codigo_entrega });  // Retorna o ID do pedido e o código de entrega
            }
        });
    });
};

// Função para buscar pedido por ID
exports.getPedidoPorId = (pedidoId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM pedidos WHERE id = ?';
        db.query(query, [pedidoId], (err, results) => {
            if (err) {
                reject('Erro ao buscar pedido: ' + err);
            } else {
                resolve(results[0]);  // Retorna o pedido encontrado
            }
        });
    });
};

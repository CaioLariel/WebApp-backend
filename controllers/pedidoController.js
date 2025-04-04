const db = require('../config/db');

exports.getPedidos = (req, res) => {
    const query = 'SELECT * FROM pedidos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao carregar pedidos', error: err });
        }
        res.status(200).json(results);
    });
};

exports.confirmarEntrega = (req, res) => {
    const { codigo } = req.body;
    const pedidoId = req.params.id;

    const query = 'SELECT * FROM pedidos WHERE id = ?';
    db.query(query, [pedidoId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar pedido', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        const pedido = results[0];

        if (pedido.codigo_entrega !== codigo) {
            return res.status(400).json({ message: 'Código incorreto' });
        }

        const updateQuery = 'UPDATE pedidos SET status = "finalizado" WHERE id = ?';
        db.query(updateQuery, [pedidoId], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao confirmar entrega', error: err });
            }
            res.status(200).json({ message: 'Entrega confirmada com sucesso!' });
        });
    });
};

exports.alterarStatus = (req, res) => {
    const pedidoId = req.params.id;
    const { status } = req.body;

    const statusesPermitidos = ['em espera', 'em preparo', 'finalizado'];
    if (!statusesPermitidos.includes(status)) {
        return res.status(400).json({ message: 'Status inválido. Os status válidos são: em espera, em preparo, finalizado.' });
    }

    const query = 'UPDATE pedidos SET status = ? WHERE id = ?';
    db.query(query, [status, pedidoId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao alterar status', error: err });
        }
        res.status(200).json({ message: 'Status alterado com sucesso!' });
    });
};

const gerarCodigoConfirmacao = () => {
    return Math.random().toString(36).substr(2, 4).toUpperCase();
};

exports.criarPedido = (req, res) => {
    const { nome_cliente, itens } = req.body;

    if (!itens || itens.length === 0) {
        return res.status(400).json({ message: "O pedido deve conter pelo menos um item." });
    }

    const valor_total = itens.reduce((total, item) => total + (item.quantidade * item.valor), 0);
    const codigo_entrega = gerarCodigoConfirmacao();

    const query = `INSERT INTO pedidos (nome_cliente, itens, valor_total, status, codigo_entrega) 
                   VALUES (?, ?, ?, 'em espera', ?)`;

    db.query(query, [nome_cliente, JSON.stringify(itens), valor_total, codigo_entrega], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao criar pedido", error: err });
        }

        res.status(201).json({
            message: "Pedido criado com sucesso!",
            pedidoId: results.insertId,
            codigo_entrega
        });
    });
};

const pedidoModel = require('../models/pedidoModel');
const db = require('../config/db');

// Função para pegar todos os pedidos
exports.getPedidos = (req, res) => {
    pedidoModel.getPedidos()
        .then(pedidos => res.status(200).json(pedidos))
        .catch(err => res.status(500).json({ message: 'Erro ao carregar pedidos', error: err }));
};

exports.confirmarEntrega = (req, res) => {
  const { codigo } = req.body;  
  const pedidoId = req.params.id; 

  pedidoModel.getPedidoPorId(pedidoId)
      .then(pedido => {
          if (!pedido) {
              return res.status(404).json({ message: 'Pedido não encontrado' });
          }

    
          if (pedido.codigo_entrega !== codigo) {
              return res.status(400).json({ message: 'Código incorreto' });
          }

          // Caso o código esteja correto, confirmar a entrega no banco de dados
          pedidoModel.confirmarEntrega(pedidoId)
              .then(() => {
                  res.status(200).json({ message: 'Entrega confirmada com sucesso!' });
              })
              .catch(err => {
                  res.status(500).json({ message: 'Erro ao confirmar entrega', error: err });
              });
      })
      .catch(err => {
          res.status(500).json({ message: 'Erro ao buscar pedido', error: err });
      });
};

// Função para alterar o status de um pedido
exports.alterarStatus = (req, res) => {
    const pedidoId = req.params.id;
    const { status } = req.body;

    pedidoModel.alterarStatus(pedidoId, status)
        .then(() => res.status(200).json({ message: 'Status alterado com sucesso!' }))
        .catch(err => res.status(500).json({ message: 'Erro ao alterar status', error: err }));
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

const pedidoModel = require('../models/pedidoModel');

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

// Função para criar um pedido
exports.criarPedido = (req, res) => {
    const { nome_cliente, nome_produto, quantidade, valor } = req.body;

    pedidoModel.criarPedido(nome_cliente, nome_produto, quantidade, valor)
        .then(({ pedidoId, codigo_entrega }) => {
            res.status(201).json({
                message: 'Pedido criado com sucesso!',
                pedidoId,
                codigo_entrega  // Retorna o código de entrega gerado
            });
        })
        .catch(err => res.status(500).json({ message: 'Erro ao criar pedido', error: err }));
};

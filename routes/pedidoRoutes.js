const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Rota para pegar todos os pedidos
router.get('/consultarPedidos', pedidoController.getPedidos);

// Rota para criar um pedido
router.post('/criarPedido', pedidoController.criarPedido);

// Rota para confirmar a entrega de um pedido
router.post('/:id/confirmar', pedidoController.confirmarEntrega);

// Rota para alterar o status de um pedido
router.put('/:id/status', pedidoController.alterarStatus);

module.exports = router;

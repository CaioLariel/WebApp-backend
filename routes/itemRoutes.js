const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Listar todos os itens
router.get('/buscarTodosItems', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Criar item
router.post('/criarItem', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO items (name) VALUES (?)', [name], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Item criado com sucesso' });
  });
});

// Atualizar item
router.put('/atualizarItem/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query('UPDATE items SET name = ? WHERE id = ?', [name, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Item atualizado com sucesso' });
  });
});

// Deletar item
router.delete('/deletarItem/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Item deletado com sucesso' });
  });
});

module.exports = router;

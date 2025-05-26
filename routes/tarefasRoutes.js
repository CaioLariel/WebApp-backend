const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Buscar todas as tarefas
router.get('/tarefas', (req, res) => {
  db.query('SELECT * FROM tarefas', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Criar nova tarefa
router.post('/tarefas', (req, res) => {
  const { titulo, descricao, concluida } = req.body;
  db.query(
    'INSERT INTO tarefas (titulo, descricao, concluida) VALUES (?, ?, ?)',
    [titulo, descricao, concluida],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Tarefa criada com sucesso', id: result.insertId });
    }
  );
});

// Atualizar tarefa existente
router.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;
  db.query(
    'UPDATE tarefas SET titulo = ?, descricao = ?, concluida = ? WHERE id = ?',
    [titulo, descricao, concluida, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Tarefa atualizada com sucesso' });
    }
  );
});

// Deletar tarefa
router.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tarefas WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Tarefa deletada com sucesso' });
  });
});

module.exports = router;

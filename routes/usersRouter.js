const express = require('express');
const router = express.Router();
const UserService = require('../services/usersService');

const service = new UserService();

// GET /users
router.get('/', (req, res) => {
  const allUsers = service.getAll();
  res.json(allUsers);
});

// GET /users/ id
router.get('/:id', (req, res) => {
  const user = service.getById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});

// POST /users
router.post('/', (req, res) => {
  try {
    const newUser = service.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'CamposObligatorios') {
      return res.status(400).json({ error: 'Campos obligatorios: name, username, email, password' });
    }
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// PUT /users/ id
router.put('/:id', (req, res) => {
  try {
    const updated = service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(updated);
  } catch (error) {
    if (error.message === 'SinCampos') {
      return res.status(400).json({ error: 'No se dieron campos para actualizar' });
    }
    res.status(500).json({ error: 'Error interno al actualizar usuario' });
  }
});

// DELETE /users/ id
router.delete('/:id', (req, res) => {
  const deleted = service.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.status(204).send();
});

module.exports = router;

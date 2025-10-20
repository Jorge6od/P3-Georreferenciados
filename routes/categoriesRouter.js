const express = require('express');
const router = express.Router();
const CategoryService = require('../services/categoriesServices');

const service = new CategoryService();

// GET /categories
router.get('/', (req, res) => {
  const allCategories = service.getAll();
  res.json(allCategories);
});

//GET /categories/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.getById(id);

  if (!category) {
    return res.status(404).json({ message: 'Categoria no encontrada' });
  }

  res.json(category);
});

//POST /categories
router.post('/', (req, res) => {
  try {
    const newCategory = service.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.message === 'NombreObligatorio') {
      return res.status(400).json({ message: 'El nombre de la categoria es obligatorio' });
    }
    res.status(500).json({ message: 'Error al crear la categoria' });
  }
});

//DELETE /categories/ id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const result = service.delete(id);

    if (result === null) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }

    res.json({ message: 'Categoria eliminada correctamente' });
  } catch (error) {
    if (error.message === 'TieneProductos') {
      return res.status(400).json({
        message: 'No se puede borrar la categoria porque pertenece a productos'
      });
    }

    res.status(500).json({ message: 'Error al eliminar la categoria' });
  }
});

module.exports = router;

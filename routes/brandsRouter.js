const express = require('express');
const router = express.Router();
const BrandService = require('../services/brandsService');

const service = new BrandService();

// GET /brands
router.get('/', (req, res) => {
  const allBrands = service.getAll();
  res.json(allBrands);
});

// GET /brands /id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const brand = service.getById(id);

  if (!brand) {
    return res.status(404).json({ message: 'Marca no encontrada' });
  }

  res.json(brand);
});

// POST /brands
router.post('/', (req, res) => {
  try {
    const newBrand = service.create(req.body);
    res.status(201).json(newBrand);
  } catch (error) {
    if (error.message === 'NombreObligatorio') {
      return res.status(400).json({ message: 'El nombre de la marca es obligatorio' });
    }
    res.status(500).json({ message: 'Error al crear la marca' });
  }
});

// DELETE /brands/ id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const result = service.delete(id);

    if (result === null) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }

    res.json({ message: 'Marca eliminada correctamente' });
  } catch (error) {
    if (error.message === 'TieneProductos') {
      return res.status(400).json({ message: 'No se puede borrar la marca porque pertenece a productos' });
    }

    res.status(500).json({ message: 'Error al eliminar la marca' });
  }
});

module.exports = router;

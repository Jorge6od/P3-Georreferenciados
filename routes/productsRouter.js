const express = require('express');
const router = express.Router();
const ProductService = require('../services/productsService');

const service = new ProductService();

// GET /products
router.get('/', (req, res) => {
  const allProducts = service.getAll();
  res.json(allProducts);
});

// GET /products/ id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.json(product);
});

// POST /products
router.post('/', (req, res) => {
  try {
    const newProduct = service.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.message === 'Categoria')
      return res.status(400).json({ message: 'La categoria no existe' });
    if (error.message === 'Marca')
      return res.status(400).json({ message: 'La marca no existe' });
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

// PUT /products/ id
router.put('/:id', (req, res) => {
  try {
    const updatedProduct = service.update(req.params.id, req.body);
    if (!updatedProduct)
      return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    if (error.message === 'Categoria')
      return res.status(400).json({ message: 'La categoria no existe' });
    if (error.message === 'Marca')
      return res.status(400).json({ message: 'La marca no existe' });
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

// PATCH /products/ id
router.patch('/:id', (req, res) => {
  try {
    const product = service.patch(req.params.id, req.body);
    if (!product)
      return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    if (error.message === 'Categoria')
      return res.status(400).json({ message: 'La categoria no existe' });
    if (error.message === 'Marca')
      return res.status(400).json({ message: 'La marca no existe' });
    res.status(500).json({ message: 'Error al actualizar parcialmente el producto' });
  }
});

// DELETE /products/ id
router.delete('/:id', (req, res) => {
  const deleted = service.delete(req.params.id);

  if (!deleted)
    return res.status(404).json({ message: 'Producto no encontrado' });

  res.json({ message: 'Producto eliminado correctamente' });
});

module.exports = router;

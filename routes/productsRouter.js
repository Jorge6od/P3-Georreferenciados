const express = require('express');
const router = express.Router();
const ProductService = require('../services/productsService');

const service = new ProductService();

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', async (req, res) => {
  const products = await service.getAll();
  res.json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', async (req, res) => {
  const product = await service.getById(req.params.id);
  if (!product) return res.status(404).json({ message: 'ProductoNoEncontrado' });
  res.json(product);
});

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Crear un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', async (req, res) => {
  try {
    const product = await service.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Actualizar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const product = await service.update(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'ProductoNoEncontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await service.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'ProductoNoEncontrado' });
    res.json({ message: 'ProductoEliminado' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

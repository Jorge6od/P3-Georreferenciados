const express = require('express');
const router = express.Router();
const BrandService = require('../services/brandsService');

const service = new BrandService();

/**
 * @swagger
 * /brands:
 *   get:
 *     tags: [Brands]
 *     summary: Obtener todas las marcas
 *     responses:
 *       200:
 *         description: Lista de marcas
 */
router.get('/', async (req, res) => {
  const brands = await service.getAll();
  res.json(brands);
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     tags: [Brands]
 *     summary: Obtener una marca por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marca encontrada
 *       404:
 *         description: Marca no encontrada
 */
router.get('/:id', async (req, res) => {
  const brand = await service.getById(req.params.id);
  if (!brand) return res.status(404).json({ message: 'MarcaNoEncontrada' });
  res.json(brand);
});

/**
 * @swagger
 * /brands:
 *   post:
 *     tags: [Brands]
 *     summary: Crear una nueva marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Marca creada
 */
router.post('/', async (req, res) => {
  try {
    const brand = await service.create(req.body);
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     tags: [Brands]
 *     summary: Actualizar una marca
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
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Marca actualizada
 *       404:
 *         description: Marca no encontrada
 */
router.put('/:id', async (req, res) => {
  const brand = await service.update(req.params.id, req.body);
  if (!brand) return res.status(404).json({ message: 'MarcaNoEncontrada' });
  res.json(brand);
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     tags: [Brands]
 *     summary: Eliminar una marca
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marca eliminada
 *       404:
 *         description: Marca no encontrada
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await service.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'MarcaNoEncontrada' });
    res.json({ message: 'MarcaEliminada' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

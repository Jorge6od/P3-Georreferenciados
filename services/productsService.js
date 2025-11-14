const mongoose = require('mongoose');
const Product = require('../models/product');
const Category = require('../models/category');
const Brand = require('../models/brand');

class ProductService {
  async getAll() {
    return await Product.find();
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async create(data) {
    const { productName, price, stock, categoryId, brandId, image, active } = data;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) throw new Error('CategoriaNoValida');
    if (!mongoose.Types.ObjectId.isValid(brandId)) throw new Error('BrandNoValida');

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) throw new Error('CategoriaNoExiste');

    const brandExists = await Brand.findById(brandId);
    if (!brandExists) throw new Error('BrandNoExiste');

    const product = new Product({
      productName,
      price,
      stock,
      categoryId,
      brandId,
      image,
      active
    });

    await product.save();
    return product;
  }

  async update(id, data) {
    const product = await Product.findById(id);
    if (!product) return null;

    if (data.categoryId) {
      if (!mongoose.Types.ObjectId.isValid(data.categoryId)) throw new Error('CategoriaNoValida');
      const categoryExists = await Category.findById(data.categoryId);
      if (!categoryExists) throw new Error('CategoriaNoExiste');
      product.categoryId = data.categoryId;
    }

    if (data.brandId) {
      if (!mongoose.Types.ObjectId.isValid(data.brandId)) throw new Error('BrandNoValida');
      const brandExists = await Brand.findById(data.brandId);
      if (!brandExists) throw new Error('BrandNoExiste');
      product.brandId = data.brandId;
    }

    if (data.productName !== undefined) product.productName = data.productName;
    if (data.price !== undefined) product.price = data.price;
    if (data.stock !== undefined) product.stock = data.stock;
    if (data.image !== undefined) product.image = data.image;
    if (data.active !== undefined) product.active = data.active;

    await product.save();
    return product;
  }

  async delete(id) {
    const deleted = await Product.findByIdAndDelete(id);
    return deleted ? true : null;
  }
}

module.exports = ProductService;

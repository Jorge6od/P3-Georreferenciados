const Category = require('../models/category');
const Product = require('../models/product');

class CategoryService {
  async getAll() {
    return await Category.find();
  }

  async getById(id) {
    return await Category.findById(id);
  }

  async create(data) {
    if (!data.categoryName) throw new Error('NombreObligatorio');

    const category = new Category({
      categoryName: data.categoryName,
      description: data.description || '',
      active: data.active !== undefined ? data.active : true
    });

    await category.save();
    return category;
  }

  async update(id, data) {
    const category = await Category.findById(id);
    if (!category) return null;

    if (data.categoryName !== undefined) category.categoryName = data.categoryName;
    if (data.description !== undefined) category.description = data.description;
    if (data.active !== undefined) category.active = data.active;

    await category.save();
    return category;
  }

  async delete(id) {
    const hasProducts = await Product.exists({ categoryId: id });
    if (hasProducts) throw new Error('TieneProductos');

    const deleted = await Category.findByIdAndDelete(id);
    return deleted ? true : null;
  }
}

module.exports = CategoryService;

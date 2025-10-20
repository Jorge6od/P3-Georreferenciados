const { categories, products } = require('../db');

class CategoryService {
  getAll() {
    return categories;
  }

  getById(id) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === Number(id)) return categories[i];
    }
    return null;
  }

  create(data) {
    if (!data.categoryName) throw new Error('NombreObligatorio');

    const newCategory = {
      id: categories.length + 1,
      categoryName: data.categoryName,
      description: data.description || '',
      active: data.active !== undefined ? data.active : true
    };

    categories.push(newCategory);
    return newCategory;
  }

  delete(id) {
    const categoryId = Number(id);

    let hasProducts = false;
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoryId === categoryId) {
        hasProducts = true;
        break;
      }
    }

    if (hasProducts) throw new Error('TieneProductos');

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === categoryId) {
        categories.splice(i, 1);
        return true;
      }
    }

    return null;
  }
}

module.exports = CategoryService;

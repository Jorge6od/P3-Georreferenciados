const { products, categories, brands } = require('../db');

class ProductService {
  getAll() {
    return products;
  }

  getById(id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(id)) return products[i];
    }
    return null;
  }

  create(data) {
    const { productName, price, stock, categoryId, brandId } = data;

    let categoryExists = false;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === Number(categoryId)) {
        categoryExists = true;
        break;
      }
    }
    if (!categoryExists) throw new Error('Categoria');

    let brandExists = false;
    for (let i = 0; i < brands.length; i++) {
      if (brands[i].id === Number(brandId)) {
        brandExists = true;
        break;
      }
    }
    if (!brandExists) throw new Error('Marca');

    const newProduct = {
      id: products.length + 1,
      productName,
      price,
      stock,
      categoryId: Number(categoryId),
      brandId: Number(brandId),
      active: true
    };

    products.push(newProduct);
    return newProduct;
  }

  update(id, data) {
    const product = this.getById(id);
    if (!product) return null;

    const { productName, price, stock, categoryId, brandId } = data;

    // Verificar ctegoria
    let categoryExists = false;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === Number(categoryId)) {
        categoryExists = true;
        break;
      }
    }
    if (!categoryExists) throw new Error('Categoria');

    // Verificar marca
    let brandExists = false;
    for (let i = 0; i < brands.length; i++) {
      if (brands[i].id === Number(brandId)) {
        brandExists = true;
        break;
      }
    }
    if (!brandExists) throw new Error('Marca');

    product.productName = productName;
    product.price = price;
    product.stock = stock;
    product.categoryId = Number(categoryId);
    product.brandId = Number(brandId);

    return product;
  }

  patch(id, data) {
    const product = this.getById(id);
    if (!product) return null;

    if (data.categoryId) {
      let categoryExists = false;
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === Number(data.categoryId)) {
          categoryExists = true;
          break;
        }
      }
      if (!categoryExists) throw new Error('Categoria');
      product.categoryId = Number(data.categoryId);
    }

    if (data.brandId) {
      let brandExists = false;
      for (let i = 0; i < brands.length; i++) {
        if (brands[i].id === Number(data.brandId)) {
          brandExists = true;
          break;
        }
      }
      if (!brandExists) throw new Error('Marca');
      product.brandId = Number(data.brandId);
    }

    if (data.productName) product.productName = data.productName;
    if (data.price) product.price = data.price;
    if (data.stock) product.stock = data.stock;

    return product;
  }

  delete(id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(id)) {
        products.splice(i, 1);
        return true;
      }
    }
    return null;
  }
}

module.exports = ProductService;

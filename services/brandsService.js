const faker = require('faker');
const { brands, products } = require('../db');

class BrandService {
  getAll() {
    return brands;
  }

  getById(id) {
    for (let i = 0; i < brands.length; i++) {
      if (brands[i].id === Number(id)) {
        return brands[i];
      }
    }
    return null;
  }

  create(data) {
    if (!data.brandName) {
      throw new Error('NombreObligatorio');
    }

    const newBrand = {
      id: brands.length + 1,
      brandName: data.brandName,
      description: faker.company.catchPhrase(),
      active: true
    };

    brands.push(newBrand);
    return newBrand;
  }

  delete(id) {
    const brandId = Number(id);

    let hasProducts = false;
    for (let i = 0; i < products.length; i++) {
      if (products[i].brandId === brandId) {
        hasProducts = true;
        break;
      }
    }

    if (hasProducts) {
      throw new Error('TieneProductos');
    }

    for (let i = 0; i < brands.length; i++) {
      if (brands[i].id === brandId) {
        brands.splice(i, 1);
        return true;
      }
    }

    return null;
  }
}

module.exports = BrandService;

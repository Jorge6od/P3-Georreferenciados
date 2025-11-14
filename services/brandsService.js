const Brand = require('../models/brand');
const Product = require('../models/product');

class BrandService {
  async getAll() {
    return await Brand.find();
  }

  async getById(id) {
    return await Brand.findById(id);
  }

  async create(data) {
    if (!data.brandName) throw new Error('NombreObligatorio');

    const brand = new Brand({
      brandName: data.brandName,
      description: data.description || '',
      active: data.active !== undefined ? data.active : true
    });

    await brand.save();
    return brand;
  }

  async update(id, data) {
    const brand = await Brand.findById(id);
    if (!brand) return null;

    if (data.brandName !== undefined) brand.brandName = data.brandName;
    if (data.description !== undefined) brand.description = data.description;
    if (data.active !== undefined) brand.active = data.active;

    await brand.save();
    return brand;
  }

  async delete(id) {
    const hasProducts = await Product.exists({ brandId: id });
    if (hasProducts) throw new Error('TieneProductos');

    const deleted = await Brand.findByIdAndDelete(id);
    return deleted ? true : null;
  }
}

module.exports = BrandService;

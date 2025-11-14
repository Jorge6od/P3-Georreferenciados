const mongoose = require('mongoose');
const Counter = require('./counterModel');

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  productName: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  active: { type: Boolean, default: true }
});

productSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { model: 'Product' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.count;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

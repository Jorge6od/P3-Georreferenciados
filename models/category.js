const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, trim: true },
  description: { type: String },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Category', categorySchema);

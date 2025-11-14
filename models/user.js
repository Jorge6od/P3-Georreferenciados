const mongoose = require('mongoose');
const Counter = require('./counterModel');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  active: { type: Boolean, default: true }
});

// Asignar ID secuencial antes de guardar
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { model: 'User' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.count;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

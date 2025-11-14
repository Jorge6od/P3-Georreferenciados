const User = require('../models/user');

class UserService {
  async findAll() {
    return await User.find();
  }

  async findById(id) {
    return await User.findOne({ id });
  }

  async create(data) {
    // Buscar el último ID para generar el siguiente
    const lastUser = await User.findOne().sort({ id: -1 });
    const newId = lastUser ? lastUser.id + 1 : 1;

    const newUser = new User({
      id: newId,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      age: data.age,
      active: data.active !== undefined ? data.active : true
    });

    await newUser.save();
    return newUser;
  }

  async update(id, data) {
    const user = await this.findById(id);
    if (!user) return null;

    Object.assign(user, data);
    await user.save();
    return user;
  }

  async delete(id) {
    const user = await this.findById(id);
    if (!user) return null;
    await user.deleteOne();
    return true;
  }
}

module.exports = UserService;

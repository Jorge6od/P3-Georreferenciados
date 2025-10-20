const faker = require('faker');
const { users } = require('../db');

class UserService {
  getAll() {
    return users;
  }

  getById(id) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === Number(id)) return users[i];
    }
    return null;
  }

  create(data) {
    if (!data.name || !data.username || !data.email || !data.password) {
      throw new Error('CamposObligatorios');
    }

    let newId = 1;
    if (users.length > 0) {
      newId = Math.max(...users.map(u => u.id)) + 1;
    }

    const newUser = {
      id: newId,
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: faker.image.avatar()
    };

    users.push(newUser);
    return newUser;
  }

  update(id, data) {
    const user = this.getById(id);
    if (!user) return null;

    if (!data.name && !data.username && !data.email && !data.password) {
      throw new Error('SinCampos');
    }

    if (data.name) user.name = data.name;
    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;
    if (data.password) user.password = data.password;

    return user;
  }

  delete(id) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === Number(id)) {
        users.splice(i, 1);
        return true;
      }
    }
    return null;
  }
}

module.exports = UserService;

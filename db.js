const faker = require('faker');

const users = Array.from({ length: 2 }, (_, i) => ({
  id: i + 1,
  name: faker.name.findName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatar: faker.image.avatar(),
}));

const categories = Array.from({ length: 2 }, (_, i) => ({
  id: i + 1,
  categoryName: faker.commerce.department(),
  description: faker.commerce.productAdjective(),
  active: faker.datatype.boolean(),
}));


const brands = Array.from({ length: 2 }, (_, i) => ({
  id: i + 1,
  brandName: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  active: faker.datatype.boolean(),
}));

const products = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  productName: faker.commerce.productName(),
  image: faker.image.imageUrl(),
  price: Number(faker.commerce.price()),
  stock: faker.datatype.number({ min: 0, max: 100 }),
  categoryId: faker.datatype.number({ min: 1, max: categories.length }),
  brandId: faker.datatype.number({ min: 1, max: brands.length }),
  active: faker.datatype.boolean(),
}));

module.exports = { users, categories, brands, products };

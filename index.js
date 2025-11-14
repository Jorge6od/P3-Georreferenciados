const express = require('express');
const app = express();
const { logErrors, errorHandler } = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());
setupSwagger(app);

// Routers
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const brandsRouter = require('./routes/brandsRouter');

// Conexión a Mongo (VARIABLE DE ENTORNO)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// Rutas
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);

app.get('/', (req, res) => {
  res.send('Hola');
});

// Manejo de errores
app.use(logErrors);
app.use(errorHandler);

// ÚNICO app.listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

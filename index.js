const express = require('express');
const app = express();
const { logErrors, errorHandler } = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
setupSwagger(app);


const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const brandsRouter = require('./routes/brandsRouter');

mongoose.connect(
  'mongodb+srv://jorge:bs781378@georrecluster.tloouky.mongodb.net/?retryWrites=true&w=majority&appName=georreCluster'
)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB:', err));

app.listen(4000, () => {
});



app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);

app.use(logErrors);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Hola');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

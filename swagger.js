//swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Configuracion de swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de la API',//Titulo del documento
    version: '1.0.0', //Version de la API
    description: 'Documentacion de la API con swagger', //Descripcion
  },
  servers: [
    {
      url: 'http://localhost:3000', //URL base de la API
      description: 'Servidor de desarrollo',
    }
  ]
};

const options = {
  swaggerDefinition,
  //Path to files
  apis: ['./routes/*.js'], //ajustamos esto en la ruta de los archivos
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;

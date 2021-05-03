const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'WChallenge - API',
    version: '1.0.0',
    description: 'API REST - Cryptocurrencies Monitor - WChallenge',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./Swagger/Specs/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;

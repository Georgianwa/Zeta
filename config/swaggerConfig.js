const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API information',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/register',
      },
    ],
  },
  apis: ['../routes/userRoutes.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;

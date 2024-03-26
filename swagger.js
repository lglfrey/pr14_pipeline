const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

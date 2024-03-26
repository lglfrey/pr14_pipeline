const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const setupAssociations = require('./associations');
const { logger } = require('./middleware/logger');
const sequelize = require('./sequelize');
const swagger = require('./swagger');
const colors = require('colors');
require('dotenv').config();


app.use(bodyParser.json()); // => req.body

app.use(express.json());

app.use(swagger);

// app.use(requestLogger);

// app.use(errorLogger);

app.use((req, res, next) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
});

// Подключение и синхронизация моделей
const modelsDir = path.join(__dirname, 'models');
fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.js'))
  .map(file => {
    const model = require(path.join(modelsDir, file));
    logger.info(`Model ${model.name} loaded.`);
    return model;
  });

sequelize.sync({ force: false })
  .then(() => {
    logger.info('Models sync completed.');
  })
  .catch(err => {
    logger.error('Error syncing models:', err);
  });

setupAssociations();

// Подключение контроллеров
const controllersDir = path.join(__dirname, 'controllers');
fs.readdirSync(controllersDir)
  .filter(file => file.endsWith('.js') && file !== 'genericController.js')
  .forEach(file => {
    const controller = require(path.join(controllersDir, file));
    app.use('/api', controller);
    logger.info(`Controller ${file} loaded.`);
  });

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

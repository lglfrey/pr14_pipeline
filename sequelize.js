const { Sequelize } = require('sequelize');
const config = require('./db.config');

const sequelize = new Sequelize(config.development);

module.exports = sequelize;

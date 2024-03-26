require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbPort = process.env.DB_PORT;
const dbDialect = process.env.DB_DIALECT;

module.exports = {
    development: {
        username: dbUser,
        password: dbPassword,
        database: dbDatabase,
        host: dbHost,
        port: dbPort,
        dialect: dbDialect
    }
};
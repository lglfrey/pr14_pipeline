const express = require('express');
const jwt = require('jsonwebtoken');
const logger = require('../middleware/logger'); 

require('dotenv').config();

const router = express.Router();
const secretKey = process.env.AUTH_SECKEY;

// Роли пользователей
const ROLES = {
    ADMIN: 'ADMIN',
    MODERATOR: 'MODERATOR',
    USER: 'USER',
};

// Маршрут для создания токена (вход)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Пример проверки пользователя (подставьте реальную логику здесь)
    if (username === process.env.USER_NAME && password === process.env.USER_PASSWORD) {
        const token = jwt.sign({ username, role: ROLES.USER }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else if (username === process.env.MODERATOR_NAME && password === process.env.MODERATOR_PASSWORD) {
        const token = jwt.sign({ username, role: ROLES.MODERATOR }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else if (username === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ username, role: ROLES.ADMIN }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        logger.errorLogger(new Error('Invalid authentication data'), req, res, () => {
            res.status(401).json({ error: 'Invalid authentication data' });
        });
    }
});

module.exports = router;

const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.AUTH_SECKEY;

// Роли пользователей
const ROLES = {
    ADMIN: 'ADMIN',
    MODERATOR: 'MODERATOR',
    USER: 'USER',
};

function authenticateRole(minimumRole) {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            console.log('Token is not found');
            return res.status(401).json({ message: 'Token is not found' });
        }

        console.log('Received token:', token);

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(403).json({ message: 'Token is unavailable' });
            }

            if (user.role === ROLES.ADMIN || user.role === ROLES.MODERATOR || user.role === ROLES.USER) {
                if (minimumRole === ROLES.USER) {
                    req.user = user;
                    next();
                } else if (minimumRole === ROLES.MODERATOR && (user.role === ROLES.MODERATOR || user.role === ROLES.ADMIN)) {
                    req.user = user;
                    next();
                } else if (minimumRole === ROLES.ADMIN && user.role === ROLES.ADMIN) {
                    req.user = user;
                    next();
                } else {
                    console.error('Permission denied:', user.role, '!==', minimumRole);
                    return res.status(403).json({ message: `Don't have permissions` });
                }
            } else {
                console.error('Invalid role:', user.role);
                return res.status(403).json({ message: 'Invalid role' });
            }
        });
    };
}

module.exports = { authenticateRole, ROLES };

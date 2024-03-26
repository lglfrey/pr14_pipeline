const express = require('express');
const User = require('../models/user');
const Country = require('../models/country');
const genericController = require('./genericController');
const hasher = require('../security/hasher');
const encryption = require('../security/encryption');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

// Middleware для проверки входящих данных
const validateUserData = async (req, res, next) => {
    const { username, password, phone, countryId, userRoleId, logicalDelete } = req.body;

    try {

        if (!username || !password || !phone || !userRoleId) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        // Проверка номера телефона
        if (phone) {
            let countryCode;

            try {
                const parsedPhoneNumber = phoneUtil.parse(phone);
                countryCode = phoneUtil.getRegionCodeForNumber(parsedPhoneNumber);
            } catch (parseError) {
                console.error('Error parsing phone number:', parseError);
                return res.status(400).json({ error: 'Invalid phone number format' });
            }

            // Определение страны по коду страны
            const country = await Country.findOne({ where: { countryCode } });
            if (!country) {
                return res.status(400).json({ error: 'Could not determine country from phone number' });
            }

            // Сохранение страны в req.body.countryId
            req.body.countryId = country.id;
        }

        // Проверка уникальности username
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

        // Проверка уникальности phone
        const existingPhone = await User.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(400).json({ error: 'Phone number is already registered' });
        }

        //Хэширование данных
        req.body.password = await hasher.hashData(req.body.password);

        //Шифрование данных
        req.body.phone = await encryption.encrypt(req.body.phone);
        // Если все проверки пройдены, вызываем следующий middleware
        next();
    } catch (error) {
        console.error('Error validating user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Middleware для дешифрования данных
const decodeUserData = async (req, res, next) => {
    try {
        // Дешифрование данных, если они присутствуют в параметрах запроса
        if (req.params.phone) {
            console.log(`Phone to decrypt in query parameters: ${req.params.phone}`);
            req.params.phone = await encryption.decrypt(req.params.phone);
        }

        // Вызываем следующий middleware
        next();
    } catch (error) {
        console.error('Error decoding user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/user/users', roleAuthentication.authenticateRole(ROLES.USER), validateUserData, genericController(User));
// GET
router.get('/user/users', roleAuthentication.authenticateRole(ROLES.USER), genericController(User));
// GET BY ID
router.get('/user/users/:id', roleAuthentication.authenticateRole(ROLES.USER), decodeUserData, genericController(User));
// PUT
router.put('/user/users/:id', roleAuthentication.authenticateRole(ROLES.USER), validateUserData, genericController(User));
// DELETE
router.delete('/admin/users/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(User));
// LOGICAL DELETE
router.patch('/user/users/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.USER), genericController(User, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/user/users/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.USER), genericController(User, 'logicalRestore'));

module.exports = router;

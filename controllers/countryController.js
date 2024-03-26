const express = require('express');
const Country = require('../models/country');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateCountryData = async(req, res, next) => {
    const { name, countryCode, logicalDelete } = req.body;

    try {

        if (!name || !countryCode) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        const existingName = await Country.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ error: 'Name is already taken' });
        }

        const existingCountryCode = await Country.findOne({ where: { countryCode } });
        if (existingCountryCode) {
            return res.status(400).json({ error: 'Country Code is already taken' });
        }

        next();
    } catch (error) {
        console.error('Error validating country data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/moderator/countries', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateCountryData, genericController(Country));
// GET
router.get('/user/countries', roleAuthentication.authenticateRole(ROLES.USER), genericController(Country));
// GET BY ID
router.get('/user/countries/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(Country));
// PUT
router.put('/moderator/countries/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateCountryData, genericController(Country));
// DELETE
router.delete('.admin/countries/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Country));
// LOGICAL DELETE
router.patch('/admin/countries/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Country, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/countries/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Country, 'logicalRestore'));

module.exports = router;

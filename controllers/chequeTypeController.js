const express = require('express');
const ChequeType = require('../models/chequeType');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

const validateChequeTypeData = async(req, res, next) => {
    const { name, logicalDelete } = req.body;

    try {

        if (!name) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        // Проверка уникальности username
        const existingName = await ChequeType.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ error: 'Name is already taken' });
        }

        next();
    } catch (error) {
        console.error('Error validating chequeType data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// POST
router.post('/moderator/chequeTypes', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateChequeTypeData, genericController(ChequeType));
// GET
router.get('/user/chequeTypes', roleAuthentication.authenticateRole(ROLES.USER), genericController(ChequeType));
// GET BY ID
router.get('/user/chequeTypes/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(ChequeType));
// PUT
router.put('/moderator/chequeTypes/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateChequeTypeData, genericController(ChequeType));
// DELETE
router.delete('/admin/chequeTypes/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(ChequeType));
// LOGICAL DELETE
router.patch('/admin/chequeTypes/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(ChequeType, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/chequeTypes/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(ChequeType, 'logicalRestore'));

module.exports = router;

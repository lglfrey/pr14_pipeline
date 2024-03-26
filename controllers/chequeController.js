const express = require('express');
const Cheque = require('../models/cheque');
const genericController = require('./genericController');
const encryption = require('../security/encryption');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateChequeData = async(req, res, next) => {
    const { payment, accountNumber, userId, chequeTypeId, logicalDelete } = req.body;

    try {

        if (!payment || !accountNumber || !userId || !chequeTypeId) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        req.body.payment = await encryption.encrypt(req.body.payment);
        req.body.accountNumber = await encryption.encrypt(req.body.accountNumber);

        next();
    } catch (error) {
        console.error('Error validating cheque data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/user/cheques', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateChequeData, genericController(Cheque));
// GET
router.get('/user/cheques', roleAuthentication.authenticateRole(ROLES.USER), genericController(Cheque));
// GET BY ID
router.get('/user/cheques/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(Cheque));
// PUT
router.put('/moderator/cheques/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateChequeData, genericController(Cheque));
// DELETE
router.delete('/admin/cheques/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Cheque));
// LOGICAL DELETE
router.patch('/admin/cheques/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Cheque, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/cheques/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Cheque, 'logicalRestore'));

module.exports = router;

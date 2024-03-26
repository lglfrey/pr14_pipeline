const express = require('express');
const Journal = require('../models/journal');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateJournalData = async(req, res, next) => {
    const { content, logicalDelete } = req.body;

    try {

        if (!content) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        next();
    } catch (error) {
        console.error('Error validating journal data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/admin/journals', roleAuthentication.authenticateRole(ROLES.ADMIN), validateJournalData, genericController(Journal));
// GET
router.get('/admin/journals', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Journal));
// GET BY ID
router.get('/admin/journals/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Journal));
// PUT
router.put('/admin/journals/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), validateJournalData, genericController(Journal));
// DELETE
router.delete('/admin/journals/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Journal));
// LOGICAL DELETE
router.patch('/admin/journals/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Journal, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/journals/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Journal, 'logicalRestore'));

module.exports = router;

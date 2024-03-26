const express = require('express');
const TaskJournal = require('../models/taskJournal');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateTaskJournalData = async(req, res, next) => {
    const { comment, taskId, statusId, logicalDelete } = req.body;

    try {

        if (!comment || !taskId || !statusId) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        next();
    } catch (error) {
        console.error('Error validating taskJournal data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/user/taskJournals', roleAuthentication.authenticateRole(ROLES.USER), validateTaskJournalData, genericController(TaskJournal));
// GET
router.get('/user/taskJournals', roleAuthentication.authenticateRole(ROLES.USER), genericController(TaskJournal));
// GET BY ID
router.get('/user/taskJournals/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(TaskJournal));
// PUT
router.put('/moderator/taskJournals/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateTaskJournalData, genericController(TaskJournal));
// DELETE
router.delete('/admin/taskJournals/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskJournal));
// LOGICAL DELETE
router.patch('/admin/taskJournals/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskJournal, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/taskJournals/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskJournal, 'logicalRestore'));

module.exports = router;

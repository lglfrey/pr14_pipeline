const express = require('express');
const TaskStatus = require('../models/taskStatus');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateTaskStatusData = async(req, res, next) => {
    const { name, logicalDelete } = req.body;

    try {

        if (!name) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        const existingName = await TaskStatus.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ error: 'Name is already taken' });
        }

        next();
    } catch (error) {
        console.error('Error validating taskStatus data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/user/taskStatuses', roleAuthentication.authenticateRole(ROLES.USER), validateTaskStatusData, genericController(TaskStatus));
// GET
router.get('/user/taskStatuses', roleAuthentication.authenticateRole(ROLES.USER), genericController(TaskStatus));
// GET BY ID
router.get('/user/taskStatuses/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(TaskStatus));
// PUT
router.put('/user/taskStatuses/:id', roleAuthentication.authenticateRole(ROLES.USER), validateTaskStatusData, genericController(TaskStatus));
// DELETE
router.delete('/admin/taskStatuses/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskStatus));
// LOGICAL DELETE
router.patch('/admin/taskStatuses/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskStatus, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/taskStatuses/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskStatus, 'logicalRestore'));

module.exports = router;

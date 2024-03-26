const express = require('express');
const Task = require('../models/task');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateTaskData = async(req, res, next) => {
    const { name, description, advance, cost, startDatetime, endDatetime, authorId, workerId, logicalDelete } = req.body;

    try {

        if (!name || !description || !advance || !cost || !startDatetime || 
            !endDatetime || !authorId || !workerId) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        next();
    } catch (error) {
        console.error('Error validating task data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/user/tasks', roleAuthentication.authenticateRole(ROLES.USER), validateTaskData, genericController(Task));
// GET
router.get('/user/tasks', roleAuthentication.authenticateRole(ROLES.USER), genericController(Task));
// GET BY ID
router.get('/user/tasks/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(Task));
// PUT
router.put('/user/tasks/:id', roleAuthentication.authenticateRole(ROLES.USER), validateTaskData, genericController(Task));
// DELETE
router.delete('/admin/tasks/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Task));
// LOGICAL DELETE
router.patch('/admin/tasks/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Task, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/tasks/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Task, 'logicalRestore'));

module.exports = router;

const express = require('express');
const TaskComment = require('../models/taskComment');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateTaskCommentData = async(req, res, next) => {
    const { content, taskId, logicalDelete } = req.body;

    try {

        if (!content || !taskId) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        next();
    } catch (error) {
        console.error('Error validating taskComment data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/user/taskComments', roleAuthentication.authenticateRole(ROLES.USER), validateTaskCommentData, genericController(TaskComment));
// GET
router.get('/user/taskComments', roleAuthentication.authenticateRole(ROLES.USER), genericController(TaskComment));
// GET BY ID
router.get('/user/taskComments/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(TaskComment));
// PUT
router.put('/moderator/taskComments/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateTaskCommentData, genericController(TaskComment));
// DELETE
router.delete('/admin/taskComments/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskComment));
// LOGICAL DELETE
router.patch('/admin/taskComments/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskComment, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/taskComments/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(TaskComment, 'logicalRestore'));

module.exports = router;

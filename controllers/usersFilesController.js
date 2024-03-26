const express = require('express');
const UsersFiles = require('../models/usersFiles');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateUsersFilesData = async(req, res, next) => {
    const { name, userId, fileId, logicalDelete } = req.body;

    try {

        if (!name || !userId || !fileId) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        next();
    } catch (error) {
        console.error('Error validating UsersFiles data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/user/usersFiles', roleAuthentication.authenticateRole(ROLES.USER), validateUsersFilesData, genericController(UsersFiles));
// GET
router.get('/user/usersFiles', roleAuthentication.authenticateRole(ROLES.USER), genericController(UsersFiles));
// GET BY ID
router.get('/user/usersFiles/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(UsersFiles));
// PUT
router.put('/moderator/usersFiles/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateUsersFilesData, genericController(UsersFiles));
// DELETE
router.delete('/admin/usersFiles/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UsersFiles));
// LOGICAL DELETE
router.patch('/admin/usersFiles/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UsersFiles, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/usersFiles/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UsersFiles, 'logicalRestore'));

module.exports = router;

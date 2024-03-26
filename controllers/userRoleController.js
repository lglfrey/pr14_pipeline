const express = require('express');
const UserRole = require('../models/userRole');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateUserRoleData = async(req, res, next) => {
    const { name, logicalDelete } = req.body;

    try {

        if (!name) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        const existingName = await UserRole.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ error: 'Name is already taken' });
        }

        next();
    } catch (error) {
        console.error('Error validating userRole data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/moderator/userRoles', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateUserRoleData, genericController(UserRole));
// GET
router.get('/user/userRoles', roleAuthentication.authenticateRole(ROLES.USER), genericController(UserRole));
// GET BY ID
router.get('/user/userRoles/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(UserRole));
// PUT
router.put('/moderator/userRoles/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateUserRoleData, genericController(UserRole));
// DELETE
router.delete('/admin/userRoles/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UserRole));
// LOGICAL DELETE
router.patch('/admin/userRoles/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UserRole, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/userRoles/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UserRole, 'logicalRestore'));

module.exports = router;

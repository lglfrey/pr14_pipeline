const express = require('express');
const UsersSubscriptions = require('../models/usersSubscriptions');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateUsersSubscriptionsData = async(req, res, next) => {
    const { beginDatetime, endDatetime, isActive, userId, subscriptionId, logicalDelete } = req.body;

    try {

        if (!beginDatetime || !endDatetime || !userId || !subscriptionId) {
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
router.post('/user/usersSubscriptions', roleAuthentication.authenticateRole(ROLES.USER), validateUsersSubscriptionsData, genericController(UsersSubscriptions));
// GET
router.get('/user/usersSubscriptions', roleAuthentication.authenticateRole(ROLES.USER), genericController(UsersSubscriptions));
// GET BY ID
router.get('/user/usersSubscriptions/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(UsersSubscriptions));
// PUT
router.put('/moderator/usersSubscriptions/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateUsersSubscriptionsData, genericController(UsersSubscriptions));
// DELETE
router.delete('/admin/usersSubscriptions/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UsersSubscriptions));
// LOGICAL DELETE
router.patch('/admin/usersSubscriptions/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UsersSubscriptions, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/usersSubscriptions/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(UsersSubscriptions, 'logicalRestore'));
// SET ACTIVE
router.patch('/user/usersSubscriptions/:id/isActive', roleAuthentication.authenticateRole(ROLES.USER), async (req, res) => {
    try {
        const existingRecord = await UsersSubscriptions.findByPk(req.params.id);

        if (!existingRecord) {
            return res.status(404).json({ error: 'Record not found' });
        }

        // Изменение значения isActive на противоположное
        const updatedRecord = await existingRecord.update({
            isActive: !existingRecord.isActive,
        });

        res.json({ message: `Record updated successfully. isActive is now ${!existingRecord.isActive}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

const express = require('express');
const SubscriptionType = require('../models/subscriptionType');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateSubscriptionTypeData = async(req, res, next) => {
    const { name, cost, duration, logicalDelete } = req.body;

    try {

        if (!name || !cost || !duration) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        const existingName = await SubscriptionType.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ error: 'Name is already taken' });
        }

        next();
    } catch (error) {
        console.error('Error validating subscriptionType data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/moderator/subscriptionTypes', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateSubscriptionTypeData, genericController(SubscriptionType));
// GET
router.get('/user/subscriptionTypes', roleAuthentication.authenticateRole(ROLES.USER), genericController(SubscriptionType));
// GET BY ID
router.get('/user/subscriptionTypes/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(SubscriptionType));
// PUT
router.put('/moderator/subscriptionTypes/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateSubscriptionTypeData, genericController(SubscriptionType));
// DELETE
router.delete('/admin/subscriptionTypes/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(SubscriptionType));
// LOGICAL DELETE
router.patch('/admin/subscriptionTypes/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(SubscriptionType, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/subscriptionTypes/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(SubscriptionType, 'logicalRestore'));

module.exports = router;

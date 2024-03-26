const express = require('express');
const Subscription = require('../models/subscription');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateSubscriptionData = async(req, res, next) => {
    const { name, logo, subscriptionTypeId, countryId, logicalDelete } = req.body;

    try {

        if (!name || !logo || !subscriptionTypeId || !countryId) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        const existingName = await Subscription.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ error: 'Name is already taken' });
        }

        next();
    } catch (error) {
        console.error('Error validating subscription data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/moderator/subscriptions', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateSubscriptionData, genericController(Subscription));
// GET
router.get('/user/subscriptions', roleAuthentication.authenticateRole(ROLES.USER), genericController(Subscription));
// GET BY ID
router.get('/user/subscriptions/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(Subscription));
// PUT
router.put('/moderator/subscriptions/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateSubscriptionData, genericController(Subscription));
// DELETE
router.delete('/admin/subscriptions/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Subscription));
// LOGICAL DELETE
router.patch('/admin/subscriptions/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Subscription, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/subscriptions/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(Subscription, 'logicalRestore'));

module.exports = router;

const express = require('express');
const keyGen = require("../security/keyGen");
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

router.post('/admin/generate-key', roleAuthentication.authenticateRole(ROLES.ADMIN), (req, res) => {
    try {
        keyGen.generateKey();
        res.json({ message: `Key is generated successfully` });
    } catch (error) {
        console.error('Error generating or saving Security Key:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/admin/get-key', roleAuthentication.authenticateRole(ROLES.ADMIN), (req, res) => {
    try {
        const key = keyGen.getKey();
        res.json({ message: `Key is ${key}` });
    } catch (error) {
        console.error('Error getting Security Key:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;
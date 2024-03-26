const express = require('express');
const FileType = require('../models/fileType');
const genericController = require('./genericController');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

const validateFileTypeData = async(req, res, next) => {
    const { name, logicalDelete } = req.body;

    try {

        if (!name) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        const existingName = await FileType.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ error: 'Name is already taken' });
        }

        next();
    } catch (error) {
        console.error('Error validating fileType data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/moderator/fileTypes', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateFileTypeData, genericController(FileType));
// GET
router.get('/user/fileTypes', roleAuthentication.authenticateRole(ROLES.USER), genericController(FileType));
// GET BY ID
router.get('/user/fileTypes/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(FileType));
// PUT
router.put('/moderator/fileType/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateFileTypeData, genericController(FileType));
// DELETE
router.delete('/admin/fileTypes/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(FileType));
// LOGICAL DELETE
router.patch('/admin/fileTypes/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(FileType, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/fileTypes/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(FileType, 'logicalRestore'));

module.exports = router;

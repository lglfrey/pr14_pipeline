const express = require('express');
const File = require('../models/file');
const genericController = require('./genericController');
const { configureMulter } = require('../utils/fileUpload');
const path = require('path');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

// Set up multer storage
const uploadDir = path.join(__dirname, '..', 'uploads');
console.log('Upload directory:', uploadDir);
const upload = configureMulter(uploadDir);

/*const setDefaultUri = (req, res, next) => {
    req.body.uri = path.join(uploadDir, req.body.name || 'defFile');
    next();
}*/

const validateFileData = async (req, res, next) => {
    try {
        let { name, uri, fileTypeId, logicalDelete } = req.body;

        if (!name || !fileTypeId) {
            return res.status(400).json({ error: 'Invalid json format' });
        }

        uri = path.join(uploadDir, name);

        const existingUri = await File.findOne({ where: { uri } });
        if (existingUri) {
            return res.status(400).json({ error: 'Uri is already taken' });
        }

        // Преобразование fileTypeId в число
        fileTypeId = parseInt(fileTypeId, 1);

        next();
    } catch (error) {
        console.error('Error validating file data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// POST
router.post('/user/files', roleAuthentication.authenticateRole(ROLES.USER), validateFileData, genericController(File), upload.single('file'));
// GET
router.get('/user/files', roleAuthentication.authenticateRole(ROLES.USER), genericController(File));
// GET BY ID
router.get('/user/files/:id', roleAuthentication.authenticateRole(ROLES.USER), genericController(File));
// PUT
router.put('/moderator/files/:id', roleAuthentication.authenticateRole(ROLES.MODERATOR), validateFileData, genericController(File));
// DELETE
router.delete('/admin/files/:id', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(File));
// LOGICAL DELETE
router.patch('/admin/files/:id/logicalDelete', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(File, 'logicalDelete'));
// LOGICAL RESTORE
router.patch('/admin/files/:id/logicalRestore', roleAuthentication.authenticateRole(ROLES.ADMIN), genericController(File, 'logicalRestore'));

module.exports = router;

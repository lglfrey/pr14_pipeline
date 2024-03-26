const express = require('express');
const backupDatabase = require('../db/backupDatabase');
const getBackupFileNames = require('../db/getBackupFileNames');
const restoreDatabase = require('../db/restoreDatabase');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// BACKUP
router.get('/admin/backup', roleAuthentication.authenticateRole(ROLES.ADMIN), backupDatabase.backupDatabase);

// GET BACKUPS
router.get('/admin/get-backups', roleAuthentication.authenticateRole(ROLES.ADMIN), getBackupFileNames.getBackupFileNames);

// RESTORE DATABASE
router.post('/admin/restore', roleAuthentication.authenticateRole(ROLES.ADMIN), restoreDatabase.restoreDatabase);

module.exports = router;

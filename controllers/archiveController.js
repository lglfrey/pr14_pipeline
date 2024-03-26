const express = require('express');
const archiveTableData = require('../db/archiveTableData');
const getArchiveFileNames = require('../db/getArchiveFileNames');
const restoreTableData = require('../db/restoreTableData');
const roleAuthentication = require('../security/roleAuthentication');

const { ROLES } = require('../security/roleAuthentication');

const router = express.Router();

// ИСПОЛЬЗОВАНИЕ GENERIC CONTROLLER //

// ARCHIVE
router.post('/admin/archive', roleAuthentication.authenticateRole(ROLES.ADMIN), archiveTableData.archiveTableData);

// GET ARCHIVES
router.post('/admin/get-archives', roleAuthentication.authenticateRole(ROLES.ADMIN), getArchiveFileNames.getArchiveFileNames);

// RESTORE DATA
router.post('/admin/restore-data', roleAuthentication.authenticateRole(ROLES.ADMIN), restoreTableData.restoreTableData);

module.exports = router;

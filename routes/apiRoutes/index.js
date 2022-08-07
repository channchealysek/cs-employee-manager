const express = require('express');
const router = express.Router();

router.use(require('./DataView'));
// router.use(require('./showRoles'));
// router.use(require('./showEmployees'));

module.exports = router;
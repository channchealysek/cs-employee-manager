const express = require('express');
const router = express.Router();

// grap function from other file to use in route.
router.use(require('./departmentRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./employeeRoutes'));

// export route to use in other file.
module.exports = router;
const express = require('express');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const tenant = require('../middleware/tenant.middleware');

const { createTask } = require('../controllers/task.controller');

const router = express.Router();

router.post('/', auth, tenant, role(['tenant_admin', 'user']), createTask);

module.exports = router;

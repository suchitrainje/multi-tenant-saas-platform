const express = require('express');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const { createTenant } = require('../controllers/tenant.controller');

const router = express.Router();

router.post('/', auth, role(['super_admin']), createTenant);

module.exports = router;
const validate = require('../middleware/validate.middleware');
const { createTenantValidator } = require('../validators/tenant.validator');

router.post(
  '/',
  auth,
  role(['super_admin']),
  createTenantValidator,
  validate,
  createTenant
);

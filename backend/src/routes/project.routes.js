const express = require('express');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const tenant = require('../middleware/tenant.middleware');

const { createProject } = require('../controllers/project.controller');

const router = express.Router();

router.post('/', auth, tenant, role(['tenant_admin']), createProject);

module.exports = router;
const validate = require('../middleware/validate.middleware');
const { createProjectValidator } = require('../validators/project.validator');

router.post(
  '/',
  auth,
  tenant,
  role(['tenant_admin']),
  createProjectValidator,
  validate,
  createProject
);

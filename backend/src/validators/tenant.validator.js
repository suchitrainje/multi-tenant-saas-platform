const { body } = require('express-validator');

exports.createTenantValidator = [
  body('name').notEmpty(),
  body('subdomain').notEmpty(),
  body('plan').notEmpty()
];

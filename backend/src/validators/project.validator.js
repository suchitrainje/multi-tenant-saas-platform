const { body } = require('express-validator');

exports.createProjectValidator = [
  body('name').notEmpty()
];

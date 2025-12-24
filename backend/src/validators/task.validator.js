const { body } = require('express-validator');

exports.createTaskValidator = [
  body('project_id').isInt(),
  body('title').notEmpty()
];

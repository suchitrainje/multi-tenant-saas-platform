const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const {
  registerTenantValidator,
  loginValidator
} = require('../validators/auth.validator');

router.post('/register-tenant', registerTenantValidator, authController.register);
router.post('/login', loginValidator, authController.login);

router.get('/me', authMiddleware, authController.me);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;

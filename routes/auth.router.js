const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

router
  .route('/perfil')
  .get(authMiddleware, authController.perfil);

module.exports = router;
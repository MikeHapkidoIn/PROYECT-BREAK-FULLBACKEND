const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar formulario
router.get('/login', authController.showLogin);

// Validar login
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;

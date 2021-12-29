const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Crée un nouvel utilisateur
router.post('/signup', userCtrl.signup);

// Connecte un utilisateur
router.post('/login', userCtrl.login);

module.exports = router;
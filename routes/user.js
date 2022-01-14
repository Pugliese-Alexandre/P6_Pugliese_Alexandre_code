const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// J'importe le package "Express-Validator"
const {body, validationResult} = require('express-validator');  

// Crée un nouvel utilisateur
router.post('/signup', userCtrl.signup);

// Connecte un utilisateur
router.post('/login', userCtrl.login);

// Fonction pour "Express-Validator"
const sanitize = (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error}) 
    }
    next();     
};

// Route pour se connecter.

router.post('/signup', [
    body('email').isEmail(), // Le nom d'utilisateur doit être un email.
    body('password').isLength({min: 5}) // Le mot de passe doit comporter au moins 5 caractères.
    ], sanitize,
    userCtrl.signup);   

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min: 5})
    ], sanitize, 
    userCtrl.login);



module.exports = router;
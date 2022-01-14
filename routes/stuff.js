const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const checkSauce = require('../middleware/checkSauce');
const stuffCtrl = require('../controllers/stuff');

// Création des différentes route de l'API.
// Route qui permet de récupérer toutes les sauces
router.get('/', auth, stuffCtrl.getAllStuff);

// Route qui permet de créer "une sauce"
router.post('/', auth, multer, checkSauce, stuffCtrl.createThing);

// Route qui permet de cliquer sur une des sauces précise
router.get('/:id', auth, stuffCtrl.getOneThing);

// Route qui permet de modifier "une sauce"
router.put('/:id', auth, multer, stuffCtrl.modifyThing);

// Route qui permet de supprimer "une sauce"
router.delete('/:id', auth, stuffCtrl.deleteThing);

// Crée une route pour gérer les Like/Dislike des différentes sauces 
router.post('/:id/like', auth, stuffCtrl.likeSauce)

// Route: CRUD: Create, Read, Update, Delete
// Route: auth pour l'autentification
// Route: multer pour gérer les fichiers images

module.exports = router;
// Utilisation du module "dotenv" pour masquer les informations de connexion à la base de données
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const rateLimit = require('express-rate-limit'); // Fixe le taux limite pour les requêtes

// Constante à utiliser avec le package "rateLimit".
const limiter = rateLimit({         
  windowMs: 15 * 60 * 1000, // = 15 minutes
  max: 100
}) 

  // Pour reussir a se connecter, mongoose va aller chercher le code dans le fichie ".env"
mongoose.connect(process.env.MONGODB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  // Helmet
  app.use(helmet());

  // Pour gérer les problèmes de CORS (Cross-Origin Request Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
// Sécurise HTTP headers
app.use(helmet({
  contentSecurityPolicy : false
  }
));

  // Transformer le corps (le body) en json objet javascript utilisable
  app.use(bodyParser.json());

  // Midleware qui permet de charger les fichiers qui sont dans le repertoire images
  app.use('/images', express.static(path.join(__dirname, 'images')));

  // Pour les routes dédiées aux sauces
  app.use('/api/sauces', stuffRoutes);

  // Pour les routes dédiées aux utilisateurs
  app.use('/api/auth', userRoutes);

  // La route d'authentification 
  app.use("/api/authentification", userRoutes);

  // Export de l'application pour y accéder depuis un autre fichier
  module.exports = app;


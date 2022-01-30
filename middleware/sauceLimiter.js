 // Fixe le taux limite pour les requêtes
const rateLimit = require('express-rate-limit');

// Constante à utiliser avec le package "rateLimit".
const sauceLimiter = rateLimit({         
    windowMs: 15 * 60 * 1000, // = Durée de 15 minutes.
    max: 3, // Limite la création et la modification d'une sauce à 3 demande toutes les 15 minutes.
    message: "Veuillez attendre 15 minutes entre chaque modification.",
  });

  module.exports = sauceLimiter;
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

// Contraintes du mot de passe
passwordSchema
.is().min(10) // La longueur minimun est de 10.
.has().uppercase() // Il doit y avoir au moins une majuscule.
.has().lowercase() // Il doit y avoir au moins une minuscule.
.has().digits() // Il doit y avoir au moins un chiffre.
.has().not().spaces() // Il ne doit pas y avoir d'espaces.
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist de valeurs à proscrire.

module.exports = passwordSchema;

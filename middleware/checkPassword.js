const passwordSchema = require('../models/password');

// On vérifie que le mot de passe correspond au schema.
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
               res.writeHead(400, '{"message":"Mot de passe requis : 10 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces"}', {
            'content-type': 'application/json'
        });
        res.end('Mot de passe incorrect');
    } else {
        next();
    }
};
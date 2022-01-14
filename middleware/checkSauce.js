
module.exports = (req, res, next) => {
    console.log(req.body);
    // si ma sauces contient des champs vide je renvoie une erreur
    // trim() js
    // sinon je passe a la suite
    next();
};
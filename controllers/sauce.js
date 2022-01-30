// Récupération Modèle 'sauce'
const Thing = require('../models/sauce');

// Plugin :
const fs = require('fs');

// Permet de récupérer une seule sauce
exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Permet de récuperer toutes les sauces
exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Permet de créer une nouvelle sauce
exports.createThing = (req, res, next) => {
  console.log(req.body)
  const sauce = JSON.parse(req.body.sauce)
  const thing = new Thing({
    userId: sauce.userId,
    name: sauce.name,
    manufacturer: sauce.manufacturer,
    description: sauce.description,  
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    mainPepper: sauce.mainPepper,
    heat: sauce.heat
  });
// Sauvegarde de la sauce dans la base de donnée
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce enregistrée !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Permet de modifier une sauce
exports.modifyThing = (req, res, next) => {
  const thing = req.file ?
  {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thing, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
}

// Permet de supprimer une sauce
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Sauce supprimée !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Like et Dislike 

exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    // Verifier que l'utilisateur n'a pas déja aimer la sauce.
    case 0:
      Thing.findOne({_id: req.params.id})
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === req.body.userId)) {
            Thing.updateOne({_id: req.params.id}, {
              $inc: {likes: -1},
              $pull: {usersLiked: req.body.userId},
              _id: req.params.id
            })
              .then(() => { res.status(201).json({message: 'Ton like a été pris en compte'}); })
              .catch((error) => { res.status(400).json({error: error}); });

            // Verifier que l'utilisateur n'a pas déja retirer son like de la sauce.
          } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
            Thing.updateOne({_id: req.params.id}, {
              $inc: {dislikes: -1},
              $pull: {usersDisliked: req.body.userId},
              _id: req.params.id
            })
              .then(() => { res.status(201).json({message: 'Ton dislike a été pris en compte'}); })
              .catch((error) => { res.status(400).json({error: error}); });
          }
        })
        .catch((error) => { res.status(404).json({error: error}); });
      break;
    // Updates : likes = 1 
    case 1:
      Thing.updateOne({_id: req.params.id}, {
        $inc: {likes: 1},
        $push: {usersLiked: req.body.userId},
        _id: req.params.id
      })
        .then(() => { res.status(201).json({message: 'Ton like a été pris en compte!'}); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;

    // Updates : dislikes = -1
    case -1:
      Thing.updateOne({ _id: req.params.id }, {
        $inc: {dislikes: 1},
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({message: 'Ton dislike a été pris en compte!'}); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
    default:
      console.error('Mauvaise requête');
  }
}


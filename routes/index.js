var express = require('express');
var router = express.Router();

require('../models/connection');
const Place = require('../models/places')

router.post('/places', (req, res) => {
    const { nickname, name, latitude, longitude } = req.body;
    const newPlace = new Place({ nickname, name, latitude, longitude });
   
    newPlace.save().then(() => {
      res.json({ result: true });
    });
   });

router.get('/places/:nickname', (req, res) => {
    // Récupération du surnom depuis les paramètres de l'URL
    const nickname = req.params.nickname;

    // Recherche dans la base de données
    Place.find({ nickname: nickname })
    .then(places => {
    // Renvoyez les lieux trouvés
        res.json({ result: true, places: places });
    });
});

router.delete('/places', (req, res) => {
    const { nickname, name } = req.body;

    Place.findOneAndDelete({ nickname: nickname, name: name })
        .then((deletedPlace) => {
            if (deletedPlace) {
                res.json({ result: true });
            } else {
                // Aucun lieu trouvé avec le surnom et le nom donnés
                res.json({ result: false, message: "No place found with given nickname and name." });
            }
        })
    });

module.exports = router;

const express = require('express');
const router = express.Router();
const favourite = require('../models/favourite');

const checkAuth = require('../middleware/check-auth')

/**
* Return all Favourites
*/
router.get('/favorite',checkAuth, (req, res) => {
    favourite.find({creator: req.userData.userId} ,function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result)
            }
        }
    ).sort({ _id: -1 });
});

/**
 * Insert one Favorite
 */
router.post('/favorite',checkAuth, (req, res) => {
    let favorite = new favourite({
        genreId: req.body.genreId,
        language: req.body.language,
        movieName: req.body.movieName,
        releaseDate: req.body.releaseDate,
        teaserText: req.body.teaserText,
        title: req.body.title,
        additionalNotes: req.body.additionalNotes,
        creator: req.userData.userId
    })
    favorite.save((err, registeredUser) => {
        if (err) throw err;
        res.send({result: 'favorite inserted', favorite: favorite});
    })
});


/**
 * Delete Favorite by id
 */
router.delete('/favorite/:id', (req, res) => {
    favourite.findByIdAndDelete(req.params.id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
        res.send({result: 'favorite deleted'});
    });
});


module.exports = router;

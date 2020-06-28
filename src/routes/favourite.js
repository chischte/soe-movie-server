const express = require('express');
const router = express.Router();
const favourite = require('../models/favourite');

const checkAuth = require('../middleware/check-auth')

/**
* Return all Favourites
*/
router.get('/favorite', (req, res) => {
    favourite.find({} ,function (err, result) {
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
    let favouriteData = req.body;
    let favo = new favourite(favouriteData)
    console.log(favo);
    favo.save((err, registeredUser) => {
        if (err) throw err;
        res.send({result: 'favorite inserted', favorite: favo});
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

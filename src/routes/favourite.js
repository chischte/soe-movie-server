const express = require('express');
const router = express.Router();
const favourite = require('../models/favourite');

/**
* Return all Favourites
*/
// router.get('/favorite', (req, res) => {
//     favourite.find().then(dbFavourite => {
//         console.log(dbFavourite);
//         res.status(200).json({
//             message: "fetched succssfully",
//             Posts: dbFavourite
//         });
//     });
// });

router.get('/favorite', (req, res) => {
    favourite.find({} ,function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result)
            }
        }
    );
});


/**
 * Insert one Favorite
 */
router.post('/favorite', (req, res) => {
    let favouriteData = req.body;
    let favo = new favourite(favouriteData)
    console.log(favo);
    favo.save((err, registeredUser) => {
        if (err) throw err;
        res.send({result: 'favorite inserted', favorite: favo});
    })
});


// /**
//  * Delete Favorite by id
//  */
// router.delete('/favorite/:id', (req, res) => {
//     const query = { _id: new mongodb.ObjectID(req.params.id) };
//     collectionFavourite.deleteOne(query, function(err, obj) {
//         if (err) throw err;
//         res.send({result: 'favorite deleted'});
//     });
// });

module.exports = router;

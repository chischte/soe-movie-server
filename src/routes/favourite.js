const express = require('express');
const router = express.Router();
const favourite = require('../models/favourite');

/**
* Return all Favorites
*/
router.get('/favorite', (req, res) => {
    favourite.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: "fetched succssfully",
            Posts: documents
        });
    });
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
})


// router.post('/signup', (req, res) => {
//     let userData = req.body
//     let user = new User(userData)
//     console.log(userData);
//     user.save((err, registeredUser) => {
//         if (err) {
//             console.log(err)
//         } else {
//             let payload = {subject: registeredUser._id}
//             let token = jwt.sign(payload, 'secretKey')
//             res.status(200).send({token})
//         }
//     })
// })

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

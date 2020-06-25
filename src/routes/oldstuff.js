const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = 3000;

const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const dbName = 'sweWebMovieWorld';
const FavouriteCollection = 'Favourite';
const UserCollection = 'User';
let db = undefined;
let collectionFavourite = undefined;
let collectionUser = undefined;


/**
 * Setup express middleware
 */
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

/**
 * Connect to database
 */
MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, connection) {
    if (err) throw err;
    db = connection.db(dbName);
    collectionFavourite = db.collection(FavouriteCollection);
    collectionUser = db.collection(UserCollection);
});

// TODO: delete after.  is only to check if the connection to the database is established
app.get('/', (req, res) => {
    res.send('Checker');
});


/**
 * Insert one User
 */
app.post('/signup', (req, res) => {
    const authData = req.body;
    collectionUser.insertOne(authData, function(err, result) {
        if (err) throw err;
        res.send({result: 'User Created', authData: authData});
    });
});



app.post('/login', (req, res) => {
    let userData = req.body

    collectionUser.findOne({ email: userData.email} , (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('invalid email')
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                res.status(200).send(user)
            }
        }
    })
})




/**
 * Return all Favorites
 */
app.get('/favorite', (req, res) => {
    collectionFavourite.find({}).sort({ _id: -1 }).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

/**
 * Insert one Favorite
 */
app.post('/favorite', (req, res) => {
    const favorite = req.body;
    collectionFavourite.insertOne(favorite, function(err, result) {
        if (err) throw err;
        res.send({result: 'favorite inserted', favorite: favorite});
    });
});

/**
 * Delete Favorite by id
 */
app.delete('/favorite/:id', (req, res) => {
    const query = { _id: new mongodb.ObjectID(req.params.id) };
    collectionFavourite.deleteOne(query, function(err, obj) {
        if (err) throw err;
        res.send({result: 'favorite deleted'});
    });
});

/**
 * Start server
 */
app.listen(port, () => {
    console.log(`Favorite app listening at http://localhost:${port}`);
});


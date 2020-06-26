const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const mongoose = require("mongoose");

// const api = require('./routes/user');
const favouriteRoutes = require("./routes/favourite");
const userRoutes = require("./routes/user");
const port = 3000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

mongoose.connect('mongodb://localhost:27017/sweWebMovieWorld', {useNewUrlParser: true});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(bodyParser.json());

// app.use('/api', api);
app.use("/api/favourite", favouriteRoutes);
app.use("/api/user", userRoutes);


module.exports = app;


app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});

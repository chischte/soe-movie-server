const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    movieName: { type: String, required: true },
    additionalNotes: { type: String, required: true },
});

/**
 * link to the DB directory
 */
module.exports = mongoose.model("favourite", favouriteSchema, 'Favourite');

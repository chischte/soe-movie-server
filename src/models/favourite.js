const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    genreId: { type: Array, required: true },
    language: { type: String, required: false },
    movieName: { type: String, required: true },
    releaseDate: { type: String, required: true },
    teaserText: { type: String, required: false },
    title: { type: String, required: false },
    additionalNotes: { type: String, required: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

/**
 * link to the DB directory
 */
module.exports = mongoose.model("favourite", favouriteSchema, 'Favourite');


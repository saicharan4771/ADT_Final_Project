const mongoose = require("mongoose");


const moviesSchema = new mongoose.Schema(
    {
        Poster_Link: String,
        Series_Title: String,
        Released_Year: Number,
        Certificate: String,
        Runtime:String,
        Genre: String,
        IMDB_Rating: String,
        Overview: String,
        Meta_score: Number,
        Director: String,
        Star1: String,
        Star2: String,
        Star3: String,
        Star4: String,
        No_of_Votes: Number,
        Gross: Number
    },
    {
        collection: "movie_data"
    }
);

module.exports =  mongoose.model("movie_data", moviesSchema)


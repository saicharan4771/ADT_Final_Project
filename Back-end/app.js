
const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')

const app = express()
require('./moviesSchema');
app.use(cors())




const PORT = 4000

const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=> {
    console.log("connected to mongodb")
})
mongoose.connection.on('error',(err)=> {
    console.log("Error connecting", err)
})




const Movies = mongoose.model("movie_data");

app.get("/getAllUser", async(req,res) => {
    try{
        const allMovies = await Movies.find({});
        res.send({status:"ok",data:allMovies});
    }
    catch{

    }
})

app.get("/getHistogramdata",async(req,res) => {
    try{
        Movies.aggregate([
            { $group: { _id: "$Released_Year", count: { $sum: 1 } } },
          ])
          .then((data) => {
            res.send({status:"ok",data:data})
            console.log(data)
          })
    }
    catch{

    }
})

app.get("/getCertificateData", async(req,res) => {
    try{
        Movies.aggregate([
            { $group: { _id: "$Certificate", count: { $sum: 1 } } },
          ])
          .then((data) => {
            res.send({status:"ok",data:data})
            console.log(data)
          })
    }
    catch{

    }
})

app.get("/getStackedBarData", async(req,res) => {
    try{
        Movies.aggregate([
            {$group: {_id:"$Genre", Gross: {$sum: "$Gross"}}},
            {$sort: {Gross: -1}},
        ])
        .then((data) => {
            res.send({status:"ok",data:data})
            console.log(data)
        })
    }
    catch{

    }
})

app.get("/getScatterPlotData",async(req,res) => {
    try{
        Movies.find({}).select('IMDB_Rating Meta_score').then((data) => {
            res.send({status:"ok",data:data})
            console.log(data)
          })
    }
    catch{

    }
})



app.listen(PORT,()=>{
    console.log("Server is running on ",PORT)
})
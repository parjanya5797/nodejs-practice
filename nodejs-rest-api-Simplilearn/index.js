const express = require('express')

const app = express()

const port = 3000

//parse JSON using Express
app.use(express.json())
app.use(express.urlencoded({extended:false}))
let movies = [
    {
        id: "1",
        title: "Inception",
        director: "Christopher Nolan",
        release_date:"2010-07-16"
    },
    {
        id: "2",
        title: "The Irishman",
        director: "Martin Scoresese",
        release_date:"2019-09-27"
    },
];

//get movie list in form of json
app.get('/movie',(req,res) => {
    res.json(movies);
})

//Add movie
app.post('/movie',(req,res)=>{
    const movie = req.body
    
    console.log(movie)
    movies.push(movie)
    res.send('Movie is added to the list');
})

//search movie
app.get('/movie/:id',(req,res) => {
    const id = req.params.id
    
    for(let movie of movies)
    {
        if(movie.id === id)
        {
            res.json(movie)
            return
        }
    }
    res.status(404).send("Movie not found in DB")
})

//remove movie from list

app.delete('/movie/:id',(req,res) =>{
    const id = req.params.id

    movies = movies.filter(movie => {
        if(movie.id !== id) {
            return true
        }
        return false
    })

    res.send("Movie has been deleted successfully")
})

app.listen(port,() => {
    console.log(`Server Started on port ${port}`)
})


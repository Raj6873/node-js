const express = require('express');
const connectDb = require("./config/db");
const bodyParser = require('body-parser');
const Movie = require('./models/movie'); 
const path = require('path');
const port = 9000

const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); 

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route to display movies
app.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('index', { movies });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Add movie page
app.get('/add', (req, res) => {
    res.render('add');
});

// Add movie action
app.post('/add', async (req, res) => {
    const { movie_image, movie_name, description, price } = req.body;
    try {
        const newMovie = new Movie({ movie_image, movie_name, description, price });
        await newMovie.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        console.log("Error adding movie");
    }
});

// View a single movie
app.get('/movie/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render('view', { movie });
    } catch (err) {
        console.error(err);
        console.log("Movie not found");
    }
});

// Update movie page
app.get('/update/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render('update', { movie });
    } catch (err) {
        console.error(err);
       console.log("Movie not found");
    }
});

// Update movie action
app.post('/update/:id', async (req, res) => {
    const { movie_image, movie_name, description, price } = req.body;
    try {
        await Movie.findByIdAndUpdate(req.params.id, { movie_image, movie_name, description, price });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        console.log("Error updating movie");
    }
});

// Delete movie action
app.get('/delete/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        console.log("Error deleting movie");
    }
});

// Start server
app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});

var express = require('express');
var router = express.Router();
const axios = require('axios'); 
const db = require('../models');
//middleware
const flash = require('flash');
const passport = require("../config/ppConfig");
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
    db.film.findAll().then(function(films) {
        res.render('profile', {films});
    }).catch(err => {
        console.log(err)
    })
})

router.post('/', isLoggedIn, function(req, res) {
    db.film.findOrCreate({
        where: {
            name: req.body.title,
            filmId: req.body.filmId
        },
        defaults: {
            userId: req.user.id
        }
    }).then(function([film, created]) {
        console.log('added', created)
        res.redirect('/film')
    }).catch(function(err) {
        console.log(err)
    })
})

router.get('/:id', isLoggedIn, function(req, res) {
    axios.get('https://ghibliapi.herokuapp.com/films/' + req.params.id).then(function(apiResponse) {
        let result = apiResponse.data
        res.render('film/show', {result})
    }).catch(err => {
        console.log(err)
    })
})










module.exports = router;
var express = require('express');
var router = express.Router();
const axios = require('axios'); 
const db = require('../models');
//middleware
const flash = require('flash');
const passport = require("../config/ppConfig");
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
    db.user.findOne({where: {id: req.user.id}, include: [db.film, db.discussion]}).then(function(user) {
        res.render('profile', {films: user.films, discussions: user.discussions});
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
        },
        include: [db.user]
    }).then(function([film, created]) {
        db.usersFilms.findOrCreate({
            where:{
                userId: req.user.id,
                filmId: film.id
            }
        }).then(function(join) {
            console.log('added', created)
            res.redirect('/film')
        }).catch(err => {
            console.log(err)
        })
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

router.delete('/:id', function(req, res) {
    db.film.destroy({
      where: {
        filmId: req.params.id,
        //userId: req.user.id
      }
    }).then(function(deletedFilm) {
      console.log("film deleted from faves");
      res.redirect('/film');
    }).catch(err => console.log(err));
})










module.exports = router;
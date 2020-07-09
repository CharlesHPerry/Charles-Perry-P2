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
        res.redirect('/film', {film: films});
    }).catch(err => {
        console.log(err)
    })
})

router.post('/', isLoggedIn, function(req, res) {
    db.film.findOrCreate({
        where: {
            title: req.body.title
        },
        defaults: {
            userId: req.user
        }
    }).then(function([film, created]) {
        console.log('added', created)
        res.redirect('/film')
    }).catch(function(err) {
        console.log(err)
    })
})










module.exports = router;
var express = require('express');
var router = express.Router();
const axios = require('axios'); 
const db = require('../models');


router.get('/show', (req, res) => {
    res.render('discussion/show');
})

// POST /discussions - create a new post
//TODO: finish filling out route start and redirect end
router.post('/new', (req, res) => {
    db.discussion.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.user,
      film: req.body.film
    })
    .then((post) => {
      res.redirect('discussion/show')
    })
    .catch((error) => {
      console.log('something went wrong 🚫')
    })
})




module.exports = router;
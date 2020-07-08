var express = require('express');
var router = express.Router();
const axios = require('axios'); 
const db = require('../models');




// POST /discussions - create a new post
//TODO: finish filling out route start and redirect end
router.post('/', (req, res) => {
    db.discussion.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
      film: req.body.film
    })
    .then((post) => {
      res.redirect('/')
    })
    .catch((error) => {
      console.log('something went wrong 🚫')
    })
  })
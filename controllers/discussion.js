var express = require('express');
var router = express.Router();
const axios = require('axios'); 
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');


router.get('/', (req, res) => {
    db.discussion.findAll({
      include: [db.user]
    }).then(function(discussions) {
      res.render('discussion/index', {discussions});
    }).catch(err => {
      console.log(err)
    })
})
router.get('/new', isLoggedIn, (req, res) => {
  res.render('discussion/new')
})

// POST /discussions - create a new post
//TODO: finish filling out route start and redirect end
router.post('/new', (req, res) => {
    db.discussion.create({
        title: req.body.title,
        content: req.body.content,
        film: req.body.film,
        userId: req.user.id
    })
    .then((post) => {
      res.redirect('/')
    })
    .catch((error) => {
      console.log('something went wrong 🚫')
    })
})

router.get('/:id', function(req, res) {
  db.discussion.findOne({
    where: { id: req.params.id },
    include: [db.user, db.comment]
  }).then(function(discussion) {
    res.render('discussion/show', {discussion, comments: discussion.comments})
  }).catch(err => {
    console.log(err)
  })
})

router.get('/:id/edit', isLoggedIn, function(req, res) {
  db.discussion.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id
    },
    include: [db.user]
  }).then(function(discussion) {
    res.render('discussion/edit', {discussion})
  }).catch(err => {
    console.log(err)
  })
})

router.put('/:id/edit', isLoggedIn, function(req, res) {
  db.discussion.update({
    title: req.body.title,
    content: req.body.content,
    film: req.body.film
  },
  {where: {
    id: req.params.id,
    //userId: req.user.id
  }
  }).then(function(updated){
    res.redirect('/discussion')
  }).catch(err => {
    console.log(err)
  })
})

router.post('/:id/comment', isLoggedIn, function(req, res) {
  db.comment.create({
    discussionId: req.params.id,
    content: req.body.content,
    userId: req.user.id,
  }).then(function(){
    res.redirect(`/discussion/${req.params.id}`);
  }).catch(function(err) {
    console.log(err);
  })
});

router.delete('/:id/comment/:idc', isLoggedIn, function(req, res) {
  db.comment.destroy({
    where: {
      id: req.params.idc,
    }
  }).then(function(deletedComment) {
    console.log("Comment deleted");
    res.redirect(`/discussion/${req.params.id}`);
  }).catch(function(err) {
    console.log(err)
  })
});

module.exports = router;
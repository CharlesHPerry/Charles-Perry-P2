//Require NPM libraries
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require("express-ejs-layouts");
const helmet = require('helmet');
const session = require('express-session');
const flash = require('flash');
const passport = require('./config/ppConfig');
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
const { default: Axios } = require('axios');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// app setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs')
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

//create new instance of session
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();
//TODO: initialize and link flash message and flash passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req ,res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;

    next();
})
// ROUTES

app.get('/', (req, res) => {
    //check that user is logged in
    let apiUrl = 'https://ghibliapi.herokuapp.com/films';
    Axios.get(apiUrl).then(function(apiResponse) {
        let result = apiResponse.data
        res.render('index', {result});
    }).catch((err) => {
        console.log(err);
    })
    
})


// include auth controller

app.use('/auth', require('./controllers/auth'));
app.use('/discussion', require('./controllers/discussion'));
app.use('/film', require('./controllers/film'));

//initialize app on port

app.listen(process.env.PORT || 3001, function() {
    console.log(`listening on port ${process.env.PORT} my duud 🌱`);
})
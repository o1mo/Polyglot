const express = require('express');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const app = express();
const path = require('path');
const db = require('../db/controllers/controllers.js');
const usersController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');
const languageController = require('./controllers/languages');
const userlanguagesController = require('./controllers/userLanguages');
const medalsController = require('./controllers/medals');
const cardsController = require('./controllers/cards');
const viewRouter = require('./routes/routes');
const strategy = require('./auth/fBStrategy');
const bodyParser = require('body-parser');

const PORT = 8000;

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(express.static('client'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy.fBStrategy);

passport.serializeUser(strategy.serialize);
passport.deserializeUser(strategy.deSerialize);

app.use('/api/users', usersController);
app.use('/api/sessions', sessionsController);
app.use('/api/languages', languageController);
app.use('/api/userLanguages', userlanguagesController);
app.use('/api/medals', medalsController);
app.use('/api/cards', cardsController);
app.use('/', viewRouter);

app.get('/login/facebook', strategy.handleAuth);

app.get('/login/facebook/return', strategy.handleAuthReturn, strategy.handleAuthCB);

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), strategy.ensure);

app.listen(PORT, () => {
  console.log('It\'s Alive!!');
});

module.exports = app;

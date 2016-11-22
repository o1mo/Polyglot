const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../../db/controllers/controllers.js');
const Strategy = require('passport-facebook').Strategy;
const keys = require('../config/keys.js');

const fBStrategy = new Strategy({
  clientID: keys.CLIENT_ID,
  clientSecret: keys.CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/login/facebook/return',
  profileFields: ['email', 'displayName', 'id']
}, function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
});

var handleAuth = passport.authenticate('facebook', {scope: ['email']});
var handleAuthReturn = passport.authenticate('facebook', { failureRedirect: '/login' });
// check this out to see if it works
var handleAuthCB = function(req, res) {
  var user = req.user;
  var email = user.emails[0].value;
  db.findUserByEmail(email)
  .then(function(resp) {
    if (resp) {
      res.redirect('/dashboard');
    } else {
      db.addUser(user.displayName, user.emails[0].value, user.id)
      .then(function(user) {
        console.log('user added');
      });
    }
  });
};

var deSerialize = function(email, cb) {
  db.findUserByEmail(email).then(function(data) {
    cb(null, data);
  });
};


var serialize = function(user, cb) {
  cb(null, user.emails[0].value);
};
// problem here with data

var ensure = function(req, res){
  res.send();
};

module.exports.handleAuthReturn = handleAuthReturn;
module.exports.handleAuthCB = handleAuthCB;
module.exports.handleAuth = handleAuth;
module.exports.deSerialize = deSerialize;
module.exports.fBStrategy = fBStrategy;
module.exports.serialize = serialize;
module.exports.ensure = ensure;

'use strict';
const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const db = require('../../db/controllers/controllers.js');

router.get('/', (req, res) => {
  var user = req.user;
  var email = user.email;
  db.getLearningLanguages(email)
  .then(languages => {
    res.send(languages);
  })
  .catch(err => {
    res.status(404);
  })
});  

module.exports = router;
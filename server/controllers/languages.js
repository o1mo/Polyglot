'use strict';
const express = require('express');
const router = express.Router();
const db = require('../../db/controllers/controllers.js');

router.get('/', (req, res) => {
  console.log('in here$$$$');
  db.findAllLanguages()
  .then((languages) => {
    res.send(languages);
  })
  .catch((err)=> {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  // add in additonal logic
  res.sendStatus(200);
});

router.post('/teacher', (req, res) => {
  if (!req.session.passport) {
    res.sendStatus(401);
  } else {
    // control for weird capitalizations
    let language = req.body.language[0].toUpperCase() + req.body.language.slice(1).toLowerCase();
    db.addTeacher(req.session.passport.user, language)
      .then(teacher => {
        res.status(200).json(teacher.id);
      });
  }
});

router.post('/learner', (req, res) => {
  if (!req.session.passport) {
    res.sendStatus(401);
  } else {
    // control for weird capitalizations
    let language = req.body.language[0].toUpperCase() + req.body.language.slice(1).toLowerCase();
    let level = req.body.skillLevel || 'A1 - Beginner';
    db.addLearner(req.session.passport.user)
      .then(learner => {
        res.status(200).json(learner.id);
      });
  }
});

module.exports = router;

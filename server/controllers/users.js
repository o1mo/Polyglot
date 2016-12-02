'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/controllers/controllers.js');
const matchUsers = require('../models/matching').matchUsers; 

router.get('/', (req, res) => {
  console.log('user------', req.user);
  console.log('session-----', req.session);
  console.log('passport-----', req.session.passport);
  if (!req.session.passport) {
    console.log('------totally stayed home------');
    res.status(200).json(0);
  } else {
    console.log('we are fucking out here!!!!!!', req.session.passport.user);
    db.findUserByEmail(req.session.passport.user)
      .then(user => {
        res.status(200).json(user);
      });
  }
});

router.post('/', (req, res) => {
  // add in additonal logic
  res.sendStatus(200);
});

router.post('/medals', (req, res) => {
  if ( !req.session.passport ) {
    res.sendStatus(401);
  } else {
    // add in db logic
    res.sendStatus(200);
  }
});

router.post('/match', ( req, res ) => {
  // add in db and authentication logic
  console.log('REQ BODY', req.body);
  let result = matchUsers({ userId: req.body.userId, pairId: req.body.pairId, match: JSON.parse( req.body.match ) });
  res.status(200).json( result );
  console.log('MATCHING RESULT', result);
});

module.exports = router;

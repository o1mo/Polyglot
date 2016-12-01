'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../db/controllers/controllers.js');
const matchUsers = require('../models/matching').matchUsers; 

router.get('/', (req, res) => {
  if (!req.session.passport) {
    res.status(200).json(0);
  } else {
    db.findUserByEmail(req.session.passport.user)
      .then(user => {
        res.status(200).json(user.id);
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

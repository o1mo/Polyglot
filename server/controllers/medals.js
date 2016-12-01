const express = require('express');
const router = express.Router();
const db = require('../../db/controllers/controllers.js');

router.get('/', (req, res) => {
  if ( !req.session.passport ) {
    res.sendStatus(401);
  } else {
    // add in db logic
    res.sendStatus(200);
  }
});

router.post('/', (req, res) => {
  if ( !req.session.passport ) {
    res.sendStatus(401);
  } else {
    // add in db logic
    res.sendStatus(200);
  }
});

module.exports = router;

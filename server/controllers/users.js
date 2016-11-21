const express = require('express');
const router = express.Router();
const db = require('../../db/controllers/controllers.js');

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

module.exports = router;

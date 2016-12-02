const express = require('express');
const router = express.Router();
const db = require('../../db/controllers/controllers.js');

router.get('/', (req, res) => {
  var email = req.user.email;
  if ( !req.session.passport ) {
    res.sendStatus(401);
  } else {
    db.getAchievements(email)
    .then(function(medals) {
      console.log(medals);
      res.send(medals);
    })
    .catch(err => {
      res.sendStatus(404);
    });
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

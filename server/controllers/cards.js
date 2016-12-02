const express = require('express');
const router = express.Router();
const db = require('../../db/controllers/controllers.js');

router.get('/', (req, res) => {
  if ( !req.session.passport ) {
    res.sendStatus(401);
  } else {
    db.getCards( req.session.passport.user )
      .then( cards => {
        res.status(200).json( cards );
      });
  }
});

router.post('/', ( req, res ) => {
  if ( !req.session.passport ) {
    res.sendStatus(401);
  } else {
    db.addCard( req.session.passport.user, req.body.phrase, req.body.translation )
      .then(() => {
        return db.getCards( req.session.passport.user );
      })
      .then( cards => {
        res.status(200).json( cards );
      });
  }
});

router.post('/update', ( req, res ) => {
  if ( !req.session.passport ) {
    res.sendStatus(401);
  } else {
    db.updateCard( req.body.cardId, req.body.updatedWord, req.body.updatedTranslation )
      .then(() => {
        res.sendStatus(200);
      });
  }
});

router.post('/delete', ( req, res ) => {
  if ( !req.session.passport ) {
    res.sendStatus(401);
  } else {
    db.deleteCard(req.body.cardId)
      .then(() => {
        return db.getCards( req.session.passport.user );
      })
      .then( cards => {
        res.status(200).json( cards );
      });
  }
});

module.exports = router;

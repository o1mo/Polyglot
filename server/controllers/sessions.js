'use strict';

const express = require('express');
const router = express.Router();
const getPartner = require('../models/sessions').getPartner;

router.post('/:language', (req, res) => {
  let resId = getPartner(req.body.userId, req.params.language, JSON.parse(req.body.teacher));
  res.status(200).json(resId);
});

module.exports = router;

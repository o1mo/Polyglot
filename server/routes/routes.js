const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

// Add in a route for each react view
router.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
});

router.get('/splash', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
});

router.get('/main', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
});

router.get('/nav', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
});

router.get('/nav/chat', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
});

router.get('/signup', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
});

router.get('/profile', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
});

router.get('/dashboard', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../../client')});
});

module.exports = router;

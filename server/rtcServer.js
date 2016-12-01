'use strict';

const express = require('express');
const sockets = require('signal-master/sockets');
const config = require('getconfig');

const app = express();
let server = app.listen( 8888, () => {
  console.log('RTC server is live');
});

sockets( server, config );

module.exports = app;

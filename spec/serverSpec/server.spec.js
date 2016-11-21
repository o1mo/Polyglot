var app = require('../../server/server');
var expect = require('chai').expect;
var Promise = require('bluebird');
var request = require('request');
var rp = require('request-promise');

describe('Server Routes', function() {

  it('Should serve the index at /', function(done) {
    request('http://127.0.0.1:8000/', function(err, response, body) {
      expect(response.body.substring(0, response.body.indexOf('\n'))).to.equal('<!DOCTYPE html>');
      done();
    });
  });
  
  it('Should serve index.html at other defined routes', function(done) {
    var promises = [
      rp('http://127.0.0.1:8000/home')
        .then(function(htmlString) {
          expect(htmlString.substring(0, htmlString.indexOf('\n'))).to.equal('<!DOCTYPE html>');
        }),
      rp('http://127.0.0.1:8000/chat')
        .then(function(htmlString) {
          expect(htmlString.substring(0, htmlString.indexOf('\n'))).to.equal('<!DOCTYPE html>');
        }),
      rp('http://127.0.0.1:8000/signup')
        .then(function(htmlString) {
          expect(htmlString.substring(0, htmlString.indexOf('\n'))).to.equal('<!DOCTYPE html>');
        })
    ];
    Promise.all(promises).then(function() {
      done();
    });
  });
  
  it('Should respond with a 404 error at bad routes', function(done) {
    request('http://127.0.0.1:8000/fakeroute', function(err, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('Should respond with facebook data when route /login/facebook', function(done) {
    request('http://127.0.0.1:8000/login/facebook', function(err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Should respond with facebook data when route /api/users', function(done) {
    request('http://127.0.0.1:8000/api/users', function(err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Should respond with facebook data when route /api/sessions', function(done) {
    request('http://127.0.0.1:8000/api/sessions', function(err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});

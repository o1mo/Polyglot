var app = require('../../server/server');
var expect = require('chai').expect;
var request = require('request');
var rp = require('request-promise');
var resetCache = require('../../server/models/sessions').resetCache;
var $ = require('jquery');

describe('API tests', function() {

  beforeEach(function() {
    resetCache();
  });
  
  it('Should respond to a GET request to /api/users with a 200 status', function(done) {
    request('http://127.0.0.1:8000/api/users', function(err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  
  it('Should POST data to /api/users', function(done) {
    var reqParams = {
      uri: 'http://127.0.0.1:8000/api/users',
      method: 'POST',
      json: {
        /* eslint-disable */
        first_name: 'Marcus',
        last_name: 'Garvey',
        email: 'marcus.garvey@gmail.com',
        facebook_id: '1234'
        /* eslint-enable */
      }
    };
    request(reqParams, function(err, response, body) {
      expect(response.statusCode).to.equal(200);
      // expect(body.first_name).to.equal('Marcus');
      done();
    });
  });
  
  it('Should POST data to /api/sessions/:language', function(done) {
    var reqParams = {
      uri: 'http://127.0.0.1:8000/api/sessions/Spanish',
      method: 'POST',
      json: {
        userId: '123',
        teacher: 'true',
      }
    };
    
    request(reqParams, function(err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Should respond to POST at /api/sessions/:language with a user id', function(done) {
    var reqParams = {
      uri: 'http://localhost:8000/api/sessions/french',
      method: 'POST',
      json: {
        'userId': '1234',
        'teacher': 'false'
      }
    };
    
    var reqTwo = {
      uri: 'http://localhost:8000/api/sessions/french',
      method: 'POST',
      json: {
        userId: '4321',
        teacher: 'true'
      }
    };

    rp(reqParams)
      .then(function(body) {
        expect(body).to.equal('OK');
      })
      .then(function() {
        rp(reqTwo)
          .then(function(body) {
            expect(body).to.equal('1234');
            done();
          });
      });
  });

  it('Should POST to /api/languages/learner', function(done) {
    var reqParams = {
      uri: 'http://127.0.0.1:8000/api/languages/learner',
      method: 'POST',
      json: {
        userId: '123',
        teacher: 'true',
      }
    };
    
    request(reqParams, function(err, response, body) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('Should POST to /api/languages/teacher', function(done) {
    var reqParams = {
      uri: 'http://127.0.0.1:8000/api/languages/teacher',
      method: 'POST',
      json: {
        userId: '123',
        teacher: 'true',
      }
    };
    
    request(reqParams, function(err, response, body) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('Should POST to /api/users/medals', function(done) {
    var reqParams = {
      uri: 'http://127.0.0.1:8000/api/users/medals',
      method: 'POST',
      json: {
        medal: 'Gold',
      }
    };
    request(reqParams, function(err, response, body) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  xit('Should GET all medals from /api/medals', function(done) {
    request('http://127.0.0.1:8000/api/medals', function(err, response, body) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('Should POST a card to /api/cards', function(done) {
    var reqParams = {
      uri: 'http://127.0.0.1:8000/api/cards',
      method: 'POST',
      json: {
        phrase: 'Hola',
        translation: 'Hello',
      }
    };
    request(reqParams, function(err, response, body) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('Should POST an updated card to /api/cards/update', function(done) {
    var reqParams = {
      uri: 'http://127.0.0.1:8000/api/cards/update',
      method: 'POST',
      json: {
        updatedWord: 'Hola',
        updatedTranslation: 'Hello',
      }
    };
    request(reqParams, function(err, response, body) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });

  it('Should GET all cards from /api/cards', function(done) {
    request('http://127.0.0.1:8000/api/cards', function(err, response, body) {
      expect(response.statusCode).to.equal(401);
      done();
    });
  });
});


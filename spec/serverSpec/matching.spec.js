var app = require('../../server/server');
var expect = require('chai').expect;
var request = require('request');
var rp = require('request-promise');
var clearStorage = require('../../server/models/matching').clearStorage;
var matchUsers = require('../../server/models/matching').matchUsers;

describe('API tests', function() {

  beforeEach(function() {
    clearStorage();
  });
  
  it('Should POST to /api/users/match', function(done) {
    var reqParams = {
      uri: 'http://127.0.0.1:8000/api/users/match',
      method: 'POST',
      json: {
        userId: '123',
        pairId: '456',
        match: true
      }
    };
    
    request(reqParams, function(err, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('OK');
      done();
    });
  });

  it('Should return OK if it is in the first pair to submit', function() {
    const userA = {
      userId: '123',
      pairId: '456',
      match: true
    };

    expect( matchUsers( userA ) ).to.equal('OK');
  });

  it('Should return an object with both ids and whether they matched', function() {
    const userA = {
      userId: '123',
      pairId: '456',
      match: true
    };
    
    const userB = {
      userId: '456',
      pairId: '123',
      match: true
    };

    const resultAb = {
      userId: '456',
      pairId: '123',
      matched: true
    };

    const userC = {
      userId: '123',
      pairId: '456',
      match: true
    };
    
    const userD = {
      userId: '456',
      pairId: '123',
      match: false
    };

    const resultCd = {
      userId: '456',
      pairId: '123',
      matched: false
    };
    
    expect( matchUsers( userA ) ).to.equal('OK');
    expect( matchUsers( userB ) ).to.eql( resultAb );
    expect( matchUsers( userC ) ).to.equal('OK');
    expect( matchUsers( userD ) ).to.eql( resultCd );

  });

});


import reducer from '../../client/src/app/reducers/Dashboard';
import { expect } from 'chai';
import * as types from '../../client/src/app/actionTypes';

let initialState = {
  myId: null,
  pairId: null,
  language: null,
  teacher: null,
  view: 0,
};

describe('Dashboard reducer', function() {

  

  it('Should handle ENTER_LAUNCH', function() {
    
    let action = {
      type: types.ENTER_LAUNCH,
      teacher: true,
      view: 1
    };

    let resState = {
      myId: null,
      pairId: null,
      language: null,
      teacher: true,
      view: 1
    };
    
    expect(reducer( initialState, action )).to.eql( resState );
  });
  
  it('Should handle ENTER_CHAT', function() {
    
    let action = {
      type: types.ENTER_CHAT,
      myId: 123,
      language: 'Spanish',
      view: 2
    };

    let resState = {
      myId: null,
      pairId: null,
      language: 'Spanish',
      teacher: null,
      view: 2
    };
    
    expect(reducer( initialState, action )).to.eql( resState );
  });

  it('Should handle EXIT_CHAT', function() {
    
    let action = {
      type: types.EXIT_CHAT,
    };
    
    let reState = {
      myId: null,
      pairId: null,
      language: null,
      teacher: null,
      view: 4
    };
    
    expect(reducer( initialState, action )).to.eql( reState ); 
  });
  
  it('Should handle GET_ID', function() {
    
    let action = {
      type: types.GET_ID,
      myId: 123
    };
    
    let resState = {
      myId: 123,
      pairId: null,
      language: null,
      teacher: null,
      view: 0
    };
    
    expect(reducer( initialState, action )).to.eql( resState ); 
  });

  it('Should handle RESET', function() {
    let action = {
      type: types.RESET,
    };
    
    expect(reducer( initialState, action )).to.eql( initialState ); 

  });

});

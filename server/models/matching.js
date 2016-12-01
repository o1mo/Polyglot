'use strict';

let storage = {};

const matchUsers = ( userPref ) => {
  if ( !storage[ userPref.userId ] ) {
    storage[ userPref.pairId ] = { pairId: userPref.userId, match: userPref.match };
  } else if ( storage[ userPref.userId ].pairId === userPref.pairId ) {
    let matched = false;
    if ( userPref.match === true && storage[ userPref.userId ].match === userPref.match ) {
      matched = true;
    }
    let result = { userId: userPref.userId, pairId: userPref.pairId, matched: matched };
    delete storage[ userPref.userId ];
    return result;
  }

  return 'OK';
};

const clearStorage = () => {
  storage = {};
};

module.exports.matchUsers = matchUsers;
module.exports.clearStorage = clearStorage;

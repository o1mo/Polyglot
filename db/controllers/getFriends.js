'use strict';
const db = require('../index.js');

module.exports = (userEmail) => {
  let userId;
  let friendId;
  return new Promise((resolve, reject) => {
    db('users').select().where({email: userEmail})
    .then((userArr) => {
      userId = userArr[0].id;
      resolve(db('friends').join('users ', 'friends.friend_id', '=', 'users.id')
              .select(['friend_id', 'full_name', 'email', 'facebook_id', 'photo_url', 'credits', 'stars'])
              .where({user_id: userId}));
    })
    .catch(err => {
      reject(err);
    });
  });
};

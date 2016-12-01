'use strict';
const db = require('../index.js');

module.exports = (userEmail, friendEmail) => {
  let userId;
  let friendId;
  return new Promise((resolve, reject) => {
    db('users').select().where({email: userEmail})
    .then((userArr) => {
      userId = userArr[0].id;
      return db('users').select().where({email: friendEmail});
    })
    .then(friendsArr => {
      friendId = friendsArr[0].id;
      return db('friends').select().where({
        user_id: userId,
        friend_id: friendId
      });
    })
    .then((friendships) => {
      if (friendships.length){
        reject('These two users are already friends');
      } else {
        return db('friends').insert({
          user_id: userId,
          friend_id: friendId
        }, 'id');
      }
    })
    .then(() => {
      resolve(db('friends').insert({
        user_id: friendId,
        friend_id: userId
      }, 'id'));
    })
    .catch(err => {
      reject(err);
    });
  });
};

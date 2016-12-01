const db = require('../index.js');

module.exports = (email, phrase, translation) => {
  return new Promise((resolve, reject) => {
    db('users').select().where({email: email})
      .then(response => {
        resolve (db('cards').insert({
          user_id: response[0].id,
          phrase: phrase,
          translation: translation
        }));
      })
      .catch(err => {
        reject(err);
      });
  });
};

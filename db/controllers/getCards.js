const db = require('../index.js');

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    db('users').select().where({email: email})
      .then(response => {
        resolve(db('cards').select()
          .where({
            user_id: response[0].id
          }));
      })
      .catch(err => {
        reject(err);
      });
  });
};

const db = require('../index.js');

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    db('users').select().where({email: email})
      .then(response => {
        resolve(response[0]);
      })
      .catch(err => {
        resolve(err);
      });
  });
};

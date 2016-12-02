const db = require('../index.js');

module.exports = (cardId) => {
  return new Promise((resolve, reject) => {
    db('cards').where({id: cardId})
      .del()
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

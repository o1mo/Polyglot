const db = require('../index.js');

module.exports = (cardId, newPhrase, newTranslation) => {
  return new Promise((resolve, reject) => {
    db('cards').where({id: cardId})
      .update({
        phrase: newPhrase,
        translation: newTranslation
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

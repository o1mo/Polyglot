'use strict';

const db = require('../index.js');

module.exports = (email, languageName, skillLevel) => {
  let user;
  let language;
  return new Promise((resolve, reject) => {
    db('users').select().where({email: email})
      .then(userArr => {
        user = userArr[0];
        return db('learners').join('languages', 'learners.language_id', '=', 'languages.id')
        .select('languages.name').where({'learners.user_id': user.id});
      })
      .then(learnersLanguages => {
        var alreadyLearning = false;
        learnersLanguages.forEach(lang => {
          if(lang === languageName){
            alreadyLearning = true;
          }
        });
        if(alreadyLearning){
          reject(new Error('User is already learning that language'));
        } else {
          return db('languages').select().where({name: languageName});
        }
      })
      .then(languageArr => {
        language = languageArr[0];
        return db('levels').select().where({name: skillLevel});
      })
      .then(levelArr => {
        resolve(db('learners').insert({
          user_id: user.id,
          language_id: language.id,
          level_id: levelArr[0].id
        }, 'id'));
      });
  });
};

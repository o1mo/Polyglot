'use strict';
const db = require('../index.js');

module.exports = (email, languageName) => {
  let user;
  return new Promise((resolve, reject) => {
    db('users').select().where({email: email})
    .then(userArr => {
      user = userArr[0];
      return db('teachers').join('languages', 'teachers.language_id', '=', 'languages.id')
      .select('languages.name').where({'teachers.user_id': user.id});
    })
    .then(teachersLanguages => {
      var alreadyTeaching = false;
      teachersLanguages.forEach(lang => {
        if(lang === languageName){
          alreadyTeaching = true;
        }
      });
      if(alreadyTeaching){
        reject(new Error('User is already teaching that language'));
      } else {
        return db('languages').select().where({name: languageName});
      }
    })
    .then(languagesArr => {
      resolve(db('teachers').insert({
        user_id: user.id,
        language_id: languagesArr[0].id,
      }, 'id'));
    });
  });
};

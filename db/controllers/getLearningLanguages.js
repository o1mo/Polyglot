'use strict';
const db = require('../index.js');

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    db('users').select().where({email: email})
      .then(response => {
        return db('learners as learners')
          .select('levels.name as level_name', 'languages.name as language_name')
          .join('levels', 'learners.level_id', '=', 'levels.id')
          .join('languages', 'learners.language_id', '=', 'languages.id')
          .where({'learners.user_id': response[0].id});
      })
      .then(response => {
        let result = response.map((learner) => {
          let levelName = learner.level_name;
          let level100;
          let nextLevel;

          if (levelName === 'Beginner') {
            level100 = 16.6;
            nextLevel = 'Elementary';
          } else if (levelName === 'Elementary') {
            level100 = 33.3;
            nextLevel = 'Intermediate';
          } else if (levelName === 'Intermediate') {
            level100 = 50;
            nextLevel = 'Upper Intermediate';
          } else if (levelName === 'Upper Intermediate') {
            level100 = 66.6;
            nextLevel = 'Advanced';
          } else if (levelName === 'Advanced') {
            level100 = 83.3;
            nextLevel = 'Master';
          } else if (levelName === 'Master') {
            level100 = 100;
            nextLevel = 'None!';
          } 
          return {
            languageName: learner.language_name,
            level100: level100,
            levelName: learner.level_name,
            nextLevel: nextLevel
          };
        });
        resolve(result);
      })
      .catch(err => {
        console.log('error getting langs ', err);
        reject(err);
      });
  });
};
